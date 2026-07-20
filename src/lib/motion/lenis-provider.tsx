"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Smooth-scroll provider. Wraps the app once in the root layout — do not
 * instantiate Lenis anywhere else.
 *
 * When the user prefers reduced motion, Lenis is never created and the
 * browser's native (instant) scrolling takes over untouched.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
