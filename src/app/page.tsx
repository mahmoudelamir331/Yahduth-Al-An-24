"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, Share2, TrendingUp, Award, MapPin, ChevronLeft, Bookmark, Flame } from "lucide-react";

// Mock realistic news dataset
const HeroMainArticle = {
  id: 1,
  category: "أخبار أسوان - تغطية خاصة",
  isUrgent: true,
  title: "جولة ميدانية للصحفي محمد الأمين في المشروعات التنموية الكبرى بمحافظة أسوان",
  excerpt: "تغطية شاملة ومباشرة للخطط المستقبلية لتطوير كورنيش النيل الجديد ومتابعة أعمال تطوير خدمات المواطنين والبنية التحتية بالجنوب.",
  image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
  author: "محمد الأمين (مراسل أسوان)",
  date: "منذ 15 دقيقة",
  views: "3.4k",
  readTime: "4 دقائق",
};

const HeroSubArticles = [
  {
    id: 2,
    category: "اقتصاد",
    title: "انطلاق فعاليات المنتدى الاستثماري الإفريقي لتعزيز التبادل التجاري عبر بوابة مصر الجنوبية",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
    date: "منذ ساعة",
  },
  {
    id: 3,
    category: "سياحة وثقافة",
    title: "إقبال سياحي غير مسبوق على معابد فيلة وأبو سمبل بالتزامن مع موسم الشتاء",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
    date: "منذ ساعتين",
  },
  {
    id: 4,
    category: "تكنولوجيا",
    title: "توسع مشروعات الطاقة الشمسية ببنبان والاعتماد على أنظمة الذكاء الاصطناعي في إدارة الشبكة",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    date: "منذ 3 ساعات",
  },
];

const AllNews = [
  {
    id: 5,
    category: "أخبار أسوان",
    title: "وضع حجر الأساس لمجمع الصناعات الحرفية الجديد بأسوان لتوفير فرص عمل للشباب",
    excerpt: "المشروع يهدف لتمكين الحرفيين المحليين وتطوير المنتجات التراثية النوبية بأساليب حديثة للمنافسة عالمياً.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    author: "محمد الأمين",
    date: "منذ 4 ساعات",
    views: "1.8k",
  },
  {
    id: 6,
    category: "سياسة",
    title: "بيان رسمي يشيد بتكاتف الجهود التنفيذية لمتابعة المشروعات التنموية في صعيد مصر",
    excerpt: "تأكيدات حكومية على الأولوية القصوى لتطوير الخدمات الصحية والتعليمية وتوفير حياة كريمة للمواطنين.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
    author: "قسم المحليات",
    date: "منذ 5 ساعات",
    views: "2.1k",
  },
  {
    id: 7,
    category: "رياضة",
    title: "نادي أسوان يستعد لمواجهة مرتقبة في الدوري الممتاز وسط دعم جماهيري واسع",
    excerpt: "جاهزية تامة للفريق وتصريحات حصرية للمدير الفني حول الخطط التكتيكية للمباراة القادمة.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    author: "القسم الرياضي",
    date: "منذ 6 ساعات",
    views: "4.5k",
  },
  {
    id: 8,
    category: "تكنولوجيا",
    title: "إطلاق بوابات رقمية جديدة لتسهيل المعاملات الحكومية الإلكترونية للمواطنين",
    excerpt: "المنظومة الجديدة تتيح تقديم كافة الطلبات والاستعلام عن الخدمات من خلال الهاتف المحمول في دقائق.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    author: "قسم التكنولوجيا",
    date: "منذ 7 ساعات",
    views: "950",
  },
  {
    id: 9,
    category: "اقتصاد",
    title: "ارتفاع مؤشرات التصدير للمنتجات الزراعية المصرية وسوق الواعد في المحاصيل الأسوانية",
    excerpt: "تقرير اقتصادي ينشر تفاصيل زيادة حصيلة الصادرات من التمور والنباتات الطبية والعطرية.",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80",
    author: "محمد الأمين",
    date: "منذ 8 ساعات",
    views: "1.2k",
  },
  {
    id: 10,
    category: "تحقيقات",
    title: "تحقيق صحفي: كيف تحولت أسوان لعاصمة الطاقة المتجددة في الشرق الأوسط؟",
    excerpt: "دراسة استقصائية ترصد قصة نجاح مشروع بنبان ومساهمته في دعم شبكة الكهرباء القومية.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
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
    <div className="container mx-auto px-4 py-6 space-y-12">
      
      {/* Reporter Spotlight Banner */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-3 max-w-2xl text-center md:text-right z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>التغطية الميدانية المباشرة</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight">
            موقع (يحدث الآن 24) الإخباري
          </h1>
          <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed">
            المنصة الصحفية المعتمدة لنقل الأحداث العاجلة والتحقيقات الميدانية بكل دقة وموضوعية من قلب الحدث.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start items-center text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-urgent" />
              مقر التغطية: محافظة أسوان وصعيد مصر
            </span>
            <span>•</span>
            <span className="text-white font-bold">إشراف: المراسل الصحفي محمد الأمين</span>
          </div>
        </div>

        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 group">
          <Image
            src="/logo.jpg"
            alt="محمد الأمين - يحدث الآن 24"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Main Hero News Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Big Featured Main Article */}
        <div className="lg:col-span-8 group bg-background border border-foreground/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
          <div className="relative h-72 md:h-96 w-full overflow-hidden">
            <Image
              src={HeroMainArticle.image}
              alt={HeroMainArticle.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="bg-urgent text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 pulse-urgent">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                خبر عاجل
              </span>
              <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {HeroMainArticle.category}
              </span>
            </div>

            <div className="absolute bottom-6 right-6 left-6 text-white space-y-3">
              <h2 className="text-xl md:text-3xl font-black leading-tight hover:text-amber-300 transition-colors">
                {HeroMainArticle.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-200 line-clamp-2 font-medium">
                {HeroMainArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-300 pt-1 font-semibold">
                <span>بقلم: {HeroMainArticle.author}</span>
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

        {/* Secondary Hero Articles Stack */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-2">
            <h3 className="text-lg font-black text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-urgent" />
              أبرز متابعات اليوم
            </h3>
          </div>

          <div className="space-y-4">
            {HeroSubArticles.map((art) => (
              <article key={art.id} className="bg-background border border-foreground/10 rounded-2xl p-3 flex gap-4 items-center hover:border-primary/40 hover:shadow-md transition-all duration-300 group cursor-pointer">
                <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <h4 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <span className="text-[11px] text-foreground/50 block">
                    {art.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

      </section>

      {/* Interactive Category Filter & Main News Section */}
      <section className="space-y-8 pt-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/10 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">آخر التغطيات والتقارير</h2>
            <p className="text-xs md:text-sm text-foreground/60">تحديثات صحفية حية يقدمها فريق تحدث الآن 24</p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
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

        {/* News Grid + Trending Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map((item) => (
              <article key={item.id} className="bg-background border border-foreground/10 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/70 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-foreground/10 flex items-center justify-between text-xs text-foreground/50 font-medium">
                    <span className="text-primary font-bold">{item.author}</span>
                    <div className="flex items-center gap-3">
                      <span>{item.date}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {item.views}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Trending / Most Read Sidebar */}
          <div className="lg:col-span-4 bg-foreground/5 border border-foreground/10 rounded-3xl p-6 space-y-6 h-fit sticky top-28">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
              <h3 className="text-xl font-black text-primary flex items-center gap-2">
                <Flame className="w-5 h-5 text-urgent" />
                الأكثر قراءة الآن
              </h3>
              <span className="text-xs bg-urgent/10 text-urgent font-bold px-2 py-0.5 rounded">تريند</span>
            </div>

            <div className="space-y-4">
              {TrendingSidebar.map((trend, index) => (
                <div key={trend.id} className="flex gap-4 items-start group cursor-pointer border-b border-foreground/5 pb-3 last:border-0">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-black text-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {trend.title}
                    </h4>
                    <span className="text-[11px] text-foreground/50 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {trend.views} قراءة
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Mini Card */}
            <div className="bg-primary text-white rounded-2xl p-5 space-y-3 shadow-lg">
              <h4 className="font-bold text-sm">اشترك في النشرة الإخبارية</h4>
              <p className="text-xs text-slate-200">احصل على أهم الأخبار والتقارير الميدانية من الصحفي محمد الأمين فور صدورها.</p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
                />
                <button className="w-full bg-amber-400 text-slate-900 font-bold text-xs py-2 rounded-xl hover:bg-amber-300 transition-colors">
                  اشترك الآن
                </button>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
