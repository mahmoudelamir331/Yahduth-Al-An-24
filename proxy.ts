import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.startsWith("/api/notify") || pathname === "/maintenance") return NextResponse.next();
  if (pathname.startsWith("/admin")) return NextResponse.next();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.next();
  try {
    const response = await fetch(`${url}/rest/v1/site_settings?select=maintenance_enabled,maintenance_ends_at&id=eq.true`, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" });
    const settings = response.ok ? (await response.json() as { maintenance_enabled?: boolean; maintenance_ends_at?: string | null }[])[0] : null;
    const active = Boolean(settings?.maintenance_enabled) && (!settings?.maintenance_ends_at || new Date(settings.maintenance_ends_at).getTime() > Date.now());
    if (active) return NextResponse.rewrite(new URL("/maintenance", request.url));
  } catch { /* The layout remains the fallback when the settings service is unavailable. */ }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
