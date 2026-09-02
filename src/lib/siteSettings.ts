type SiteSettings = {
  maintenance_enabled: boolean;
  maintenance_message: string;
  maintenance_ends_at: string | null;
  live_enabled: boolean;
  live_url: string | null;
  live_platform: string | null;
  content_protection_enabled: boolean;
  anti_adblock_enabled: boolean;
};

export type PublicCategory = { name: string; slug: string };

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  try {
    const response = await fetch(
      `${url}/rest/v1/site_settings?select=maintenance_enabled,maintenance_message,maintenance_ends_at,live_enabled,live_url,live_platform,content_protection_enabled,anti_adblock_enabled&id=eq.true`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
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

export async function getActiveCategories(): Promise<PublicCategory[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return [];
  try {
    const response = await fetch(`${url}/rest/v1/categories?select=name,slug&is_active=eq.true&order=name.asc`, { cache: "no-store", signal: AbortSignal.timeout(5000), headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } });
    return response.ok ? ((await response.json()) as PublicCategory[]) : [];
  } catch {
    return [];
  }
}
