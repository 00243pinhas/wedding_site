import { HowItStartedJerry } from "@/components/how-it-started-jerry";
import { HowItStartedPam } from "@/components/how-it-started-pam";
import { Welcome } from "@/components/welcome";
import { LoveLetter } from "@/components/love-letter";
import { Reveal } from "@/lib/motion/reveal";

export default function StoryPage() {
  return (
    <>
      <section className="bg-ivory pt-20 pb-14 md:pt-[120px] md:pb-20">
        <Reveal className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h1 className="font-display text-5xl text-navy sm:text-6xl">
            How It Started
          </h1>
          <p className="mt-4 text-xs tracking-[0.3em] text-navy uppercase">
            Jerry &amp; Pam&apos;s Story
          </p>
        </Reveal>
      </section>

      <HowItStartedJerry />
      <HowItStartedPam />
      <Welcome />
      <div className="mx-auto h-px w-10 bg-blue" />
      <LoveLetter />
    </>
  );
}
