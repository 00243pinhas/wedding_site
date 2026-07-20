"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Single source of truth for the reduced-motion guard. Route every
 * animation decision through this hook (rather than querying the media
 * feature directly) so "prefers-reduced-motion" disables ALL animation
 * consistently, everywhere, with one implementation to audit.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
