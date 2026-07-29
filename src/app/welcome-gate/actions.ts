"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyInviteCode, getClientIp } from "@/lib/auth/invite-code";
import { setGuestSessionCookieForAction } from "@/lib/auth/guest-session";

export interface InviteCodeResult {
  ok: boolean;
}

// Shares verifyInviteCode with /i/[code] — this form is a second door onto
// the same lock, not a separate one. On success it sets the cookie and
// redirects itself; the caller only ever needs to handle the failure case.
export async function submitInviteCode(
  rawCode: string,
): Promise<InviteCodeResult> {
  const code = rawCode.trim().toUpperCase().replace(/\s+/g, "");

  if (!code) {
    return { ok: false };
  }

  const ip = getClientIp(await headers());
  const result = await verifyInviteCode(code, ip);

  if (!result.ok) {
    return { ok: false };
  }

  await setGuestSessionCookieForAction(result.guestId);
  redirect("/");
}
