"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, ArrowRight, Filter, ChevronLeft, Loader2, Pin } from "lucide-react";
import { getArticlesByCategory, ALL_NEWS, Article } from "@/data/newsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CategoryTitles: Record<string, string> = {
  aswan: "أخبار أسوان",
  urgent: "الأخبار العاجلة",
  politics: "سياسة واقتصاد",
  economy: "اقتصاد وأعمال",
  sports: "رياضة وتكنولوجيا",
  tech: "تكنولوجيا وعولمة",
  reports: "تحقيقات وحوارات",
};

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const categoryTitle = CategoryTitles[slug] || "قسم الأخبار";
  const allCategoryArticles = getArticlesByCategory(slug);

  const ITEMS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedArticles = allCategoryArticles.slice(0, visibleCount);
  const hasMore = visibleCount < allCategoryArticles.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-foreground/60 bg-foreground/5 px-4 py-2.5 rounded-2xl border border-foreground/10 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-primary font-black">قسم الأقسام الإخبارية</span>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-foreground font-black">{categoryTitle}</span>
      </nav>

      {/* Prominent Category Header Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 relative overflow-hidden">
        <div className="space-y-3 text-center md:text-right z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-black">
            <Pin className="w-4 h-4 text-amber-300" />
            <span>قسم متخصص</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight">
            📌 {categoryTitle}
          </h1>
          <p className="text-xs md:text-sm text-slate-200 font-bold max-w-xl leading-relaxed">
            تغطية صحفية مستقلة وشاملة لكافة الأحداث والتقارير المتعلقة بـ ({categoryTitle}) على مدار الساعة.
          </p>
        </div>

        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-4 border-white/20 shrink-0 shadow-2xl bg-primary/20">
          <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
        </div>
      </div>

      {/* Articles Grid */}
      {displayedArticles.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((item) => (
              <Link 
                key={item.id} 
                href={`/news/${item.id}`} 
                className="group bg-background border border-foreground/10 rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col block"
              >
                
                {/* Image / Gradient Cover */}
                <div className={`relative h-48 w-full bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between text-white overflow-hidden`}>
                  <div className="absolute left-[-10px] top-[-10px] w-28 h-28 opacity-15 pointer-events-none">
                    <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                  </div>
                  
                  <div className="flex items-center justify-between z-10">
                    <span className="bg-white/20 text-white text-[11px] font-black px-3 py-1 rounded-xl border border-white/20">
                      {item.category}
                    </span>
                    {item.isUrgent && (
                      <span className="bg-urgent text-white text-[10px] font-black px-2.5 py-0.5 rounded-full animate-pulse">
                        عاجل
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-200 font-bold z-10">
                    <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-white/40">
                      <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                    </div>
                    <span>يحدث الآن 24</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/70 line-clamp-2 font-medium leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-foreground/10 flex items-center justify-between text-[11px] text-foreground/60 font-bold">
                    <span className="text-primary font-black">{item.author}</span>
                    <div className="flex items-center gap-2">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-primary" />
                        {item.views}
                      </span>
                    </div>
                  </div>
                </div>

              </Link>
            ))}
          </div>

          {/* Pagination / Load More Button */}
          <div className="flex flex-col items-center justify-center pt-6 space-y-3">
            {hasMore ? (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-primary hover:bg-primary/90 text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري تحميل الأخبار...
                  </>
                ) : (
                  <>
                    عرض المزيد من أخبار {categoryTitle}
                  </>
                )}
              </button>
            ) : (
              <div className="bg-foreground/5 text-foreground/60 px-6 py-2.5 rounded-full text-xs font-bold border border-foreground/10">
                تم عرض جميع الأخبار المتاحة في هذا القسم ({allCategoryArticles.length} خبر)
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-foreground/5 border border-foreground/10 rounded-3xl p-12 text-center space-y-4">
          <p className="text-base font-bold text-foreground/70">عفواً، لا توجد أخبار متاحة حالياً في هذا القسم.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-black text-xs">
            <ArrowRight className="w-4 h-4" />
            العودة للصفحة الرئيسية
          </Link>
        </div>
      )}

    </div>
  );
}
