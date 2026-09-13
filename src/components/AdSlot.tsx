"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { sanitizeAdMarkup } from "@/lib/sanitize-html";

type Placement = "header" | "sidebar" | "in_article" | "home_page";
type Ad = { id: string; title: string; image_url: string | null; target_url: string | null; custom_code: string | null; placement: Placement; ad_type: "image_link" | "custom_code" };
type Slot = "header" | "article" | "sidebar" | "home_page";

export function AdSlot({ slot }: { slot: Slot }) {
  const placement: Placement = slot === "article" ? "in_article" : slot;
  const [ad, setAd] = useState<Ad | null>(null);
  useEffect(() => {
    let active = true;
    fetch(`/api/ads?placement=${placement}`, { cache: "no-store" })
      .then(async response => (response.ok ? await response.json() as { ads?: Ad[] } : { ads: [] }))
      .then(result => { if (active) setAd(result.ads?.[0] ?? null); })
      .catch(() => { if (active) setAd(null); });
    return () => { active = false; };
  }, [placement]);

  if (!ad) return null;
  const currentAd = ad;
  async function trackClick() {
    await fetch("/api/ads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: currentAd.id }), keepalive: true }).catch(() => undefined);
  }
  if (currentAd.ad_type === "custom_code" && currentAd.custom_code) return <div data-ad-slot={placement} className="my-4 overflow-hidden text-center" dangerouslySetInnerHTML={{ __html: sanitizeAdMarkup(currentAd.custom_code) }} />;
  if (!currentAd.image_url) return null;
  return <a href={currentAd.target_url || undefined} onClick={() => void trackClick()} target={currentAd.target_url ? "_blank" : undefined} rel={currentAd.target_url ? "noreferrer" : undefined} className="my-4 block overflow-hidden rounded-xl" aria-label={currentAd.title}><Image src={currentAd.image_url} alt={currentAd.title} width={1200} height={400} sizes="(max-width: 768px) 100vw, 800px" className="max-h-40 w-full object-cover" /></a>;
}
