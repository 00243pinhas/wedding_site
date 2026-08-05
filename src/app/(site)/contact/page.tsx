import { Reveal } from "@/lib/motion/reveal";

// Nancy and Esa are the day-of contacts (see CLAUDE.md) — the couple's
// own phone/email must never appear on this site.
const CONTACTS: { name: string; email: string; phone: string }[] = [
  {
    name: "Nancy",
    email: "ihirwenancy123@gmail.com",
    phone: "+90 534 653 05 26",
  },
  { name: "Esa", email: "thabiso2222@gmail.com", phone: "+90 536 545 96 51" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <header>
        <h1 className="font-display text-5xl text-navy sm:text-6xl">
          Contact
        </h1>
      </header>

      <Reveal className="mt-16 md:mt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {CONTACTS.map((person) => (
            <div key={person.name}>
              <h2 className="font-display text-2xl text-navy sm:text-3xl">
                {person.name}
              </h2>
              <p className="mt-2 text-sm tracking-wide text-ink/70">
                Day-of contact
              </p>
              <a
                href={`mailto:${person.email}`}
                className="mt-1 block text-ink hover:text-navy"
              >
                {person.email}
              </a>
              <a
                href={`tel:${person.phone.replace(/\s+/g, "")}`}
                className="mt-1 block text-ink hover:text-navy"
              >
                {person.phone}
              </a>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
