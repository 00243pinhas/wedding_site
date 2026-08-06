import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/lib/motion/reveal";
import { EASE_CSS } from "@/lib/motion/constants";

const GALLERY_IMAGES: { src: string; alt: string }[] = [
  { src: "/assets/gallery-preview-1.jpg", alt: "" },
  { src: "/assets/gallery-preview-2.jpg", alt: "" },
  { src: "/assets/gallery-preview-3.jpg", alt: "" },
  { src: "/assets/gallery-preview-4.jpeg", alt: "" },
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
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="bg-ivory py-10 text-center md:py-12">
        <Link
          href="/gallery"
          className="inline-block border border-navy px-8 py-3 text-sm tracking-[0.2em] text-navy uppercase transition-colors duration-[400ms] md:hover:bg-navy md:hover:text-ivory"
        >
          View all photographs
        </Link>
      </div>
    </section>
  );
}
