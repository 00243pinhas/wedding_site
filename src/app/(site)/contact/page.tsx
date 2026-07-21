import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";

// Nancy and Esa are the day-of contacts (see CLAUDE.md) — the couple's
// own phone/email must never appear on this site. Contact details are
// pending from the client; {{...}} markers stay until real values land.
const CONTACTS: { name: string; contact: string }[] = [
  { name: "Nancy", contact: "{{NANCY_CONTACT}}" },
  { name: "Esa", contact: "{{ESA_CONTACT}}" },
];

// Renders a placeholder as plain text, an email as a mailto: link, and
// anything else as a tel: link — without inventing which one it will be.
function ContactDetail({ contact }: { contact: string }) {
  if (contact.startsWith("{{")) {
    return <p className="mt-1 text-ink">{contact}</p>;
  }
  if (contact.includes("@")) {
    return (
      <a
        href={`mailto:${contact}`}
        className="mt-1 block text-ink hover:text-navy"
      >
        {contact}
      </a>
    );
  }
  return (
    <a href={`tel:${contact}`} className="mt-1 block text-ink hover:text-navy">
      {contact}
    </a>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageHeader eyebrow="Get in Touch" title="Contact" />

      <Reveal className="mt-16 md:mt-20">
        <p className="leading-[1.7] text-ink">
          Nancy and Esa are the people to reach with questions about the
          day.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2">
          {CONTACTS.map((person) => (
            <div key={person.name}>
              <h2 className="font-display text-2xl text-navy sm:text-3xl">
                {person.name}
              </h2>
              <p className="mt-2 text-sm tracking-wide text-ink/70">
                Day-of contact
              </p>
              <ContactDetail contact={person.contact} />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
