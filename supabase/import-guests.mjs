// One-time production seed: imports the real guest list from
// guests_import.csv into `guests`, using the service role key so it
// bypasses RLS the same way the real /i/{code} lookup and RSVP write path
// will. Never run this with the anon key — RLS denies anon on both tables
// by design, so it would just fail.
//
// - Skips the couple's own rows ("Groom", "Bride") — they don't RSVP to
//   their own wedding.
// - Idempotent: skips any full_name that already exists in `guests`.
// - Deletes the 5 fake seed guests from seed.mjs if present, by exact name
//   only, before importing.
// - Invite codes are generated fresh here (mirroring src/lib/invite-code.ts)
//   rather than taken from the CSV's invite_code column.
// - Writes guest_invite_links.csv (full_name, invite_code, invite_url) for
//   every one of the 148 real guests, gitignored, never committed.
//
// Usage:
//   node --env-file=.env.local supabase/import-guests.mjs
import { createClient } from "@supabase/supabase-js";
import { randomInt } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, "..", "guests_import.csv");
const OUTPUT_PATH = path.join(__dirname, "..", "guest_invite_links.csv");

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

const FAKE_SEED_NAMES = [
  "Alice Testworthy",
  "Bob & Carol Fixture",
  "Dana & Evan Placeholder",
  "The Sample-Jones Family",
  "The Mocksworth Household",
];

const SKIP_NAMES = new Set(["Groom", "Bride"]);

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

  const skipped = allRows.filter((r) => SKIP_NAMES.has(r.full_name));
  const importRows = allRows.filter((r) => !SKIP_NAMES.has(r.full_name));

  console.log(`Parsed ${allRows.length} CSV rows.`);
  console.log(
    `Skipping ${skipped.length} row(s): ${skipped
      .map((r) => `row ${r.__csvRow} ("${r.full_name}")`)
      .join(", ")}`,
  );
  console.log(`${importRows.length} row(s) eligible for import.`);

  for (const row of importRows) {
    const size = Number(row.max_party_size);
    if (row.full_name.length === 0 || !Number.isInteger(size) || size < 1) {
      console.error(`Row ${row.__csvRow} is malformed: ${JSON.stringify(row)}`);
      process.exit(1);
    }
  }

  // Delete the 5 fake seed guests, by exact name only, if present.
  const { data: fakeGuests, error: fakeFetchErr } = await supabase
    .from("guests")
    .select("id, full_name")
    .in("full_name", FAKE_SEED_NAMES);

  if (fakeFetchErr) {
    console.error("Failed to check for fake seed guests:", fakeFetchErr.message);
    process.exit(1);
  }

  if (fakeGuests && fakeGuests.length > 0) {
    console.log(
      `Found ${fakeGuests.length} fake seed guest(s) to delete: ${fakeGuests
        .map((g) => g.full_name)
        .join(", ")}`,
    );
    const { error: deleteErr } = await supabase
      .from("guests")
      .delete()
      .in(
        "id",
        fakeGuests.map((g) => g.id),
      );
    if (deleteErr) {
      console.error("Failed to delete fake seed guests:", deleteErr.message);
      process.exit(1);
    }
    console.log("Fake seed guests deleted.");
  } else {
    console.log("No fake seed guests present — nothing to delete.");
  }

  // Fetch current state for idempotency + code collision checks.
  const { data: existingGuests, error: fetchError } = await supabase
    .from("guests")
    .select("full_name, invite_code");

  if (fetchError) {
    console.error("Failed to fetch existing guests:", fetchError.message);
    process.exit(1);
  }

  const existingByName = new Map(
    (existingGuests ?? []).map((g) => [g.full_name, g.invite_code]),
  );
  const existingCodes = new Set((existingGuests ?? []).map((g) => g.invite_code));

  const toInsert = [];
  const alreadyPresent = [];

  for (const row of importRows) {
    if (existingByName.has(row.full_name)) {
      alreadyPresent.push(row.full_name);
    } else {
      toInsert.push({
        full_name: row.full_name,
        max_party_size: Number(row.max_party_size),
        invite_code: generateUniqueInviteCode(existingCodes),
      });
    }
  }

  if (alreadyPresent.length > 0) {
    console.log(
      `Skipping ${alreadyPresent.length} guest(s) already in the table: ${alreadyPresent.join(", ")}`,
    );
  }

  if (toInsert.length > 0) {
    const { data: inserted, error: insertError } = await supabase
      .from("guests")
      .insert(toInsert)
      .select("full_name, invite_code");

    if (insertError) {
      console.error("Insert failed:", insertError.message);
      process.exit(1);
    }

    console.log(`Inserted ${inserted.length} new guest(s).`);
    for (const g of inserted) {
      existingByName.set(g.full_name, g.invite_code);
    }
  } else {
    console.log("No new guests to insert.");
  }

  // Build the full output table for all 148 real guests, in CSV order,
  // using whichever invite_code is now on record (pre-existing or just
  // inserted) so re-running this script always yields a complete file.
  const outputRows = importRows.map((row) => {
    const code = existingByName.get(row.full_name);
    return { full_name: row.full_name, invite_code: code, invite_url: `/i/${code}` };
  });

  console.log("\nfull_name -> invite_code -> invite_url");
  for (const r of outputRows) {
    console.log(`${r.full_name} -> ${r.invite_code} -> ${r.invite_url}`);
  }

  const csvLines = [
    "full_name,invite_code,invite_url",
    ...outputRows.map(
      (r) => `"${r.full_name.replace(/"/g, '""')}",${r.invite_code},${r.invite_url}`,
    ),
  ];
  writeFileSync(OUTPUT_PATH, csvLines.join("\n") + "\n", "utf-8");
  console.log(`\nWrote ${outputRows.length} rows to ${OUTPUT_PATH}`);

  const { count, error: countError } = await supabase
    .from("guests")
    .select("id", { count: "exact", head: true });

  if (countError) {
    console.error("Failed to get final count:", countError.message);
    process.exit(1);
  }

  console.log(`\nFinal guest count in table: ${count}`);
}

main();
