import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest, context: RouteContext<"/api/articles/[id]/view">) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if ((origin && origin !== request.nextUrl.origin) || fetchSite === "cross-site") {
    return NextResponse.json({ error: "Untrusted request" }, { status: 403 });
  }

  const { id } = await context.params;
  const articleId = id.trim();
  if (!articleId || articleId.length > 200) return NextResponse.json({ error: "Invalid article id" }, { status: 400 });

  const existingSession = request.cookies.get("article_viewer")?.value;
  const viewerSession = existingSession ?? randomUUID();
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const viewedOn = new Date().toISOString().slice(0, 10);
  const viewerIdentity = clientIp !== "unknown" ? `ip:${clientIp}` : `session:${viewerSession}`;
  const viewerHash = createHash("sha256").update(`${articleId}:${viewerIdentity}:${viewedOn}`).digest("hex");

  const result = await getServerClient().rpc("record_article_view", {
    target_article_id: articleId,
    target_viewer_hash: viewerHash,
    target_viewed_on: viewedOn,
  });
  if (result.error) return NextResponse.json({ error: "Unable to record view" }, { status: 500 });

  const response = NextResponse.json({ counted: result.data === true });
  if (!existingSession) response.cookies.set("article_viewer", viewerSession, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const dynamic = "force-dynamic";
