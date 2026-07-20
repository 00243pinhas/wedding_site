import { Hero } from "@/components/hero";
import { Welcome } from "@/components/welcome";
import { OurStory } from "@/components/our-story";
import { GalleryPreview } from "@/components/gallery-preview";
import { DetailsPreview } from "@/components/details-preview";
import { PhotoMoment } from "@/components/photo-moment";
import { RsvpInvite } from "@/components/rsvp-invite";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <div className="mx-auto h-px w-10 bg-blue" />
      <OurStory />
      <GalleryPreview />
      <DetailsPreview />
      <PhotoMoment />
      <RsvpInvite />
    </>
  );
}
