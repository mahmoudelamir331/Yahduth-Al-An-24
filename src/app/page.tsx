"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, TrendingUp, MapPin } from "lucide-react";
import { ALL_NEWS } from "@/data/newsData";
import { LiveMediaSection } from "@/components/LiveMediaSection";
import { loadPublicData } from "@/lib/supabase-browser";

const TrendingSidebar = [
  { id: 1, title: "قرار عاجل بشأن خطة رفع كفاءة الطرق السريعة بين أسوان والأقصر", views: "12.4k" },
  { id: 2, title: "تغطية مباشرة: افتتاح حديقة النباتات الاستوائية بعد أعمال التطوير الشاملة", views: "9.8k" },
  { id: 3, title: "محمد الأمين يكتب: آفاق الاستثمار السياحي والفرص المتاحة لشباب الخريجين", views: "8.1k" },
  { id: 4, title: "توقعات حالة الطقس للأيام القادمة وتنبيهات مهمة للسائقين على الطرق السريعة", views: "6.5k" },
  { id: 5, title: "جدول مباريات الدوري وتغطية صحفية مكثفة لأهم الكواليس الرياضية", views: "5.9k" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("الكل");
  const [news, setNews] = useState(ALL_NEWS);
  const [maintenance, setMaintenance] = useState<{ enabled: boolean; message: string; endsAt: string | null }>({ enabled: false, message: "", endsAt: null });
  const [maintenanceReady, setMaintenanceReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const refresh = () => loadPublicData().then((result) => {
      if (cancelled || !result) { if (!cancelled) setMaintenanceReady(true); return; }
      if (result.articles.length > 0) setNews(result.articles);
      if (result.settings) {
        setMaintenance({
          enabled: Boolean(result.settings.maintenance_enabled),
          message: result.settings.maintenance_message || "الموقع تحت الصيانة حالياً. سنعود قريباً.",
          endsAt: result.settings.maintenance_ends_at,
        });
      }
      setMaintenanceReady(true);
    }).catch(() => {
      if (!cancelled) setMaintenanceReady(true);
    });
    void refresh();
    const timer = window.setInterval(refresh, 15000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, []);

  const HeroMainArticle = news[0] ?? ALL_NEWS[0];
  const HeroSubArticles = news.slice(1, 4);
  const AllNewsList = news.slice(4);

  const categories = ["الكل", "أخبار أسوان", "سياسة", "اقتصاد", "رياضة", "تكنولوجيا", "تحقيقات"];

  const filteredNews = activeTab === "الكل" 
    ? AllNewsList 
    : AllNewsList.filter((n) => n.category.includes(activeTab));

  if (!maintenanceReady) {
    return <main className="min-h-screen grid place-items-center bg-slate-950 text-white" dir="rtl"><div className="animate-pulse text-sm opacity-80">جارٍ التحقق من حالة الموقع...</div></main>;
  }

  if (maintenance.enabled) {
    return <main className="fixed inset-0 z-[9999] min-h-screen overflow-auto grid place-items-center bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 px-6 text-white" dir="rtl">
      <section className="w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-8 md:p-12 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-3xl border border-white/20 shadow-xl"><Image src="/logo.jpg" alt="يحدث الآن 24" width={96} height={96} className="h-full w-full object-cover" priority /></div>
        <div className="mx-auto mb-5 h-3 w-3 animate-pulse rounded-full bg-amber-400 shadow-[0_0_24px_8px_rgba(251,191,36,0.35)]" />
        <h1 className="text-3xl font-black md:text-5xl">الموقع تحت الصيانة</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-200">{maintenance.message}</p>
        {maintenance.endsAt && <p className="mt-6 rounded-2xl bg-black/20 px-4 py-3 text-sm font-bold text-amber-200">موعد العودة المتوقع: {new Date(maintenance.endsAt).toLocaleString("ar-EG")}</p>}
        <p className="mt-8 text-xs text-slate-400">نرجعلكم قريبًا بتغطيات وأخبار جديدة.</p>
      </section>
    </main>;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-12">
      
      {/* General Site Banner */}
      <section className="bg-gradient-to-r from-primary via-primary/95 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-3 max-w-2xl text-center md:text-right z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold">
            <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-amber-300">
              <Image src="/logo.jpg" alt="لوجو" fill className="object-cover" />
            </div>
            <span>موقع يحدث الآن 24 الإخباري</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight">
            بوابة الإخبار والتغطيات الميدانية 24 ساعة
          </h1>
          <p className="text-xs md:text-sm text-slate-200 font-bold leading-relaxed">
            متابعة فورية ومستمرة لجميع الأحداث المحلية والتغطيات الصحفية الشاملة بكل حيادية ودقة.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start items-center text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
              <MapPin className="w-4 h-4 text-urgent" />
              محافظة أسوان وصعيد مصر
            </span>
            <span className="flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-lg font-black shadow-sm">
              <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                <Image src="/logo.jpg" alt="يحدث الآن 24" fill className="object-cover" />
              </div>
              يحدث الآن 24
            </span>
          </div>
        </div>

        {/* Featured Logo Emblem */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 bg-primary/20 group">
          <Image
            src="/logo.jpg"
            alt="شعار موقع يحدث الآن 24"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </section>

      {/* Main Hero News Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Article Card (8 Columns) */}
        <Link href={`/news/${HeroMainArticle.id}`} className="lg:col-span-8 group bg-background border border-foreground/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col block">
          <div className="relative h-72 md:h-96 w-full overflow-hidden text-white flex flex-col justify-between p-6 md:p-8">
            
            {/* Real Background Photo */}
            {HeroMainArticle.imageUrl ? (
              <Image 
                src={HeroMainArticle.imageUrl} 
                alt={HeroMainArticle.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                priority
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${HeroMainArticle.gradient}`}></div>
            )}

            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

            <div className="flex justify-between items-start z-10">
              <span className="bg-urgent text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 pulse-urgent">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                خبر عاجل
              </span>
              
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold">
                <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                  <Image src="/logo.jpg" alt="لوجو" fill className="object-cover" />
                </div>
                <span>{HeroMainArticle.category}</span>
              </div>
            </div>

            <div className="space-y-3 z-10 mt-auto">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-black leading-tight group-hover:text-amber-300 transition-colors drop-shadow-md">
                {HeroMainArticle.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-200 line-clamp-2 font-medium leading-relaxed drop-shadow">
                {HeroMainArticle.excerpt}
              </p>
              
              <div className="flex items-center gap-3 text-xs text-slate-300 pt-2 font-bold flex-wrap">
                <span className="flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-lg shadow-sm">
                  <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden shrink-0">
                    <Image src="/logo.jpg" alt="الصحفي" fill className="object-cover" />
                  </div>
                  بقلم: {HeroMainArticle.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {HeroMainArticle.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {HeroMainArticle.views} مشاهدة
                </span>
              </div>
            </div>

          </div>
        </Link>

        {/* Secondary Articles Stack (4 Columns) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
            <h3 className="text-base font-black text-primary flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-urgent" />
              أبرز متابعات اليوم
            </h3>
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-primary/20 shrink-0">
              <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-3">
            {HeroSubArticles.map((art) => (
              <Link key={art.id} href={`/news/${art.id}`} className="bg-background border border-foreground/10 rounded-2xl p-3 flex gap-3 items-center hover:border-primary/40 hover:shadow-md transition-all duration-200 group cursor-pointer block">
                
                <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                  {art.imageUrl ? (
                    <Image src={art.imageUrl} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${art.gradient}`}></div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <span className="text-[10px] text-foreground/50 block font-bold">
                    {art.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* Live Broadcast & Media Section (Smart Component) */}
      <LiveMediaSection />

      {/* Interactive Category Tabs & News Section */}
      <section className="space-y-6 pt-2">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-primary/30 shrink-0 shadow-sm">
              <Image src="/logo.jpg" alt="لوجو يحدث الآن 24" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-foreground">آخر التغطيات والتقارير</h2>
              <p className="text-xs text-foreground/60">اضغط على أي خبر لقراءة التغطية الكاملة</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredNews.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="bg-background border border-foreground/10 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200 flex flex-col group block">
                
                {/* Photo / Gradient Cover */}
                <div className="relative h-44 w-full bg-slate-900 p-4 flex flex-col justify-between text-white overflow-hidden">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <span className="self-start bg-black/60 backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-white/20 shadow-sm z-10">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-200 z-10 font-bold">
                    <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden shrink-0 border border-white/40">
                      <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                    </div>
                    <span>يحدث الآن 24</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed font-medium">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-foreground/10 flex items-center justify-between text-[11px] text-foreground/50 font-bold">
                    <span className="text-primary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {item.author}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-3 h-3" />
                        {item.views}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-4 bg-foreground/5 border border-foreground/10 rounded-2xl p-5 space-y-5 h-fit">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-urgent/40">
                  <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <h3 className="text-base font-black text-primary">
                  الأكثر قراءة الآن
                </h3>
              </div>
              <span className="text-[10px] bg-urgent/10 text-urgent font-black px-2 py-0.5 rounded">تريند</span>
            </div>

            <div className="space-y-3">
              {TrendingSidebar.map((trend, index) => (
                <Link key={trend.id} href={`/news/${trend.id}`} className="flex gap-3 items-start group cursor-pointer border-b border-foreground/5 pb-2.5 last:border-0 block">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-black text-xs flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {trend.title}
                    </h4>
                    <span className="text-[10px] text-foreground/50 flex items-center gap-1 font-medium">
                      <Eye className="w-3 h-3" />
                      {trend.views} قراءة
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Platform Information Box */}
            <div className="bg-primary text-white rounded-2xl p-4 space-y-3 shadow-md border border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border-2 border-amber-300 shadow">
                  <Image src="/logo.jpg" alt="يحدث الآن 24" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">يحدث الآن 24</h4>
                  <p className="text-[10px] text-amber-300 font-bold">بوابة إخبارية مستتقلة 24/7</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                تغطية صحفية مستقلة ومباشرة لجميع أحداث وتطورات محافظة أسوان وصعيد مصر لحظة بلحظة.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
