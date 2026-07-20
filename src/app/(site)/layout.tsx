import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Public site chrome (nav + footer). /admin lives outside this group and
// gets its own layout, so it never inherits guest-facing navigation.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
