import { NextRequest, NextResponse } from "next/server";
import {
  setFamilySessionCookie,
  setOwnerSessionCookie,
} from "@/lib/auth/guest-session";
import { verifyInviteCode, getClientIp } from "@/lib/auth/invite-code";

// The guest entry point: /i/{code}. A Route Handler, not a page, because
// the match path needs to set a cookie and redirect — Next only allows
// mutating cookies from a Server Action or Route Handler, never from a
// Server Component render. The lookup and rate limit live in
// verifyInviteCode, shared with the welcome-gate code form — this is one
// of two doors onto the same guest_session cookie, not its own gate.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const ip = getClientIp(request.headers);

  const result = await verifyInviteCode(code, ip);

  // Same response whether the code is malformed, simply not in the
  // table, or rate limited — never give an attacker a signal to
  // distinguish the three.
  if (!result.ok) {
    return notFoundResponse(result.reason === "rate_limited" ? 429 : 200);
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  if (result.owner) {
    setOwnerSessionCookie(response);
  } else {
    setFamilySessionCookie(response, result.familyId);
  }
  return response;
}

function notFoundResponse(status: number): NextResponse {
  return new NextResponse(NOT_FOUND_HTML, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// Hand-rolled HTML, not the usual JSX + Tailwind: this Route Handler
// returns a raw Response, so it never passes through Next's page
// rendering pipeline and has no access to the site's compiled CSS or
// next/font output. Styles are inlined so the page still looks on-brand
// (ivory ground, navy serif heading, letterspaced eyebrow) without
// depending on either.
const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Jerry &amp; Pam</title>
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fdfbf8;
        color: #1f2937;
        font-family: Georgia, "Times New Roman", serif;
        padding: 24px;
      }
      .card {
        max-width: 32rem;
        text-align: center;
      }
      .eyebrow {
        margin: 0 0 1rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 0.75rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: #4a668d;
      }
      h1 {
        margin: 0 0 1.25rem;
        color: #4a668d;
        font-weight: 500;
        font-size: 2rem;
        line-height: 1.25;
      }
      p {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.7;
      }
      a {
        color: #4a668d;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="eyebrow">Jerry &amp; Pam</p>
      <h1>We couldn&rsquo;t find that invitation.</h1>
      <p>
        Please check the link on your card, or reach out to
        <a href="/contact">Nancy or Esa</a>.
      </p>
    </div>
  </body>
</html>`;
