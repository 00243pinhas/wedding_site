import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAdminDashboardData } from "@/lib/admin/dashboard-data";

const HEADER = [
  "Full name",
  "Invite code",
  "Allocated party size",
  "Status",
  "Confirmed party size",
  "Dietary notes",
  "Message",
  "Responded at",
  "Responded more than once",
];

function csvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function csvRow(values: string[]): string {
  return values.map(csvField).join(",");
}

// Same authenticated + RLS-scoped read as /admin itself (never the
// service-role client) — this route is reachable directly, not only via
// the dashboard's download link, so it re-checks auth on its own.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { guests, summary } = await getAdminDashboardData(supabase);

  const lines = [csvRow(HEADER)];
  for (const guest of guests) {
    lines.push(
      csvRow([
        guest.fullName,
        guest.inviteCode,
        String(guest.maxPartySize),
        guest.status,
        guest.confirmedPartySize === null ? "" : String(guest.confirmedPartySize),
        guest.dietaryNotes ?? "",
        guest.message ?? "",
        guest.respondedAt ?? "",
        guest.responseCount > 1 ? "yes" : "",
      ]),
    );
  }

  lines.push("");
  lines.push(csvRow(["Total attending headcount", String(summary.totalAttendingHeadcount)]));

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="rsvps.csv"',
    },
  });
}
