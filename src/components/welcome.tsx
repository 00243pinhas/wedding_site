import { Reveal } from "@/lib/motion/reveal";

export function Welcome() {
  return (
    <section className="bg-ivory py-20 md:py-[120px]">
      <Reveal className="mx-auto max-w-[520px] px-4 text-center sm:px-6">
        <p className="text-xs tracking-[0.3em] text-navy uppercase">
          Welcome
        </p>
        <h2 className="mt-4 font-display text-4xl text-navy sm:text-5xl">
          We&apos;re getting married
        </h2>
        <p className="mt-6 leading-[1.7] text-ink">
          We can&apos;t wait to celebrate this day surrounded by the people
          we love most — including you.
        </p>
      </Reveal>
    </section>
  );
}
