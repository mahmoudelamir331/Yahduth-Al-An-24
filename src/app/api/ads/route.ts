import "server-only";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { getServerClient } from "@/lib/supabase-server";

const fields = "id,title,image_url,target_url,custom_code,placement,ad_type,start_date,end_date";
const placements = new Set(["header", "sidebar", "in_article", "home_page"]);

function trusted(request: NextRequest) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  return !(origin && origin !== request.nextUrl.origin) && fetchSite !== "cross-site";
}

export async function GET(request: NextRequest) {
  const placement = request.nextUrl.searchParams.get("placement");
  if (!placement || !placements.has(placement)) return NextResponse.json({ ads: [] });
  const now = new Date().toISOString();
  const result = await getServerClient()
    .from("ads")
    .select(fields)
    .eq("status", true)
    .eq("placement", placement)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order("created_at", { ascending: false })
    .limit(1);
  if (result.error) return NextResponse.json({ error: "تعذر تحميل الإعلان" }, { status: 500 });
  return NextResponse.json({ ads: result.data ?? [] }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}

export async function POST(request: NextRequest) {
  if (!trusted(request)) return NextResponse.json({ error: "طلب غير موثوق" }, { status: 403 });
  const body = await request.json().catch(() => null) as { id?: unknown } | null;
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  if (!id || id.length > 100) return NextResponse.json({ error: "معرف الإعلان غير صالح" }, { status: 400 });
  const hash = createHash("sha256").update(`${id}:${request.headers.get("user-agent") ?? "unknown"}:${new Date().toISOString().slice(0, 13)}`).digest("hex");
  const result = await getServerClient().rpc("track_ad_click", { target_ad_id: id });
  if (result.error) return NextResponse.json({ error: "تعذر تسجيل النقرة" }, { status: 500 });
  return NextResponse.json({ ok: true, request_hash: hash.slice(0, 8) });
}

export const dynamic = "force-dynamic";
