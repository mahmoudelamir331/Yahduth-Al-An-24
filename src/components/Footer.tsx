import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronLeft } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground/[0.03] dark:bg-slate-900/80 text-foreground border-t border-foreground/10 mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 space-y-10 max-w-7xl">
        
        {/* Top Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Publisher Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary shadow-sm shrink-0 bg-primary/10">
                <Image src="/brand-logo.jpg" alt="Logo" fill className="object-cover" priority />
              </div>
              <div>
                <h3 className="font-black text-lg text-primary">يحدث الآن 24</h3>
                <p className="text-[11px] text-foreground/60 font-bold">بوابة إخبارية صحفية مستقلة 24/7</p>
              </div>
            </div>

            <p className="text-xs text-foreground/70 leading-relaxed font-bold">
              تغطية صحفية مستقلة ومباشرة لجميع أحداث وتطورات محافظة أسوان وصعيد مصر والعالم لحظة بلحظة.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-foreground/70 font-bold">
              <MapPin className="w-4 h-4 text-urgent shrink-0" />
              <span>أسوان، جمهورية مصر العربية</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-foreground border-r-4 border-primary pr-3 py-0.5">
              صفحات المنصة الرئيسية
            </h4>
            <ul className="space-y-2 text-xs font-bold text-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-primary" />
                  <span>الصفحة الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-primary" />
                  <span>من نحن (عن المنصة)</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-primary" />
                  <span>اتصل بنا والتواصل الصحفي</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-primary" />
                  <span>سياسة الخصوصية</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-primary" />
                  <span>الشروط والأحكام</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Category Sections Column */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-foreground border-r-4 border-urgent pr-3 py-0.5">
              الأقسام الإخبارية
            </h4>
            <ul className="space-y-2 text-xs font-bold text-foreground/70">
              <li>
                <Link href="/category/aswan" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-urgent" />
                  <span>أخبار أسوان والتنمية</span>
                </Link>
              </li>
              <li>
                <Link href="/category/urgent" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-urgent" />
                  <span>التغطيات والأخبار العاجلة</span>
                </Link>
              </li>
              <li>
                <Link href="/category/politics" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-urgent" />
                  <span>سياسة واقتصاد</span>
                </Link>
              </li>
              <li>
                <Link href="/category/reports" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-urgent" />
                  <span>تحقيقات وحوارات صحفية</span>
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3 h-3 text-urgent" />
                  <span>رياضة وتكنولوجيا</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Publisher Badge Column */}
          <div className="bg-background border border-foreground/10 rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-primary/20 shrink-0">
                  <Image src="/brand-logo.jpg" alt="محمد الأمين" fill className="object-cover" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-foreground">هيئة التحرير — يحدث الآن 24</h5>
                  <span className="text-[10px] text-primary font-bold block">مؤسسو المنصة وإدارة التحرير</span>
                </div>
              </div>
              <p className="text-[11px] text-foreground/60 leading-relaxed font-bold">
                نقل الحقائق الميدانية بشفافية وأمانة صحفية لمواطني أسوان ومصر.
              </p>
            </div>

            <Link
              href="/contact"
              className="bg-primary hover:bg-primary/90 text-white font-black text-xs py-2.5 px-4 rounded-xl text-center shadow-sm transition-all block hover:scale-105"
            >
              تواصل مع التحرير
            </Link>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-foreground/60">
          <p className="text-center sm:text-right">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - بوابة <strong className="text-primary font-black">يحدث الآن 24</strong> الإخبارية
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">الخصوصية</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
