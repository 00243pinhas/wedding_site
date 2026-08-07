"use server";

import { getGuestSessionFromCookie } from "@/lib/auth/guest-session";
import { createAdminClient } from "@/lib/supabase/admin";

export interface MemberResponseInput {
  memberId: string;
  attending: boolean | null;
}

export interface RsvpInput {
  responses: MemberResponseInput[];
  dietaryNotes: string;
  message: string;
}

export interface RsvpResult {
  ok: boolean;
  error?: string;
}

// family_id always comes from the signed guest_session cookie, never from
// the form — a client-supplied id would let one family submit an RSVP as
// another. This runs with the service-role client, which bypasses RLS, so
// the "does this member belong to this family" check below is the only
// guard before the write.
//
// An owner session (see invite-code.ts's OWNER_ACCESS_CODE bypass) has no
// family_id and no families row to attach an RSVP to — reject it here too,
// not just in the page UI, since a Server Action is a public endpoint an
// owner's browser could call directly regardless of what the page renders.
export async function submitRsvp(input: RsvpInput): Promise<RsvpResult> {
  const session = await getGuestSessionFromCookie();
  if (!session || session.type === "owner") {
    return {
      ok: false,
      error:
        session?.type === "owner"
          ? "You're viewing as an owner — RSVP is for guests."
          : "We couldn't verify your invitation. Please open the RSVP link from your personal invitation and try again.",
    };
  }
  const familyId = session.familyId;

  const supabase = createAdminClient();

  const { data: members } = await supabase
    .from("members")
    .select("id")
    .eq("family_id", familyId);

  if (!members || members.length === 0) {
    return {
      ok: false,
      error:
        "We couldn't find your invitation. Please contact Nancy or Esa.",
    };
  }

  // Whoever opens the code answers for the whole family. Each member is
  // one of three states — true (coming), false (not coming), or null (no
  // response yet) — and a member missing from input.responses (e.g. the
  // form never rendered them) is left at null, not coerced to "not
  // attending". responded_at only gets set once a member has an actual
  // answer; it stays null alongside an unset attending.
  const validIds = new Set(members.map((m) => m.id));
  const responseByMember = new Map(
    input.responses
      .filter((r) => validIds.has(r.memberId))
      .map((r) => [r.memberId, r.attending]),
  );
  const respondedAt = new Date().toISOString();

  const updateResults = await Promise.all(
    Array.from(validIds).map((id) => {
      const attending = responseByMember.get(id) ?? null;
      return supabase
        .from("members")
        .update({
          attending,
          responded_at: attending === null ? null : respondedAt,
        })
        .eq("id", id);
    }),
  );

  if (updateResults.some((r) => r.error)) {
    return {
      ok: false,
      error: "Something went wrong submitting your RSVP. Please try again.",
    };
  }

  const { error: familyError } = await supabase
    .from("families")
    .update({
      dietary_notes: input.dietaryNotes.trim() || null,
      message: input.message.trim() || null,
    })
    .eq("id", familyId);

  if (familyError) {
    return {
      ok: false,
      error: "Something went wrong submitting your RSVP. Please try again.",
    };
  }

  return { ok: true };
}
