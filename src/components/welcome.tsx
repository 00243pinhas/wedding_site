import { Reveal } from "@/lib/motion/reveal";

export function Welcome() {
  return (
    <section className="bg-ivory pt-20 pb-10 md:pt-[120px] md:pb-[60px]">
      <Reveal className="mx-auto max-w-[520px] px-4 text-center sm:px-6">
        <p className="text-xs tracking-[0.3em] text-navy uppercase">
          How it&apos;s going
        </p>
        <h2 className="mt-4 font-display text-3xl text-navy sm:text-4xl">
          We&apos;re Getting Married
        </h2>
        <p className="mt-6 leading-[1.7] text-ink">
          and can&apos;t wait to celebrate this day surrounded by the people
          we love.
        </p>
      </Reveal>
    </section>
  );
}
