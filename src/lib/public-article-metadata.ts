import "server-only";

import { cache } from "react";
import { createClient } from "@supabase/supabase-js";

type MetadataArticle = {
  id: string;
  slug: string | null;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  updated_at: string | null;
};

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export const getPublishedArticleForMetadata = cache(async (idOrSlug: string): Promise<MetadataArticle | null> => {
  const supabase = getPublicClient();
  const lookup = idOrSlug.trim();
  if (!supabase || !lookup) return null;

  const select = "id,slug,title,excerpt,cover_image_url,published_at,updated_at";
  const baseQuery = () => supabase
    .from("articles")
    .select(select)
    .eq("status", "published")
    .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
    .limit(1);

  const byId = await baseQuery().eq("id", lookup).maybeSingle();
  if (byId.data) return byId.data as MetadataArticle;
  const bySlug = await baseQuery().eq("slug", lookup).maybeSingle();
  return (bySlug.data as MetadataArticle | null) ?? null;
});

export async function listPublishedArticlesForSitemap() {
  const supabase = getPublicClient();
  if (!supabase) return [];
  const result = await supabase
    .from("articles")
    .select("id,slug,updated_at,published_at")
    .eq("status", "published")
    .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(5000);
  return (result.data ?? []) as Array<{ id: string; slug: string | null; updated_at: string | null; published_at: string | null }>;
}
