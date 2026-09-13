import type { Metadata } from "next";
import { getPublishedArticleForMetadata } from "@/lib/public-article-metadata";
import { getSiteUrl } from "@/lib/site-url";

type NewsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NewsLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getPublishedArticleForMetadata(decodeURIComponent(id));
  if (!article) return {};

  const siteUrl = getSiteUrl();
  const canonicalPath = `/news/${encodeURIComponent(article.slug || article.id)}`;
  const title = article.title;
  const description = article.excerpt?.trim() || article.title;
  const images = article.cover_image_url ? [{ url: article.cover_image_url, alt: title }] : [];

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      url: `${siteUrl}${canonicalPath}`,
      title,
      description,
      images,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.cover_image_url ? [article.cover_image_url] : undefined,
    },
  };
}

export default function NewsLayout({ children }: NewsLayoutProps) {
  return children;
}
