"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, TrendingUp, Award, MapPin, Search } from "lucide-react";

// Ultra-fast lightweight SVG news card background generator
const newsCoverGradients = [
  "from-blue-900 via-indigo-900 to-slate-900",
  "from-slate-900 via-blue-950 to-emerald-950",
  "from-amber-950 via-slate-900 to-blue-900",
  "from-slate-900 via-purple-950 to-blue-950",
  "from-blue-950 via-sky-950 to-slate-900",
  "from-red-950 via-slate-900 to-indigo-950",
];

const HeroMainArticle = {
  id: 1,
  category: "أخبار أسوان - تغطية حصرية",
  isUrgent: true,
  title: "جولة ميدانية للصحفي محمد الأمين في المشروعات التنموية الكبرى بمحافظة أسوان",
  excerpt: "تغطية شاملة لمستجدات مشروع تطوير كورنيش النيل الجديد ومتابعة ميدانية لأعمال رفع كفاءة البنية التحتية وتسهيل خدمات المواطنين.",
  gradient: "from-blue-900 via-slate-900 to-indigo-950",
  author: "محمد الأمين (مراسل أسوان)",
  date: "منذ 15 دقيقة",
  views: "3.4k",
  readTime: "3 دقائق",
};

const HeroSubArticles = [
  {
    id: 2,
    category: "اقتصاد",
    title: "انطلاق فعاليات المنتدى الاستثماري الإفريقي لتعزيز التبادل التجاري عبر بوابة مصر الجنوبية",
    gradient: "from-slate-900 to-blue-900",
    date: "منذ ساعة",
  },
  {
    id: 3,
    category: "سياحة وثقافة",
    title: "إقبال سياحي واسع على معابد فيلة وأبو سمبل بالتزامن مع انطلاق الموسم الشتوي",
    gradient: "from-indigo-950 to-slate-900",
    date: "منذ ساعتين",
  },
  {
    id: 4,
    category: "تكنولوجيا",
    title: "توسع مشروعات الطاقة الشمسية ببنبان والاعتماد على الذكاء الاصطناعي في إدارة الشبكة",
    gradient: "from-blue-950 to-sky-900",
    date: "منذ 3 ساعات",
  },
];

const AllNews = [
  {
    id: 5,
    category: "أخبار أسوان",
    title: "وضع حجر الأساس لمجمع الصناعات الحرفية الجديد بأسوان لتوفير فرص عمل للشباب",
    excerpt: "المشروع يهدف لتمكين الحرفيين المحليين وتطوير المنتجات التراثية النوبية بأساليب حديثة للمنافسة عالمياً.",
    gradient: newsCoverGradients[0],
    author: "محمد الأمين",
    date: "منذ 4 ساعات",
    views: "1.8k",
  },
  {
    id: 6,
    category: "سياسة",
    title: "بيان رسمي يشيد بتكاتف الجهود التنفيذية لمتابعة المشروعات التنموية في صعيد مصر",
    excerpt: "تأكيدات حكومية على الأولوية القصوى لتطوير الخدمات الصحية والتعليمية وتوفير حياة كريمة للمواطنين.",
    gradient: newsCoverGradients[1],
    author: "محمد الأمين",
    date: "منذ 5 ساعات",
    views: "2.1k",
  },
  {
    id: 7,
    category: "رياضة",
    title: "نادي أسوان يستعد لمواجهة مرتقبة في الدوري الممتاز وسط دعم جماهيري واسع",
    excerpt: "جاهزية تامة للفريق وتصريحات حصرية للمدير الفني حول الخطط التكتيكية للمباراة القادمة.",
    gradient: newsCoverGradients[2],
    author: "القسم الرياضي",
    date: "منذ 6 ساعات",
    views: "4.5k",
  },
  {
    id: 8,
    category: "تكنولوجيا",
    title: "إطلاق بوابات رقمية جديدة لتسهيل المعاملات الحكومية الإلكترونية للمواطنين",
    excerpt: "المنظومة الجديدة تتيح تقديم كافة الطلبات والاستعلام عن الخدمات من خلال الهاتف المحمول في دقائق.",
    gradient: newsCoverGradients[3],
    author: "قسم التكنولوجيا",
    date: "منذ 7 ساعات",
    views: "950",
  },
  {
    id: 9,
    category: "اقتصاد",
    title: "ارتفاع مؤشرات التصدير للمنتجات الزراعية المصرية وسوق واعد للمحاصيل الأسوانية",
    excerpt: "تقرير اقتصادي ينشر تفاصيل زيادة حصيلة الصادرات من التمور والنباتات الطبية والعطرية.",
    gradient: newsCoverGradients[4],
    author: "محمد الأمين",
    date: "منذ 8 ساعات",
    views: "1.2k",
  },
  {
    id: 10,
    category: "تحقيقات",
    title: "تحقيق صحفي: كيف تحولت أسوان لعاصمة الطاقة المتجددة في الشرق الأوسط؟",
    excerpt: "دراسة استقصائية ترصد قصة نجاح مشروع بنبان ومساهمته في دعم شبكة الكهرباء القومية.",
    gradient: newsCoverGradients[5],
    author: "محمد الأمين",
    date: "منذ 9 ساعات",
    views: "5.1k",
  },
];

const TrendingSidebar = [
  { id: 1, title: "قرار عاجل بشأن خطة رفع كفاءة الطرق السريعة بين أسوان والأقصر", views: "12.4k" },
  { id: 2, title: "تغطية مباشرة: افتتاح حديقة النباتات الاستوائية بعد أعمال التطوير الشاملة", views: "9.8k" },
  { id: 3, title: "محمد الأمين يكتب: آفاق الاستثمار السياحي والفرص المتاحة لشباب الخريجين", views: "8.1k" },
  { id: 4, title: "توقعات حالة الطقس للأيام القادمة وتنبيهات مهمة للسائقين على الطرق السريعة", views: "6.5k" },
  { id: 5, title: "جدول مباريات الدوري وتغطية صحفية مكثفة لأهم الكواليس الرياضية", views: "5.9k" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("الكل");

  const categories = ["الكل", "أخبار أسوان", "سياسة", "اقتصاد", "رياضة", "تكنولوجيا", "تحقيقات"];

  const filteredNews = activeTab === "الكل" 
    ? AllNews 
    : AllNews.filter((n) => n.category.includes(activeTab));

  return (
    <div className="container mx-auto px-4 py-6 space-y-10">
      
      {/* Journalist Mohamed El-Amin Spotlight Banner */}
      <section className="bg-gradient-to-r from-primary via-primary/95 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-3 max-w-2xl text-center md:text-right z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold">
            <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-amber-300">
              <Image src="/logo.jpg" alt="لوجو" fill className="object-cover" />
            </div>
            <span>التغطية الميدانية المباشرة لـ يحدث الآن 24</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight">
            موقع (يحدث الآن 24) الإخباري
          </h1>
          <p className="text-xs md:text-sm text-slate-200 font-bold leading-relaxed">
            البوابة الصحفية الرسمية المخصصة لمتابعة أحدث الأخبار والتقارير الميدانية من قلب أسوان وصعيد مصر برؤية صحفية موضوعية.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start items-center text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
              <MapPin className="w-4 h-4 text-urgent" />
              مقر التغطية: محافظة أسوان
            </span>
            <span className="flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-lg font-black shadow-sm">
              <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                <Image src="/logo.jpg" alt="محمد الأمين" fill className="object-cover" />
              </div>
              إشراف وتغطية: الصحفي محمد الأمين
            </span>
          </div>
        </div>

        {/* Large Featured Logo Emblem */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 bg-primary/20 group">
          <Image
            src="/logo.jpg"
            alt="شعار موقع يحدث الآن 24 - الصحفي محمد الأمين"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </section>

      {/* Main Hero News Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Article Card */}
        <div className="lg:col-span-8 group bg-background border border-foreground/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className={`relative h-72 md:h-88 w-full bg-gradient-to-br ${HeroMainArticle.gradient} p-6 md:p-8 flex flex-col justify-between text-white overflow-hidden`}>
            
            {/* Background Logo Watermark */}
            <div className="absolute left-[-20px] bottom-[-20px] w-64 h-64 opacity-10 pointer-events-none">
              <Image src="/logo.jpg" alt="Watermark" fill className="object-contain" />
            </div>

            <div className="flex justify-between items-start z-10">
              <span className="bg-urgent text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 pulse-urgent">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                خبر عاجل
              </span>
              
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold">
                <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                  <Image src="/logo.jpg" alt="لوجو" fill className="object-cover" />
                </div>
                <span>{HeroMainArticle.category}</span>
              </div>
            </div>

            <div className="space-y-3 z-10 mt-auto">
              <h2 className="text-xl md:text-3xl font-black leading-tight hover:text-amber-300 transition-colors">
                {HeroMainArticle.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-200 line-clamp-2 font-medium leading-relaxed">
                {HeroMainArticle.excerpt}
              </p>
              
              <div className="flex items-center gap-3 text-xs text-slate-300 pt-2 font-bold flex-wrap">
                <span className="flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-md border border-amber-400/30">
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
        </div>

        {/* Secondary Articles Stack */}
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
              <article key={art.id} className="bg-background border border-foreground/10 rounded-2xl p-3.5 flex gap-3 items-center hover:border-primary/40 hover:shadow-md transition-all duration-200 group cursor-pointer">
                <div className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br ${art.gradient} p-2 text-white flex items-center justify-center`}>
                  <div className="relative w-8 h-8 rounded-full opacity-30">
                    <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <span className="text-[10px] text-foreground/50 block">
                    {art.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

      </section>

      {/* Interactive Category Tabs & News Section */}
      <section className="space-y-6 pt-2">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-primary/30 shrink-0 shadow-sm">
              <Image src="/logo.jpg" alt="لوجو يحدث الآن 24" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-foreground">آخر التغطيات والتقارير</h2>
              <p className="text-xs text-foreground/60">تحديثات صحفية حية من فريق يحدث الآن 24</p>
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
              <article key={item.id} className="bg-background border border-foreground/10 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200 flex flex-col group">
                
                {/* Lightweight Styled Cover with Logo Watermark */}
                <div className={`relative h-40 w-full bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between text-white overflow-hidden`}>
                  <div className="absolute left-[-10px] top-[-10px] w-28 h-28 opacity-15 pointer-events-none">
                    <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                  </div>
                  
                  <span className="self-start bg-white/15 backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-white/20 shadow-sm z-10">
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
              </article>
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
                <div key={trend.id} className="flex gap-3 items-start group cursor-pointer border-b border-foreground/5 pb-2.5 last:border-0">
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
                </div>
              ))}
            </div>

            {/* Journalist Profile Box */}
            <div className="bg-primary text-white rounded-2xl p-4 space-y-3 shadow-md border border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-amber-300 shadow">
                  <Image src="/logo.jpg" alt="الصحفي محمد الأمين" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">الصحفي / محمد الأمين</h4>
                  <p className="text-[10px] text-amber-300 font-bold">مراسل أسوان وصعيد مصر</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                تغطية إخبارية مستقلة ومباشرة لجميع أحداث وتطورات محافظة أسوان لحظة بلحظة.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
