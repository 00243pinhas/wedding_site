import type { Metadata } from "next";
import Link from "next/link";

// Shown by middleware.ts to anyone without a valid guest_session cookie.
// Deliberately outside the (site) route group and excluded from the guest
// gate itself — nav/footer would only advertise pages this visitor can't
// reach yet, and gating this page would redirect it to itself forever.
export const metadata: Metadata = {
  title: "Jerry & Pam",
  robots: { index: false, follow: false },
};

export default function WelcomeGatePage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div className="max-w-xl text-center">
        <p className="text-xs tracking-[0.3em] text-navy uppercase">
          Jerry &amp; Pam
        </p>
        <h1 className="mt-4 font-display text-4xl text-navy sm:text-5xl">
          This invitation is personal
        </h1>
        <p className="mt-6 leading-[1.7] text-ink">
          Please use the link from your invitation card to enter the site.
          If you can&rsquo;t find it, reach out to{" "}
          <Link href="/contact" className="text-navy hover:underline">
            Nancy or Esa
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
