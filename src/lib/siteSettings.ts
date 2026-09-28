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
  ticker_enabled: boolean;
  ticker_text: string | null;
  ticker_link: string | null;
  social_links: { facebook: string | null; twitter: string | null; youtube: string | null; instagram: string | null; telegram: string | null; whatsapp: string | null };
};

export type PublicCategory = { name: string; slug: string };

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("public_site_settings")
      .select("maintenance_enabled,maintenance_message,maintenance_ends_at,live_streams,content_protection_enabled,anti_adblock_enabled,ads,logo_url,social_facebook,social_twitter,social_youtube,social_instagram,social_telegram,social_whatsapp,ticker_enabled,ticker_text,ticker_link")
      .eq("id", true)
      .single();
    if (error || !data) return null;
    const row = data as {
      maintenance_enabled: boolean;
      maintenance_message: string;
      maintenance_ends_at: string | null;
      live_streams: Array<{ id: string; youtubeId: string; title: string; channel: string; enabled?: boolean }> | null;
      content_protection_enabled?: boolean;
      anti_adblock_enabled?: boolean;
      ads?: SiteSettings["ads"] | null;
      logo_url?: string | null;
      social_facebook?: string | null;
      social_twitter?: string | null;
      social_youtube?: string | null;
      social_instagram?: string | null;
      social_telegram?: string | null;
      social_whatsapp?: string | null;
      ticker_enabled?: boolean;
      ticker_text?: string | null;
      ticker_link?: string | null;
    };
    return {
      maintenance_enabled: row.maintenance_enabled,
      maintenance_message: row.maintenance_message,
      maintenance_ends_at: row.maintenance_ends_at,
      live_enabled: Array.isArray(row.live_streams) && row.live_streams.some((stream) => stream.enabled !== false),
      live_url: Array.isArray(row.live_streams) ? row.live_streams.find((stream) => stream.enabled !== false)?.youtubeId ?? null : null,
      live_platform: Array.isArray(row.live_streams) && row.live_streams.some((stream) => stream.enabled !== false) ? "youtube" : null,
      content_protection_enabled: row.content_protection_enabled ?? false,
      anti_adblock_enabled: row.anti_adblock_enabled ?? false,
      ads: row.ads ?? {},
      logo_url: row.logo_url ?? null,
      ticker_enabled: row.ticker_enabled === true && Boolean(row.ticker_text?.trim()),
      ticker_text: row.ticker_text ?? null,
      ticker_link: row.ticker_link ?? null,
      social_links: {
        facebook: row.social_facebook ?? null,
        twitter: row.social_twitter ?? null,
        youtube: row.social_youtube ?? null,
        instagram: row.social_instagram ?? null,
        telegram: row.social_telegram ?? null,
        whatsapp: row.social_whatsapp ?? null,
      },
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
