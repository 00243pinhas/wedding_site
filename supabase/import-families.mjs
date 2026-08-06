// One-time production import: replaces the 3 fake test families (seeded by
// seed-families.mjs) with the real guest list from families.csv, using the
// service role key so it bypasses RLS the same way the real /i/{code}
// lookup and RSVP write path will. Never run this with the anon key — RLS
// denies anon on both tables by design, so it would just fail.
//
// families.csv has 3 columns: family_name, member_name, is_individual
// (yes/no). Rows sharing a family_name become ONE families row with ONE
// invite_code; every row becomes a members row linked to it. Names are
// preserved exactly as written in the CSV — no transliteration.
//
// - Deletes the 3 fake seed families from seed-families.mjs if present, by
//   exact family_name only, before importing (cascades to their members).
// - Idempotent: skips any family_name that already exists in `families`.
// - Does NOT touch the old guests/rsvps tables.
// - Writes families_invite_links.csv (family_name, invite_code, invite_url,
//   member_names) for every imported family, gitignored, never committed.
//
// Usage:
//   node --env-file=.env.local supabase/import-families.mjs
import { createClient } from "@supabase/supabase-js";
import { randomInt } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, "..", "families.csv");
const OUTPUT_PATH = path.join(__dirname, "..", "families_invite_links.csv");
const SITE_ORIGIN = "https://wedding-site-tau-dusky.vercel.app";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Mirrors src/lib/invite-code.ts. Duplicated here (rather than imported)
// because this script runs with plain `node`, no TypeScript loader — keep
// the two in sync if the code format ever changes.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const CODE_LENGTH = 8;

function generateInviteCode() {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[randomInt(ALPHABET.length)];
  }
  return code;
}

function generateUniqueInviteCode(existingCodes) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const code = generateInviteCode();
    if (!existingCodes.has(code)) {
      existingCodes.add(code);
      return code;
    }
  }
  throw new Error("Could not generate a unique invite code after 100 attempts");
}

const FAKE_FAMILY_NAMES = ["The Test Family", "The Sample Household", "Solo Individual"];

// Minimal CSV parser: no embedded commas or quotes in this file (plain
// names), so a straight split is enough — matches the style of
// import-guests.mjs's parseCsv.
function parseCsv(text) {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const [header, ...rows] = lines;
  const columns = header.split(",").map((c) => c.trim());
  return rows.map((line, i) => {
    const cells = line.split(",");
    const record = {};
    columns.forEach((col, idx) => {
      record[col] = (cells[idx] ?? "").trim();
    });
    record.__csvRow = i + 2; // +2: 1-indexed, plus header line
    return record;
  });
}

async function main() {
  const csvText = readFileSync(CSV_PATH, "utf-8");
  const allRows = parseCsv(csvText);

  console.log(`Parsed ${allRows.length} CSV row(s).`);

  for (const row of allRows) {
    if (row.family_name.length === 0 || row.member_name.length === 0) {
      console.error(`Row ${row.__csvRow} is malformed: ${JSON.stringify(row)}`);
      process.exit(1);
    }
    const iv = row.is_individual.toLowerCase();
    if (iv !== "yes" && iv !== "no") {
      console.error(
        `Row ${row.__csvRow} has invalid is_individual "${row.is_individual}" (expected yes/no).`,
      );
      process.exit(1);
    }
  }

  // Group rows by family_name, preserving first-seen order.
  const familyOrder = [];
  const familiesByName = new Map();
  for (const row of allRows) {
    if (!familiesByName.has(row.family_name)) {
      familiesByName.set(row.family_name, []);
      familyOrder.push(row.family_name);
    }
    familiesByName.get(row.family_name).push(row.member_name);
  }

  console.log(`${familyOrder.length} distinct family/families in the CSV.`);

  // 1. Delete the fake seed families (cascades to their members via FK).
  const { data: fakeFamilies, error: fakeFetchErr } = await supabase
    .from("families")
    .select("id, family_name")
    .in("family_name", FAKE_FAMILY_NAMES);

  if (fakeFetchErr) {
    console.error("Failed to check for fake seed families:", fakeFetchErr.message);
    process.exit(1);
  }

  if (fakeFamilies && fakeFamilies.length > 0) {
    console.log(
      `Found ${fakeFamilies.length} fake seed family/families to delete: ${fakeFamilies
        .map((f) => f.family_name)
        .join(", ")}`,
    );
    const { error: deleteErr } = await supabase
      .from("families")
      .delete()
      .in(
        "id",
        fakeFamilies.map((f) => f.id),
      );
    if (deleteErr) {
      console.error("Failed to delete fake seed families:", deleteErr.message);
      process.exit(1);
    }
    console.log("Fake seed families deleted (members cascaded).");
  } else {
    console.log("No fake seed families present — nothing to delete.");
  }

  // 2. Fetch current state for idempotency + code collision checks.
  const { data: existingFamilies, error: fetchError } = await supabase
    .from("families")
    .select("family_name, invite_code");

  if (fetchError) {
    console.error("Failed to fetch existing families:", fetchError.message);
    process.exit(1);
  }

  const existingByName = new Map(
    (existingFamilies ?? []).map((f) => [f.family_name, f.invite_code]),
  );
  const existingCodes = new Set((existingFamilies ?? []).map((f) => f.invite_code));

  const alreadyPresent = [];
  const toCreate = [];
  for (const family_name of familyOrder) {
    if (existingByName.has(family_name)) {
      alreadyPresent.push(family_name);
    } else {
      toCreate.push(family_name);
    }
  }

  if (alreadyPresent.length > 0) {
    console.log(
      `Skipping ${alreadyPresent.length} family/families already in the table: ${alreadyPresent.join(", ")}`,
    );
  }

  let familiesCreated = 0;
  let membersCreated = 0;

  for (const family_name of toCreate) {
    const invite_code = generateUniqueInviteCode(existingCodes);

    const { data: family, error: familyError } = await supabase
      .from("families")
      .insert({ family_name, invite_code })
      .select()
      .single();

    if (familyError) {
      console.error(`Failed to insert family "${family_name}":`, familyError.message);
      process.exit(1);
    }

    const memberRows = familiesByName.get(family_name).map((full_name) => ({
      family_id: family.id,
      full_name,
      attending: null,
    }));

    const { data: members, error: membersError } = await supabase
      .from("members")
      .insert(memberRows)
      .select();

    if (membersError) {
      console.error(`Failed to insert members for "${family_name}":`, membersError.message);
      process.exit(1);
    }

    existingByName.set(family_name, invite_code);
    familiesCreated += 1;
    membersCreated += members.length;
  }

  console.log(`\nInserted ${familiesCreated} new famil${familiesCreated === 1 ? "y" : "ies"}, ${membersCreated} new member(s).`);

  // Build the full output table for every family in the CSV, in CSV order,
  // using whichever invite_code is now on record (pre-existing or just
  // inserted) so re-running this script always yields a complete file.
  const outputRows = familyOrder.map((family_name) => {
    const code = existingByName.get(family_name);
    return {
      family_name,
      invite_code: code,
      invite_url: `${SITE_ORIGIN}/i/${code}`,
      members: familiesByName.get(family_name),
    };
  });

  console.log("\nfamily_name -> invite_code -> member_count");
  for (const r of outputRows) {
    console.log(`${r.family_name} -> ${r.invite_code} -> ${r.members.length}`);
  }

  const csvLines = [
    "family_name,invite_code,invite_url,member_names",
    ...outputRows.map(
      (r) =>
        `"${r.family_name.replace(/"/g, '""')}",${r.invite_code},${r.invite_url},"${r.members
          .join("; ")
          .replace(/"/g, '""')}"`,
    ),
  ];
  writeFileSync(OUTPUT_PATH, csvLines.join("\n") + "\n", "utf-8");
  console.log(`\nWrote ${outputRows.length} rows to ${OUTPUT_PATH}`);

  const { count: familyCount, error: familyCountError } = await supabase
    .from("families")
    .select("id", { count: "exact", head: true });
  const { count: memberCount, error: memberCountError } = await supabase
    .from("members")
    .select("id", { count: "exact", head: true });

  if (familyCountError || memberCountError) {
    console.error(
      "Failed to get final counts:",
      familyCountError?.message ?? memberCountError?.message,
    );
    process.exit(1);
  }

  console.log(`\nFinal totals — families: ${familyCount}, members: ${memberCount}`);
}

main();
