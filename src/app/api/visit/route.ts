import "server-only";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { getServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: "طلب غير موثوق" }, { status: 403 });
  if (fetchSite === "cross-site") return NextResponse.json({ error: "طلب غير موثوق" }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const visitorHash = createHash("sha256").update(`${ip}:${userAgent}`).digest("hex");
  const result = await getServerClient().rpc("record_site_visit", { target_visitor_hash: visitorHash });
  if (result.error) return NextResponse.json({ error: "تعذر تسجيل الزيارة" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export const dynamic = "force-dynamic";
