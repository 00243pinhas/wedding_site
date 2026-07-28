# Graph Report - .  (2026-07-28)

## Corpus Check
- 16 files · ~9,970 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 221 nodes · 305 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 93% EXTRACTED · 6% INFERRED · 1% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.79)
- Token cost: 39,222 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Guest Access Gate + RSVP Flow|Guest Access Gate + RSVP Flow]]
- [[_COMMUNITY_Homepage Sections|Homepage Sections]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Wedding Facts (CLAUDE.md)|Wedding Facts (CLAUDE.md)]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Utility Pages (contactdetailsfaqgallery)|Utility Pages (contact/details/faq/gallery)]]
- [[_COMMUNITY_Wedding Design System|Wedding Design System]]
- [[_COMMUNITY_Admin + Supabase Clients|Admin + Supabase Clients]]
- [[_COMMUNITY_Tech Stack (CLAUDE.md)|Tech Stack (CLAUDE.md)]]
- [[_COMMUNITY_Site Chrome (HeaderFooterLayout)|Site Chrome (Header/Footer/Layout)]]
- [[_COMMUNITY_Guest Seed Script|Guest Seed Script]]
- [[_COMMUNITY_Gifts Page|Gifts Page]]
- [[_COMMUNITY_RLS Verify Script|RLS Verify Script]]
- [[_COMMUNITY_Invite Code Generator|Invite Code Generator]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]

## God Nodes (most connected - your core abstractions)
1. `Jerry & Pam Wedding Site` - 19 edges
2. `compilerOptions` - 16 edges
3. `Reveal()` - 9 edges
4. `Wedding Site Design System (SKILL.md)` - 8 edges
5. `useReducedMotion()` - 7 edges
6. `scripts` - 7 edges
7. `createAdminClient()` - 7 edges
8. `GET()` - 6 edges
9. `verifyGuestSessionValue()` - 6 edges
10. `getGuestIdFromCookie()` - 6 edges

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
- **Wedding Site Technology Stack** — claude_md_nextjs_app_router, claude_md_typescript, claude_md_tailwind_v4_css_first_theme, claude_md_supabase_postgres_auth, claude_md_framer_motion, claude_md_lenis, claude_md_vercel [EXTRACTED 0.90]
- **Guest Data Protection Pattern (RLS, Admin Scoping, Service Role Key)** — claude_md_rls_before_data, claude_md_never_expose_guest_list, claude_md_service_role_key_handling, claude_md_rsvps_table [INFERRED 0.85]
- **Motion & Accessibility Constraints** — claude_md_prefers_reduced_motion_disables_animation, claude_md_animate_only_transform_opacity, claude_md_mobile_first_all_screens [INFERRED 0.75]
- **Motion system: hero load sequence, motion rules, and signature moment together form the site's single animation vocabulary** — claude_skills_wedding_design_skill_hero, claude_skills_wedding_design_skill_motion, claude_skills_wedding_design_skill_signature_moment [INFERRED 0.75]
- **Colour, typography, and shape rules jointly enforce the editorial "Black Tie Optional" restraint register** — claude_skills_wedding_design_skill_colour_palette, claude_skills_wedding_design_skill_typography, claude_skills_wedding_design_skill_shape [INFERRED 0.75]

## Communities (18 total, 4 thin omitted)

### Community 0 - "Guest Access Gate + RSVP Flow"
Cohesion: 0.12
Nodes (24): Guest Access Mechanism (Per-Guest Invite Link), GET(), notFoundResponse(), RsvpInput, RsvpResult, submitRsvp(), loadGuest(), RsvpPage() (+16 more)

### Community 1 - "Homepage Sections"
Cohesion: 0.13
Nodes (17): bodySans, cormorant, metadata, CARDS, DetailsPreview(), GALLERY_IMAGES, GalleryPreview(), Hero() (+9 more)

### Community 2 - "Runtime Dependencies"
Cohesion: 0.09
Nodes (19): AGENTS.md — Next.js Agent Rules, nextConfig, dependencies, framer-motion, lenis, next, react, react-dom (+11 more)

### Community 3 - "Wedding Facts (CLAUDE.md)"
Cohesion: 0.13
Nodes (21): Animate Only transform and opacity (Non-Negotiable 4), Ask Before Installing Any Dependency (Non-Negotiable 7), Ceremony: 10 September, 5:00 PM, Content Placeholder Convention ({{VENUE_ADDRESS}}, {{GIFT_DETAILS}}), Never Expose Couple's Phone or Email, Couple: Jerry & Pam, Day-of Contacts: Nancy & Esa, Dress Code: Black Tie Optional (+13 more)

### Community 4 - "Dev Dependencies"
Cohesion: 0.10
Nodes (20): devDependencies, eslint, eslint-config-next, @playwright/test, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+12 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Utility Pages (contact/details/faq/gallery)"
Cohesion: 0.16
Nodes (6): CONTACTS, SCHEDULE_ITEMS, FAQ_ITEMS, GALLERY_PHOTOS, PageHeader(), PageHeaderProps

### Community 7 - "Wedding Design System"
Cohesion: 0.38
Nodes (10): Wedding Site Design System (SKILL.md), Colour Palette & Rules, The Hero Section, Motion System (framer-motion + lenis, reduced-motion, transform/opacity-only, incremental-scroll verification), Photography Guidance (no filters, full-resolution), Section Rhythm (Ivory/Wash/Tint bands, homepage order), Shape Rules (no rounded corners, no shadows), The Signature Moment (SVG line-drawing divider) (+2 more)

### Community 8 - "Admin + Supabase Clients"
Cohesion: 0.39
Nodes (3): AdminPage(), createClient(), Database

### Community 9 - "Tech Stack (CLAUDE.md)"
Cohesion: 0.29
Nodes (7): framer-motion, lenis, Next.js (App Router), Supabase (Postgres + Auth), Tailwind v4 (CSS-first @theme, no tailwind.config.js), TypeScript, Vercel

### Community 10 - "Site Chrome (Header/Footer/Layout)"
Cohesion: 0.38
Nodes (3): SiteFooter(), NAV_LINKS, SiteHeader()

### Community 11 - "Guest Seed Script"
Cohesion: 0.40
Nodes (4): FAKE_GUESTS, generateInviteCode(), generateUniqueInviteCode(), supabase

### Community 13 - "RLS Verify Script"
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
- **81 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `cormorant`, `bodySans` (+76 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `file.svg — Next.js default file icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `globe.svg — globe icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `window.svg — window icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next.svg — Next.js wordmark logo` connect `Runtime Dependencies` to `Homepage Sections`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Dev Dependencies`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _83 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Guest Access Gate + RSVP Flow` be split into smaller, more focused modules?**
  _Cohesion score 0.12298387096774194 - nodes in this community are weakly interconnected._