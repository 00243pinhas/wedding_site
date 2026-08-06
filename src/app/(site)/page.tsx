import Link from "next/link";
import { Hero } from "@/components/hero";
import { WeddingAnnouncement } from "@/components/wedding-announcement";
import { Countdown } from "@/components/countdown";
import { LoveLetter } from "@/components/love-letter";
import { GalleryPreview } from "@/components/gallery-preview";
import { DetailsPreview } from "@/components/details-preview";
import { PhotoMoment } from "@/components/photo-moment";
import { RsvpInvite } from "@/components/rsvp-invite";
import { Reveal } from "@/lib/motion/reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WeddingAnnouncement />
      <Countdown />
      <div className="mx-auto h-px w-10 bg-blue" />
      <LoveLetter />
      <Reveal className="bg-ivory pb-14 text-center md:pb-20">
        <Link
          href="/story"
          className="inline-block border border-navy px-8 py-3 text-sm tracking-[0.2em] text-navy uppercase transition-colors duration-[400ms] md:hover:bg-navy md:hover:text-ivory"
        >
          Journey To Love
        </Link>
      </Reveal>
      <GalleryPreview />
      <DetailsPreview />
      <PhotoMoment />
      <RsvpInvite />
    </>
  );
}
