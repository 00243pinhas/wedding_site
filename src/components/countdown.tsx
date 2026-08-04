"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion/constants";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

// Ceremony start — single source of truth for the countdown target.
// TODO: confirm year with client (day/month/time are confirmed; 2026 is
// assumed).
const WEDDING_DATETIME = new Date(2026, 8, 10, 17, 0, 0).getTime();

const POST_WEDDING_LINE =
  "We're married — thank you for celebrating with us.";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const diffMs = WEDDING_DATETIME - Date.now();
  if (diffMs <= 0) return null;

  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / (60 * 60 * 24)),
    hours: Math.floor((totalSeconds / (60 * 60)) % 24),
    minutes: Math.floor((totalSeconds / 60) % 60),
    seconds: totalSeconds % 60,
  };
}

function Digit({ value }: { value: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      key={value}
      suppressHydrationWarning
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: EASE }
      }
      className="inline-block font-display text-4xl tabular-nums text-navy sm:text-5xl"
    >
      {value}
    </motion.span>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <Digit value={String(value).padStart(2, "0")} />
      <span className="mt-2 text-xs tracking-[0.2em] text-navy uppercase">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <section className="bg-ivory pt-10 md:pt-14">
        <p className="mx-auto max-w-[520px] px-4 text-center font-display text-2xl text-navy sm:px-6 sm:text-3xl">
          {POST_WEDDING_LINE}
        </p>
      </section>
    );
  }

  return (
    <section className="bg-ivory pt-10 md:pt-14">
      <div className="mx-auto flex max-w-[520px] items-start justify-center gap-4 px-4 text-center sm:gap-12 sm:px-6">
        <Unit value={timeLeft.days} label="Days" />
        <Unit value={timeLeft.hours} label="Hours" />
        <Unit value={timeLeft.minutes} label="Minutes" />
        <Unit value={timeLeft.seconds} label="Seconds" />
      </div>
    </section>
  );
}
