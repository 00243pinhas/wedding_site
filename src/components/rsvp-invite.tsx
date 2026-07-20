import Link from "next/link";
import { Reveal } from "@/lib/motion/reveal";

// Both lines are pending from the client — {{RSVP_INVITE_LINE}} and
// {{RSVP_DEADLINE_LINE}} stay until real copy is supplied.
export function RsvpInvite() {
  return (
    <section className="bg-ivory py-20 md:py-[120px]">
      <Reveal className="mx-auto max-w-[520px] px-4 text-center sm:px-6">
        <p className="text-xs tracking-[0.3em] text-navy uppercase">
          Join Us
        </p>
        <h2 className="mt-4 font-display text-4xl text-navy sm:text-5xl">
          {"{{RSVP_INVITE_LINE}}"}
        </h2>
        <p className="mt-6 leading-[1.7] text-ink">
          {"{{RSVP_DEADLINE_LINE}}"}
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
