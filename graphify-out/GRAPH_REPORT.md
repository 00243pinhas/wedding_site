# Graph Report - .  (2026-08-19)

## Corpus Check
- Large corpus: 98 files · ~831,104 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 413 nodes · 585 edges · 37 communities (31 shown, 6 thin omitted)
- Extraction: 89% EXTRACTED · 10% INFERRED · 1% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.78)
- Token cost: 828,081 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Homepage Sections & Motion|Homepage Sections & Motion]]
- [[_COMMUNITY_Guest Invite & Session Auth|Guest Invite & Session Auth]]
- [[_COMMUNITY_Package Dependencies & Scripts|Package Dependencies & Scripts]]
- [[_COMMUNITY_Admin Dashboard & Supabase Clients|Admin Dashboard & Supabase Clients]]
- [[_COMMUNITY_Wedding Design System Doc|Wedding Design System Doc]]
- [[_COMMUNITY_Project Rules (CLAUDE.md)|Project Rules (CLAUDE.md)]]
- [[_COMMUNITY_Details, FAQ & Gifts Pages|Details, FAQ & Gifts Pages]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Hero & Gallery Images|Hero & Gallery Images]]
- [[_COMMUNITY_RSVP Form & Actions|RSVP Form & Actions]]
- [[_COMMUNITY_Import Guests Script|Import Guests Script]]
- [[_COMMUNITY_Couple Photo Gallery (Set 2)|Couple Photo Gallery (Set 2)]]
- [[_COMMUNITY_Add New Guests Script|Add New Guests Script]]
- [[_COMMUNITY_Import Families Script|Import Families Script]]
- [[_COMMUNITY_Site Header & Footer|Site Header & Footer]]
- [[_COMMUNITY_Add Owner Codes Script|Add Owner Codes Script]]
- [[_COMMUNITY_Seed Guests Script|Seed Guests Script]]
- [[_COMMUNITY_Seed Families Script|Seed Families Script]]
- [[_COMMUNITY_Love Letter & Gallery Photo|Love Letter & Gallery Photo]]
- [[_COMMUNITY_Verify RLS Script|Verify RLS Script]]
- [[_COMMUNITY_Verify Families RLS Script|Verify Families RLS Script]]
- [[_COMMUNITY_Repo Meta Docs|Repo Meta Docs]]
- [[_COMMUNITY_Nav Monogram Branding|Nav Monogram Branding]]
- [[_COMMUNITY_App Favicon Branding|App Favicon Branding]]
- [[_COMMUNITY_Jerry's Childhood Photo|Jerry's Childhood Photo]]
- [[_COMMUNITY_JP Monogram Asset (Variant 1)|JP Monogram Asset (Variant 1)]]
- [[_COMMUNITY_Gallery Photo 04|Gallery Photo 04]]
- [[_COMMUNITY_Gift Section Image|Gift Section Image]]
- [[_COMMUNITY_JP Monogram (Main)|JP Monogram (Main)]]
- [[_COMMUNITY_Pam's Childhood Photo|Pam's Childhood Photo]]
- [[_COMMUNITY_Placeholder Section Component|Placeholder Section Component]]
- [[_COMMUNITY_Invite Code Generator Lib|Invite Code Generator Lib]]
- [[_COMMUNITY_Reset RSVPs Script|Reset RSVPs Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]

## God Nodes (most connected - your core abstractions)
1. `Reveal()` - 21 edges
2. `Jerry & Pam Wedding Site` - 19 edges
3. `compilerOptions` - 16 edges
4. `scripts` - 11 edges
5. `Wedding Site Design System` - 11 edges
6. `useReducedMotion()` - 9 edges
7. `verifyInviteCode()` - 8 edges
8. `Hero Section Design` - 8 edges
9. `GET()` - 7 edges
10. `getGuestSessionFromCookie()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Guest Access Mechanism (Per-Guest Invite Link)` --implements--> `GET()`  [EXTRACTED]
  CLAUDE.md → src/app/i/[code]/route.ts
- `Guest Access Mechanism (Per-Guest Invite Link)` --implements--> `middleware()`  [EXTRACTED]
  CLAUDE.md → src/middleware.ts
- `AGENTS.md — Next.js Agent Rules` --conceptually_related_to--> `README.md — create-next-app default readme`  [INFERRED]
  AGENTS.md → README.md
- `Gallery Photo 09 — Couple Walking City Street` --references--> `Jerry & Pam (Couple)`  [AMBIGUOUS]
  public/assets/gallery-09.jpg → public/assets/forever-starts-here.jpg
- `Gallery Photo: Couple Embracing on City Street` --references--> `Jerry & Pam (Couple)`  [INFERRED]
  public/assets/gallery-07.jpg → public/assets/gallery-03.jpg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Wedding Site Technology Stack** — claude_md_nextjs_app_router, claude_md_typescript, claude_md_tailwind_v4_css_first_theme, claude_md_supabase_postgres_auth, claude_md_framer_motion, claude_md_lenis, claude_md_vercel [EXTRACTED 0.90]
- **Guest Data Protection Pattern (RLS, Admin Scoping, Service Role Key)** — claude_md_rls_before_data, claude_md_never_expose_guest_list, claude_md_service_role_key_handling, claude_md_rsvps_table [INFERRED 0.85]
- **Motion & Accessibility Constraints** — claude_md_prefers_reduced_motion_disables_animation, claude_md_animate_only_transform_opacity, claude_md_mobile_first_all_screens [INFERRED 0.75]
- **Wedding Site Colour Palette** — _claude_skills_wedding_design_skill_ivory, _claude_skills_wedding_design_skill_navy, _claude_skills_wedding_design_skill_blue, _claude_skills_wedding_design_skill_blush, _claude_skills_wedding_design_skill_pink, _claude_skills_wedding_design_skill_ink [EXTRACTED 1.00]
- **Homepage Band/Section Flow** — _claude_skills_wedding_design_skill_hero_section, _claude_skills_wedding_design_skill_ivory_band, _claude_skills_wedding_design_skill_wash_band, _claude_skills_wedding_design_skill_tint_band, _claude_skills_wedding_design_skill_homepage_order [EXTRACTED 1.00]
- **Motion System Components** — _claude_skills_wedding_design_skill_framer_motion, _claude_skills_wedding_design_skill_lenis, _claude_skills_wedding_design_skill_reveal_component, _claude_skills_wedding_design_skill_prefers_reduced_motion_rule, _claude_skills_wedding_design_skill_signature_moment [EXTRACTED 1.00]

## Communities (37 total, 6 thin omitted)

### Community 0 - "Homepage Sections & Motion"
Cohesion: 0.07
Nodes (28): cormorant, dellaRespira, metadata, CONTACTS, GALLERY_PHOTOS, Countdown(), Digit(), TimeLeft (+20 more)

### Community 1 - "Guest Invite & Session Auth"
Cohesion: 0.12
Nodes (25): Guest Access Mechanism (Per-Guest Invite Link), GET(), notFoundResponse(), InviteCodeResult, submitInviteCode(), metadata, InviteCodeForm(), cookieOptions() (+17 more)

### Community 2 - "Package Dependencies & Scripts"
Cohesion: 0.06
Nodes (34): dependencies, framer-motion, lenis, next, react, react-dom, @supabase/ssr, @supabase/supabase-js (+26 more)

### Community 3 - "Admin Dashboard & Supabase Clients"
Cohesion: 0.13
Nodes (18): attendingLabel(), csvField(), csvRow(), GET(), HEADER, AdminPage(), AdminDashboard(), AdminDashboardProps (+10 more)

### Community 4 - "Wedding Design System Doc"
Cohesion: 0.11
Nodes (29): Black Tie Optional Register, Blue (#9DB2CF), Blush (#FFB7C8), Colour Usage Rules, Cormorant Garamond (body font), Della Respira (display font), Small Caps Eyebrow Labels, framer-motion library (+21 more)

### Community 5 - "Project Rules (CLAUDE.md)"
Cohesion: 0.09
Nodes (28): Animate Only transform and opacity (Non-Negotiable 4), Ask Before Installing Any Dependency (Non-Negotiable 7), Ceremony: 10 September, 5:00 PM, Content Placeholder Convention ({{VENUE_ADDRESS}}, {{GIFT_DETAILS}}), Never Expose Couple's Phone or Email, Couple: Jerry & Pam, Day-of Contacts: Nancy & Esa, Dress Code: Black Tie Optional (+20 more)

### Community 6 - "Details, FAQ & Gifts Pages"
Cohesion: 0.12
Nodes (11): Black Tie Optional Dress Code, Dress Code Reference — Women's Formal Gowns, Dress Code Reference: Groom / Groomsmen (Black Tie Optional), SCHEDULE_ITEMS, FAQ_ITEMS, JERRY_ACCOUNT, PAM_ACCOUNT, PageHeader() (+3 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Hero & Gallery Images"
Cohesion: 0.13
Nodes (19): Jerry & Pam (Couple), Engagement / Couple Portrait Photography, "Forever Starts Here" Tagline, Wedding Site Gallery Preview Section, Wedding Site Photo Gallery Section, Site Hero Section, Jerry & Pam (Couple), Site Photo Gallery Section (+11 more)

### Community 9 - "RSVP Form & Actions"
Cohesion: 0.22
Nodes (12): MemberResponseInput, RsvpInput, RsvpResult, submitRsvp(), loadFamily(), RsvpPage(), Member, RsvpForm() (+4 more)

### Community 10 - "Import Guests Script"
Cohesion: 0.24
Nodes (10): CSV_PATH, __dirname, FAKE_SEED_NAMES, generateInviteCode(), generateUniqueInviteCode(), main(), OUTPUT_PATH, parseCsv() (+2 more)

### Community 11 - "Couple Photo Gallery (Set 2)"
Cohesion: 0.20
Nodes (10): "Graceful @60" Birthday Celebration Theme, Jerry & Pam (Couple), Gallery Photo: Couple on Catamaran (White Outfits), Gallery Photo 05 (Couple on Boat), Gallery Photo 06 (Couple, "Graceful @60" Shirts, Scenic Overlook), Gallery Photo 08 — Couple Walking in City Plaza, Turkish Urban Setting (Modern Business District), Wedding Site Gallery Section (+2 more)

### Community 12 - "Add New Guests Script"
Cohesion: 0.24
Nodes (9): __dirname, generateInviteCode(), generateUniqueInviteCode(), main(), NEW_FAMILIES, NEW_INDIVIDUALS, OUTPUT_PATH, supabase (+1 more)

### Community 13 - "Import Families Script"
Cohesion: 0.27
Nodes (9): CSV_PATH, __dirname, FAKE_FAMILY_NAMES, generateInviteCode(), generateUniqueInviteCode(), main(), OUTPUT_PATH, parseCsv() (+1 more)

### Community 14 - "Site Header & Footer"
Cohesion: 0.38
Nodes (3): SiteFooter(), NAV_LINKS, SiteHeader()

### Community 15 - "Add Owner Codes Script"
Cohesion: 0.47
Nodes (5): generateInviteCode(), generateUniqueInviteCode(), main(), OWNER_ROWS, supabase

### Community 16 - "Seed Guests Script"
Cohesion: 0.40
Nodes (4): FAKE_GUESTS, generateInviteCode(), generateUniqueInviteCode(), supabase

### Community 17 - "Seed Families Script"
Cohesion: 0.47
Nodes (5): FAKE_FAMILIES, generateInviteCode(), generateUniqueInviteCode(), main(), supabase

### Community 18 - "Love Letter & Gallery Photo"
Cohesion: 0.40
Nodes (5): Jerry & Pam (Couple), Love Letter Site Section, Wedding Site Photo Gallery Section, Gallery Photo 01 (Couple Portrait), Love Letter Couple Photo

### Community 19 - "Verify RLS Script"
Cohesion: 0.50
Nodes (4): admin, anon, main(), report()

### Community 20 - "Verify Families RLS Script"
Cohesion: 0.50
Nodes (4): admin, anon, main(), report()

### Community 21 - "Repo Meta Docs"
Cohesion: 0.50
Nodes (4): AGENTS.md — Next.js Agent Rules, README.md — create-next-app default readme, Getting Started (npm/yarn/pnpm/bun dev, edit app/page.tsx), Learn More (Next.js docs, Learn Next.js, GitHub repo, Vercel deploy)

### Community 22 - "Nav Monogram Branding"
Cohesion: 0.50
Nodes (4): Couple Initials Monogram (J + P), Site Navigation Branding Mark, Watercolor Blue Palette Motif, JP Monogram (Nav)

### Community 23 - "App Favicon Branding"
Cohesion: 0.67
Nodes (3): Jerry & Pam Monogram Branding, Wedding Site Design Palette (Watercolor Blue), App Icon (JP Monogram Favicon)

### Community 24 - "Jerry's Childhood Photo"
Cohesion: 0.67
Nodes (3): Our Story Section, Jerry (Groom), Jerry Childhood Photo

### Community 25 - "JP Monogram Asset (Variant 1)"
Cohesion: 0.67
Nodes (3): Wedding Site Visual Design System, Jerry & Pam (Couple), JP Monogram (Watercolor Blue)

### Community 26 - "Gallery Photo 04"
Cohesion: 0.67
Nodes (3): Gallery Photo 04 (Couple on Sailboat), Site Photo Gallery Section, Jerry & Pam (the couple)

### Community 27 - "Gift Section Image"
Cohesion: 0.67
Nodes (3): {{GIFT_DETAILS}} Content Placeholder, Gift.png (Gift Box Image Asset), Wedding Site Gift Section (registry/gift-details UI)

### Community 28 - "JP Monogram (Main)"
Cohesion: 0.67
Nodes (3): JP Monogram Logo, Jerry & Pam Couple Initials, Wedding Site Branding Mark

### Community 29 - "Pam's Childhood Photo"
Cohesion: 0.67
Nodes (3): Pam Childhood Photo, Our Story Section, Pam (Bride)

## Ambiguous Edges - Review These
- `Jerry & Pam (Couple)` → `Gallery Photo 09 — Couple Walking City Street`  [AMBIGUOUS]
  public/assets/gallery-09.jpg · relation: references
- `Gallery Photo 01 (Couple Portrait)` → `Jerry & Pam (Couple)`  [AMBIGUOUS]
  public/assets/gallery-01.jpg · relation: conceptually_related_to
- `Gallery Photo 03 (Couple Walking, Urban Plaza)` → `Jerry & Pam (Couple)`  [AMBIGUOUS]
  public/assets/gallery-03.jpg · relation: references
- `Jerry & Pam (Couple)` → `Gallery Preview 1 (Couple Laughing on City Street)`  [AMBIGUOUS]
  public/assets/gallery-preview-1.jpg · relation: conceptually_related_to
- `Gallery Photo 08 — Couple Walking in City Plaza` → `Turkish Urban Setting (Modern Business District)`  [AMBIGUOUS]
  public/assets/gallery-08.jpg · relation: conceptually_related_to

## Knowledge Gaps
- **153 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+148 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Jerry & Pam (Couple)` and `Gallery Photo 09 — Couple Walking City Street`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Gallery Photo 01 (Couple Portrait)` and `Jerry & Pam (Couple)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Gallery Photo 03 (Couple Walking, Urban Plaza)` and `Jerry & Pam (Couple)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Jerry & Pam (Couple)` and `Gallery Preview 1 (Couple Laughing on City Street)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Gallery Photo 08 — Couple Walking in City Plaza` and `Turkish Urban Setting (Modern Business District)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Guest Access Mechanism (Per-Guest Invite Link)` connect `Guest Invite & Session Auth` to `Project Rules (CLAUDE.md)`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `Jerry & Pam Wedding Site` connect `Project Rules (CLAUDE.md)` to `Guest Invite & Session Auth`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._