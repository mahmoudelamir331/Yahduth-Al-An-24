import { getSiteSettings } from "@/lib/siteSettings";
import { MaintenancePage } from "@/components/MaintenancePage";

export const dynamic = "force-dynamic";

export default async function MaintenanceRoute() {
  const settings = await getSiteSettings();
  return <MaintenancePage message={settings?.maintenance_message || "بنجهزلكم تجربة أحسن، هنرجع قريب."} endsAt={settings?.maintenance_ends_at ?? null} />;
}
