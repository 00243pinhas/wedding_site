import { Fragment } from "react";
import Link from "next/link";
import { Reveal } from "@/lib/motion/reveal";

const CARDS = [
  {
    heading: "The Ceremony",
    body: "The event begins at 5:00 PM. Please arrive before the ceremony time.",
  },
  {
    heading: "The Reception",
    body: "The reception follows immediately at the same venue.",
  },
  {
    heading: "Dress Code",
    body: "Formal evening attire — see full details for guidance.",
  },
];

export function DetailsPreview() {
  return (
    <section className="bg-pink py-14 md:py-20">
      <Reveal className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs tracking-[0.3em] text-navy uppercase">
          The Details
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 text-center md:mt-14 md:grid-cols-3 md:gap-16">
          {CARDS.map((card, index) => (
            <Fragment key={card.heading}>
              {index > 0 && (
                <div className="mx-auto h-px w-10 bg-blue md:hidden" />
              )}
              <div>
                <h3 className="font-display text-2xl text-navy sm:text-3xl">
                  {card.heading}
                </h3>
                <p className="mt-4 leading-[1.7] text-ink">{card.body}</p>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Link
            href="/details"
            className="border-b border-navy pb-0.5 text-xs tracking-[0.3em] text-navy uppercase"
          >
            Full schedule and directions
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
