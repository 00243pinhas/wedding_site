import type { Metadata } from "next";
import Link from "next/link";
import { InviteCodeForm } from "@/components/invite-code-form";

// Shown by middleware.ts to anyone without a valid guest_session cookie.
// Deliberately outside the (site) route group and excluded from the guest
// gate itself — nav/footer would only advertise pages this visitor can't
// reach yet, and gating this page would redirect it to itself forever.
//
// Two doors set the same guest_session cookie: a direct /i/[code] link
// (e.g. a QR code on a card) and the form here. Both call
// verifyInviteCode — see src/lib/auth/invite-code.ts.
export const metadata: Metadata = {
  title: "Jerry & Pam",
  robots: { index: false, follow: false },
};

export default function WelcomeGatePage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-sm text-center">
        <p className="text-xs tracking-[0.3em] text-navy uppercase">
          Jerry &amp; Pam
        </p>
        <h1 className="mt-4 font-display text-4xl text-navy sm:text-5xl">
          This invitation is personal
        </h1>
        <p className="mt-6 leading-[1.7] text-ink">
          This celebration is by invitation. Please enter the code from your
          invitation to continue.
        </p>

        <InviteCodeForm />

        <p className="mt-8 text-sm leading-[1.7] text-ink/70">
          Can&rsquo;t find your code?{" "}
          <Link href="/contact" className="text-navy hover:underline">
            Reach out to Nancy or Esa
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
