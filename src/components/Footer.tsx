import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-12 space-y-10 max-w-7xl">
        
        {/* Top Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Publisher Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md shrink-0 bg-primary/20">
                <Image src="/logo.jpg" alt="Logo" fill className="object-cover" priority />
              </div>
              <div>
                <h3 className="font-black text-lg text-white">يحدث الآن 24</h3>
                <p className="text-[11px] text-amber-300 font-bold">بوابة إخبارية صحفية مستتقلة 24/7</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              تغطية صحفية مستقلة ومباشرة لجميع أحداث وتطورات محافظة أسوان وصعيد مصر والعالم لحظة بلحظة برئاسة المراسل الصحفي محمد الأمين.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-300 font-bold">
              <MapPin className="w-4 h-4 text-urgent shrink-0" />
              <span>أسوان، جمهورية مصر العربية</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-white border-r-4 border-primary pr-3 py-0.5">
              صفحات المنصة الرئيسية
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-300">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>• الصفحة الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>• من نحن (عن المنصة)</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>• اتصل بنا والتواصل الصحفي</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>• سياسة الخصوصية</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>• الشروط والأحكام</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Category Sections Column */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-white border-r-4 border-amber-400 pr-3 py-0.5">
              الأقسام الإخبارية
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-300">
              <li>
                <Link href="/category/aswan" className="hover:text-amber-300 transition-colors">
                  • أخبار أسوان والتنمية
                </Link>
              </li>
              <li>
                <Link href="/category/urgent" className="hover:text-amber-300 transition-colors">
                  • التغطيات والأخبار العاجلة
                </Link>
              </li>
              <li>
                <Link href="/category/politics" className="hover:text-amber-300 transition-colors">
                  • سياسة واقتصاد
                </Link>
              </li>
              <li>
                <Link href="/category/reports" className="hover:text-amber-300 transition-colors">
                  • تحقيقات وحوارات صحفية
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="hover:text-amber-300 transition-colors">
                  • رياضة وتكنولوجيا
                </Link>
              </li>
            </ul>
          </div>

          {/* Publisher Badge Column */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-amber-300 shrink-0">
                  <Image src="/logo.jpg" alt="محمد الأمين" fill className="object-cover" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-white">المراسل الصحفي / محمد الأمين</h5>
                  <span className="text-[10px] text-amber-300 font-bold block">مؤسس المنصة ورئيس التحرير</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                نقل الحقائق الميدانية بشفافية وأمانة صحفية لمواطني أسوان ومصر.
              </p>
            </div>

            <Link
              href="/contact"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl text-center shadow transition-all block hover:scale-105"
            >
              تواصل مع التحرير
            </Link>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-400">
          <p className="text-center sm:text-right">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - بوابة <strong className="text-white">يحدث الآن 24</strong> (الصحفي محمد الأمين)
          </p>
          <div className="flex items-center gap-4 text-slate-300">
            <Link href="/privacy" className="hover:text-amber-300 transition-colors">الخصوصية</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-amber-300 transition-colors">الشروط والأحكام</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-amber-300 transition-colors">اتصل بنا</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
