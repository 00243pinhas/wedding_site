// Seeds fake families + members for testing the new one-code-per-family
// model end to end, using the service role key so it bypasses RLS the
// same way the real /i/{code} lookup and RSVP write path will. Never run
// this with the anon key — RLS denies anon on both tables by design, so
// it would just fail.
//
// Usage:
//   node --env-file=.env.local supabase/seed-families.mjs
import { createClient } from "@supabase/supabase-js";
import { randomInt } from "node:crypto";

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

const FAKE_FAMILIES = [
  {
    family_name: "The Test Family",
    members: ["Tara Testworthy", "Tom Testworthy", "Timmy Testworthy", "Tilly Testworthy"],
  },
  {
    family_name: "The Sample Household",
    members: ["Sam Sampleton", "Sasha Sampleton"],
  },
  {
    family_name: "Solo Individual",
    members: ["Ivy Individual"],
  },
];

async function main() {
  const { data: existingFamilies, error: fetchError } = await supabase
    .from("families")
    .select("invite_code");

  if (fetchError) {
    console.error("Failed to fetch existing invite codes:", fetchError.message);
    process.exit(1);
  }

  const existingCodes = new Set((existingFamilies ?? []).map((f) => f.invite_code));

  for (const fake of FAKE_FAMILIES) {
    const invite_code = generateUniqueInviteCode(existingCodes);

    const { data: family, error: familyError } = await supabase
      .from("families")
      .insert({ family_name: fake.family_name, invite_code })
      .select()
      .single();

    if (familyError) {
      console.error(`Failed to insert family "${fake.family_name}":`, familyError.message);
      process.exit(1);
    }

    const memberRows = fake.members.map((full_name) => ({
      family_id: family.id,
      full_name,
    }));

    const { data: members, error: membersError } = await supabase
      .from("members")
      .insert(memberRows)
      .select();

    if (membersError) {
      console.error(`Failed to insert members for "${fake.family_name}":`, membersError.message);
      process.exit(1);
    }

    console.log(`${family.family_name}  —  code: ${family.invite_code}`);
    for (const m of members) {
      console.log(`  - ${m.full_name}  (attending: ${m.attending === null ? "not yet responded" : m.attending})`);
    }
  }
}

main();
