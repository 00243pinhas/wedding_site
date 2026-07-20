-- rsvps: one row per guest-party submission from the public /rsvp form.
create table if not exists public.rsvps (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  attending     boolean not null,
  party_size    int not null default 1 check (party_size between 1 and 6),
  email         text,
  phone         text,
  dietary_notes text,
  message       text,
  created_at    timestamptz not null default now()
);

-- Row Level Security
-- ===================
-- RLS is enabled with two policies total. With RLS on, Postgres denies
-- every command by default unless a policy explicitly permits it — so
-- "no policy for X" *is* the deny, there is nothing else to configure
-- to block a role/command combination.
--
--   anon (unauthenticated form submitters)
--     - INSERT: allowed, unconditionally (`with check (true)`), so the
--       public /rsvp form can write without an account.
--     - SELECT / UPDATE / DELETE: no policy exists for anon on any of
--       these commands, so they are denied. A SELECT returns zero rows;
--       an UPDATE/DELETE affects zero rows. Neither errors — it just
--       finds nothing, which is what makes "no policy = deny" easy to
--       verify (see below).
--
--   authenticated (the /admin dashboard, once a Supabase Auth user is
--   signed in)
--     - SELECT: allowed, unconditionally (`using (true)`) — any signed
--       in user can read the full guest list. There is no per-guest
--       filtering because this is a single-admin table, not multi-tenant.
--     - INSERT / UPDATE / DELETE: no policy exists, so authenticated is
--       also denied on those. Only add a policy later if /admin needs to
--       edit or delete RSVPs — nothing here does that today.
--
-- This keeps the guest list unreadable by anyone who hasn't authenticated
-- through Supabase Auth (the separate /admin login — see middleware.ts),
-- while still letting anonymous guests submit the form.
alter table public.rsvps enable row level security;

create policy "anon_insert_rsvps"
  on public.rsvps
  for insert
  to anon
  with check (true);

create policy "authenticated_select_rsvps"
  on public.rsvps
  for select
  to authenticated
  using (true);
