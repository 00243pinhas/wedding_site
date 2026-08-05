import Image from "next/image";
import { Reveal } from "@/lib/motion/reveal";

const PAM_CHILDHOOD_IMAGE_SRC = "/assets/pam-childhood.jpeg";

export function HowItStartedPam() {
  return (
    <section className="bg-ivory py-16 md:py-[120px]">
      <Reveal className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-16 lg:px-8">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={PAM_CHILDHOOD_IMAGE_SRC}
            alt="Pam as a child"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/70 to-transparent" />
          <p className="absolute bottom-4 left-4 font-display text-2xl text-ivory sm:text-3xl">
            Pam
          </p>
        </div>

        <div>
          <p className="text-lg leading-[1.7] text-ink sm:text-xl">
            This little girl from Francistown had her chances with love but
            didn&apos;t imagine she would say yes in a place so far from
            home.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
