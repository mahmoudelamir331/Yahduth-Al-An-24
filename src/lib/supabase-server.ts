import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * عميل Supabase مخصص للخادم (Server‑side) فقط.
 * ⚠️ لا يُستخدم أبداً في المتصفح: Service Role Key المدخلة هنا تملك صلاحيات كاملة (تجاوز RLS).
 * لا تستورد هذا الملف من أي ملف `"use client"`.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasServerConfig = Boolean(
  url && serviceRoleKey && !url.includes("your-project") && !serviceRoleKey.includes("your-service-role"),
);

export const supabaseServer: SupabaseClient | null = hasServerConfig
  ? createSupabaseClient(url!, serviceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  : null;

/** عميل الخادم مع منع استعماله من المتصفح (سلامة إضافية). */
export function getServerClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getServerClient() ممنوع في المتصفح — Service Role لا تُكشف للعميل أبداً.");
  }
  if (!supabaseServer) {
    throw new Error("supabaseServer غير مُهيأ: تأكد من ضبط SUPABASE_SERVICE_ROLE_KEY على الخادم.");
  }
  return supabaseServer;
}

// ============================================================
// فحص الصلاحيات الموحّد — يُستخدم من كل أماكن الخادم فقط
// (API routes, middleware, Server Actions …).
// ⚠️ لا يُستورد من المتصفح أبداً (بيانات المسؤولين سرّية).
// ============================================================

export type Permissions = { isAdmin: boolean; isEditor?: boolean; uid: string | null };

export type AdminUser = { id?: string | null; email?: string | null } | null | undefined;

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** فحص صارم قبل أي عملية خادم — يُرمى خطأ في المتصفح. */
export function checkPermissions(user: AdminUser): Permissions {
  if (typeof window !== "undefined") {
    throw new Error("checkPermissions() ممنوع في المتصفح — بيانات الإدارة لا تُكشف للعميل أبداً.");
  }
  if (!user) return { isAdmin: false, uid: null };
  const email = (user.email ?? "").trim().toLowerCase();
  return {
    isAdmin: ADMIN_EMAILS.includes(email),
    isEditor: ADMIN_EMAILS.includes(email),
    uid: user.id ?? null,
  };
}

export const canManageArticles = (perms: Permissions) => perms.isAdmin || perms.isEditor === true;