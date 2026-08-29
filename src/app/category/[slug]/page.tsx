import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, ArrowRight, ChevronLeft, Filter } from "lucide-react";
import { getArticlesByCategory, ALL_NEWS } from "@/data/newsData";

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

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const categoryTitle = CategoryTitles[slug] || "قسم الأخبار";
  const articles = getArticlesByCategory(slug);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-black">
            <Filter className="w-3.5 h-3.5" />
            <span>قسم الأخبار المتخصص</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black">{categoryTitle}</h1>
          <p className="text-xs md:text-sm text-slate-200 font-bold">
            تغطية صحفية مكثفة من فريق يحدث الآن 24 على مدار الساعة.
          </p>
        </div>

        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white/30 shrink-0 shadow-md">
          <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className="group bg-background border border-foreground/10 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-200 flex flex-col">
              
              <div className={`relative h-44 w-full bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between text-white overflow-hidden`}>
                <div className="absolute left-[-10px] top-[-10px] w-28 h-28 opacity-15 pointer-events-none">
                  <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                </div>
                
                <span className="self-start bg-white/20 text-white text-[11px] font-black px-2.5 py-1 rounded-lg border border-white/20">
                  {item.category}
                </span>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-200 font-bold z-10">
                  <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-white/40">
                    <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                  </div>
                  <span>يحدث الآن 24</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-foreground/70 line-clamp-2 font-medium">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-foreground/10 flex items-center justify-between text-[11px] text-foreground/50 font-bold">
                  <span className="text-primary">{item.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{item.date}</span>
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
      ) : (
        <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-12 text-center space-y-4">
          <p className="text-base font-bold text-foreground/70">لا توجد أخبار متاحة حالياً في هذا القسم.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-black text-xs">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
      )}

    </div>
  );
}
