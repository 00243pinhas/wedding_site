import Link from "next/link";
import { Reveal } from "@/lib/motion/reveal";

// Ceremony time is confirmed (see CLAUDE.md). Venue/address are pending
// from the client — {{...}} markers stay until real copy is supplied.
// Do not invent venue names, addresses, or times.
const CEREMONY_TIME = "5:00 PM";
const CEREMONY_VENUE_NAME = "{{CEREMONY_VENUE_NAME}}";
const CEREMONY_ADDRESS = "{{CEREMONY_ADDRESS}}";

// The reception may turn out to be the same venue as the ceremony (common
// for single-site weddings) or a separate one. Keep this block's markup
// identical in shape to the ceremony block above so that, whichever the
// client confirms, the two-column layout stays balanced and doesn't look
// broken — e.g. don't collapse this block or add reception-only markup
// that would make the pair asymmetric if the address is later duplicated.
const RECEPTION_TIME = "{{RECEPTION_TIME}}";
const RECEPTION_VENUE_NAME = "{{RECEPTION_VENUE_NAME}}";
const RECEPTION_ADDRESS = "{{RECEPTION_ADDRESS}}";

const DRESS_CODE_DETAIL = "{{DRESS_CODE_DETAIL}}";

// Placeholder run-of-show — four example rows only, clearly marked with
// {{...}} tokens. Replace with the real schedule once the client supplies
// it. Do not invent times or events.
const SCHEDULE_ITEMS = [
  { time: "{{TIME_1}}", event: "{{EVENT_1 — placeholder}}" },
  { time: "{{TIME_2}}", event: "{{EVENT_2 — placeholder}}" },
  { time: "{{TIME_3}}", event: "{{EVENT_3 — placeholder}}" },
  { time: "{{TIME_4}}", event: "{{EVENT_4 — placeholder}}" },
];

// Do NOT wire a Google Maps (or any third-party) embed here until the
// venue address is confirmed and an API key decision is made with the
// client — this stays null and renders a sized placeholder block only.
const MAP_EMBED_URL: string | null = null;

export default function DetailsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <header>
        <p className="text-xs tracking-[0.3em] text-navy uppercase">
          The Details
        </p>
        <h1 className="mt-4 font-display text-5xl text-navy sm:text-6xl">
          Details
        </h1>
      </header>

      <Reveal className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 md:mt-20">
        <div>
          <h2 className="font-display text-2xl text-navy sm:text-3xl">
            Ceremony
          </h2>
          <div className="mt-4 space-y-1 text-ink">
            <p>{CEREMONY_TIME}</p>
            <p>{CEREMONY_VENUE_NAME}</p>
            <p>{CEREMONY_ADDRESS}</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-navy sm:text-3xl">
            Reception
          </h2>
          <div className="mt-4 space-y-1 text-ink">
            <p>{RECEPTION_TIME}</p>
            <p>{RECEPTION_VENUE_NAME}</p>
            <p>{RECEPTION_ADDRESS}</p>
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
        <p className="mt-4 leading-[1.7] text-ink">{DRESS_CODE_DETAIL}</p>
      </Reveal>

      <Reveal className="mt-16 md:mt-20">
        <h2 className="font-display text-2xl text-navy sm:text-3xl">Map</h2>
        <div className="mt-6 flex aspect-[16/9] w-full items-center justify-center bg-blue/30">
          {MAP_EMBED_URL ? null : (
            <p className="text-xs tracking-[0.2em] text-navy uppercase">
              Map pending venue address
            </p>
          )}
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
