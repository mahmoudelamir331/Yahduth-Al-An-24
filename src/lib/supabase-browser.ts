import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(
  url && anonKey && !url.includes("your-project") && !anonKey.includes("your-anon-key"),
);

export const supabase = hasSupabaseConfig
  ? createSupabaseClient(url!, anonKey!)
  : null;

export type PublicArticleRow = {
  id: string;
  title: string;
  excerpt: string;
  content: unknown;
  cover_image_url: string | null;
  author_name: string;
  is_urgent: boolean;
  is_headline: boolean;
  views_count: number;
  read_minutes: number;
  published_at: string | null;
  categories: { name: string; slug: string } | { name: string; slug: string }[] | null;
};

export function toPublicArticle(row: PublicArticleRow, index: number) {
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  const content = Array.isArray(row.content)
    ? row.content.map(String)
    : [String(row.content ?? "")];
  const numericId = Number.parseInt(row.id.replace(/[^0-9]/g, "").slice(-8), 10) || index + 1000;
  return {
    id: numericId,
    slug: row.id,
    category: category?.name ?? "أخبار أسوان",
    categorySlug: category?.slug ?? "aswan-news",
    isUrgent: row.is_urgent,
    title: row.title,
    excerpt: row.excerpt,
    content,
    gradient: "from-slate-900 via-teal-950 to-slate-800",
    imageUrl: row.cover_image_url ?? undefined,
    author: row.author_name,
    date: row.published_at ? new Date(row.published_at).toLocaleDateString("ar-EG") : "الآن",
    views: new Intl.NumberFormat("ar-EG", { notation: "compact" }).format(row.views_count ?? 0),
    readTime: `${row.read_minutes ?? 1} دقائق`,
    tags: [],
  };
}

export async function loadPublicData() {
  if (!supabase) return null;
  const [articlesResult, settingsResult, categoriesResult] = await Promise.all([
    supabase
      .from("articles")
      .select("id,title,excerpt,content,cover_image_url,author_name,is_urgent,is_headline,views_count,read_minutes,published_at,categories(name,slug)")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false }),
    supabase
      .from("site_settings")
      .select("maintenance_enabled,maintenance_message,maintenance_ends_at,live_streams")
      .eq("id", true)
      .maybeSingle(),
    supabase.from("categories").select("name,slug").eq("is_active", true).order("name", { ascending: true }),
  ]);
  if (articlesResult.error) throw articlesResult.error;
  return {
    articles: (articlesResult.data ?? []).map((row, index) => toPublicArticle(row as PublicArticleRow, index)),
    settings: settingsResult.data ?? null,
    categories: (categoriesResult.data ?? []) as { name: string; slug: string }[],
  };
}
