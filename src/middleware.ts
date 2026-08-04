import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionPayload } from "@/lib/auth/guest-session";

// Guest access gate.
//
// Every request funnels through this one function first. It allows a
// request through only if it carries a valid, signed guest_session cookie
// (set by /i/[code] after looking up an invite code). Anyone else is
// redirected to /welcome-gate, which explains they need their personal
// invitation link.
//
// Paths below are deliberately excluded from the gate:
//   - /i/          the entry point that SETS the cookie — gating it would
//                   lock everyone out before they could ever get in.
//   - /admin       separate Supabase Auth session, unrelated to guest
//                   access entirely. Never couple it to this cookie.
//   - /welcome-gate  the gate page itself, or a valid cookie-less visit
//                   would redirect to itself forever.
//   - /contact     the gate page links here ("reach out to Nancy or
//                   Esa") — gating it would send that link straight
//                   back to the gate.
//   - /assets/     public photos. next/image's optimizer (/_next/image,
//                   itself excluded below via the matcher) makes an
//                   internal server-side fetch back to the original file
//                   to read it — that fetch carries no guest_session
//                   cookie, so gating /assets/ makes every photo on the
//                   site fail to optimize. No guest list or RSVP data
//                   lives here, only photography, so this is safe to
//                   leave reachable by direct URL.
//   - Next.js internals / static files, handled by the matcher below.
const EXCLUDED_PREFIXES = ["/i/", "/admin", "/welcome-gate", "/contact", "/assets/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const raw = request.cookies.get(COOKIE_NAME)?.value;
  const session = raw ? verifySessionPayload(raw) : null;

  if (session) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/welcome-gate", request.url));
}

export const config = {
  // guest-session.ts signs cookies with node:crypto (HMAC + timing-safe
  // compare), which the default Edge runtime does not support — opt into
  // the Node.js runtime rather than reimplementing signing on Web Crypto.
  runtime: "nodejs",
  matcher: [
    /*
     * Run on everything except Next.js internals and static files, so
     * the gate covers every guest-facing route by default.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
