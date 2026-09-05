"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Moon, Sun, Calendar } from "lucide-react";
import { useTheme } from "next-themes";
import type { PublicCategory } from "@/lib/siteSettings";

const TickerNews = [
  "المراسل الصحفي محمد الأمين يكشف عن مشروعات جديدة بمحافظة أسوان",
  "عاجل: وضع حجر الأساس لمجمع الصناعات الحرفية الجديد بأسوان",
  "ارتفاع إقبال السائحين على معابد أبو سمبل وفيلة بالتزامن مع موسم الشتاء",
  "توسع مشروعات الطاقة الشمسية ببنبان والاعتماد على الذكاء الاصطناعي",
  "بيان رسمي يشيد بتكاتف الجهود التنفيذية لمتابعة مشروعات صعيد مصر",
];

export function Header({ categories }: { categories: PublicCategory[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const router = useRouter();
  const todayDate = "أسوان - مصر";

  return (
    <>
      {/* Top Utility Header Bar */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 border-b border-white/10 w-full overflow-hidden">
        <div className="container mx-auto px-4 flex items-center justify-between gap-2 max-w-7xl">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-urgent text-white font-extrabold px-2 py-0.5 rounded text-[10px] shrink-0 animate-pulse">
              مباشر 🔴
            </span>
            <span className="truncate font-bold text-slate-300">
              بوابة إخبارية صحفية مستقلة — أسوان وصعيد مصر
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-300 font-bold shrink-0">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              {todayDate || "أسوان - مصر"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Component */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-sm w-full overflow-hidden">
        <div className="container mx-auto px-3 sm:px-4 py-3 max-w-7xl flex items-center justify-between gap-3">
          
          {/* Logo & Publisher Branding */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-11 h-10 sm:w-14 sm:h-12 rounded-2xl overflow-hidden border-2 border-primary shadow-sm bg-primary/10 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/brand-logo.jpg"
                alt="شعار يحدث الآن 24"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-2xl tracking-tight text-primary leading-none">
                  يحدث الآن
                </span>
                <span className="bg-urgent text-white text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-md shadow-sm">
                  24
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-foreground/70 tracking-wide mt-0.5">
                بوابة إخبارية صحفية مستقلة 24/7
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 font-bold text-xs">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="px-2.5 py-2 rounded-xl text-foreground hover:text-primary hover:bg-foreground/5 transition-all">{category.name}</Link>
            ))}
          </nav>
          <nav className="hidden">
            <Link href="/" className="px-2.5 py-2 rounded-xl text-foreground hover:text-primary hover:bg-foreground/5 transition-all">
              الرئيسية
            </Link>
            <Link href="/category/aswan" className="px-2.5 py-2 rounded-xl text-foreground hover:text-primary hover:bg-foreground/5 transition-all flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              أخبار أسوان
            </Link>
            <Link href="/category/urgent" className="px-2.5 py-2 rounded-xl text-urgent font-extrabold hover:bg-urgent/10 transition-all flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-urgent animate-pulse"></span>
              عاجل
            </Link>
            <Link href="/category/politics" className="px-2.5 py-2 rounded-xl text-foreground hover:text-primary hover:bg-foreground/5 transition-all">
              سياسة واقتصاد
            </Link>
            <Link href="/about" className="px-2.5 py-2 rounded-xl text-foreground hover:text-primary hover:bg-foreground/5 transition-all">
              من نحن
            </Link>
            <Link href="/contact" className="px-2.5 py-2 rounded-xl text-primary font-black bg-primary/10 hover:bg-primary hover:text-white transition-all">
              اتصل بنا
            </Link>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-foreground/80 hover:text-primary hover:bg-foreground/5 transition-colors"
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl text-foreground/80 hover:text-primary hover:bg-foreground/5 transition-colors"
              aria-label="تغيير الوضع"
            >
              {mounted ? (
                theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>

            <button
              className="lg:hidden p-2.5 text-foreground/80 hover:text-primary rounded-xl bg-foreground/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="القائمة"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-foreground/10 bg-background shadow-xl animate-in slide-in-from-top-2">
            <div className="container mx-auto px-4 py-4 space-y-2 max-w-full">
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-2xl mb-3 border border-primary/20">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                  <Image src="/brand-logo.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <div className="text-xs">
                  <strong className="text-primary block font-black text-sm">يحدث الآن 24</strong>
                  <span className="text-foreground/70 font-bold">بوابة إخبارية صحفية مستقلة</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[{ name: "الرئيسية", href: "/" }, ...categories.map((category) => ({ name: category.name, href: `/category/${category.slug}` })), { name: "من نحن", href: "/about" }, { name: "اتصل بنا", href: "/contact" }].map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="block px-3 py-2.5 rounded-xl font-black text-foreground hover:bg-primary/10 hover:text-primary transition-all text-xs bg-foreground/5 text-center border border-foreground/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Responsive Live News Marquee */}
        <div className="bg-urgent/10 border-t border-foreground/10 text-foreground overflow-hidden flex items-center h-9 text-xs w-full max-w-full">
          <div className="bg-urgent text-white font-black px-3.5 h-full flex items-center gap-1.5 shrink-0 z-10 shadow-md">
            <div className="relative w-4 h-4 rounded-full overflow-hidden border border-white/40 shrink-0">
              <Image src="/brand-logo.jpg" alt="عاجل" fill className="object-cover" />
            </div>
            <span className="text-[11px]">عاجل</span>
          </div>

          <div className="flex-1 overflow-hidden relative w-full">
            <div className="animate-ticker space-x-6 space-x-reverse font-bold py-1 text-xs">
              {TickerNews.concat(TickerNews).map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-urgent"></span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-background border border-foreground/10 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 left-4 p-2 text-foreground/60 hover:text-foreground rounded-full hover:bg-foreground/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-primary/20 shrink-0">
                <Image src="/brand-logo.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <h3 className="text-base font-black text-primary">
                البحث في يحدث الآن 24
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  setIsSearchOpen(false);
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="ابحث في الأخبار والتقارير..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-black px-5 py-3 rounded-xl text-xs transition-colors shadow"
              >
                بحث
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
