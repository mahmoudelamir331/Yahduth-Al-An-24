"use client";

import { Radio, X } from "lucide-react";
import { useState } from "react";

function embedUrl(url: string, platform: string | null) {
  if (platform === "youtube") {
    const match = url.match(/(?:youtu\.be\/|v=|live\/)([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1` : url;
  }
  return url;
}

export function LiveBroadcastBanner({ enabled, url, platform }: { enabled: boolean; url: string | null; platform: string | null }) {
  const [closed, setClosed] = useState(false);
  if (!enabled || !url || closed) return null;
  return (
    <section className="container mx-auto px-4 pt-5">
      <div className="relative overflow-hidden rounded-3xl border-2 border-urgent/40 bg-slate-950 p-3 shadow-xl">
        <button onClick={() => setClosed(true)} aria-label="إغلاق البث" className="absolute left-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-urgent"><X size={16} /></button>
        <div className="mb-3 flex items-center gap-2 px-2 text-sm font-black text-white"><Radio size={18} className="text-urgent animate-pulse" /> بث مباشر الآن</div>
        <div className="aspect-video overflow-hidden rounded-2xl bg-black"><iframe src={embedUrl(url, platform)} title="البث المباشر" className="h-full w-full border-0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
      </div>
    </section>
  );
}
