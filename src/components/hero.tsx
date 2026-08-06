"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/lib/motion/reveal";
import { EASE } from "@/lib/motion/constants";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

const HERO_IMAGE_SRC = "/assets/hero.jpg";

const IMAGE_SCALE_DURATION = 1.6;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex h-[85vh] items-center justify-center overflow-hidden md:h-[90vh]">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={prefersReducedMotion ? false : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: IMAGE_SCALE_DURATION, ease: EASE }}
        >
          <Image
            src={HERO_IMAGE_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_20%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-navy/46" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        <Reveal>
          {/* Capped at text-7xl (not sm:text-8xl): at the site-wide 1.25x
              type-scale bump, 8xl no longer fits "Jerry & Pam" on one
              line in this max-w-2xl container at desktop widths. */}
          <h1 className="font-display text-7xl text-ivory">
            Jerry &amp; Pam
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
