"use client";

import { useState, useTransition } from "react";
import { Reveal } from "@/lib/motion/reveal";
import { submitRsvp } from "@/app/(site)/rsvp/actions";

interface InitialRsvp {
  attending: boolean;
  party_size: number;
  dietary_notes: string | null;
  message: string | null;
}

interface RsvpFormProps {
  fullName: string;
  maxPartySize: number;
  initialRsvp: InitialRsvp | null;
}

type Attending = "yes" | "no" | null;

const inputClass =
  "mt-2 block w-full rounded-none border border-blue bg-ivory px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-navy focus:outline-none";

function optionClass(active: boolean) {
  return [
    "border px-4 py-4 text-sm tracking-[0.1em] uppercase transition-colors",
    active
      ? "border-navy bg-navy text-ivory"
      : "border-blue bg-ivory text-ink md:hover:border-navy",
  ].join(" ");
}

export function RsvpForm({
  fullName,
  maxPartySize,
  initialRsvp,
}: RsvpFormProps) {
  const [attending, setAttending] = useState<Attending>(
    initialRsvp ? (initialRsvp.attending ? "yes" : "no") : null,
  );
  const [partySize, setPartySize] = useState(() =>
    initialRsvp?.attending
      ? Math.min(initialRsvp.party_size || 1, maxPartySize)
      : 1,
  );
  const [dietaryNotes, setDietaryNotes] = useState(
    initialRsvp?.dietary_notes ?? "",
  );
  const [message, setMessage] = useState(initialRsvp?.message ?? "");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ attending: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attending === null) {
      setError("Please let us know if you'll be attending.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const res = await submitRsvp({
        attending: attending === "yes",
        partySize,
        dietaryNotes,
        message,
      });

      if (res.ok) {
        setResult({ attending: res.attending ?? attending === "yes" });
      } else {
        setError(
          res.error ?? "Something went wrong. Please try again.",
        );
      }
    });
  }

  if (result) {
    return (
      <Reveal className="mt-12 md:mt-16">
        <p className="font-display text-3xl text-navy sm:text-4xl">
          {result.attending
            ? "Thank you — we can't wait to celebrate with you."
            : "Thank you for letting us know."}
        </p>
        <p className="mt-4 leading-[1.7] text-ink">
          {result.attending
            ? "Your RSVP has been recorded. We'll see you there."
            : "We're sorry you can't make it, but we're grateful you took the time to respond."}
        </p>
      </Reveal>
    );
  }

  return (
    <Reveal className="mt-12 md:mt-16">
      <p className="font-display text-2xl text-navy sm:text-3xl">
        Hello, {fullName}.
      </p>

      {initialRsvp && (
        <p className="mt-4 text-sm leading-[1.7] text-ink/70">
          You&rsquo;ve already RSVP&rsquo;d — you can update your response
          below.
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-10">
        <fieldset>
          <legend className="text-xs tracking-[0.2em] text-navy uppercase">
            Will you be attending?
          </legend>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              aria-pressed={attending === "yes"}
              onClick={() => setAttending("yes")}
              className={optionClass(attending === "yes")}
            >
              Yes, I&rsquo;ll be there
            </button>
            <button
              type="button"
              aria-pressed={attending === "no"}
              onClick={() => setAttending("no")}
              className={optionClass(attending === "no")}
            >
              No, I can&rsquo;t make it
            </button>
          </div>
        </fieldset>

        {attending === "yes" && (
          <div className="mt-8">
            <label
              htmlFor="party-size"
              className="text-xs tracking-[0.2em] text-navy uppercase"
            >
              Party size
            </label>
            <select
              id="party-size"
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className={inputClass}
            >
              {Array.from({ length: maxPartySize }, (_, i) => i + 1).map(
                (n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ),
              )}
            </select>
          </div>
        )}

        {attending === "yes" && (
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
        )}

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
