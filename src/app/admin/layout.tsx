// Deliberately outside the (site) route group: /admin does not get the
// public nav/footer, and its Supabase Auth session is unrelated to
// whatever guest-access mechanism eventually lands (see middleware.ts).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-full bg-ivory">{children}</div>;
}
