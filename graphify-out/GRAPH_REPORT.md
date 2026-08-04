# Graph Report - .  (2026-08-03)

## Corpus Check
- 25 files · ~13,992 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 287 nodes · 394 edges · 25 communities (18 shown, 7 thin omitted)
- Extraction: 94% EXTRACTED · 5% INFERRED · 1% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin Dashboard & Supabase Clients|Admin Dashboard & Supabase Clients]]
- [[_COMMUNITY_CLAUDE.md Project Rules|CLAUDE.md Project Rules]]
- [[_COMMUNITY_Guest Auth & Invite Codes|Guest Auth & Invite Codes]]
- [[_COMMUNITY_App Config & Welcome Gate|App Config & Welcome Gate]]
- [[_COMMUNITY_Layout, Hero & Motion System|Layout, Hero & Motion System]]
- [[_COMMUNITY_Package Scripts & Dev Deps|Package Scripts & Dev Deps]]
- [[_COMMUNITY_Homepage Content Sections|Homepage Content Sections]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_RSVP Flow|RSVP Flow]]
- [[_COMMUNITY_Guest Import Script|Guest Import Script]]
- [[_COMMUNITY_Wedding Design Skill Doc|Wedding Design Skill Doc]]
- [[_COMMUNITY_Site Shell (HeaderFooter)|Site Shell (Header/Footer)]]
- [[_COMMUNITY_Details Page & Venue Map|Details Page & Venue Map]]
- [[_COMMUNITY_Owner Code Script|Owner Code Script]]
- [[_COMMUNITY_Seed Script|Seed Script]]
- [[_COMMUNITY_RLS Verify Script|RLS Verify Script]]
- [[_COMMUNITY_Contact Page|Contact Page]]
- [[_COMMUNITY_FAQ Page|FAQ Page]]
- [[_COMMUNITY_Placeholder Section Component|Placeholder Section Component]]
- [[_COMMUNITY_Invite Code Generator Lib|Invite Code Generator Lib]]
- [[_COMMUNITY_Rate Limiting|Rate Limiting]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]

## God Nodes (most connected - your core abstractions)
1. `Jerry & Pam Wedding Site` - 19 edges
2. `compilerOptions` - 16 edges
3. `Wedding Site Design System (SKILL.md)` - 8 edges
4. `useReducedMotion()` - 7 edges
5. `scripts` - 7 edges
6. `GET()` - 7 edges
7. `getGuestSessionFromCookie()` - 7 edges
8. `Reveal()` - 6 edges
9. `submitInviteCode()` - 6 edges
10. `sign()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `file.svg — Next.js default file icon` --conceptually_related_to--> `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)`  [AMBIGUOUS]
  public/file.svg → README.md
- `globe.svg — globe icon` --conceptually_related_to--> `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)`  [AMBIGUOUS]
  public/globe.svg → README.md
- `window.svg — window icon` --conceptually_related_to--> `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)`  [AMBIGUOUS]
  public/window.svg → README.md
- `next.svg — Next.js wordmark logo` --conceptually_related_to--> `Learn More (Next.js docs, Learn Next.js, GitHub repo, Vercel deploy)`  [INFERRED]
  public/next.svg → README.md
- `vercel.svg — Vercel triangle logo` --conceptually_related_to--> `Learn More (Next.js docs, Learn Next.js, GitHub repo, Vercel deploy)`  [INFERRED]
  public/vercel.svg → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Motion system: hero load sequence, motion rules, and signature moment together form the site's single animation vocabulary** — claude_skills_wedding_design_skill_hero, claude_skills_wedding_design_skill_motion, claude_skills_wedding_design_skill_signature_moment [INFERRED 0.75]
- **Colour, typography, and shape rules jointly enforce the editorial "Black Tie Optional" restraint register** — claude_skills_wedding_design_skill_colour_palette, claude_skills_wedding_design_skill_typography, claude_skills_wedding_design_skill_shape [INFERRED 0.75]
- **Wedding Site Technology Stack** — claude_md_nextjs_app_router, claude_md_typescript, claude_md_tailwind_v4_css_first_theme, claude_md_supabase_postgres_auth, claude_md_framer_motion, claude_md_lenis, claude_md_vercel [EXTRACTED 0.90]
- **Guest Data Protection Pattern (RLS, Admin Scoping, Service Role Key)** — claude_md_rls_before_data, claude_md_never_expose_guest_list, claude_md_service_role_key_handling, claude_md_rsvps_table [INFERRED 0.85]
- **Motion & Accessibility Constraints** — claude_md_prefers_reduced_motion_disables_animation, claude_md_animate_only_transform_opacity, claude_md_mobile_first_all_screens [INFERRED 0.75]

## Communities (25 total, 7 thin omitted)

### Community 0 - "Admin Dashboard & Supabase Clients"
Cohesion: 0.13
Nodes (17): csvField(), csvRow(), GET(), HEADER, AdminPage(), AdminDashboard(), AdminDashboardProps, AdminSignIn() (+9 more)

### Community 1 - "CLAUDE.md Project Rules"
Cohesion: 0.09
Nodes (28): Animate Only transform and opacity (Non-Negotiable 4), Ask Before Installing Any Dependency (Non-Negotiable 7), Ceremony: 10 September, 5:00 PM, Content Placeholder Convention ({{VENUE_ADDRESS}}, {{GIFT_DETAILS}}), Never Expose Couple's Phone or Email, Couple: Jerry & Pam, Day-of Contacts: Nancy & Esa, Dress Code: Black Tie Optional (+20 more)

### Community 2 - "Guest Auth & Invite Codes"
Cohesion: 0.18
Nodes (21): Guest Access Mechanism (Per-Guest Invite Link), GET(), notFoundResponse(), InviteCodeResult, submitInviteCode(), cookieOptions(), getSecret(), GuestSession (+13 more)

### Community 3 - "App Config & Welcome Gate"
Cohesion: 0.08
Nodes (20): AGENTS.md — Next.js Agent Rules, nextConfig, dependencies, framer-motion, lenis, next, react, react-dom (+12 more)

### Community 4 - "Layout, Hero & Motion System"
Cohesion: 0.13
Nodes (13): bodySans, cormorant, metadata, GALLERY_PHOTOS, GALLERY_IMAGES, Hero(), PageHeader(), PageHeaderProps (+5 more)

### Community 5 - "Package Scripts & Dev Deps"
Cohesion: 0.09
Nodes (22): devDependencies, eslint, eslint-config-next, @playwright/test, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+14 more)

### Community 6 - "Homepage Content Sections"
Cohesion: 0.14
Nodes (10): Countdown(), getTimeLeft(), TimeLeft, WEDDING_DATETIME, CARDS, DetailsPreview(), PhotoMoment(), RsvpInvite() (+2 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "RSVP Flow"
Cohesion: 0.18
Nodes (12): RsvpInput, RsvpResult, submitRsvp(), loadGuest(), RsvpPage(), Attending, InitialRsvp, optionClass() (+4 more)

### Community 9 - "Guest Import Script"
Cohesion: 0.24
Nodes (10): CSV_PATH, __dirname, FAKE_SEED_NAMES, generateInviteCode(), generateUniqueInviteCode(), main(), OUTPUT_PATH, parseCsv() (+2 more)

### Community 10 - "Wedding Design Skill Doc"
Cohesion: 0.38
Nodes (10): Wedding Site Design System (SKILL.md), Colour Palette & Rules, The Hero Section, Motion System (framer-motion + lenis, reduced-motion, transform/opacity-only, incremental-scroll verification), Photography Guidance (no filters, full-resolution), Section Rhythm (Ivory/Wash/Tint bands, homepage order), Shape Rules (no rounded corners, no shadows), The Signature Moment (SVG line-drawing divider) (+2 more)

### Community 11 - "Site Shell (Header/Footer)"
Cohesion: 0.38
Nodes (3): SiteFooter(), NAV_LINKS, SiteHeader()

### Community 12 - "Details Page & Venue Map"
Cohesion: 0.40
Nodes (3): SCHEDULE_ITEMS, VenueMap(), VenueMapProps

### Community 13 - "Owner Code Script"
Cohesion: 0.47
Nodes (5): generateInviteCode(), generateUniqueInviteCode(), main(), OWNER_ROWS, supabase

### Community 14 - "Seed Script"
Cohesion: 0.40
Nodes (4): FAKE_GUESTS, generateInviteCode(), generateUniqueInviteCode(), supabase

### Community 15 - "RLS Verify Script"
Cohesion: 0.50
Nodes (4): admin, anon, main(), report()

## Ambiguous Edges - Review These
- `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` → `file.svg — Next.js default file icon`  [AMBIGUOUS]
  public/file.svg · relation: conceptually_related_to
- `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` → `globe.svg — globe icon`  [AMBIGUOUS]
  public/globe.svg · relation: conceptually_related_to
- `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` → `window.svg — window icon`  [AMBIGUOUS]
  public/window.svg · relation: conceptually_related_to

## Knowledge Gaps
- **99 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `GALLERY_PHOTOS`, `HEADER` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `file.svg — Next.js default file icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `globe.svg — globe icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `window.svg — window icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next.svg — Next.js wordmark logo` connect `App Config & Welcome Gate` to `Layout, Hero & Motion System`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `dependencies` connect `App Config & Welcome Gate` to `Package Scripts & Dev Deps`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin Dashboard & Supabase Clients` be split into smaller, more focused modules?**
  _Cohesion score 0.1310344827586207 - nodes in this community are weakly interconnected._