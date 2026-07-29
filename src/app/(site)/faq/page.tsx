import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Can I bring a guest?",
    answer:
      "We're keeping our celebration intimate, so we're unable to accommodate additional guests. Thank you for understanding.",
  },
  {
    question: "Are children invited?",
    answer: "Yes — children are warmly welcome.",
  },
  {
    question: "What time should I arrive?",
    answer: "Please arrive before the ceremony start time of 5:00 PM.",
  },
  {
    question: "Where do I park?",
    answer: "Parking will be directed on-site by our team on the day.",
  },
  {
    question: "Is the ceremony indoors or outdoors?",
    answer: "The ceremony is outdoors.",
  },
  {
    question: "What should I wear?",
    answer:
      "The dress code is Black Tie Optional — see the Details page. As the ceremony is outdoors on grass, choose footwear accordingly.",
  },
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
