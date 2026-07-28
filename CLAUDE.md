# Jerry & Pam — wedding site

Private wedding website. One developer, hard deadline. Ceremony **10 September, 5:00 PM**.

## Facts

- Couple: Jerry & Pam
- ~120 guests, English only
- Dress code: Black Tie Optional
- Menu is **display only** — guests do not choose a meal. Never build meal-choice UI.
- Day-of contacts: Nancy & Esa. **Never** put the couple's phone or email on the site.
- Gift content and venue address: pending from the client. Use clearly-marked placeholders.
- Guest access mechanism: **per-guest invite link**. `/i/[code]` looks up the code against `guests`, sets a signed `guest_session` cookie (`src/lib/auth/guest-session.ts`), and `src/middleware.ts` gates every other route on that cookie, redirecting to `/welcome-gate` when it's missing or invalid. `/admin` and `/i/[code]` itself stay outside the gate — see the exclusion list in `middleware.ts`.

## Stack

Next.js (App Router) + TypeScript · Tailwind v4 (CSS-first `@theme`, no `tailwind.config.js`) · Supabase (Postgres + Auth) · framer-motion + lenis · Vercel.

## Non-negotiables

1. **RLS before data.** Nothing writes to `rsvps` until policies are verified against a real database. `authenticated` is not `admin` — scope admin reads to specific emails, and keep public signup disabled in Supabase.
2. **Never expose the guest list.** No route, API handler, or client component may read `rsvps` without an authenticated admin session.
3. **`prefers-reduced-motion` disables all animation.** No exceptions.
4. **Animate only `transform` and `opacity`.** Never width, height, top, left, or any layout property.
5. **Mobile first, all screens supported.** Nearly every guest opens this on a phone.
6. **No CMS, no admin content editing.** Content lives in code.
7. **Ask before installing any dependency** not already in `package.json`.
8. **The service role key bypasses RLS entirely.** It lives in `SUPABASE_SERVICE_ROLE_KEY` (never `NEXT_PUBLIC_`), is used only in server-side code, and must never be imported into a client component or anything that reaches the browser. Any file importing it must not carry `"use client"`.

## Design

See `.claude/skills/wedding-design/SKILL.md`. Read it before writing any component or style.

## Content placeholders

When content is missing, use an obvious marker — `{{VENUE_ADDRESS}}`, `{{GIFT_DETAILS}}`. Never invent wedding details, names, times, or copy. If a fact is unknown, leave the marker and say so.
