import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

// One place for the guest_session cookie — /i/[code] writes it, Server
// Components and the RSVP form read it, middleware verifies it on every
// request. Do not touch this cookie anywhere else.
export const COOKIE_NAME = "guest_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 days — outlives the wedding

function getSecret(): string {
  const secret = process.env.COOKIE_SECRET;
  if (!secret) {
    throw new Error("COOKIE_SECRET is not set.");
  }
  return secret;
}

function sign(guestId: string): string {
  const signature = createHmac("sha256", getSecret())
    .update(guestId)
    .digest("hex");
  return `${guestId}.${signature}`;
}

// Guest ids are UUIDs (no "."), so splitting on the last "." unambiguously
// separates the id from its signature. Exported so middleware can verify
// the raw cookie value straight from NextRequest.cookies — middleware has
// no request-scoped AsyncLocalStorage, so the next/headers `cookies()`
// used by getGuestIdFromCookie below is not available there.
export function verifyGuestSessionValue(value: string): string | null {
  const separatorIndex = value.lastIndexOf(".");
  if (separatorIndex === -1) return null;

  const guestId = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  const expected = createHmac("sha256", getSecret())
    .update(guestId)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  return guestId;
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
export function setGuestSessionCookie(
  response: NextResponse,
  guestId: string,
): void {
  response.cookies.set(COOKIE_NAME, sign(guestId), cookieOptions());
}

// Call from the Server Action that just verified an invite code — same
// signing and options as setGuestSessionCookie, but through next/headers'
// cookies() since a Server Action has no NextResponse to attach to.
export async function setGuestSessionCookieForAction(
  guestId: string,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sign(guestId), cookieOptions());
}

// Call from Server Components / the RSVP form to read the signed-in guest.
// Returns null if there is no cookie or the signature doesn't verify.
export async function getGuestIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return verifyGuestSessionValue(raw);
}
