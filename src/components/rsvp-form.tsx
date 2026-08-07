"use client";

import { useState, useTransition } from "react";
import { Reveal } from "@/lib/motion/reveal";
import { submitRsvp } from "@/app/(site)/rsvp/actions";

interface Member {
  id: string;
  full_name: string;
  attending: boolean | null;
}

interface RsvpFormProps {
  familyName: string;
  members: Member[];
  initialDietaryNotes: string;
  initialMessage: string;
}

const inputClass =
  "mt-2 block w-full rounded-none border border-blue bg-ivory px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-navy focus:outline-none";

export function RsvpForm({
  familyName,
  members,
  initialDietaryNotes,
  initialMessage,
}: RsvpFormProps) {
  const alreadyResponded = members.some((m) => m.attending !== null);

  // Three states, matching members.attending exactly: true (coming), false
  // (not coming), null (no response yet — the default until the guest
  // actively picks one of the two buttons).
  const [attendance, setAttendance] = useState<Record<string, boolean | null>>(
    () => Object.fromEntries(members.map((m) => [m.id, m.attending])),
  );
  const [dietaryNotes, setDietaryNotes] = useState(initialDietaryNotes);
  const [message, setMessage] = useState(initialMessage);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Clicking the already-selected button again clears it back to "no
  // response yet" — an escape hatch for a misclick, rather than forcing a
  // choice between only the two options once either has been touched.
  function choose(id: string, value: boolean) {
    setAttendance((prev) => ({ ...prev, [id]: prev[id] === value ? null : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await submitRsvp({
        responses: members.map((m) => ({
          memberId: m.id,
          attending: attendance[m.id] ?? null,
        })),
        dietaryNotes,
        message,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(res.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  if (submitted) {
    const attendingCount = members.filter((m) => attendance[m.id] === true)
      .length;
    return (
      <Reveal className="mt-12 md:mt-16">
        <p className="font-display text-3xl text-navy sm:text-4xl">
          {attendingCount > 0
            ? "Thank you — we can't wait to celebrate with you."
            : "Thank you for letting us know."}
        </p>
        <p className="mt-4 leading-[1.7] text-ink">
          Your RSVP has been recorded. You can return to this page any time
          to update it.
        </p>
      </Reveal>
    );
  }

  const greeting =
    members.length === 1
      ? `Hello, ${members[0].full_name}.`
      : `Hello, ${familyName}.`;

  return (
    <Reveal className="mt-12 md:mt-16">
      <p className="font-display text-2xl text-navy sm:text-3xl">
        {greeting}
      </p>

      {alreadyResponded && (
        <p className="mt-4 text-sm leading-[1.7] text-ink/70">
          You&rsquo;ve already RSVP&rsquo;d — you can update below.
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-10">
        <fieldset>
          <legend className="text-xs tracking-[0.2em] text-navy uppercase">
            Who&rsquo;s coming?
          </legend>
          <div className="mt-4 space-y-3">
            {members.map((member) => {
              const choice = attendance[member.id] ?? null;
              return (
                <div
                  key={member.id}
                  className="border border-blue bg-ivory px-4 py-4"
                >
                  <span className="text-base text-ink">
                    {member.full_name}
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      aria-pressed={choice === true}
                      onClick={() => choose(member.id, true)}
                      className={`flex min-h-[52px] items-center justify-center px-2 py-3 text-center text-xs leading-tight tracking-[0.1em] uppercase transition-colors duration-[400ms] border ${
                        choice === true
                          ? "border-blush bg-blush text-navy"
                          : "border-blue bg-ivory text-navy md:hover:border-navy"
                      }`}
                    >
                      I&rsquo;m Coming
                    </button>
                    <button
                      type="button"
                      aria-pressed={choice === false}
                      onClick={() => choose(member.id, false)}
                      className={`flex min-h-[52px] items-center justify-center px-2 py-3 text-center text-xs leading-tight tracking-[0.1em] uppercase transition-colors duration-[400ms] border ${
                        choice === false
                          ? "border-navy bg-navy/10 text-navy"
                          : "border-blue bg-ivory text-navy md:hover:border-navy"
                      }`}
                    >
                      I&rsquo;m Not Coming
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8">
          <label
            htmlFor="dietary-notes"
            className="text-xs tracking-[0.2em] text-navy uppercase"
          >
            Dietary notes{" "}
            <span className="text-ink/50 normal-case tracking-normal">
              (optional)
            </span>
          </label>
          <textarea
            id="dietary-notes"
            value={dietaryNotes}
            onChange={(e) => setDietaryNotes(e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="mt-8">
          <label
            htmlFor="message"
            className="text-xs tracking-[0.2em] text-navy uppercase"
          >
            Message to Jerry &amp; Pam{" "}
            <span className="text-ink/50 normal-case tracking-normal">
              (optional)
            </span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="mt-6 text-sm leading-[1.7] text-ink">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-10 w-full bg-blush px-10 py-4 text-sm tracking-[0.2em] text-navy uppercase transition-colors duration-[400ms] disabled:opacity-60 sm:w-auto md:hover:bg-[#e5a4b4]"
        >
          {isPending ? "Submitting…" : "Submit RSVP"}
        </button>
      </form>
    </Reveal>
  );
}
