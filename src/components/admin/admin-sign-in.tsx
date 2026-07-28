"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "mt-2 block w-full rounded-none border border-blue bg-ivory px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-navy focus:outline-none";

// Plain email/password sign-in against Supabase Auth. Success just calls
// router.refresh() — the server component at /admin re-reads the session
// cookie on refresh and renders the dashboard itself; this form does not
// know or care what's on the other side.
export function AdminSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Invalid email or password.");
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <p className="text-xs tracking-[0.2em] text-navy uppercase">Admin</p>
      <h1 className="mt-2 font-display text-3xl text-navy">Sign in</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="admin-email"
            className="text-xs tracking-[0.2em] text-navy uppercase"
          >
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="text-xs tracking-[0.2em] text-navy uppercase"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-ink">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-navy px-10 py-4 text-sm tracking-[0.2em] text-ivory uppercase transition-colors duration-[400ms] disabled:opacity-60"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
