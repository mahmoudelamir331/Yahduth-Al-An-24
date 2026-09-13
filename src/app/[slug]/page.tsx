import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { sanitizeRichHtml } from "@/lib/sanitize-html";

export const dynamic = "force-dynamic";

type SitePage = { slug: string; title: string; content: string; seo_title: string | null; seo_description: string | null };

async function loadPage(slug: string): Promise<SitePage | null> {
  const { getServerClient } = await import("@/lib/supabase-server");
  const result = await getServerClient()
    .from("site_pages")
    .select("slug,title,content,seo_title,seo_description")
    .eq("slug", slug)
    .eq("is_visible", true)
    .maybeSingle();
  if (result.error) return null;
  return (result.data as SitePage | null) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await loadPage(slug);
  if (!page) return {};
  return {
    title: page.seo_title || `${page.title} - يحدث الآن 24`,
    description: page.seo_description || undefined,
  };
}

export default async function DynamicSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await loadPage(slug);
  if (!page || !page.content) notFound();
  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
      <nav className="flex items-center gap-2 rounded-2xl border-foreground/10 bg-foreground/5 px-4 py-2.5 text-xs font-bold text-foreground/60">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="h-3.5 w-3.5 text-foreground/40" />
        <span className="font-black text-primary">{page.title}</span>
      </nav>
      <article className="rounded-3xl border-foreground/10 bg-background p-6 shadow-lg md:p-10">
        <h1 className="mb-6 text-2xl font-black text-foreground md:text-3xl">{page.title}</h1>
        <div className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground/80" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(page.content) }} />
      </article>
    </div>
  );
}
