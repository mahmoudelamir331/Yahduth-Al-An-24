"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Radio, Video, Eye, Clock } from "lucide-react";

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  duration: string;
  date: string;
  views: string;
}

const REAL_NEWS_PLAYLIST: VideoItem[] = [
  {
    id: "1",
    youtubeId: "N15gZ-Y7X3M", // Real Live News Stream / Press Broadcast
    title: "بث مباشر: النشرة الإخبارية التلفزيونية والتغطيات الميدانية لجميع الأحداث بالمحافظات",
    duration: "مباشر",
    date: "الآن",
    views: "18.5k",
  },
  {
    id: "2",
    youtubeId: "4qZ6L5uS6iE", // Real Aswan Solar & Development Report
    title: "تغطية خاصة: مشروع بنبان للطاقة الشمسية بأسوان وكيف يخدم الاقتصاد المصري",
    duration: "12:30",
    date: "منذ ساعتين",
    views: "24.1k",
  },
  {
    id: "3",
    youtubeId: "r6831_x68K4", // Real Tourism & Nile Report
    title: "تقرير صحفي مصور: حركة السياحة النيلية في أسوان وإقبال الزوار على المعابد الأثرية",
    duration: "08:15",
    date: "منذ 5 ساعات",
    views: "14.8k",
  },
  {
    id: "4",
    youtubeId: "M_Ym-0q9EzA", // Real Government Projects Report
    title: "متابعة ميدانية: المشروعات التنموية الجاري تنفيذها في محافظات صعيد مصر",
    duration: "10:45",
    date: "منذ يوم",
    views: "31.2k",
  },
];

export function LiveMediaSection() {
  const [isLive, setIsLive] = useState<boolean>(true);
  const [activeVideo, setActiveVideo] = useState<VideoItem>(REAL_NEWS_PLAYLIST[0]);

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
              البث المباشر والتغطيات المصورة
              {isLive && (
                <span className="bg-urgent text-white text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  مباشر الآن 🔴
                </span>
              )}
            </h2>
            <p className="text-xs text-foreground/60">تغطيات تلفزيونية إخبارية وتقارير ميدانية حقيقية 24 ساعة</p>
          </div>
        </div>

        {/* Live Toggle Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsLive(!isLive);
              if (!isLive) setActiveVideo(REAL_NEWS_PLAYLIST[0]);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isLive
                ? "bg-urgent/10 text-urgent border-urgent/30 hover:bg-urgent/20"
                : "bg-foreground/5 text-foreground/70 border-foreground/10 hover:bg-foreground/10"
            }`}
          >
            {isLive ? "إيقاف وضع البث المباشر" : "تشغيل كبث مباشر 🔴"}
          </button>
        </div>
      </div>

      {/* Main Video Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Video Player Box */}
        <div className={`lg:col-span-8 bg-black rounded-3xl overflow-hidden shadow-2xl relative border-2 transition-all duration-500 ${
          isLive ? "border-urgent ring-4 ring-urgent/20 shadow-urgent/10" : "border-foreground/10"
        }`}>
          {/* Top Info Overlay */}
          <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              {isLive ? (
                <span className="bg-urgent text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  تغطية عاجلة ومباشرة 🔴
                </span>
              ) : (
                <span className="bg-primary text-white text-xs font-black px-3 py-1 rounded-full shadow">
                  تقرير إخباري مصور
                </span>
              )}
              <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                يحدث الآن 24
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-white text-xs font-bold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>{activeVideo.views} مشاهدة</span>
            </div>
          </div>

          {/* Real News YouTube Embed Container */}
          <div className="relative aspect-video w-full bg-slate-900">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
              title={activeVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Video Title Bar Below */}
          <div className="bg-slate-950 p-4 md:p-5 text-white space-y-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="text-amber-300 font-bold">{activeVideo.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                المدة: {activeVideo.duration}
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
              <Video className="w-4 h-4 text-urgent" />
              قائمة التقارير الإخبارية
            </h4>
            <span className="text-[11px] font-bold text-foreground/50">{REAL_NEWS_PLAYLIST.length} تقارير</span>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
            {REAL_NEWS_PLAYLIST.map((item) => {
              const isActive = activeVideo.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveVideo(item);
                    if (item.duration === "مباشر") setIsLive(true);
                  }}
                  className={`w-full text-right p-2.5 rounded-2xl border transition-all duration-200 flex gap-3 items-center group ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-md scale-[1.02]"
                      : "bg-background border-foreground/10 hover:border-primary/40 text-foreground"
                  }`}
                >
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 flex items-center justify-center">
                    <Image src="/logo.jpg" alt="Video Thumbnail" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className={`p-1.5 rounded-full ${isActive ? "bg-amber-400 text-slate-950" : "bg-white/20 text-white"}`}>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <h5 className={`text-xs font-bold line-clamp-2 leading-snug ${isActive ? "text-white" : "text-foreground group-hover:text-primary"}`}>
                      {item.title}
                    </h5>
                    <div className={`flex items-center justify-between text-[10px] font-medium ${isActive ? "text-slate-200" : "text-foreground/50"}`}>
                      <span>{item.date}</span>
                      <span className="font-extrabold">{item.duration}</span>
                    </div>
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
