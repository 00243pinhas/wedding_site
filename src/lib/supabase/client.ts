import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

// Browser client — safe to use in Client Components. Uses the public
// anon key, so it is bound by the RLS policies for the `anon` role.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
