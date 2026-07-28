import Link from "next/link";
import { getGuestIdFromCookie } from "@/lib/auth/guest-session";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/lib/motion/reveal";
import { RsvpForm } from "@/components/rsvp-form";

// The guest_session cookie is the only source of identity here — a guest
// who never opened their personal /i/{code} link never sees the form.
export default async function RsvpPage() {
  const guestId = await getGuestIdFromCookie();
  const guest = guestId ? await loadGuest(guestId) : null;

  return (
    <div className="mx-auto max-w-[560px] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <PageHeader eyebrow="Join Us" title="RSVP" />

      {guest ? (
        <RsvpForm
          fullName={guest.full_name}
          maxPartySize={guest.max_party_size}
          initialRsvp={guest.latestRsvp}
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

async function loadGuest(guestId: string) {
  const supabase = createAdminClient();

  const { data: guestRow } = await supabase
    .from("guests")
    .select("full_name, max_party_size")
    .eq("id", guestId)
    .maybeSingle();

  if (!guestRow) return null;

  const { data: latestRsvp } = await supabase
    .from("rsvps")
    .select("attending, party_size, dietary_notes, message")
    .eq("guest_id", guestId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return { ...guestRow, latestRsvp: latestRsvp ?? null };
}
