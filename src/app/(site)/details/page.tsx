import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { VenueMap } from "@/components/venue-map";
import { Reveal } from "@/lib/motion/reveal";

// Ceremony time is confirmed (see CLAUDE.md). Ceremony and reception are
// the same venue, reception immediately following.
const CEREMONY_COPY =
  "The event begins at 5:00 PM. Please arrive before the ceremony time.";

const VENUE_NAME = "Çamlıca Köşk Gönül Bahçesi";
const VENUE_ADDRESS =
  "Küçük Çamlıca Mah, Üç Pınarlar Cad. Saadet Sk. No:3/2, Üsküdar/İstanbul";

const RECEPTION_COPY = "The reception follows immediately at the same venue.";

const DRESS_CODE_MEN = `Formal suit and Black Tie Optional.
Lean into darker colours and deeper tones.`;
const DRESS_CODE_WOMEN =
  "Evening gown, full-length, or formal midi-length dresses.";
const DRESS_CODE_NOTE =
  "The ceremony is outdoors on grass, so please choose footwear accordingly.";

const DRESS_CODE_GROOM_IMAGE_SRC = "/assets/dress-code-groom.png";
const DRESS_CODE_BRIDE_IMAGE_SRC = "/assets/dress-code-bride.png";

// Order confirmed by the client — no fixed times given except the 5:00 PM
// ceremony above, so this renders as a plain sequence, not a timed agenda.
const SCHEDULE_ITEMS: { title: string; description?: string }[] = [
  { title: "Arrival", description: "Grab a drink, say hello, and settle in." },
  { title: "The Ceremony", description: "The reason we're all here!" },
  {
    title: "Cocktail Hour",
    description: "A chance to mingle while we sneak away for a few photos.",
  },
  { title: "Dinner & Toasts" },
  { title: "Cake & First Dance" },
  { title: "Party Time" },
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
          <div className="mt-4 space-y-1 text-lg text-ink">
            <p>{CEREMONY_COPY}</p>
            <p>{VENUE_NAME}</p>
            <p>{VENUE_ADDRESS}</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-navy sm:text-3xl">
            Reception
          </h2>
          <div className="mt-4 space-y-1 text-lg text-ink">
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
              key={item.title}
              className="grid grid-cols-[32px_1fr] gap-6 py-4"
            >
              <span className="text-base tracking-wide text-navy">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="text-lg text-ink">{item.title}</span>
                {item.description && (
                  <span className="mt-1 block text-base text-ink/70">
                    {item.description}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="relative left-1/2 mt-16 w-screen -mx-[50vw] overflow-hidden md:mt-20">
        <div className="absolute inset-0 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
          <div className="relative h-full w-full">
            <Image
              src={DRESS_CODE_GROOM_IMAGE_SRC}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-full w-full">
            <Image
              src={DRESS_CODE_BRIDE_IMAGE_SRC}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-navy/45" />

        <div className="relative flex min-h-[560px] items-center justify-center px-4 py-16 sm:px-6 md:min-h-[640px] md:py-20">
          <div className="w-full max-w-xl bg-ivory/90 px-8 py-10 text-center sm:px-12 sm:py-14">
            <p className="text-sm tracking-[0.3em] text-navy uppercase">
              Dress Code
            </p>
            <div className="mx-auto mt-4 h-px w-10 bg-blue" />

            <div className="mt-8">
              <p className="text-sm tracking-[0.3em] text-navy uppercase">
                Men
              </p>
              <p className="mt-2 whitespace-pre-line text-lg leading-[1.7] text-ink">
                {DRESS_CODE_MEN}
              </p>
            </div>

            <div className="mx-auto mt-6 h-px w-10 bg-blue" />

            <div className="mt-6">
              <p className="text-sm tracking-[0.3em] text-navy uppercase">
                Women
              </p>
              <p className="mt-2 text-lg leading-[1.7] text-ink">
                {DRESS_CODE_WOMEN}
              </p>
              <p className="mt-2 text-lg leading-[1.7] text-ink">
                {DRESS_CODE_NOTE}
              </p>
            </div>
          </div>
        </div>
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
