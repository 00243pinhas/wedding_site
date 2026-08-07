import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAdminDashboardData } from "@/lib/admin/dashboard-data";

const HEADER = ["Family name", "Member name", "Attending", "Responded at"];

function csvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function csvRow(values: string[]): string {
  return values.map(csvField).join(",");
}

function attendingLabel(attending: boolean | null): string {
  if (attending === true) return "Coming";
  if (attending === false) return "Not coming";
  return "No response";
}

// Same authenticated + RLS-scoped read as /admin itself (never the
// service-role client) — this route is reachable directly, not only via
// the dashboard's download link, so it re-checks auth on its own.
// One row per MEMBER (not per family) — this is the caterer's list.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { families, summary } = await getAdminDashboardData(supabase);

  const lines = [csvRow(HEADER)];
  for (const family of families) {
    for (const member of family.members) {
      lines.push(
        csvRow([
          family.familyName,
          member.fullName,
          attendingLabel(member.attending),
          member.respondedAt ?? "",
        ]),
      );
    }
  }

  lines.push("");
  lines.push(
    csvRow(["Total attending headcount", String(summary.totalAttending)]),
  );

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="rsvps.csv"',
    },
  });
}
