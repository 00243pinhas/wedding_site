import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

type MemberRow = Database["public"]["Tables"]["members"]["Row"];

export interface AdminMemberRow {
  id: string;
  fullName: string;
  attending: boolean | null;
  respondedAt: string | null;
}

export interface AdminFamilyRow {
  id: string;
  familyName: string;
  inviteCode: string;
  dietaryNotes: string | null;
  message: string | null;
  members: AdminMemberRow[];
  totalMembers: number;
  attendingCount: number;
  respondedCount: number;
}

export interface AdminSummary {
  totalFamilies: number;
  totalMembers: number;
  totalAttending: number;
  totalResponded: number;
  totalDeclined: number;
}

// RLS scopes both selects to the admin emails in the `authenticated`
// policies (see supabase/migrations/20260806120000_create_families_and_members.sql).
// A signed-in non-admin gets empty arrays back, not an error — that's the
// correct "sees nothing" behavior, not a bug in this function. The
// headcount that matters to the caterer counts MEMBERS (individuals), not
// families — a family of 4 with 3 attending contributes 3, not 1.
export async function getAdminDashboardData(
  supabase: SupabaseClient<Database>,
): Promise<{ families: AdminFamilyRow[]; summary: AdminSummary }> {
  const [{ data: families }, { data: members }] = await Promise.all([
    supabase
      .from("families")
      .select("*")
      .order("family_name", { ascending: true }),
    supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: true }),
  ]);

  const membersByFamily = new Map<string, MemberRow[]>();
  for (const member of members ?? []) {
    const list = membersByFamily.get(member.family_id);
    if (list) {
      list.push(member);
    } else {
      membersByFamily.set(member.family_id, [member]);
    }
  }

  const familyRows: AdminFamilyRow[] = (families ?? []).map((family) => {
    const familyMembers = membersByFamily.get(family.id) ?? [];

    return {
      id: family.id,
      familyName: family.family_name,
      inviteCode: family.invite_code,
      dietaryNotes: family.dietary_notes,
      message: family.message,
      members: familyMembers.map((m) => ({
        id: m.id,
        fullName: m.full_name,
        attending: m.attending,
        respondedAt: m.responded_at,
      })),
      totalMembers: familyMembers.length,
      attendingCount: familyMembers.filter((m) => m.attending === true)
        .length,
      respondedCount: familyMembers.filter((m) => m.attending !== null)
        .length,
    };
  });

  const allMembers = members ?? [];
  const summary: AdminSummary = {
    totalFamilies: familyRows.length,
    totalMembers: allMembers.length,
    totalAttending: allMembers.filter((m) => m.attending === true).length,
    totalResponded: allMembers.filter((m) => m.attending !== null).length,
    totalDeclined: allMembers.filter((m) => m.attending === false).length,
  };

  return { families: familyRows, summary };
}
