// Sanity-checks RLS and the party_size guard against a real Supabase
// project. Run this after applying the migration and filling in
// .env.local — it is not run automatically anywhere.
//
// Usage:
//   node --env-file=.env.local supabase/verify.mjs
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anonKey || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY.",
  );
  process.exit(1);
}

const anon = createClient(url, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

let failures = 0;

function report(label, pass, detail) {
  console.log(`${pass ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!pass) failures++;
}

async function main() {
  // 1. anon cannot read guests
  const { data: anonGuests, error: anonGuestsErr } = await anon
    .from("guests")
    .select("id");
  report(
    "anon SELECT guests returns nothing",
    anonGuestsErr !== null || (anonGuests ?? []).length === 0,
    anonGuestsErr ? anonGuestsErr.message : `${(anonGuests ?? []).length} rows returned`,
  );

  // 2. anon cannot read rsvps
  const { data: anonRsvps, error: anonRsvpsErr } = await anon
    .from("rsvps")
    .select("id");
  report(
    "anon SELECT rsvps returns nothing",
    anonRsvpsErr !== null || (anonRsvps ?? []).length === 0,
    anonRsvpsErr ? anonRsvpsErr.message : `${(anonRsvps ?? []).length} rows returned`,
  );

  // 3. anon cannot insert into guests
  const { error: anonInsertGuestErr } = await anon
    .from("guests")
    .insert({ invite_code: "ZZZZZZZZ", full_name: "Should Not Insert" });
  report("anon INSERT guests is rejected", anonInsertGuestErr !== null, anonInsertGuestErr?.message);

  // 4. anon cannot insert into rsvps
  const { error: anonInsertRsvpErr } = await anon
    .from("rsvps")
    .insert({ guest_id: "00000000-0000-0000-0000-000000000000", attending: true, party_size: 1 });
  report("anon INSERT rsvps is rejected", anonInsertRsvpErr !== null, anonInsertRsvpErr?.message);

  // 5. party_size guard: create a throwaway guest capped at 1, try to
  // insert an rsvp with party_size 5 via the service role key (the only
  // path that can write at all) and expect the trigger to reject it.
  const { data: testGuest, error: testGuestErr } = await admin
    .from("guests")
    .insert({ invite_code: "VERIFY01", full_name: "Verify Script Guest", max_party_size: 1 })
    .select()
    .single();

  if (testGuestErr) {
    report("create throwaway guest for party_size check", false, testGuestErr.message);
  } else {
    const { error: overCapErr } = await admin
      .from("rsvps")
      .insert({ guest_id: testGuest.id, attending: true, party_size: 5 });
    report(
      "party_size guard rejects over-cap insert (5 > max 1)",
      overCapErr !== null,
      overCapErr?.message,
    );

    const { error: withinCapErr } = await admin
      .from("rsvps")
      .insert({ guest_id: testGuest.id, attending: true, party_size: 1 });
    report("party_size guard allows within-cap insert (1 <= max 1)", withinCapErr === null, withinCapErr?.message);

    // Cleanup: cascade delete removes the rsvp row too.
    await admin.from("guests").delete().eq("id", testGuest.id);
  }

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
  process.exit(failures === 0 ? 0 : 1);
}

main();
