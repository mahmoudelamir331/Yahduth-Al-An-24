import type { MetadataRoute } from "next";
import { listPublishedArticlesForSitemap } from "@/lib/public-article-metadata";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const staticRoutes = ["", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: now,
  }));

  const articles = await listPublishedArticlesForSitemap();
  return [
    ...staticRoutes,
    ...articles.map((article) => ({
      url: `${siteUrl}/news/${encodeURIComponent(article.slug || article.id)}`,
      lastModified: article.updated_at || article.published_at || now,
    })),
  ];
}
