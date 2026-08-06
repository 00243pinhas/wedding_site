import Link from "next/link";
import { getGuestSessionFromCookie } from "@/lib/auth/guest-session";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";
import { RsvpForm } from "@/components/rsvp-form";

// The guest_session cookie is the only source of identity here — a family
// that never opened its personal /i/{code} link never sees the form. An
// owner session (see invite-code.ts's OWNER_ACCESS_CODE bypass) has no
// family_id, so it's handled as its own branch rather than falling through
// to loadFamily — there's no families row to load.
export default async function RsvpPage() {
  const session = await getGuestSessionFromCookie();
  const family =
    session?.type === "family" ? await loadFamily(session.familyId) : null;

  return (
    <div className="mx-auto max-w-[560px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageHeader eyebrow="Join Us" title="RSVP" />

      {session?.type === "owner" ? (
        <Reveal className="mt-12 md:mt-16">
          <p className="leading-[1.7] text-ink">
            You&rsquo;re viewing as an owner — RSVP is for guests.
          </p>
        </Reveal>
      ) : family ? (
        <RsvpForm
          familyName={family.family_name}
          members={family.members}
          initialDietaryNotes={family.dietary_notes ?? ""}
          initialMessage={family.message ?? ""}
        />
      ) : (
        <Reveal className="mt-12 md:mt-16">
          <p className="leading-[1.7] text-ink">
            We couldn&rsquo;t find your invitation here. Please open the
            RSVP link from your personal invitation to respond.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block border-b border-navy pb-0.5 text-xs tracking-[0.3em] text-navy uppercase"
          >
            Contact Nancy or Esa
          </Link>
        </Reveal>
      )}
    </div>
  );
}

async function loadFamily(familyId: string) {
  const supabase = createAdminClient();

  const { data: familyRow } = await supabase
    .from("families")
    .select("family_name, dietary_notes, message")
    .eq("id", familyId)
    .maybeSingle();

  if (!familyRow) return null;

  const { data: members } = await supabase
    .from("members")
    .select("id, full_name, attending")
    .eq("family_id", familyId)
    .order("created_at", { ascending: true });

  return { ...familyRow, members: members ?? [] };
}
