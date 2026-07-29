import Image from "next/image";
import { Reveal } from "@/lib/motion/reveal";

// Swap to the real photo path once the client delivers it — portrait
// orientation, same one-line swap as the hero. Leave null for the
// placeholder block.
const STORY_IMAGE_SRC: string | null = null;

// DRAFT — client to confirm/replace. Deliberately free of dates, cities,
// or how-they-met specifics until the client supplies the real story.
const STORY_PARAGRAPHS = [
  "Every love story is written a little differently, and ours has unfolded slowly — in quiet mornings, shared meals, and the kind of laughter that makes hard days lighter. Somewhere along the way, two lives became one story, and we've been grateful for every page since.",
  "What we know for certain is this: we found in each other a steady kind of love — the kind that shows up, that listens, that chooses you again and again. Now we can't wait to stand together and begin our next chapter, with all of you beside us.",
];

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
            {STORY_PARAGRAPHS.map((paragraph, index) => (
              <p
                key={index}
                className={`leading-[1.8] text-ink ${index === 0 ? "mt-6" : "mt-4"}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
