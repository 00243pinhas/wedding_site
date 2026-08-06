-- Family-level RSVP notes: one dietary-notes field and one message-to-the-
-- couple field per family (not per member), collected on /rsvp alongside
-- the per-member attending checklist introduced in
-- 20260806120000_create_families_and_members.sql. Nullable, additive —
-- existing seeded families simply have NULL here until someone submits.
alter table public.families
  add column if not exists dietary_notes text,
  add column if not exists message text;

-- No RLS changes needed: admin_select_families already covers every
-- column on the table (policies are row-scoped, not column-scoped), and
-- anon still has no policy on families at all.
