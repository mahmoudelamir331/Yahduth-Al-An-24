import { supabase } from "./supabase-browser";

export type AdSlot = { enabled?: boolean; type?: "image" | "adsense"; image_url?: string | null; target_url?: string | null; code?: string | null };

type SiteSettings = {
  maintenance_enabled: boolean;
  maintenance_message: string;
  maintenance_ends_at: string | null;
  live_enabled: boolean;
  live_url: string | null;
  live_platform: string | null;
  content_protection_enabled: boolean;
  anti_adblock_enabled: boolean;
  ads: { header?: AdSlot; article?: AdSlot; sidebar?: AdSlot };
  logo_url: string | null;
};

export type PublicCategory = { name: string; slug: string };

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("maintenance_enabled,maintenance_message,maintenance_ends_at,live_streams,content_protection_enabled,anti_adblock_enabled,ads,logo_url")
      .eq("id", true)
      .single();
    if (error || !data) return null;
    const row = data as {
      maintenance_enabled: boolean;
      maintenance_message: string;
      maintenance_ends_at: string | null;
      live_streams: { enabled?: boolean; url?: string | null; platform?: string | null } | null;
      content_protection_enabled?: boolean;
      anti_adblock_enabled?: boolean;
      ads?: SiteSettings["ads"] | null;
      logo_url?: string | null;
    };
    return {
      maintenance_enabled: row.maintenance_enabled,
      maintenance_message: row.maintenance_message,
      maintenance_ends_at: row.maintenance_ends_at,
      live_enabled: row.live_streams?.enabled ?? false,
      live_url: row.live_streams?.url ?? null,
      live_platform: row.live_streams?.platform ?? null,
      content_protection_enabled: row.content_protection_enabled ?? false,
      anti_adblock_enabled: row.anti_adblock_enabled ?? false,
      ads: row.ads ?? {},
      logo_url: row.logo_url ?? null,
    };
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
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("name,slug")
      .eq("is_active", true)
      .order("name", { ascending: true });
    return error || !data ? [] : ((data as PublicCategory[]));
  } catch {
    return [];
  }
}
