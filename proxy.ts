import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function clientAddress(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimit(request: NextRequest) {
  const windowMs = 60_000;
  const limit = 120;
  const key = `${request.nextUrl.pathname}:${clientAddress(request)}`;
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }
  current.count += 1;
  if (current.count <= limit) return null;
  return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.startsWith("/api/notify") || pathname === "/maintenance") return NextResponse.next();
  if (pathname.startsWith("/api")) {
    const retryAfter = rateLimit(request);
    if (retryAfter) return NextResponse.json({ error: "تم تجاوز حد الطلبات، حاول لاحقًا" }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
    if (unsafeMethods.has(request.method)) {
      const origin = request.headers.get("origin");
      const fetchSite = request.headers.get("sec-fetch-site");
      if ((origin && origin !== request.nextUrl.origin) || fetchSite === "cross-site") {
        return NextResponse.json({ error: "طلب غير موثوق" }, { status: 403 });
      }
    }
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin")) return NextResponse.next();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.next();
  try {
    const response = await fetch(`${url}/rest/v1/public_site_settings?select=maintenance_enabled,maintenance_ends_at&id=eq.true`, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" });
    const settings = response.ok ? (await response.json() as { maintenance_enabled?: boolean; maintenance_ends_at?: string | null }[])[0] : null;
    const active = Boolean(settings?.maintenance_enabled) && (!settings?.maintenance_ends_at || new Date(settings.maintenance_ends_at).getTime() > Date.now());
    if (active) return NextResponse.rewrite(new URL("/maintenance", request.url));
  } catch { /* The layout remains the fallback when the settings service is unavailable. */ }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
