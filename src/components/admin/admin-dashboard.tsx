import { AdminSignOutButton } from "./admin-sign-out-button";
import type { AdminGuestRow, AdminSummary } from "@/lib/admin/dashboard-data";

interface AdminDashboardProps {
  email: string;
  guests: AdminGuestRow[];
  summary: AdminSummary;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function statusLabel(status: AdminGuestRow["status"]) {
  if (status === "attending") return "Attending";
  if (status === "declined") return "Declined";
  return "Pending";
}

const th = "px-4 py-3 text-xs tracking-[0.15em] text-navy uppercase";
const td = "px-4 py-3 align-top text-ink/80";

export function AdminDashboard({ email, guests, summary }: AdminDashboardProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-blue pb-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-navy uppercase">Admin</p>
          <h1 className="mt-1 font-display text-3xl text-navy">RSVPs</h1>
          <p className="mt-1 text-sm text-ink/60">Signed in as {email}</p>
        </div>
        <AdminSignOutButton />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-px border border-blue bg-blue sm:grid-cols-3">
        <div className="bg-ivory px-6 py-5">
          <p className="text-xs tracking-[0.2em] text-navy uppercase">
            Attending headcount
          </p>
          <p className="mt-2 font-display text-4xl text-navy">
            {summary.totalAttendingHeadcount}
          </p>
        </div>
        <div className="bg-ivory px-6 py-5">
          <p className="text-xs tracking-[0.2em] text-navy uppercase">Responded</p>
          <p className="mt-2 font-display text-4xl text-navy">
            {summary.respondedCount}{" "}
            <span className="text-lg text-ink/50">
              of {summary.totalGuests}
            </span>
          </p>
        </div>
        <div className="bg-ivory px-6 py-5">
          <p className="text-xs tracking-[0.2em] text-navy uppercase">Declined</p>
          <p className="mt-2 font-display text-4xl text-navy">
            {summary.declinedCount}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60">
          {summary.totalAttendingHeadcount} attending — this is the headcount
          for the caterer.
        </p>
        <a
          href="/admin/export"
          className="border border-navy bg-navy px-6 py-3 text-xs tracking-[0.2em] text-ivory uppercase transition-colors md:hover:bg-[#3a5170]"
        >
          Download CSV
        </a>
      </div>

      <div className="mt-8 overflow-x-auto border border-blue">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-blue bg-blue/10">
              <th className={th}>Name</th>
              <th className={th}>Invite code</th>
              <th className={th}>Allocated</th>
              <th className={th}>Status</th>
              <th className={th}>Confirmed</th>
              <th className={th}>Dietary notes</th>
              <th className={th}>Message</th>
              <th className={th}>Responded</th>
            </tr>
          </thead>
          <tbody>
            {guests.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-ink/60">
                  No guests to show.
                </td>
              </tr>
            )}
            {guests.map((guest) => (
              <tr key={guest.id} className="border-b border-blue/50 last:border-b-0">
                <td className={`${td} text-ink`}>{guest.fullName}</td>
                <td className={`${td} font-mono`}>{guest.inviteCode}</td>
                <td className={td}>{guest.maxPartySize}</td>
                <td className={`${td} text-ink`}>{statusLabel(guest.status)}</td>
                <td className={td}>
                  {guest.confirmedPartySize === null ? "—" : guest.confirmedPartySize}
                </td>
                <td className={td}>{guest.dietaryNotes || "—"}</td>
                <td className={td}>{guest.message || "—"}</td>
                <td className={td}>
                  {formatDate(guest.respondedAt)}
                  {guest.responseCount > 1 && (
                    <span className="ml-2 whitespace-nowrap text-xs text-navy">
                      (responded {guest.responseCount}×)
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
