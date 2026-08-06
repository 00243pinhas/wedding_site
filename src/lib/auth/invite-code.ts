import { createHash, timingSafeEqual } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit } from "@/lib/rate-limit";

export type VerifyInviteCodeResult =
  | { ok: true; owner: true }
  | { ok: true; owner: false; familyId: string }
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

  if (isOwnerAccessCode(code)) {
    return { ok: true, owner: true };
  }

  const supabase = createAdminClient();
  const { data: family } = await supabase
    .from("families")
    .select("id")
    .eq("invite_code", code)
    .maybeSingle();

  if (!family) {
    return { ok: false, reason: "not_found" };
  }

  return { ok: true, owner: false, familyId: family.id };
}

// Owner bypass for the couple and the developer to view the live site —
// never looked up against or written to `families`, so owners can't show
// up in the guest list, admin dashboard, CSV, or headcount. Checked before
// the database lookup so an owner entry never touches `families` at all.
//
// SHA-256 both sides first so timingSafeEqual always compares equal-length
// digests: a raw length check on the submitted code would leak length via
// an early return, defeating the point of a constant-time compare.
function isOwnerAccessCode(code: string): boolean {
  const ownerCode = process.env.OWNER_ACCESS_CODE;
  if (!ownerCode) return false;

  const submitted = createHash("sha256").update(code).digest();
  const expected = createHash("sha256").update(ownerCode).digest();
  return timingSafeEqual(submitted, expected);
}

// route.ts reads the IP off NextRequest.headers; the welcome-gate action
// reads it off next/headers' headers() — both are plain Headers objects,
// so one function covers both call sites.
export function getClientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
