import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";

// client to finalize — registry/fund details to follow.
const GIFT_DETAILS =
  "Details on gifts will be shared soon. Your presence is the greatest gift of all.";

export default function GiftsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageHeader eyebrow="With Love" title="Gifts" />

      <Reveal className="mt-16 md:mt-20">
        <p className="leading-[1.7] text-ink">{GIFT_DETAILS}</p>
      </Reveal>
    </div>
  );
}
