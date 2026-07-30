// One-time script: adds 3 "owner" access codes to `guests` for the couple
// and the developer to view the live site. Site access only — these guests
// are not expected to RSVP.
//
// - Idempotent: skips any full_name that already exists in `guests`.
// - Invite codes generated with the same helper as src/lib/invite-code.ts
//   (duplicated here, no TS loader — see import-guests.mjs for the same
//   note).
// - Does not touch rsvps or any other guest row.
//
// Usage:
//   node --env-file=.env.local supabase/add-owner-codes.mjs
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

const SITE_URL = "https://wedding-site-tau-dusky.vercel.app";

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

const OWNER_ROWS = [
  { full_name: "Jerry (owner)", max_party_size: 1 },
  { full_name: "Pam (owner)", max_party_size: 1 },
  { full_name: "Pinhas (owner)", max_party_size: 1 },
];

async function main() {
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

  for (const row of OWNER_ROWS) {
    if (existingByName.has(row.full_name)) {
      alreadyPresent.push(row.full_name);
    } else {
      toInsert.push({
        full_name: row.full_name,
        max_party_size: row.max_party_size,
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

    console.log(`Inserted ${inserted.length} new owner guest(s).`);
    for (const g of inserted) {
      existingByName.set(g.full_name, g.invite_code);
    }
  } else {
    console.log("No new owner guests to insert.");
  }

  console.log("\nOwner invite links:");
  for (const row of OWNER_ROWS) {
    const code = existingByName.get(row.full_name);
    console.log(`${row.full_name}: ${SITE_URL}/i/${code}`);
  }
}

main();
