import Image from "next/image";
import { Reveal } from "@/lib/motion/reveal";

const LOVE_LETTER_IMAGE_SRC = "/assets/love-letter.jpg";

const PAM_LETTER = `In you I have found a love that honours, that supports me so faithfully, that is sacrificial. I see a love that looks beyond imperfections and will intentionally choose me over and over again.

Thank you for loving me the way you do, for caring for me so deeply. You give your all and your very best. You are all I have prayed for, and I will never grow tired of telling you that you are God's best gift to me.

I look forward to every day of our adventurous life together. I look forward to becoming your wife, your covenant partner.

I love you, Jerry Clifford Cytheree.`;

const JERRY_LETTER = `My dear spouse to be,

I found a good thing and a virtuous woman in you, and I have loved you ever since my eyes were opened to see you.

I take this engagement to work on myself so that I can be a spiritual, protective, safe, kind, and steady husband for you all the days of my life.`;

export function LoveLetter() {
  return (
    <section className="bg-ivory pt-10 pb-20 md:pt-[60px] md:pb-[120px]">
      <Reveal className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.3em] text-navy uppercase">
          Love Letter
        </p>
        <div className="mx-auto mt-4 h-px w-10 bg-blue" />

        <div className="mt-14 grid grid-cols-1 items-start gap-10 text-left md:mt-16 md:grid-cols-3 md:gap-12 lg:gap-16">
          <div className="md:text-right">
            <h2 className="font-display text-3xl text-navy sm:text-4xl">
              Pam
            </h2>
            <p className="mt-6 whitespace-pre-line leading-[1.8] text-ink">
              {PAM_LETTER}
            </p>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={LOVE_LETTER_IMAGE_SRC}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-display text-3xl text-navy sm:text-4xl">
              Jerry
            </h2>
            <p className="mt-6 whitespace-pre-line leading-[1.8] text-ink">
              {JERRY_LETTER}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
