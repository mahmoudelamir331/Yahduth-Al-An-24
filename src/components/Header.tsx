"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, Moon, Sun, Calendar, Flame } from "lucide-react";
import { useTheme } from "next-themes";

const Categories = [
  { name: "الرئيسية", href: "/" },
  { name: "أخبار أسوان", href: "#aswan" },
  { name: "عاجل", href: "#urgent" },
  { name: "سياسة واقتصاد", href: "#politics" },
  { name: "تحقيقات وحوارات", href: "#reports" },
  { name: "رياضة وتكنولوجيا", href: "#sports" },
];

const TickerNews = [
  "المراسل الصحفي محمد الأمين يكشف عن مشروعات جديدة بمحافظة أسوان",
  "عاجل: افتتاح مجمع خدمات متكامل لتسهيل الإجراءات على المواطنين",
  "متابعة ميدانية لتطوير كورنيش النيل وتطوير حركة السياحة بالصعيد",
  "استعدادات مكثفة لربط أسوان بالشبكة الكهربائية الموحدة وتحديث البنية التحتية",
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    setMounted(true);
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setTodayDate(date.toLocaleDateString('ar-EG', options));
  }, []);

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 border-b border-white/10 hidden sm:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 opacity-90">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              {todayDate || "الأحد، 30 أغسطس 2026"}
            </span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-semibold text-amber-300">
              بوابة إخبارية شاملة
            </span>
          </div>
          <div className="flex items-center gap-3 font-medium">
            <span className="text-slate-200">إشراف وتغطية: <strong className="text-white font-bold">الصحفي محمد الأمين (مراسل أسوان)</strong></span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden shadow-md border-2 border-primary/20 group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/logo.jpg" 
                alt="لوجو يحدث الآن 24" 
                fill 
                sizes="(max-width: 768px) 48px, 64px"
                className="object-cover" 
                priority 
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black text-primary tracking-tight">يحدث الآن</span>
                <span className="bg-urgent text-white text-xs md:text-sm font-extrabold px-1.5 py-0.5 rounded shadow-sm">24</span>
              </div>
              <span className="text-[10px] md:text-xs text-foreground/70 font-bold mt-0.5">
                المراسل الصحفي بأسوان / محمد الأمين
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-bold text-foreground/80 text-sm">
            {Categories.map((cat) => (
              <Link 
                key={cat.name} 
                href={cat.href} 
                className="px-3 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Actions Left */}
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full text-foreground/80 hover:text-primary hover:bg-foreground/5 transition-colors"
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full text-foreground/80 hover:text-primary hover:bg-foreground/5 transition-colors"
              aria-label="تغيير الوضع"
            >
              {mounted ? (
                theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <div className="w-5 h-5 opacity-0" />
              )}
            </button>

            <button
              className="lg:hidden p-2.5 text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="القائمة"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-foreground/10 bg-background/98 shadow-xl animate-in slide-in-from-top-2">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {Categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="block px-4 py-3 rounded-lg font-bold text-foreground/90 hover:bg-primary/10 hover:text-primary transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Live News Ticker / Marquee */}
        <div className="bg-urgent/10 border-t border-b border-urgent/20 text-foreground overflow-hidden flex items-center h-10 text-xs md:text-sm">
          <div className="bg-urgent text-white font-black px-3 md:px-5 h-full flex items-center gap-1.5 shrink-0 shadow-md z-10">
            <Flame className="w-4 h-4 pulse-urgent text-amber-300" />
            <span>شريط الأخبار</span>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-ticker space-x-8 space-x-reverse font-semibold py-1">
              {TickerNews.concat(TickerNews).map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-background border border-foreground/10 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 left-4 p-2 text-foreground/60 hover:text-foreground rounded-full hover:bg-foreground/10"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              ابحث في موقع يحدث الآن 24
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="اكتب كلمات البحث هنا (مثل: أسوان، اقتصاد، تقارير)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl py-3 px-4 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
            {searchQuery && (
              <div className="mt-4 p-4 bg-foreground/5 rounded-xl text-sm text-foreground/70">
                جاري البحث عن: <strong className="text-primary">{searchQuery}</strong>...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
