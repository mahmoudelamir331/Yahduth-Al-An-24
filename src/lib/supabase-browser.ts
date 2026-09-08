import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ============================================================
// عميل المتصفح (Browser) الموحّد — يستخدم anon key فقط.
// كل القيم العامة والأنواع والمُساعدين هنا تُصدَّر لبقية المشروع
// (لا توجد نسخ مكررة من الأنواع في ملفات أخرى).
// ============================================================
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

export function toPublicArticle(row: PublicArticleRow) {
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  const content = Array.isArray(row.content)
    ? row.content.map(String)
    : [String(row.content ?? "")];
  return {
    id: row.id,
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
      .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
      .order("published_at", { ascending: false, nullsFirst: false }),
    supabase
      .from("site_settings")
      .select("maintenance_enabled,maintenance_message,maintenance_ends_at,live_streams")
      .eq("id", true)
      .maybeSingle(),
    supabase.from("categories").select("name,slug").eq("is_active", true).order("name", { ascending: true }),
  ]);
  if (articlesResult.error) throw articlesResult.error;
  return {
    articles: (articlesResult.data ?? []).map((row) => toPublicArticle(row as PublicArticleRow)),
    settings: settingsResult.data ?? null,
    categories: (categoriesResult.data ?? []) as { name: string; slug: string }[],
  };
}
// ============================================================
// نوع بيانات المستخدم يُعرَّف هنا في المتصفح بدون أي إيميلات
// (لا تُكشف الإيميلات الإدارية أبداً) — كافٍ للتحقق من تسجيل الدخول.
// الإيميلات الإدارية تُقرأ فقط في supabase-server.ts (الخادم).
// ============================================================
export type AdminUser = { id?: string | null; email?: string | null } | null | undefined;

export type Permissions = { isAdmin: boolean; isEditor?: boolean; uid: string | null };

// فحص الصلاحيات الفعلي في supabase-server.ts — يستورد الدوال (وليس
// المتغيرات) من هناك. لا تُضف ADMIN_EMAILS هنا: هذا الملف يُحمّل في
// المتصفح، والإيميلات الإدارية تُقرأ فقط داخل الخادم.
import { checkPermissions, canManageArticles } from "./supabase-server";

// إعادة تصدير للتوافق: sum يونيك checkPermissions و canManageArticles
// من supabase-server دون تعريفها هنا في المتصفح.
export { checkPermissions, canManageArticles };
// ============================================================
// التوحيد: عميل الخادم (Service Role) موجود في
//   src/lib/supabase-server.ts  ←  لا يُستورد من المتصفح أبداً.
// استخدمه فقط داخل ملفات Server (API routes / middleware).
// لا تستدخل Service Role في ملفات Browser حتى لا تُكشف.
// ============================================================
export async function incrementArticleViews(articleId: string) {
  if (!supabase || !articleId.trim()) return;
  await supabase.rpc("increment_article_views", { target_article_id: articleId.trim() });
}
