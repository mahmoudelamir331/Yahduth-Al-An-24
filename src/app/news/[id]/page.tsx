"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  Clock, 
  Eye, 
  Share2, 
  ArrowRight, 
  Bookmark, 
  ChevronLeft, 
  Check, 
  Copy, 
  MessageCircle, 
  Send,
  UserCheck,
  Quote
} from "lucide-react";
import { getArticleById, ALL_NEWS, Article } from "@/data/newsData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const article = getArticleById(resolvedParams.id);
  const [copied, setCopied] = useState(false);

  if (!article) {
    notFound();
  }

  const relatedArticles = ALL_NEWS.filter((item) => item.id !== article.id).slice(0, 4);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(article.title);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-foreground/60 bg-foreground/5 px-4 py-2.5 rounded-2xl border border-foreground/10 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <Link href={`/category/${article.categorySlug}`} className="hover:text-primary transition-colors">
          {article.category}
        </Link>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-primary truncate max-w-xs md:max-w-md font-extrabold">{article.title}</span>
      </nav>

      {/* Article Header & Title */}
      <header className="space-y-5">
        
        {/* Category & Urgent Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          {article.isUrgent && (
            <span className="bg-urgent text-white text-xs font-black px-3.5 py-1 rounded-full shadow flex items-center gap-1.5 pulse-urgent">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              خبر عاجل
            </span>
          )}
          <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-black px-3.5 py-1 rounded-full">
            {article.category}
          </span>
        </div>

        {/* Big H1 Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tight">
          {article.title}
        </h1>

        {/* Subtitle / Excerpt */}
        <p className="text-sm md:text-lg text-foreground/80 font-bold leading-relaxed border-r-4 border-primary pr-4 py-1.5 bg-foreground/5 rounded-l-2xl">
          {article.excerpt}
        </p>

        {/* Publisher Info & Time Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-foreground/10 py-4 text-xs font-bold text-foreground/75">
          
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary/30 shrink-0 shadow-md">
              <Image src="/logo.jpg" alt="محمد الأمين" fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-foreground font-black text-sm">
                <span>{article.author}</span>
                <UserCheck className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground/60 text-[11px] font-bold">بوابة يحدث الآن 24 الإخبارية</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 text-foreground/60 flex-wrap text-xs">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-primary" />
              {article.views} مشاهدة
            </span>
            <span>•</span>
            <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-black">
              زمن القراءة: {article.readTime}
            </span>
          </div>

        </div>

        {/* Top Share Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-foreground/5 p-3 rounded-2xl border border-foreground/10">
          <span className="text-xs font-black text-foreground/80 flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-primary" />
            مشاركة الخبر عبر:
          </span>

          <div className="flex items-center gap-2 flex-wrap">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>فيسبوك</span>
            </a>

            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>منصة X</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>تلجرام</span>
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all border ${
                copied
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : "bg-background text-foreground/80 hover:bg-foreground/10 border-foreground/20"
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "تم نسخ الرابط!" : "نسخ الرابط"}</span>
            </button>
          </div>
        </div>

      </header>

      {/* Featured Cover / Responsive Image Card */}
      <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden bg-slate-900 p-6 md:p-8 flex flex-col justify-end text-white shadow-xl border border-white/10">
        {article.imageUrl ? (
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient}`}></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-xs font-bold">
            <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-amber-300">
              <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <span>تغطية خاصة - يحدث الآن 24</span>
          </div>

          <span className="text-[11px] font-bold text-slate-200 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
            صورة صحفية حقيقية عالية الجودة
          </span>
        </div>
      </div>

      {/* Article Content Body (Mobile-Optimized Typography) */}
      <article className="bg-background border border-foreground/10 rounded-3xl p-6 md:p-10 shadow-sm space-y-6 text-foreground">
        
        {/* Quote Highlight Box */}
        <div className="bg-primary/5 border-r-4 border-primary p-4 md:p-6 rounded-2xl space-y-2 flex gap-3 items-start">
          <Quote className="w-8 h-8 text-primary shrink-0 opacity-40 mt-1" />
          <p className="text-sm md:text-base font-extrabold text-primary leading-relaxed">
            "نحرص في بوابة يحدث الآن 24 على نقل الحقائق الميدانية أولاً بأول بشفافية وموضوعية تامة."
          </p>
        </div>

        {/* Article Content Paragraphs */}
        <div className="space-y-6 text-base md:text-lg leading-loose md:leading-loose text-foreground/90 font-bold">
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-justify leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom Tags */}
        <div className="pt-6 border-t border-foreground/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-primary">الوسوم والكلمات المفتاحية:</span>
          {article.tags.map((tag) => (
            <span key={tag} className="bg-foreground/5 hover:bg-primary/10 hover:text-primary transition-colors px-3 py-1 rounded-xl text-xs font-bold text-foreground/75 cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>

      </article>

      {/* Bottom Share & Navigation Bar */}
      <div className="bg-foreground/5 border border-foreground/10 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-foreground/10 pb-4">
          <span className="text-sm font-black text-foreground flex items-center gap-2">
            <Share2 className="w-4 h-4 text-primary" />
            أعجبك التقرير؟ شاركه مع أصدقائك:
          </span>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب</span>
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>فيسبوك</span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>منصة X</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-black text-xs hover:underline">
            <ArrowRight className="w-4 h-4" />
            العودة لصفحة الأخبار الرئيسية
          </Link>

          <Link href={`/category/${article.categorySlug}`} className="text-xs font-bold text-foreground/60 hover:text-primary transition-colors">
            تصفح المزيد في {article.category} &larr;
          </Link>
        </div>
      </div>

      {/* Related News Section (4 Cards Grid) */}
      <section className="space-y-6 pt-6 border-t border-foreground/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border-2 border-primary/30 shrink-0 shadow-sm">
              <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-foreground">أخبار وتقارير مقترحة</h3>
              <p className="text-xs text-foreground/60">مواضيع قد تهمك متابعتها الآن</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedArticles.map((rel) => (
            <Link key={rel.id} href={`/news/${rel.id}`} className="group bg-background border border-foreground/10 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-200 flex flex-col block">
              <div className={`relative h-32 w-full bg-gradient-to-br ${rel.gradient} p-3 flex flex-col justify-between text-white`}>
                <span className="self-start bg-white/20 text-[10px] font-black px-2 py-0.5 rounded">
                  {rel.category}
                </span>

                <div className="flex items-center gap-1 text-[9px] text-slate-200 font-bold z-10">
                  <div className="relative w-3 h-3 rounded-full overflow-hidden shrink-0 border border-white/40">
                    <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
                  </div>
                  <span>يحدث الآن 24</span>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <h4 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
                <div className="pt-2 border-t border-foreground/10 flex items-center justify-between text-[10px] text-foreground/50 font-bold">
                  <span>{rel.date}</span>
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3" />
                    {rel.views}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
