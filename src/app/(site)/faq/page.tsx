import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";

// Answers pending from the client — do not write real copy here. Each
// {{...}} marker stays until real content is supplied.
const FAQ_ITEMS: { question: string; answer: string }[] = [
  { question: "Can I bring a guest?", answer: "{{FAQ_ANSWER_GUEST}}" },
  { question: "Are children invited?", answer: "{{FAQ_ANSWER_CHILDREN}}" },
  {
    question: "What time should I arrive?",
    answer: "{{FAQ_ANSWER_ARRIVAL_TIME}}",
  },
  { question: "Where do I park?", answer: "{{FAQ_ANSWER_PARKING}}" },
  {
    question: "Is the ceremony indoors or outdoors?",
    answer: "{{FAQ_ANSWER_INDOOR_OR_OUTDOOR}}",
  },
  { question: "What should I wear?", answer: "{{FAQ_ANSWER_ATTIRE}}" },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageHeader eyebrow="Good to Know" title="Questions" />

      <Reveal className="mt-16 divide-y divide-blue md:mt-20">
        {FAQ_ITEMS.map((item) => (
          <div key={item.question} className="py-6 first:pt-0">
            <h2 className="font-display text-2xl text-navy sm:text-3xl">
              {item.question}
            </h2>
            <p className="mt-3 leading-[1.7] text-ink">{item.answer}</p>
          </div>
        ))}
      </Reveal>

      <div className="mt-16 md:mt-20">
        <Link
          href="/contact"
          className="border-b border-navy pb-0.5 text-xs tracking-[0.3em] text-navy uppercase"
        >
          Still have questions?
        </Link>
      </div>
    </div>
  );
}
