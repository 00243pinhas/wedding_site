-- guests: one row per invited party. invite_code is what a guest types at
-- /i/{code}; the server looks it up, sets a signed cookie, and nothing
-- after that first lookup touches this table with the anon key again.
create table if not exists public.guests (
  id              uuid primary key default gen_random_uuid(),
  invite_code     text not null unique,
  full_name       text not null,
  max_party_size  int not null default 1 check (max_party_size between 1 and 10),
  rsvp_status     text not null default 'pending' check (rsvp_status in ('pending', 'attending', 'declined')),
  responded_at    timestamptz,
  created_at      timestamptz not null default now()
);

-- The lookup key on every gate entry.
create index if not exists guests_invite_code_idx on public.guests (invite_code);

-- rsvps: one row per submission, never updated in place. A guest who
-- corrects their response gets a new row, so the change is visible in
-- history instead of silently overwriting the old answer. Admin reads
-- the latest row per guest_id.
create table if not exists public.rsvps (
  id            uuid primary key default gen_random_uuid(),
  guest_id      uuid not null references public.guests(id) on delete cascade,
  attending     boolean not null,
  party_size    int not null check (party_size >= 0),
  dietary_notes text,
  message       text,
  created_at    timestamptz not null default now()
);

create index if not exists rsvps_guest_id_idx on public.rsvps (guest_id);

-- Party-size cap
-- ===============
-- party_size on an rsvp must never exceed the inviting guest's
-- max_party_size. This lives in the database (not only in form
-- validation) because the write path is the service role key, which
-- bypasses RLS entirely — a DB-level check is the only backstop left
-- once RLS is out of the picture.
create or replace function public.check_rsvp_party_size()
returns trigger
language plpgsql
as $$
declare
  cap int;
begin
  select max_party_size into cap
  from public.guests
  where id = new.guest_id;

  if cap is null then
    raise exception 'guest % not found', new.guest_id;
  end if;

  if new.party_size > cap then
    raise exception 'party_size % exceeds guest max_party_size %', new.party_size, cap;
  end if;

  return new;
end;
$$;

create trigger rsvps_party_size_guard
  before insert or update on public.rsvps
  for each row
  execute function public.check_rsvp_party_size();

-- Row Level Security
-- ===================
-- Guest access to these tables never goes through Supabase's public API.
-- The /i/{code} lookup and every RSVP write happen server-side using
-- SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS entirely. Once a guest is
-- let in, proxy.ts checks only a signed cookie on subsequent requests —
-- no DB call at all. So there is nothing for `anon` to legitimately do on
-- either table.
alter table public.guests enable row level security;
alter table public.rsvps enable row level security;

-- No policies for anon on either table. With RLS enabled, the absence of
-- a policy *is* the deny: anon gets zero rows on SELECT and is rejected
-- outright on INSERT/UPDATE/DELETE. Nothing else needs configuring.

-- authenticated: SELECT only, scoped to specific admin emails. `authenticated`
-- means "has any Supabase Auth account" — with public signup disabled this
-- is only the admins we create by hand, but the policy is still scoped
-- defensively rather than trusting the role alone (`using (true)` would
-- grant read access to anyone who ever gets an account).
--
-- TODO: replace with the real admin email(s) before go-live.
create policy "admin_select_guests"
  on public.guests
  for select
  to authenticated
  using (
    (auth.jwt() ->> 'email') in (
      'pinaslok@gmail.com',
      '{{ADMIN_EMAIL_2}}'
    )
  );

create policy "admin_select_rsvps"
  on public.rsvps
  for select
  to authenticated
  using (
    (auth.jwt() ->> 'email') in (
      'pinaslok@gmail.com',
      '{{ADMIN_EMAIL_2}}'
    )
  );
