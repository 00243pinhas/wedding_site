"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/lib/motion/reveal";
import { EASE } from "@/lib/motion/constants";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

const HERO_IMAGE_SRC = "/assets/hero.jpg";

// Stagger step between eyebrow → names → date → button. Four reveals at
// this spacing (0, 1x, 2x, 3x) plus the 0.8s reveal duration land the
// whole sequence at ~1.5s total.
const STAGGER_STEP = 0.25;
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
        <div className="absolute inset-0 bg-navy/42" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-ivory uppercase">
            Together with their families
          </p>
        </Reveal>

        <Reveal delay={STAGGER_STEP} className="mt-6">
          <h1 className="font-display text-6xl text-ivory sm:text-7xl">
            Pam &amp; Jerry
          </h1>
        </Reveal>

        <Reveal delay={STAGGER_STEP * 2} className="mt-6">
          <p className="text-xs tracking-[0.3em] text-ivory uppercase">
            Save The Date
          </p>
          <p className="mt-2 text-sm tracking-[0.2em] text-ivory uppercase">
            10 September
          </p>
        </Reveal>

        <Reveal delay={STAGGER_STEP * 3} className="mt-10">
          <Link
            href="/rsvp"
            className="inline-block border border-ivory px-10 py-3 text-sm tracking-[0.2em] text-ivory uppercase transition-colors duration-[400ms] md:hover:bg-ivory md:hover:text-navy"
          >
            RSVP
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
