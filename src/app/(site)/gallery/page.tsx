import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";

// Fixed 4:5 tiles with object-cover so mixed orientations from the client
// can't break the layout.
const GALLERY_PHOTOS: { src: string; alt: string }[] = [
  { src: "/assets/gallery-01.jpg", alt: "" },
  { src: "/assets/gallery-02.jpeg", alt: "" },
  { src: "/assets/gallery-03.jpg", alt: "" },
  { src: "/assets/gallery-04.jpeg", alt: "" },
  { src: "/assets/gallery-05.jpg", alt: "" },
  { src: "/assets/gallery-06.jpg", alt: "" },
  { src: "/assets/gallery-07.jpeg", alt: "" },
  { src: "/assets/gallery-08.jpeg", alt: "" },
  { src: "/assets/gallery-09.jpg", alt: "" },
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
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </Reveal>
    </div>
  );
}
