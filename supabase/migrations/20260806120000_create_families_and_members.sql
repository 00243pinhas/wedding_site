-- families: one row per invited party under the new one-code-per-family
-- model. A family has ONE invite_code (typed at /i/{code} in a later
-- step) and a family name. An individual guest is just a family with a
-- single member. This migration only introduces the new tables — it does
-- not touch or migrate the existing guests/rsvps tables. That cutover is
-- a separate later step.
create table if not exists public.families (
  id             uuid primary key default gen_random_uuid(),
  family_name    text not null,
  invite_code    text not null unique,
  created_at     timestamptz not null default now()
);

-- The lookup key on every gate entry, same role invite_code plays on guests.
create index if not exists families_invite_code_idx on public.families (invite_code);

-- members: one row per person within a family. attending is NULL until
-- someone responds for that person — the RSVP will let whoever opens the
-- code tick which members are attending, and the headcount later counts
-- confirmed members (individuals), not families.
create table if not exists public.members (
  id             uuid primary key default gen_random_uuid(),
  family_id      uuid not null references public.families(id) on delete cascade,
  full_name      text not null,
  attending      boolean,
  responded_at   timestamptz,
  created_at     timestamptz not null default now()
);

create index if not exists members_family_id_idx on public.members (family_id);

-- Row Level Security
-- ===================
-- Same discipline as guests/rsvps: guest-facing reads and writes to these
-- tables happen server-side via SUPABASE_SERVICE_ROLE_KEY, which bypasses
-- RLS entirely. There is nothing for `anon` to legitimately do on either
-- table.
alter table public.families enable row level security;
alter table public.members enable row level security;

-- No policies for anon on either table. With RLS enabled, the absence of
-- a policy *is* the deny: anon gets zero rows on SELECT and is rejected
-- outright on INSERT/UPDATE/DELETE. Nothing else needs configuring.

-- authenticated: SELECT only, scoped to the SAME admin emails as
-- admin_select_guests / admin_select_rsvps (see
-- 20260720120000_create_guests_and_rsvps.sql). Reusing the exact
-- condition keeps one admin list instead of two that can drift apart.
create policy "admin_select_families"
  on public.families
  for select
  to authenticated
  using (
    (auth.jwt() ->> 'email') in (
      'pinaslok@gmail.com',
      '{{ADMIN_EMAIL_2}}'
    )
  );

create policy "admin_select_members"
  on public.members
  for select
  to authenticated
  using (
    (auth.jwt() ->> 'email') in (
      'pinaslok@gmail.com',
      '{{ADMIN_EMAIL_2}}'
    )
  );
