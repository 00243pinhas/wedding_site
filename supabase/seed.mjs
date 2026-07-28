// Seeds 5 fake guests for local testing, using the service role key so it
// bypasses RLS the same way the real /i/{code} lookup and RSVP write path
// will. Never run this with the anon key — RLS denies anon on both tables
// by design, so it would just fail.
//
// Usage:
//   node --env-file=.env.local supabase/seed.mjs
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

const FAKE_GUESTS = [
  { full_name: "Alice Testworthy", max_party_size: 1 },
  { full_name: "Bob & Carol Fixture", max_party_size: 2 },
  { full_name: "Dana & Evan Placeholder", max_party_size: 2 },
  { full_name: "The Sample-Jones Family", max_party_size: 4 },
  { full_name: "The Mocksworth Household", max_party_size: 6 },
];

async function main() {
  const { data: existingGuests, error: fetchError } = await supabase
    .from("guests")
    .select("invite_code");

  if (fetchError) {
    console.error("Failed to fetch existing invite codes:", fetchError.message);
    process.exit(1);
  }

  const existingCodes = new Set((existingGuests ?? []).map((g) => g.invite_code));

  const rows = FAKE_GUESTS.map((guest) => ({
    ...guest,
    invite_code: generateUniqueInviteCode(existingCodes),
  }));

  const { data, error } = await supabase.from("guests").insert(rows).select();

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${data.length} guests:`);
  for (const g of data) {
    console.log(`  ${g.invite_code}  ${g.full_name}  (max party ${g.max_party_size})`);
  }
}

main();
