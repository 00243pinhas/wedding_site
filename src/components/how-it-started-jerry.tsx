import Image from "next/image";
import { Reveal } from "@/lib/motion/reveal";

const JERRY_CHILDHOOD_IMAGE_SRC = "/assets/jerry-childhood.jpeg";

// The blue band alternating with HowItStartedPam's ivory band above it.
export function HowItStartedJerry() {
  return (
    <section className="bg-blue py-16 md:py-[120px]">
      <Reveal className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-16 lg:px-8">
        <div className="relative aspect-[4/5] w-full overflow-hidden md:order-2">
          <Image
            src={JERRY_CHILDHOOD_IMAGE_SRC}
            alt="Jerry as a child"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/70 to-transparent" />
          <p className="absolute bottom-4 left-4 font-display text-2xl text-ivory sm:text-3xl">
            Jerry
          </p>
        </div>

        <div>
          <p className="text-lg leading-[1.7] text-ivory sm:text-xl">
            This little island boy from La Tour Koenig had his encounter
            with what love could be, but didn&apos;t envision a second
            chance in a place that has now become home.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
