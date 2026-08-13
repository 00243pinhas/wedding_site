// One-off additive import: adds a small batch of newly-supplied
// families/individuals to the EXISTING families/members tables, alongside
// the real guest list already imported by import-families.mjs. Does NOT
// touch, delete, or re-import anything already in the tables.
//
// - Idempotent: skips any family_name that already exists in `families`.
// - Uses the service role key so it bypasses RLS, same as import-families.mjs.
// - Appends to families_invite_links.csv (creates it if missing) using the
//   custom domain, not the vercel.app URL.
//
// Usage:
//   node --env-file=.env.local supabase/add-new-guests.mjs
import { createClient } from "@supabase/supabase-js";
import { randomInt } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "families_invite_links.csv");
const SITE_ORIGIN = "https://jerryandpamwedding.com";

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

// Mirrors src/lib/invite-code.ts / import-families.mjs.
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

// New batch supplied by the client. Families list member names; individuals
// are family-of-one entries (family_name == member's own name).
const NEW_FAMILIES = [
  { family_name: "The Majoulian Family", members: ["Tamar", "David"] },
  {
    family_name: "The Petrushinin Family",
    members: ["Andrey Petrushinin", "Natasha Petrushinin"],
  },
];

const NEW_INDIVIDUALS = [
  "Auntie Sega",
  "Auntie Chilalu",
  "Auntie Chawa",
  "Uncle Boago",
  "Hina",
  "Arshia",
  "Chris",
  "LUSANDA",
];

const toAdd = [
  ...NEW_FAMILIES,
  ...NEW_INDIVIDUALS.map((name) => ({ family_name: name, members: [name] })),
];

async function main() {
  // Fetch ALL existing families for idempotency + code collision checks.
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
  for (const entry of toAdd) {
    if (existingByName.has(entry.family_name)) {
      alreadyPresent.push(entry.family_name);
    } else {
      toCreate.push(entry);
    }
  }

  if (alreadyPresent.length > 0) {
    console.log(
      `Skipping ${alreadyPresent.length} already present: ${alreadyPresent.join(", ")}`,
    );
  }

  let familiesCreated = 0;
  let membersCreated = 0;
  const newlyInserted = [];

  for (const entry of toCreate) {
    const invite_code = generateUniqueInviteCode(existingCodes);

    const { data: family, error: familyError } = await supabase
      .from("families")
      .insert({ family_name: entry.family_name, invite_code })
      .select()
      .single();

    if (familyError) {
      console.error(`Failed to insert family "${entry.family_name}":`, familyError.message);
      process.exit(1);
    }

    const memberRows = entry.members.map((full_name) => ({
      family_id: family.id,
      full_name,
      attending: null,
    }));

    const { data: members, error: membersError } = await supabase
      .from("members")
      .insert(memberRows)
      .select();

    if (membersError) {
      console.error(`Failed to insert members for "${entry.family_name}":`, membersError.message);
      process.exit(1);
    }

    existingByName.set(entry.family_name, invite_code);
    familiesCreated += 1;
    membersCreated += members.length;
    newlyInserted.push({
      family_name: entry.family_name,
      invite_code,
      members: entry.members,
    });
  }

  console.log(
    `\nInserted ${familiesCreated} new famil${familiesCreated === 1 ? "y" : "ies"}, ${membersCreated} new member(s).`,
  );

  if (newlyInserted.length > 0) {
    console.log("\nfamily_name -> invite_code -> member_count");
    for (const r of newlyInserted) {
      console.log(`${r.family_name} -> ${r.invite_code} -> ${r.members.length}`);
    }

    const newCsvLines = newlyInserted.map(
      (r) =>
        `"${r.family_name.replace(/"/g, '""')}",${r.invite_code},${SITE_ORIGIN}/i/${r.invite_code},"${r.members
          .join("; ")
          .replace(/"/g, '""')}"`,
    );

    if (existsSync(OUTPUT_PATH)) {
      const existingCsv = readFileSync(OUTPUT_PATH, "utf-8").replace(/\n+$/, "");
      writeFileSync(OUTPUT_PATH, existingCsv + "\n" + newCsvLines.join("\n") + "\n", "utf-8");
    } else {
      writeFileSync(
        OUTPUT_PATH,
        "family_name,invite_code,invite_url,member_names\n" + newCsvLines.join("\n") + "\n",
        "utf-8",
      );
    }
    console.log(`\nAppended ${newlyInserted.length} row(s) to ${OUTPUT_PATH}`);
  } else {
    console.log("Nothing new to append to the CSV.");
  }

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
