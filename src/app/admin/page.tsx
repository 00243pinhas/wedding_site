import { createClient } from "@/lib/supabase/server";
import { getAdminDashboardData } from "@/lib/admin/dashboard-data";
import { AdminSignIn } from "@/components/admin/admin-sign-in";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

// Auth is Supabase Auth (email/password), entirely separate from the guest
// `guest_session` cookie gate in src/middleware.ts. Data access goes through
// the authenticated server client (src/lib/supabase/server.ts) so the
// `admin_select_guests` / `admin_select_rsvps` RLS policies do the actual
// authorization — a signed-in non-admin simply gets empty results back.
// Never import src/lib/supabase/admin.ts (the service-role client) here.
export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <AdminSignIn />;
  }

  const { guests, summary } = await getAdminDashboardData(supabase);

  return (
    <AdminDashboard email={user.email ?? ""} guests={guests} summary={summary} />
  );
}
