import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-ivory">
      <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="font-display text-lg">Jerry &amp; Pam</p>
        <p className="mt-2 text-sm text-blue">10 September &middot; 5:00 PM</p>

        <nav className="mt-6">
          <ul className="flex items-center justify-center gap-6">
            <li>
              <Link
                href="/rsvp"
                className="text-xs tracking-widest text-ivory uppercase hover:text-blue"
              >
                RSVP
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-xs tracking-widest text-ivory uppercase hover:text-blue"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
