import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

// Server client — for use in Server Components, Route Handlers, and
// Server Actions. Reads/writes the Supabase Auth session via cookies,
// so this is what a signed-in /admin request is authenticated as
// (`authenticated` role), while unauthenticated calls fall back to
// `anon`. Same RLS policies apply either way.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component that can't set cookies
            // (no response to attach them to). Safe to ignore as long
            // as session refresh also happens somewhere with write
            // access, e.g. a Route Handler or Server Action.
          }
        },
      },
    },
  );
}
