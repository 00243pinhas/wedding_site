"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";
import { EASE, DURATION_S, RISE_PX } from "./constants";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to hold before the reveal starts — for staggered sequences. */
  delay?: number;
}

/**
 * Fade + 24px rise on scroll into view, once per element. This is the
 * only place scroll-reveal animation is defined — use it instead of
 * writing whileInView by hand elsewhere.
 *
 * Animates only opacity/transform (never width, height, top, left).
 * If the user prefers reduced motion, children render statically with
 * no animation at all.
 *
 * Always renders the same `motion.div` element (never branches to a
 * plain `div`) and varies only its props on the reduced-motion check.
 * Server-side rendering has no access to the media query, so it always
 * assumes motion is allowed; a client that actually prefers reduced
 * motion corrects this on the very first render. Branching the element
 * *type* on that check would make the SSR and first-client-render
 * output different components in the same slot, which breaks React's
 * hydration reconciliation and can leave content stuck at its initial
 * `opacity: 0` forever — invisible to exactly the users this is meant
 * to protect. Keeping the type constant and only swapping props lets
 * hydration correct the mismatch normally.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: RISE_PX }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: DURATION_S, ease: EASE, delay }
      }
    >
      {children}
    </motion.div>
  );
}
