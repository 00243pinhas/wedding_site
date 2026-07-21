# Graph Report - .  (2026-07-21)

## Corpus Check
- 6 files · ~6,450 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 152 nodes · 196 edges · 13 communities (10 shown, 3 thin omitted)
- Extraction: 92% EXTRACTED · 7% INFERRED · 2% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.8)
- Token cost: 37,343 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Homepage Sections|Homepage Sections]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Runtime Dependencies & Root Layout|Runtime Dependencies & Root Layout]]
- [[_COMMUNITY_Utility Pages (ContactDetailsFAQGallery)|Utility Pages (Contact/Details/FAQ/Gallery)]]
- [[_COMMUNITY_Design System Docs|Design System Docs]]
- [[_COMMUNITY_Supabase & Admin Auth|Supabase & Admin Auth]]
- [[_COMMUNITY_Boilerplate Docs & Icons|Boilerplate Docs & Icons]]
- [[_COMMUNITY_Placeholder Pages (GiftsRSVP)|Placeholder Pages (Gifts/RSVP)]]
- [[_COMMUNITY_Site Chrome (HeaderFooter)|Site Chrome (Header/Footer)]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Reveal()` - 9 edges
3. `Wedding Site Design System (SKILL.md)` - 9 edges
4. `useReducedMotion()` - 7 edges
5. `scripts` - 5 edges
6. `CLAUDE.md — Jerry & Pam Wedding Site Project Instructions` - 5 edges
7. `PageHeader()` - 5 edges
8. `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` - 4 edges
9. `next.svg — Next.js wordmark logo` - 4 edges
10. `Colour Palette & Rules` - 4 edges

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
- **Root Project Documentation Set (AGENTS.md, CLAUDE.md, README.md)** — agents, claude, readme [INFERRED 0.75]

## Communities (13 total, 3 thin omitted)

### Community 0 - "Homepage Sections"
Cohesion: 0.16
Nodes (14): CARDS, DetailsPreview(), GALLERY_IMAGES, GalleryPreview(), Hero(), OurStory(), PhotoMoment(), RsvpInvite() (+6 more)

### Community 1 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 2 - "Dev Dependencies"
Cohesion: 0.11
Nodes (18): devDependencies, eslint, eslint-config-next, @playwright/test, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+10 more)

### Community 3 - "Runtime Dependencies & Root Layout"
Cohesion: 0.12
Nodes (13): nextConfig, dependencies, framer-motion, lenis, next, react, react-dom, @supabase/ssr (+5 more)

### Community 4 - "Utility Pages (Contact/Details/FAQ/Gallery)"
Cohesion: 0.16
Nodes (6): CONTACTS, SCHEDULE_ITEMS, FAQ_ITEMS, GALLERY_PHOTOS, PageHeader(), PageHeaderProps

### Community 5 - "Design System Docs"
Cohesion: 0.24
Nodes (14): CLAUDE.md — Jerry & Pam Wedding Site Project Instructions, Content Placeholder Convention ({{VENUE_ADDRESS}}, {{GIFT_DETAILS}}), Project Facts (couple, guest count, dress code, day-of contacts), Non-negotiables (RLS-first, guest-list privacy, reduced motion, transform/opacity-only animation, mobile-first, no CMS, dependency approval gate), Wedding Site Design System (SKILL.md), Colour Palette & Rules, The Hero Section, Motion System (framer-motion + lenis, reduced-motion, transform/opacity-only, incremental-scroll verification) (+6 more)

### Community 6 - "Supabase & Admin Auth"
Cohesion: 0.25
Nodes (4): AdminPage(), createClient(), Database, config

### Community 7 - "Boilerplate Docs & Icons"
Cohesion: 0.22
Nodes (9): AGENTS.md — Next.js Agent Rules, Tech Stack (Next.js App Router + TS, Tailwind v4, Supabase, framer-motion, lenis, Vercel), file.svg — Next.js default file icon, globe.svg — globe icon, vercel.svg — Vercel triangle logo, window.svg — window icon, README.md — create-next-app default readme, Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx) (+1 more)

### Community 9 - "Site Chrome (Header/Footer)"
Cohesion: 0.38
Nodes (3): SiteFooter(), NAV_LINKS, SiteHeader()

## Ambiguous Edges - Review These
- `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` → `file.svg — Next.js default file icon`  [AMBIGUOUS]
  public/file.svg · relation: conceptually_related_to
- `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` → `globe.svg — globe icon`  [AMBIGUOUS]
  public/globe.svg · relation: conceptually_related_to
- `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` → `window.svg — window icon`  [AMBIGUOUS]
  public/window.svg · relation: conceptually_related_to

## Knowledge Gaps
- **62 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `file.svg — Next.js default file icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `globe.svg — globe icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx)` and `window.svg — window icon`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next.svg — Next.js wordmark logo` connect `Runtime Dependencies & Root Layout` to `Boilerplate Docs & Icons`?**
  _High betweenness centrality (0.211) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies & Root Layout` to `Dev Dependencies`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._