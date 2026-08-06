// Sanity-checks RLS and cascade behavior for families/members against a
// real Supabase project. Run this after applying
// 20260806120000_create_families_and_members.sql and seed-families.mjs.
//
// Usage:
//   node --env-file=.env.local supabase/verify-families.mjs
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
  // 1. anon cannot read families
  const { data: anonFamilies, error: anonFamiliesErr } = await anon
    .from("families")
    .select("id");
  report(
    "anon SELECT families returns nothing",
    anonFamiliesErr !== null || (anonFamilies ?? []).length === 0,
    anonFamiliesErr ? anonFamiliesErr.message : `${(anonFamilies ?? []).length} rows returned`,
  );

  // 2. anon cannot read members
  const { data: anonMembers, error: anonMembersErr } = await anon
    .from("members")
    .select("id");
  report(
    "anon SELECT members returns nothing",
    anonMembersErr !== null || (anonMembers ?? []).length === 0,
    anonMembersErr ? anonMembersErr.message : `${(anonMembers ?? []).length} rows returned`,
  );

  // 3. anon cannot insert into families
  const { error: anonInsertFamilyErr } = await anon
    .from("families")
    .insert({ family_name: "Should Not Insert", invite_code: "ZZZZZZZZ" });
  report("anon INSERT families is rejected", anonInsertFamilyErr !== null, anonInsertFamilyErr?.message);

  // 4. anon cannot insert into members
  const { error: anonInsertMemberErr } = await anon
    .from("members")
    .insert({ family_id: "00000000-0000-0000-0000-000000000000", full_name: "Should Not Insert" });
  report("anon INSERT members is rejected", anonInsertMemberErr !== null, anonInsertMemberErr?.message);

  // 5. seeded family exists with linked members and NULL attending
  const { data: testFamily, error: testFamilyErr } = await admin
    .from("families")
    .select("id, family_name, invite_code, members(id, full_name, attending)")
    .eq("family_name", "The Test Family")
    .maybeSingle();

  if (testFamilyErr || !testFamily) {
    report(
      "seeded 'The Test Family' exists",
      false,
      testFamilyErr?.message ?? "not found — run npm run seed:families first",
    );
  } else {
    report("seeded 'The Test Family' exists", true, `code ${testFamily.invite_code}`);
    report(
      "'The Test Family' has 4 linked members",
      testFamily.members.length === 4,
      `${testFamily.members.length} member(s) found`,
    );
    report(
      "seeded members have NULL attending",
      testFamily.members.every((m) => m.attending === null),
      testFamily.members.map((m) => `${m.full_name}: ${m.attending}`).join(", "),
    );
  }

  // 6. cascade: deleting a family removes its members
  const { data: cascadeFamily, error: cascadeFamilyErr } = await admin
    .from("families")
    .insert({ family_name: "Cascade Test Family", invite_code: "CASCADE1" })
    .select()
    .single();

  if (cascadeFamilyErr) {
    report("create throwaway family for cascade check", false, cascadeFamilyErr.message);
  } else {
    const { data: cascadeMember, error: cascadeMemberErr } = await admin
      .from("members")
      .insert({ family_id: cascadeFamily.id, full_name: "Cascade Test Member" })
      .select()
      .single();

    if (cascadeMemberErr) {
      report("create throwaway member for cascade check", false, cascadeMemberErr.message);
    } else {
      await admin.from("families").delete().eq("id", cascadeFamily.id);

      const { data: orphanCheck } = await admin
        .from("members")
        .select("id")
        .eq("id", cascadeMember.id);

      report(
        "deleting a family cascades to its members",
        (orphanCheck ?? []).length === 0,
        `${(orphanCheck ?? []).length} orphaned row(s) remain`,
      );
    }
  }

  // 7. print fake family codes for the next step
  const { data: allFamilies } = await admin
    .from("families")
    .select("family_name, invite_code, members(full_name)")
    .order("created_at", { ascending: true });

  console.log("\nFake family codes:");
  for (const f of allFamilies ?? []) {
    console.log(
      `  ${f.invite_code}  ${f.family_name}  (${f.members.length} member${f.members.length === 1 ? "" : "s"})`,
    );
  }

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
  process.exit(failures === 0 ? 0 : 1);
}

main();
