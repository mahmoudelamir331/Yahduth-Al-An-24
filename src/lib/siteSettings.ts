type SiteSettings = {
  maintenance_enabled: boolean;
  maintenance_message: string;
  maintenance_ends_at: string | null;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  try {
    const response = await fetch(
      `${url}/rest/v1/site_settings?select=maintenance_enabled,maintenance_message,maintenance_ends_at&id=eq.true`,
      {
        cache: "no-store",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      },
    );
    if (!response.ok) return null;
    const settings = (await response.json()) as SiteSettings[];
    return settings[0] ?? null;
  } catch {
    return null;
  }
}

export function isMaintenanceActive(settings: SiteSettings | null) {
  if (!settings?.maintenance_enabled) return false;
  if (!settings.maintenance_ends_at) return true;
  return new Date(settings.maintenance_ends_at).getTime() > Date.now();
}
