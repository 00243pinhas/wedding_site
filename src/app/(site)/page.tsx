import Link from "next/link";
import { Hero } from "@/components/hero";
import { Countdown } from "@/components/countdown";
import { Welcome } from "@/components/welcome";
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
      <Countdown />
      <Welcome />
      <div className="mx-auto h-px w-10 bg-blue" />
      <LoveLetter />
      <Reveal className="bg-ivory pb-14 text-center md:pb-20">
        <Link
          href="/story"
          className="border-b border-navy pb-0.5 text-xs tracking-[0.3em] text-navy uppercase"
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
