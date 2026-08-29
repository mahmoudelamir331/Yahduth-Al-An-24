import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Eye, Share2, ArrowRight, Bookmark, MapPin, Tag, ChevronLeft } from "lucide-react";
import { getArticleById, ALL_NEWS } from "@/data/newsData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = getArticleById(resolvedParams.id);

  if (!article) {
    notFound();
  }

  const relatedArticles = ALL_NEWS.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      
      {/* Breadcrumb & Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-foreground/60 bg-foreground/5 px-4 py-2.5 rounded-xl border border-foreground/10">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link href={`/category/${article.categorySlug}`} className="hover:text-primary transition-colors">
          {article.category}
        </Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-primary truncate max-w-md">{article.title}</span>
      </nav>

      {/* Main Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          {article.isUrgent && (
            <span className="bg-urgent text-white text-xs font-black px-3 py-1 rounded-full shadow flex items-center gap-1.5 pulse-urgent">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              خبر عاجل
            </span>
          )}
          <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-black px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-black text-foreground leading-tight">
          {article.title}
        </h1>

        <p className="text-sm md:text-base text-foreground/75 font-bold leading-relaxed border-r-4 border-primary pr-3 py-1">
          {article.excerpt}
        </p>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-foreground/10 py-3 text-xs font-bold text-foreground/70">
          
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
              <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="text-foreground block font-black text-xs">{article.author}</span>
              <span className="text-foreground/50 text-[10px] font-bold">يحدث الآن 24</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-foreground/60">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-primary" />
              {article.views} مشاهدة
            </span>
            <span>•</span>
            <span>وقت القراءة: {article.readTime}</span>
          </div>

        </div>
      </div>

      {/* Featured Cover / Image Card */}
      <div className={`relative h-64 md:h-96 w-full rounded-3xl overflow-hidden bg-gradient-to-br ${article.gradient} p-8 flex flex-col justify-end text-white shadow-xl`}>
        <div className="absolute left-[-20px] bottom-[-20px] w-80 h-80 opacity-15 pointer-events-none">
          <Image src="/logo.jpg" alt="Watermark" fill className="object-contain" />
        </div>
        
        <div className="relative z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-xs font-bold w-fit">
          <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-amber-300">
            <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <span>تغطية حصرية - بوابة يحدث الآن 24 الإخبارية</span>
        </div>
      </div>

      {/* Article Content Body */}
      <article className="bg-background border border-foreground/10 rounded-3xl p-6 md:p-10 shadow-sm space-y-6 text-foreground text-sm md:text-base leading-loose font-medium">
        {article.content.map((paragraph, index) => (
          <p key={index} className="text-justify font-bold text-foreground/90">
            {paragraph}
          </p>
        ))}

        {/* Tags */}
        <div className="pt-6 border-t border-foreground/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-primary flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            الوسوم:
          </span>
          {article.tags.map((tag) => (
            <span key={tag} className="bg-foreground/5 hover:bg-primary/10 hover:text-primary transition-colors px-3 py-1 rounded-lg text-xs font-bold text-foreground/75 cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Share / Back Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary/5 border border-primary/15 rounded-2xl p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-black text-xs hover:underline">
          <ArrowRight className="w-4 h-4" />
          العودة للصفحة الرئيسية
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold text-foreground/80">
          <span>مشاركة الخبر:</span>
          <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">تويتر</button>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">فيسبوك</button>
          <button className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors">واتساب</button>
        </div>
      </div>

      {/* Related Articles Section */}
      <section className="space-y-4 pt-6">
        <h3 className="text-xl font-black text-foreground border-b border-foreground/10 pb-3 flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-primary/30">
            <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
          </div>
          أخبار وتقارير ذات صلة
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedArticles.map((rel) => (
            <Link key={rel.id} href={`/news/${rel.id}`} className="group bg-background border border-foreground/10 rounded-2xl p-4 space-y-3 hover:shadow-lg hover:border-primary/40 transition-all duration-200 block">
              <div className={`relative h-28 w-full rounded-xl overflow-hidden bg-gradient-to-br ${rel.gradient} p-3 flex flex-col justify-between text-white`}>
                <span className="self-start bg-white/20 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  {rel.category}
                </span>
              </div>
              <h4 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {rel.title}
              </h4>
              <span className="text-[11px] text-foreground/50 font-bold block">{rel.date}</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
