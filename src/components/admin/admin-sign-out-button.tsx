"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminSignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="border border-blue px-4 py-2 text-xs tracking-[0.2em] text-navy uppercase transition-colors disabled:opacity-60 md:hover:border-navy"
    >
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
