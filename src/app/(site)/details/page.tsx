import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { VenueMap } from "@/components/venue-map";
import { Reveal } from "@/lib/motion/reveal";

// Ceremony time is confirmed (see CLAUDE.md). Ceremony and reception are
// the same venue, reception immediately following — venue name and
// address are still pending from the client.
const CEREMONY_TIME = "5:00 PM";

// venue name pending from client
const VENUE_NAME = "{{VENUE_NAME}}";
const VENUE_ADDRESS = "PASTE ADDRESS HERE:  ______________________";

const RECEPTION_COPY = "The reception follows immediately at the same venue.";

const DRESS_CODE_MEN =
  "Tuxedo or dark, formal suit with a white dress shirt. Lean into darker colours — black, navy, charcoal — and deeper jewel tones like emerald and burgundy.";
const DRESS_CODE_WOMEN =
  "Evening gown, full-length, or formal midi-length dresses.";
const DRESS_CODE_NOTE =
  "The ceremony is outdoors on grass, so please choose footwear accordingly.";

// schedule/order-of-day pending from client
const SCHEDULE_ITEMS = [
  { time: "{{TIME_1}}", event: "{{EVENT_1 — placeholder}}" },
  { time: "{{TIME_2}}", event: "{{EVENT_2 — placeholder}}" },
  { time: "{{TIME_3}}", event: "{{EVENT_3 — placeholder}}" },
  { time: "{{TIME_4}}", event: "{{EVENT_4 — placeholder}}" },
];

export default function DetailsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageHeader eyebrow="The Details" title="Details" />

      <Reveal className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 md:mt-20">
        <div>
          <h2 className="font-display text-2xl text-navy sm:text-3xl">
            Ceremony
          </h2>
          <div className="mt-4 space-y-1 text-ink">
            <p>{CEREMONY_TIME}</p>
            <p>{VENUE_NAME}</p>
            <p>{VENUE_ADDRESS}</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-navy sm:text-3xl">
            Reception
          </h2>
          <div className="mt-4 space-y-1 text-ink">
            <p>{RECEPTION_COPY}</p>
            <p>{VENUE_NAME}</p>
            <p>{VENUE_ADDRESS}</p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-16 md:mt-20">
        <h2 className="font-display text-2xl text-navy sm:text-3xl">
          Schedule of the day
        </h2>
        <ul className="mt-6 divide-y divide-blue">
          {SCHEDULE_ITEMS.map((item, index) => (
            <li
              key={index}
              className="grid grid-cols-[88px_1fr] gap-6 py-4 sm:grid-cols-[112px_1fr]"
            >
              <span className="text-sm tracking-wide text-navy">
                {item.time}
              </span>
              <span className="text-ink">{item.event}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16 md:mt-20">
        <h2 className="font-display text-2xl text-navy sm:text-3xl">
          Black Tie Optional
        </h2>

        <div className="mt-6">
          <p className="text-xs tracking-[0.3em] text-navy uppercase">Men</p>
          <p className="mt-2 leading-[1.7] text-ink">{DRESS_CODE_MEN}</p>
        </div>

        <div className="mt-6 h-px w-10 bg-blue" />

        <div className="mt-6">
          <p className="text-xs tracking-[0.3em] text-navy uppercase">
            Women
          </p>
          <p className="mt-2 leading-[1.7] text-ink">{DRESS_CODE_WOMEN}</p>
        </div>

        <p className="mt-6 leading-[1.7] text-ink">{DRESS_CODE_NOTE}</p>
      </Reveal>

      <Reveal className="mt-16 md:mt-20">
        <h2 className="font-display text-2xl text-navy sm:text-3xl">Map</h2>
        <div className="mt-6">
          <VenueMap venueName={VENUE_NAME} address={VENUE_ADDRESS} />
        </div>
      </Reveal>

      <div className="mt-16 md:mt-20">
        <Link
          href="/contact"
          className="border-b border-navy pb-0.5 text-xs tracking-[0.3em] text-navy uppercase"
        >
          Questions?
        </Link>
      </div>
    </div>
  );
}
