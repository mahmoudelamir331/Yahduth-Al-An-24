"use client";

import Image from "next/image";
import type { AdSlot as AdSlotData } from "@/lib/siteSettings";
import { sanitizeAdMarkup } from "@/lib/sanitize-html";

export function AdSlot({ slot, data }: { slot: "header" | "article" | "sidebar"; data?: AdSlotData }) {
  if (!data?.enabled) return null;
  if (data.type === "adsense" && data.code) return <div data-ad-slot={slot} className="my-4 overflow-hidden text-center" dangerouslySetInnerHTML={{ __html: sanitizeAdMarkup(data.code) }} />;
  if (data.image_url) return <a href={data.target_url || undefined} target={data.target_url ? "_blank" : undefined} rel={data.target_url ? "noreferrer" : undefined} className="my-4 block overflow-hidden rounded-xl" aria-label="إعلان"><Image src={data.image_url} alt="إعلان" width={1200} height={400} sizes="(max-width: 768px) 100vw, 800px" className="max-h-40 w-full object-cover" /></a>;
  return null;
}
