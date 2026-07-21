import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";

// Swap real photo paths in here — one edit updates the whole grid. Leave
// an entry's src as null to keep its placeholder block. Fixed 4:5 tiles
// with object-cover so mixed orientations from the client can't break
// the layout.
const GALLERY_PHOTOS: { src: string | null; alt: string }[] = [
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageHeader eyebrow="Photographs" title="Gallery" />

      <Reveal className="mt-16 grid grid-cols-2 gap-1 md:mt-20 md:grid-cols-3">
        {GALLERY_PHOTOS.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-[4/5] w-full overflow-hidden"
          >
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue ring-1 ring-ivory ring-inset" />
            )}
          </div>
        ))}
      </Reveal>
    </div>
  );
}
