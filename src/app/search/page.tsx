"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Eye, ArrowRight, ChevronLeft, Frown, Sparkles } from "lucide-react";
import { ALL_NEWS, Article } from "@/data/newsData";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [inputQuery, setInputQuery] = useState(query);

  const filteredArticles = query.trim() === ""
    ? []
    : ALL_NEWS.filter((article) => {
        const q = query.toLowerCase().trim();
        return (
          article.title.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.category.toLowerCase().includes(q) ||
          article.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputQuery.trim())}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-foreground/60 bg-foreground/5 px-4 py-2.5 rounded-2xl border border-foreground/10 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-primary font-black">نتائج البحث المحرك</span>
      </nav>

      {/* Header Banner & Refine Search Bar */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-6 border border-white/10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-black">
              <Search className="w-3.5 h-3.5" />
              <span>محرك البحث الإخباري</span>
            </div>
            <h1 className="text-xl md:text-3xl font-black">
              {query ? `نتائج البحث عن: "${query}"` : "البحث في الأخبار والتقارير"}
            </h1>
            <p className="text-xs text-slate-200 font-bold">
              {query ? `تم العثور على (${filteredArticles.length}) نتيجة مطابقة` : "اكتب كلمة البحث للوصول المباشر للتقارير والأخبار"}
            </p>
          </div>

          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 shadow-md">
            <Image src="/brand-logo.jpg" alt="Logo" fill className="object-cover" />
          </div>
        </div>

        {/* Refine Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="ابحث عن موضوع، خبر، أو كلمة مفتاحية..."
              className="w-full bg-white/10 text-white placeholder-slate-300 text-sm font-bold px-4 py-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>بحث</span>
          </button>
        </form>

      </div>

      {/* Search Results Display */}
      {query.trim() === "" ? (
        <div className="bg-foreground/5 border border-foreground/10 rounded-3xl p-12 text-center space-y-4">
          <Sparkles className="w-12 h-12 text-primary mx-auto opacity-40" />
          <h3 className="text-base font-bold text-foreground">يرجى كتابة كلمة البحث في الخانة أعلاه.</h3>
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((item) => (
            <Link 
              key={item.id} 
              href={`/news/${item.id}`} 
              className="group bg-background border border-foreground/10 rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col block"
            >
              
              {/* Cover */}
              <div className={`relative h-44 w-full bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between text-white overflow-hidden`}>
                <div className="absolute left-[-10px] top-[-10px] w-28 h-28 opacity-15 pointer-events-none">
                  <Image src="/brand-logo.jpg" alt="Logo" fill className="object-contain" />
                </div>
                
                <span className="self-start bg-white/20 text-white text-[11px] font-black px-2.5 py-1 rounded-xl border border-white/20">
                  {item.category}
                </span>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-200 font-bold z-10">
                  <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-white/40">
                    <Image src="/brand-logo.jpg" alt="Logo" fill className="object-cover" />
                  </div>
                  <span>يحدث الآن 24</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-foreground/70 line-clamp-2 font-medium">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-foreground/10 flex items-center justify-between text-[11px] text-foreground/60 font-bold">
                  <span className="text-primary">{item.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{item.date}</span>
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-3 h-3 text-primary" />
                      {item.views}
                    </span>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>
      ) : (
        /* Empty State UI */
        <div className="bg-foreground/5 border border-foreground/10 rounded-3xl p-12 text-center space-y-5">
          <Frown className="w-16 h-16 text-urgent mx-auto opacity-50" />
          <div className="space-y-1">
            <h3 className="text-lg font-black text-foreground">
              عفواً، لا توجد نتائج مطابقة لـ &quot;{query}&quot;
            </h3>
            <p className="text-xs text-foreground/60 font-bold">
              تأكد من كتابة الكلمات بشكل صحيح أو حاول البحث عن كلمات أخرى مثل: (أسوان، استثمار، طاقة، رياضة).
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3 flex-wrap text-xs font-bold">
            <Link href="/category/aswan" className="bg-primary/10 text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
              أخبار أسوان
            </Link>
            <Link href="/category/politics" className="bg-primary/10 text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
              سياسة واقتصاد
            </Link>
            <Link href="/category/reports" className="bg-primary/10 text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
              تحقيقات وحوارات
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center text-foreground font-bold">
        جاري تحميل نتائج البحث...
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
