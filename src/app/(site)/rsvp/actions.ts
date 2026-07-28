"use server";

import { getGuestIdFromCookie } from "@/lib/auth/guest-session";
import { createAdminClient } from "@/lib/supabase/admin";

export interface RsvpInput {
  attending: boolean;
  partySize: number;
  dietaryNotes: string;
  message: string;
}

export interface RsvpResult {
  ok: boolean;
  error?: string;
  attending?: boolean;
}

// guest_id always comes from the signed guest_session cookie, never from
// the form — a client-supplied id would let one guest submit an RSVP as
// another. This runs with the service-role client, which bypasses RLS, so
// the max_party_size check below is the only guard before the DB trigger.
export async function submitRsvp(input: RsvpInput): Promise<RsvpResult> {
  const guestId = await getGuestIdFromCookie();
  if (!guestId) {
    return {
      ok: false,
      error:
        "We couldn't verify your invitation. Please open the RSVP link from your personal invitation and try again.",
    };
  }

  const supabase = createAdminClient();

  const { data: guest } = await supabase
    .from("guests")
    .select("max_party_size")
    .eq("id", guestId)
    .maybeSingle();

  if (!guest) {
    return {
      ok: false,
      error:
        "We couldn't find your invitation. Please contact Nancy or Esa.",
    };
  }

  const partySize = input.attending ? Math.trunc(input.partySize) : 0;

  if (input.attending && (partySize < 1 || partySize > guest.max_party_size)) {
    return {
      ok: false,
      error: `Please choose a party size between 1 and ${guest.max_party_size}.`,
    };
  }

  const { error } = await supabase.from("rsvps").insert({
    guest_id: guestId,
    attending: input.attending,
    party_size: partySize,
    dietary_notes: input.attending ? input.dietaryNotes.trim() || null : null,
    message: input.message.trim() || null,
  });

  if (error) {
    return {
      ok: false,
      error: "Something went wrong submitting your RSVP. Please try again.",
    };
  }

  await supabase
    .from("guests")
    .update({
      rsvp_status: input.attending ? "attending" : "declined",
      responded_at: new Date().toISOString(),
    })
    .eq("id", guestId);

  return { ok: true, attending: input.attending };
}
