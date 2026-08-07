"use client";

import { useState } from "react";
import { AdminSignOutButton } from "./admin-sign-out-button";
import type { AdminFamilyRow, AdminSummary } from "@/lib/admin/dashboard-data";

interface AdminDashboardProps {
  email: string;
  families: AdminFamilyRow[];
  summary: AdminSummary;
}

function memberStatusLabel(attending: boolean | null) {
  if (attending === true) return "Coming";
  if (attending === false) return "Not coming";
  return "No response yet";
}

const th = "px-4 py-3 text-xs tracking-[0.15em] text-navy uppercase";

export function AdminDashboard({
  email,
  families,
  summary,
}: AdminDashboardProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-blue pb-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-navy uppercase">
            Admin
          </p>
          <h1 className="mt-1 font-display text-3xl text-navy">RSVPs</h1>
          <p className="mt-1 text-sm text-ink/60">Signed in as {email}</p>
        </div>
        <AdminSignOutButton />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-px border border-blue bg-blue sm:grid-cols-4">
        <div className="bg-ivory px-6 py-5">
          <p className="text-xs tracking-[0.2em] text-navy uppercase">
            Attending
          </p>
          <p className="mt-2 font-display text-4xl text-navy">
            {summary.totalAttending}
          </p>
        </div>
        <div className="bg-ivory px-6 py-5">
          <p className="text-xs tracking-[0.2em] text-navy uppercase">
            Not Coming
          </p>
          <p className="mt-2 font-display text-4xl text-navy">
            {summary.totalNotComing}
          </p>
        </div>
        <div className="bg-ivory px-6 py-5">
          <p className="text-xs tracking-[0.2em] text-navy uppercase">
            No Response Yet
          </p>
          <p className="mt-2 font-display text-4xl text-navy">
            {summary.totalNoResponse}
          </p>
        </div>
        <div className="bg-ivory px-6 py-5">
          <p className="text-xs tracking-[0.2em] text-navy uppercase">
            Families
          </p>
          <p className="mt-2 font-display text-4xl text-navy">
            {summary.totalFamilies}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60">
          {summary.totalAttending} attending — this is the headcount for the
          caterer.
        </p>
        <a
          href="/admin/export"
          className="border border-navy bg-navy px-6 py-3 text-xs tracking-[0.2em] text-ivory uppercase transition-colors md:hover:bg-[#3a5170]"
        >
          Download CSV
        </a>
      </div>

      <div className="mt-8 overflow-x-auto border border-blue">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-blue bg-blue/10">
              <th className={th} aria-hidden="true"></th>
              <th className={th}>Family</th>
              <th className={th}>Invite code</th>
              <th className={th}>RSVP</th>
            </tr>
          </thead>
          <tbody>
            {families.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-ink/60">
                  No families to show.
                </td>
              </tr>
            )}
            {families.map((family) => (
              <FamilyRows
                key={family.id}
                family={family}
                isOpen={expanded.has(family.id)}
                onToggle={() => toggle(family.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FamilyRows({
  family,
  isOpen,
  onToggle,
}: {
  family: AdminFamilyRow;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr className="border-b border-blue/50 last:border-b-0">
        <td className="px-4 py-3 align-top">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="flex h-7 w-7 items-center justify-center border border-blue text-navy md:hover:border-navy"
          >
            {isOpen ? "−" : "+"}
          </button>
        </td>
        <td className="px-4 py-3 align-top text-ink">{family.familyName}</td>
        <td className="px-4 py-3 align-top font-mono text-ink/80">
          {family.inviteCode}
        </td>
        <td className="px-4 py-3 align-top text-ink/80">
          {family.attendingCount} coming, {family.notComingCount} not coming,{" "}
          {family.noResponseCount} no response
        </td>
      </tr>
      {isOpen && (
        <tr className="border-b border-blue/50 bg-blue/5 last:border-b-0">
          <td aria-hidden="true" />
          <td colSpan={3} className="px-4 py-4">
            <ul className="space-y-2">
              {family.members.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between gap-4 text-sm text-ink"
                >
                  <span>{member.fullName}</span>
                  <span className="text-xs tracking-[0.1em] text-navy uppercase">
                    {memberStatusLabel(member.attending)}
                  </span>
                </li>
              ))}
            </ul>
            {(family.dietaryNotes || family.message) && (
              <div className="mt-3 space-y-1 border-t border-blue/50 pt-3 text-xs text-ink/70">
                {family.dietaryNotes && (
                  <p>Dietary notes: {family.dietaryNotes}</p>
                )}
                {family.message && <p>Message: {family.message}</p>}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
