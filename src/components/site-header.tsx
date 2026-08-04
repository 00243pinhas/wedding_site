"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/story", label: "Story" },
  { href: "/details", label: "Details" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
];

// Plain-text nav links only — no button styling here. Blush is reserved
// for the single RSVP call-to-action button on each page, so the nav's
// RSVP link must not compete with it.
//
// RSVP renders outside the hamburger on every breakpoint — it must stay
// visible on mobile even while the rest of the nav is collapsed.
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-blue bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl text-navy">
          Jerry &amp; Pam
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-navy hover:text-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/rsvp"
            className="text-sm tracking-widest text-navy uppercase hover:text-blue"
          >
            RSVP
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-navy md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">Toggle menu</span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-blue md:hidden">
          <ul className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="py-2">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
