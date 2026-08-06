import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

// One place for the guest_session cookie — /i/[code] and the welcome-gate
// form write it, Server Components and the RSVP form read it, middleware
// verifies it on every request. Do not touch this cookie anywhere else.
export const COOKIE_NAME = "guest_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 days — outlives the wedding

// A session is either a family (has a families.id the RSVP checklist
// attaches to — one code covers every member of that family) or an owner
// (Jerry, Pam, the developer) previewing the live site. Owner sessions
// never carry a family_id — they must never appear in the guest list,
// admin dashboard, CSV export, or headcount.
export type GuestSession =
  | { type: "family"; familyId: string }
  | { type: "owner" };

function getSecret(): string {
  const secret = process.env.COOKIE_SECRET;
  if (!secret) {
    throw new Error("COOKIE_SECRET is not set.");
  }
  return secret;
}

function sign(payload: string): string {
  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

// Guest ids are UUIDs and the owner payload is the fixed literal "owner" —
// neither contains ".", so splitting on the last "." unambiguously
// separates the payload from its signature. Exported so middleware can
// verify the raw cookie value straight from NextRequest.cookies —
// middleware has no request-scoped AsyncLocalStorage, so the next/headers
// `cookies()` used by getGuestSessionFromCookie below is not available
// there.
export function verifySessionPayload(value: string): string | null {
  const separatorIndex = value.lastIndexOf(".");
  if (separatorIndex === -1) return null;

  const payload = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  return payload;
}

function parseSessionPayload(payload: string | null): GuestSession | null {
  if (!payload) return null;
  if (payload === "owner") return { type: "owner" };
  if (payload.startsWith("family:")) {
    return { type: "family", familyId: payload.slice("family:".length) };
  }
  return null;
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  };
}

// Call from the route handler that just verified an invite code.
export function setFamilySessionCookie(
  response: NextResponse,
  familyId: string,
): void {
  response.cookies.set(COOKIE_NAME, sign(`family:${familyId}`), cookieOptions());
}

// Call from the Server Action that just verified an invite code — same
// signing and options as setFamilySessionCookie, but through next/headers'
// cookies() since a Server Action has no NextResponse to attach to.
export async function setFamilySessionCookieForAction(
  familyId: string,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sign(`family:${familyId}`), cookieOptions());
}

// Owner entry (see invite-code.ts's OWNER_ACCESS_CODE bypass) never touches
// `families` — there's no family_id to sign, just the "owner" marker.
export function setOwnerSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, sign("owner"), cookieOptions());
}

// Server Action equivalent of setOwnerSessionCookie — same relationship as
// setFamilySessionCookieForAction is to setFamilySessionCookie.
export async function setOwnerSessionCookieForAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sign("owner"), cookieOptions());
}

// Call from Server Components / the RSVP form to read the signed-in
// session. Returns null if there is no cookie or the signature doesn't
// verify.
export async function getGuestSessionFromCookie(): Promise<GuestSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return parseSessionPayload(verifySessionPayload(raw));
}
