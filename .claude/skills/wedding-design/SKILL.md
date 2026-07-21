---
name: wedding-design
description: The visual system for the Jerry & Pam wedding site — palette, typography, section rhythm, hero, and motion. Read this before writing any component, page, or style rule.
---

# Wedding site design system

The register is **Black Tie Optional**: restrained, editorial, photography-led. Warm but formal. Every decision below exists to keep the site from drifting into "cute wedding template."

The test for any choice: *would this look at home on an engraved invitation?* If it needs a shadow, a gradient, or a rounded corner to look good, it is wrong.

## Colour

| Token | Hex | Role |
|---|---|---|
| `ivory` | `#FDFBF8` | The page. The colour you see most. |
| `navy` | `#4A668D` | Headings, nav, footer, the photo wash |
| `blue` | `#9DB2CF` | Hairline borders, dividers, section tints |
| `blush` | `#FFB7C8` | Call-to-action fills — **on ivory only** |
| `pink` | `#FFD8E1` | Soft background washes on tint bands |
| `ink` | `#1F2937` | Body copy |

Roughly **70% ivory / 20% blue+navy / 10% pink+blush**.

### Colour rules

- **Never set body copy in navy.** It fails contrast at body size. Navy for headings, `ink` for paragraphs.
- **Blush never appears on navy or on photography.** On dark grounds it goes muddy and reads cheap. On photo washes, use an outlined ivory treatment instead.
- **On ivory, blush fills. On photography, ivory outlines.** That is the whole rule.
- Pink tint bands only work adjacent to photography. Never stack two tint bands.
- No colour outside this table. No greys other than `ink`.

## Typography

- Display / headings: **Cormorant Garamond**, loaded via `next/font`. Navy.
- Body: a clean readable face (Inter). `ink`. `line-height: 1.7`.
- Small caps + wide letterspacing (`0.16em`–`0.3em`) for eyebrow labels, nav, and dates. This is where the formality lives.
- Sentence case in body copy. Uppercase reserved for eyebrows and nav.

## Shape

- **No rounded corners.** Buttons, cards, images — all square. Rounding is the single fastest way to make this look like a template.
- **No drop shadows, no gradients, no glow.** Separation comes from colour bands and whitespace.
- Borders are hairlines: `1px solid` in `blue`, never heavier.

## The hero

- Full-bleed photograph, `85vh` on mobile so the next section peeks and invites the scroll.
- Navy overlay at ~42% opacity across the image. This guarantees white type is legible over any photo the client supplies.
- Stacked, centred: eyebrow line (`TOGETHER WITH THEIR FAMILIES`) → names in display serif → date and time in letterspaced small caps → RSVP.
- RSVP is a **thin outlined ivory button**: `1px` ivory border, ivory text, transparent fill, wide letterspacing. On desktop hover, fill with ivory and flip text to navy over 0.4s.
- Load sequence: eyebrow → names → date → button, staggered over ~1.5s total. Across the whole sequence the photograph scales 1.05 → 1.0. That slow scale is what makes it feel expensive — do not speed it up.
- The hero photograph must be portrait or square. Never crop a landscape image into it.

## Section rhythm

Three band types. **Never place two of the same band back to back.**

| Band | Treatment | Purpose |
|---|---|---|
| Ivory | `ivory` background, generous padding | Reading |
| Wash | Full-bleed photo + navy overlay, white type | Emotional beats |
| Tint | `pink` background | Practical clusters set apart |

Homepage order:

1. Hero — wash
2. Welcome line — ivory, centred, short
3. Our story — ivory, asymmetric (image one side, text the other)
4. Gallery preview — full-bleed photos edge to edge, no padding
5. The details — tint, three cards (ceremony / reception / dress code)
6. Mid-page moment — wash, one photo, one line of type, no information
7. RSVP — ivory, centred, blush button

**Only two washes on the entire homepage** — the hero and the mid-page moment. A third and neither is special.

Vertical padding is the rhythm instrument: ~120px desktop / ~80px mobile on ivory bands, tighter on tint.

## Motion

Two libraries only: `framer-motion` and `lenis`. Do not add others.

- `<Reveal>` is the workhorse: fade + 24px rise, 0.8s, soft ease, `viewport={{ once: true }}`. Use it for section entrances. Do not hand-roll animation per component.
- Lenis provides smooth scroll app-wide. Under reduced motion, Lenis is not instantiated at all.
- **`prefers-reduced-motion` disables everything.** Content renders static and complete. Non-negotiable.
- **Only `transform` and `opacity`.** Anything else drops frames on a three-year-old phone.
- **No infinite loops** anywhere except the countdown.
- Slow and physical. Never bouncy, never springy, never sparkly. If it draws attention to itself as an animation, it is wrong.
- On mobile: shorter travel distances, and hover effects simply do not exist.
- **Verifying scroll-reveal content:** `whileInView` does not fire on an instant viewport
  resize, so Playwright fullPage captures render revealed sections as blank. Always
  verify with incremental scroll, never fullPage.

### The signature moment

One deliberate flourish, not ten: a thin navy SVG line-drawing (botanical or ring motif) that draws itself once as the "Our Story" divider scrolls into view. Path animation on `stroke-dashoffset`. It happens once. It does not repeat.

## Structure

Long-scrolling homepage carries the emotional content. Practical content lives on its own fast, findable pages — `/details`, `/gallery`, `/faq`, `/gifts`, `/contact`. A guest looking for the address at 4pm on the wedding day must not have to scroll.

## Photography

The palette is quiet on purpose; the photographs do the emotional work. Assume full-resolution images. Apply no filters — if supplied images are visually mismatched, raise it rather than silently correcting one of them.
