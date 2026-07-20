import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/lib/motion/reveal";
import { EASE_CSS } from "@/lib/motion/constants";

// Swap real photo paths in here — one edit updates the whole band. Leave
// an entry's src as null to keep its placeholder block.
const GALLERY_IMAGES: { src: string | null; alt: string }[] = [
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
];

export function GalleryPreview() {
  return (
    <section>
      <Reveal>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/5] w-full overflow-hidden"
            >
              <div
                className="absolute inset-0 transition-transform duration-500 motion-safe:hover:scale-[1.03]"
                style={{ transitionTimingFunction: EASE_CSS }}
              >
                {image.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-blue ring-1 ring-ivory ring-inset" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="bg-ivory py-10 text-center md:py-12">
        <Link
          href="/gallery"
          className="border-b border-navy pb-0.5 text-xs tracking-[0.3em] text-navy uppercase"
        >
          View all photographs
        </Link>
      </div>
    </section>
  );
}
