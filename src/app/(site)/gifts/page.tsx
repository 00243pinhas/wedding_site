import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";

const GIFTS_IMAGE_SRC = "/assets/Gift.png";

const GIFT_INTRO =
  "If you're thinking of getting us a gift, cash is what we'd most appreciate. But please don't feel boxed in by that. A gift, a card, a small gesture, your company — it's all appreciated. If you do choose to go the cash route, here are the details:";

const PAM_ACCOUNT: { label: string; value: string }[] = [
  { label: "Account name", value: "TSHEPO PAM MATHAFENI" },
  { label: "Bank", value: "VAKIFBANK" },
  { label: "SWIFT", value: "TVBATR2A" },
  { label: "Account No", value: "001 5800 7303 8643 67" },
  { label: "USD IBAN", value: "TR21 0001 5001 5804 8025 9044 01" },
  { label: "TL (Lira) IBAN", value: "TR41 0001 5001 5800 7303 8643 67" },
];

const JERRY_ACCOUNT: { label: string; value: string }[] = [
  { label: "Name", value: "Jerry Clifford Cytheree" },
  { label: "EURO IBAN", value: "TR97 0006 2000 2340 0009 0568 29" },
];

function AccountRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3">
      <p className="text-xs tracking-[0.3em] text-navy uppercase">{label}</p>
      <p className="mt-1 leading-[1.7] text-ink select-all">{value}</p>
    </div>
  );
}

export default function GiftsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageHeader eyebrow="With Love" title="Gifts" />

      <Reveal className="relative mt-16 aspect-[16/9] w-full overflow-hidden md:mt-20">
        <Image
          src={GIFTS_IMAGE_SRC}
          alt=""
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </Reveal>

      <Reveal className="mt-16 md:mt-20">
        <p className="leading-[1.7] text-ink">{GIFT_INTRO}</p>
      </Reveal>

      <Reveal className="mt-12 border border-blue md:mt-16">
        <div className="divide-y divide-blue px-6 sm:px-8">
          {PAM_ACCOUNT.map((row) => (
            <AccountRow key={row.label} {...row} />
          ))}
        </div>
        <div className="divide-y divide-blue border-t border-blue px-6 sm:px-8">
          {JERRY_ACCOUNT.map((row) => (
            <AccountRow key={row.label} {...row} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
