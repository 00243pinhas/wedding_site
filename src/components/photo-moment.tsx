import Image from "next/image";
import { Reveal } from "@/lib/motion/reveal";

const PHOTO_MOMENT_IMAGE_SRC = "/assets/forever-starts-here.jpg";

// The second and final wash on the page.
export function PhotoMoment() {
  return (
    <section className="relative flex h-[55vh] items-center justify-center overflow-hidden md:h-[65vh]">
      <div className="absolute inset-0">
        <Image
          src={PHOTO_MOMENT_IMAGE_SRC}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_17%]"
        />
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
