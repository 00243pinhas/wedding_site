import Image from "next/image";
import { Reveal } from "@/lib/motion/reveal";

// Swap to the real photo path once the client delivers it — portrait
// orientation, same one-line swap as the hero. Leave null for the
// placeholder block.
const STORY_IMAGE_SRC: string | null = null;

// Body copy is pending from the client — {{STORY_COPY}} stays until
// real copy is supplied. Do not replace it with invented wedding copy.
export function OurStory() {
  return (
    <section id="story" className="bg-ivory py-20 md:py-[120px]">
      <Reveal className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[45fr_55fr] md:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            {STORY_IMAGE_SRC ? (
              <Image
                src={STORY_IMAGE_SRC}
                alt=""
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue" />
            )}
          </div>

          <div className="text-left">
            <h2 className="font-display text-4xl text-navy sm:text-5xl">
              Our story
            </h2>
            <p className="mt-6 leading-[1.8] text-ink">{"{{STORY_COPY}}"}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
