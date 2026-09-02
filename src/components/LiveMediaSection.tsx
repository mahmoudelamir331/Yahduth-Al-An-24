"use client";

import React, { useEffect, useState } from "react";
import { loadPublicData } from "@/lib/supabase-browser";
import Image from "next/image";
import { Play, Radio, Video, Eye, Clock } from "lucide-react";

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  duration: string;
  date: string;
  views: string;
}

const REAL_NEWS_STREAMS: VideoItem[] = [
  {
    id: "1",
    youtubeId: "https://www.youtube.com/watch?v=bNyUyrR0PHo", // Al Jazeera Live Stream
    title: "بث مباشر: تغطية صحفية وإخبارية شاملة لكافة الأحداث والتقارير الميدانية 24/7",
    channel: "الجزيرة الإخبارية مباشر",
    duration: "مباشر 🔴",
    date: "الآن",
    views: "45.2k",
  },
  {
    id: "2",
    youtubeId: "https://www.youtube.com/watch?v=mX2_tA-vGMo", // Extra News Egypt Live Stream
    title: "بث مباشر: إكسترا نيوز - متابعات ميدانية ونشرات أخبار مصر والصعيد على مدار الساعة",
    channel: "إكسترا نيوز مصر",
    duration: "مباشر 🔴",
    date: "الآن",
    views: "28.9k",
  },
  {
    id: "3",
    youtubeId: "https://www.youtube.com/watch?v=x9J2k0o0xGE", // Al Arabiya Live Stream
    title: "بث مباشر: النشرات الإخبارية والتغطيات الاقتصادية والميدانية المباشرة",
    channel: "العربية الحدث",
    duration: "مباشر 🔴",
    date: "الآن",
    views: "34.1k",
  },
  {
    id: "4",
    youtubeId: "https://www.youtube.com/watch?v=2g811Eo7K8U", // Sky News Arabia Live Stream
    title: "بث مباشر: سكاي نيوز عربية - تغطية شاملة للأخبار العاجلة والتحليلات الإخبارية",
    channel: "سكاي نيوز عربية",
    duration: "مباشر 🔴",
    date: "الآن",
    views: "21.7k",
  },
];

function getYoutubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (url.pathname.includes("/live/")) return `https://www.youtube.com/embed/${url.pathname.split("/live/")[1].split("/")[0]}`;
      if (url.pathname.includes("/embed/")) return value;
    }
  } catch { return null; }
  return null;
}

export function LiveMediaSection() {
  const [isLive, setIsLive] = useState<boolean>(true);
  const [streams, setStreams] = useState<VideoItem[]>(REAL_NEWS_STREAMS);
  const [activeVideo, setActiveVideo] = useState<VideoItem>(REAL_NEWS_STREAMS[0]);

  useEffect(() => {
    let cancelled = false;
    loadPublicData().then((result) => {
      const data = result?.settings;
      if (cancelled || !Array.isArray(data?.live_streams)) return;
      const next = (data.live_streams as Array<{ id: string; youtubeId: string; title: string; channel: string; enabled: boolean }>)
        .filter((item) => item.enabled !== false && item.youtubeId && item.title && item.channel)
        .map((item) => ({ ...item, duration: "مباشر 🔴", date: "الآن", views: "متابعة مباشرة" }));
      if (next.length) { setStreams(next); setActiveVideo(next[0]); }
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="space-y-4 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-foreground/10 pb-3">
        <div className="flex items-center gap-3">
          <div className={`relative p-2 rounded-xl text-white font-bold transition-all duration-300 ${
            isLive ? "bg-urgent shadow-lg shadow-urgent/30 animate-pulse" : "bg-primary"
          }`}>
            {isLive ? <Radio className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-2">
              البث المباشر للقنوات الإخبارية
              <span className="bg-urgent text-white text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                مباشر الآن 🔴
              </span>
            </h2>
            <p className="text-xs text-foreground/60">بث مباشر لقنوات إخبارية عالمية ومحلية 24 ساعة عبر يحدث الآن 24</p>
          </div>
        </div>
      </div>

      {/* Main Video Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Video Player Box */}
        <div className="lg:col-span-8 bg-black rounded-3xl overflow-hidden shadow-2xl relative border-2 border-urgent ring-4 ring-urgent/20 transition-all duration-500">
          
          {/* Top Info Overlay */}
          <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="bg-urgent text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                بث إخباري مباشر 🔴
              </span>
              
              <span className="bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                {activeVideo.channel}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-white text-xs font-bold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>{activeVideo.views} قراءة ومتابعة</span>
            </div>
          </div>

          {/* Real Live News YouTube Player Embed */}
          <div className="relative aspect-video w-full bg-slate-900">
            {getYoutubeEmbedUrl(activeVideo.youtubeId) ? (
              <iframe
                src={`${getYoutubeEmbedUrl(activeVideo.youtubeId)}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 text-center text-white">
                <Radio className="w-10 h-10 text-urgent animate-pulse" />
                <p className="font-bold">البث متاح على منصة {activeVideo.channel}</p>
                <a href={activeVideo.youtubeId} target="_blank" rel="noreferrer" className="bg-primary hover:bg-primary/80 rounded-xl px-5 py-3 font-bold transition-colors">فتح البث المباشر</a>
              </div>
            )}
          </div>

          {/* Video Title Bar Below */}
          <div className="bg-slate-950 p-4 md:p-5 text-white space-y-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="text-amber-300 font-bold">{activeVideo.channel}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-urgent" />
                الحالة: {activeVideo.duration}
              </span>
            </div>
            <h3 className="text-sm md:text-lg font-bold leading-snug">
              {activeVideo.title}
            </h3>
          </div>
        </div>

        {/* Video Playlist Sidebar */}
        <div className="lg:col-span-4 bg-foreground/5 border border-foreground/10 rounded-3xl p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
            <h4 className="text-sm font-black text-primary flex items-center gap-2">
              <Radio className="w-4 h-4 text-urgent" />
              قنوات البث المباشر المتاحة
            </h4>
            <span className="text-[11px] font-bold text-foreground/50">{streams.length} قنوات</span>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
            {streams.map((item) => {
              const isActive = activeVideo.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveVideo(item)}
                  className={`w-full text-right p-3 rounded-2xl border transition-all duration-200 flex gap-3 items-center group ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-md scale-[1.02]"
                      : "bg-background border-foreground/10 hover:border-primary/40 text-foreground"
                  }`}
                >
                  <div className="relative w-16 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-900 flex items-center justify-center border border-white/20">
                    <Image src="/brand-logo.jpg" alt="Channel Logo" fill className="object-cover opacity-50 group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className={`p-1.5 rounded-full ${isActive ? "bg-urgent text-white" : "bg-white/20 text-white"}`}>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                        {item.channel}
                      </span>
                      <span className="text-[10px] text-urgent font-extrabold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-urgent animate-pulse"></span>
                        مباشر
                      </span>
                    </div>
                    <h5 className={`text-xs font-bold line-clamp-2 leading-snug ${isActive ? "text-white" : "text-foreground group-hover:text-primary"}`}>
                      {item.title}
                    </h5>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
