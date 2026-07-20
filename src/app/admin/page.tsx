import { createClient } from "@/lib/supabase/server";

// Protected shell — auth check only, no table/CSV export UI yet.
// Signed-in state reads via the `authenticated` RLS policy on `rsvps`;
// signing in itself (the actual login form) is content, not scaffold,
// and is intentionally not built here.
export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl">Admin</h1>
        <p className="mt-4 text-ink/70">
          [Not signed in — Supabase Auth login placeholder, content
          pending]
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl">Admin</h1>
      <p className="mt-4 text-ink/70">
        [Signed in as {user.email} — RSVP table + CSV export placeholder,
        content pending]
      </p>
    </div>
  );
}
