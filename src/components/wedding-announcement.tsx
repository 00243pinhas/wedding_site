import Link from "next/link";
import { Reveal } from "@/lib/motion/reveal";

export function WeddingAnnouncement() {
  return (
    <section className="bg-ivory pt-10 pb-0 md:pt-16">
      <Reveal className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-display text-5xl text-navy sm:text-6xl">
          We&apos;re Getting Married
        </h2>
        <p className="mt-4 text-sm tracking-[0.3em] text-navy uppercase">
          Save the Date
        </p>
        <Link
          href="/rsvp"
          className="mt-10 inline-block bg-blush px-10 py-4 text-sm tracking-[0.2em] text-navy uppercase transition-colors duration-[400ms] md:hover:bg-[#e5a4b4]"
        >
          RSVP
        </Link>
      </Reveal>
    </section>
  );
}
