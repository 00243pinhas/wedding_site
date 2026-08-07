// Resets RSVP response data back to a clean slate for testing, using the
// service role key so it bypasses RLS the same way the real RSVP write
// path will. Never run this with the anon key — RLS denies anon on both
// tables by design, so it would just fail.
//
// Clears ONLY response data:
//   - members.attending    -> NULL
//   - members.responded_at -> NULL
//   - families.dietary_notes -> NULL
//   - families.message       -> NULL
//
// Does NOT delete anything. Every family and member row stays exactly as
// it is — only the response columns are reset. Safe to re-run any time
// you want the dashboard back to zero after testing.
//
// Usage:
//   node --env-file=.env.local supabase/reset-rsvps.mjs
import { createClient } from "@supabase/supabase-js";

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

async function main() {
  const { count: familiesBefore } = await supabase
    .from("families")
    .select("id", { count: "exact", head: true });
  const { count: membersBefore } = await supabase
    .from("members")
    .select("id", { count: "exact", head: true });

  console.log(`Before reset — families: ${familiesBefore}, members: ${membersBefore}`);

  // Reset every member's response. `.not("id", "is", null)` is a
  // Postgres-always-true filter — Supabase requires an explicit filter on
  // update/delete calls, and this is the "match everything" idiom without
  // hardcoding a UUID sentinel.
  const { data: updatedMembers, error: membersError } = await supabase
    .from("members")
    .update({ attending: null, responded_at: null })
    .not("id", "is", null)
    .select("id");

  if (membersError) {
    console.error("Failed to reset members:", membersError.message);
    process.exit(1);
  }

  // Reset every family's dietary notes + message.
  const { data: updatedFamilies, error: familiesError } = await supabase
    .from("families")
    .update({ dietary_notes: null, message: null })
    .not("id", "is", null)
    .select("id");

  if (familiesError) {
    console.error("Failed to reset families:", familiesError.message);
    process.exit(1);
  }

  console.log(`Reset ${updatedMembers.length} member(s) — attending & responded_at cleared.`);
  console.log(`Reset ${updatedFamilies.length} famil${updatedFamilies.length === 1 ? "y" : "ies"} — dietary_notes & message cleared.`);

  // Verify nothing was deleted and every response field is actually NULL.
  const { count: familiesAfter } = await supabase
    .from("families")
    .select("id", { count: "exact", head: true });
  const { count: membersAfter } = await supabase
    .from("members")
    .select("id", { count: "exact", head: true });

  const { count: attendingCount } = await supabase
    .from("members")
    .select("id", { count: "exact", head: true })
    .eq("attending", true);
  const { count: declinedCount } = await supabase
    .from("members")
    .select("id", { count: "exact", head: true })
    .eq("attending", false);
  const { count: respondedCount } = await supabase
    .from("members")
    .select("id", { count: "exact", head: true })
    .not("responded_at", "is", null);
  const { count: notesCount } = await supabase
    .from("families")
    .select("id", { count: "exact", head: true })
    .not("dietary_notes", "is", null);
  const { count: messageCount } = await supabase
    .from("families")
    .select("id", { count: "exact", head: true })
    .not("message", "is", null);

  console.log(`\nAfter reset — families: ${familiesAfter}, members: ${membersAfter}`);
  console.log(
    `Responses — attending: ${attendingCount}, declined: ${declinedCount}, responded_at set: ${respondedCount}`,
  );
  console.log(
    `Notes — dietary_notes set: ${notesCount}, message set: ${messageCount}`,
  );

  const rowsIntact = familiesBefore === familiesAfter && membersBefore === membersAfter;
  const allClear =
    attendingCount === 0 &&
    declinedCount === 0 &&
    respondedCount === 0 &&
    notesCount === 0 &&
    messageCount === 0;

  if (!rowsIntact) {
    console.error(
      "\nERROR: family/member counts changed — this should never happen from an UPDATE-only script.",
    );
    process.exit(1);
  }

  if (!allClear) {
    console.error("\nERROR: some response data is still set after reset.");
    process.exit(1);
  }

  console.log("\nAll clear: every family/member intact, every response field NULL.");
}

main();
