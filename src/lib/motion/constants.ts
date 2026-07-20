// Shared motion values — the one easing curve, duration, and rise
// distance for all animation on this site. No "use client" here so
// non-client components (e.g. gallery-preview.tsx) can import the CSS
// form without crossing a client boundary at request time.

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_CSS = `cubic-bezier(${EASE.join(",")})`;
export const DURATION_S = 0.8;
export const RISE_PX = 24;
