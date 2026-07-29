import Image from "next/image";
import { Reveal } from "@/lib/motion/reveal";

// Swap to the real photo path once the client delivers it — landscape
// orientation, unlike the hero/story/gallery portraits. Leave null to
// keep the placeholder block.
const PHOTO_MOMENT_IMAGE_SRC: string | null = null;

// The second and final wash on the page.
export function PhotoMoment() {
  return (
    <section className="relative flex h-[55vh] items-center justify-center overflow-hidden md:h-[65vh]">
      <div className="absolute inset-0">
        {PHOTO_MOMENT_IMAGE_SRC ? (
          <Image
            src={PHOTO_MOMENT_IMAGE_SRC}
            alt=""
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-blue" />
        )}
        <div className="absolute inset-0 bg-navy/42" />
      </div>

      <Reveal className="relative z-10 px-4 text-center sm:px-6">
        <p className="font-display text-4xl text-ivory sm:text-5xl">
          Forever starts here
        </p>
      </Reveal>
    </section>
  );
}
