"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { submitInviteCode } from "@/app/welcome-gate/actions";

function normalize(value: string): string {
  return value.toUpperCase().replace(/\s+/g, "");
}

export function InviteCodeForm() {
  const [code, setCode] = useState("");
  const [showError, setShowError] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowError(false);

    startTransition(async () => {
      const result = await submitInviteCode(code);
      if (!result.ok) {
        setShowError(true);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 text-left">
      <label
        htmlFor="invite-code"
        className="text-xs tracking-[0.2em] text-navy uppercase"
      >
        Enter your invitation code
      </label>
      <input
        id="invite-code"
        name="code"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        value={code}
        onChange={(e) => {
          setShowError(false);
          setCode(normalize(e.target.value));
        }}
        className="mt-2 block w-full rounded-none border border-blue bg-ivory px-4 py-4 text-center text-lg tracking-[0.3em] text-ink focus:border-navy focus:outline-none"
      />

      {showError && (
        <p role="alert" className="mt-4 text-sm leading-[1.7] text-ink">
          We couldn&rsquo;t find that code. Please check the code on your
          invitation, or{" "}
          <Link href="/contact" className="text-navy hover:underline">
            contact Nancy or Esa
          </Link>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || code.length === 0}
        className="mt-8 w-full bg-blush px-10 py-4 text-sm tracking-[0.2em] text-navy uppercase transition-colors duration-[400ms] disabled:opacity-60 md:hover:bg-[#e5a4b4]"
      >
        {isPending ? "Checking…" : "Continue"}
      </button>
    </form>
  );
}
