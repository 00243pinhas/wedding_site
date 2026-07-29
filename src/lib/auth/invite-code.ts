import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit } from "@/lib/rate-limit";

export type VerifyInviteCodeResult =
  | { ok: true; guestId: string }
  | { ok: false; reason: "rate_limited" | "not_found" };

// Shared by the /i/[code] link and the welcome-gate code form — both doors
// onto the guest list must run the exact same lookup and rate limit, or
// one becomes a weaker path for brute-forcing invite codes.
export async function verifyInviteCode(
  code: string,
  ip: string,
): Promise<VerifyInviteCodeResult> {
  if (!checkRateLimit(ip)) {
    return { ok: false, reason: "rate_limited" };
  }

  const supabase = createAdminClient();
  const { data: guest } = await supabase
    .from("guests")
    .select("id")
    .eq("invite_code", code)
    .maybeSingle();

  if (!guest) {
    return { ok: false, reason: "not_found" };
  }

  return { ok: true, guestId: guest.id };
}

// route.ts reads the IP off NextRequest.headers; the welcome-gate action
// reads it off next/headers' headers() — both are plain Headers objects,
// so one function covers both call sites.
export function getClientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
