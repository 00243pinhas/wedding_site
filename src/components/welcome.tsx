import { Reveal } from "@/lib/motion/reveal";

export function Welcome({ tightTop = false }: { tightTop?: boolean } = {}) {
  return (
    <section
      className={`bg-ivory pb-10 md:pb-[60px] ${tightTop ? "pt-10 md:pt-16" : "pt-20 md:pt-[120px]"}`}
    >
      <Reveal className="mx-auto max-w-[520px] px-4 text-center sm:px-6">
        <p className="text-xs tracking-[0.3em] text-navy uppercase">
          How It&apos;s Going
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
