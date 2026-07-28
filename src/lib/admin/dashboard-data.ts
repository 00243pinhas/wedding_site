import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

type GuestRow = Database["public"]["Tables"]["guests"]["Row"];
type RsvpRow = Database["public"]["Tables"]["rsvps"]["Row"];

export interface AdminGuestRow {
  id: string;
  fullName: string;
  inviteCode: string;
  maxPartySize: number;
  status: GuestRow["rsvp_status"];
  confirmedPartySize: number | null;
  dietaryNotes: string | null;
  message: string | null;
  respondedAt: string | null;
  responseCount: number;
}

export interface AdminSummary {
  totalGuests: number;
  respondedCount: number;
  totalAttendingHeadcount: number;
  declinedCount: number;
}

// RLS scopes both selects to the admin emails in the `authenticated` policy
// (see supabase/migrations/20260720120000_create_guests_and_rsvps.sql). A
// signed-in non-admin gets empty arrays back, not an error — that's the
// correct "sees nothing" behavior, not a bug in this function.
export async function getAdminDashboardData(
  supabase: SupabaseClient<Database>,
): Promise<{ guests: AdminGuestRow[]; summary: AdminSummary }> {
  const [{ data: guests }, { data: rsvps }] = await Promise.all([
    supabase.from("guests").select("*").order("full_name", { ascending: true }),
    supabase.from("rsvps").select("*").order("created_at", { ascending: false }),
  ]);

  const rsvpsByGuest = new Map<string, RsvpRow[]>();
  for (const rsvp of rsvps ?? []) {
    const list = rsvpsByGuest.get(rsvp.guest_id);
    if (list) {
      list.push(rsvp);
    } else {
      rsvpsByGuest.set(rsvp.guest_id, [rsvp]);
    }
  }

  const rows: AdminGuestRow[] = (guests ?? []).map((guest) => {
    // rsvps is ordered created_at desc, so index 0 is the latest response —
    // a guest who changed their answer still surfaces only the current one.
    const guestRsvps = rsvpsByGuest.get(guest.id) ?? [];
    const latest = guestRsvps[0] ?? null;

    return {
      id: guest.id,
      fullName: guest.full_name,
      inviteCode: guest.invite_code,
      maxPartySize: guest.max_party_size,
      status: guest.rsvp_status,
      confirmedPartySize:
        guest.rsvp_status === "pending" ? null : (latest?.party_size ?? null),
      dietaryNotes: latest?.dietary_notes ?? null,
      message: latest?.message ?? null,
      respondedAt: guest.responded_at,
      responseCount: guestRsvps.length,
    };
  });

  const summary: AdminSummary = {
    totalGuests: rows.length,
    respondedCount: rows.filter((r) => r.status !== "pending").length,
    totalAttendingHeadcount: rows
      .filter((r) => r.status === "attending")
      .reduce((sum, r) => sum + (r.confirmedPartySize ?? 0), 0),
    declinedCount: rows.filter((r) => r.status === "declined").length,
  };

  return { guests: rows, summary };
}
