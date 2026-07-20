import { NextResponse } from "next/server";

// Guest access seam.
//
// This site is private, but HOW guests get in is not decided yet. Rather
// than guard individual pages (and have to revisit every route later),
// every request funnels through this one function first. Today it lets
// everyone through unconditionally; when a gate is chosen, it gets
// implemented here and nowhere else.
//
// TODO(access): pick one and implement it here:
//   - Shared code: one password/passphrase for all ~120 guests, checked
//     against a cookie/session set after a simple gate page.
//   - Per-guest link: unique token per invite (e.g. /?g=<token>), looked
//     up against a guest table, sets a cookie on first visit.
//   - Email magic link: Supabase Auth email OTP/magic link per guest,
//     same auth system as /admin but a fully separate user pool —
//     do not reuse /admin's session or RLS role for this.
//
// Whichever is chosen, /admin must stay on its own Supabase Auth login,
// separate from this guest gate.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on everything except Next.js internals and static files, so
     * the gate (once added) covers every guest-facing route by default.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
