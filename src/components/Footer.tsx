import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronLeft } from "lucide-react";

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" /></svg>;
}
function XIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" /></svg>;
}
function YoutubeIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden="true"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" /></svg>;
}
function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" /></svg>;
}
function TelegramIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden="true"><path d="M21.94 3.24a1.63 1.63 0 0 0-1.66-.28L2.4 9.72c-.64.25-1.04.82-1.04 1.46s.4 1.21 1.04 1.46l4.36 1.7 1.66 5.29c.19.6.7 1.03 1.32 1.09h.1c.56 0 1.1-.28 1.42-.75l2.24-3.24 4.5 3.36c.28.21.62.32.96.32.19 0 .38-.03.56-.1.5-.2.87-.63 1-1.16l3.2-14.02a1.63 1.63 0 0 0-.6-1.68Z" /></svg>;
}
function WhatsappIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.04 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.43-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.88-9.89 9.88Zm8.42-18.3A11.82 11.82 0 0 0 12.04 0C5.49 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.88-11.89 0-3.18-1.24-6.16-3.47-8.42Z" /></svg>;
}

const socialIcons = [
  { key: "facebook", label: "فيسبوك", Icon: FacebookIcon },
  { key: "twitter", label: "تويتر / X", Icon: XIcon },
  { key: "youtube", label: "يوتيوب", Icon: YoutubeIcon },
  { key: "instagram", label: "إنستجرام", Icon: InstagramIcon },
  { key: "telegram", label: "تيليجرام", Icon: TelegramIcon },
  { key: "whatsapp", label: "واتساب", Icon: WhatsappIcon },
] as const;

export function Footer({ socialLinks }: { socialLinks?: { facebook: string | null; twitter: string | null; youtube: string | null; instagram: string | null; telegram: string | null; whatsapp: string | null } }) {
  return (
    <footer className="bg-foreground/[0.03] text-foreground border-t border-foreground/10 mt-16">
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
          <div className="flex items-center gap-3">
            {socialLinks && (
              <div className="flex items-center gap-2">
                {socialIcons.filter(({ key }) => socialLinks[key]).map(({ key, label, Icon }) => (
                  <a
                    key={key}
                    href={socialLinks[key] as string}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid size-8 place-items-center rounded-full bg-foreground/5 text-foreground/70 transition-colors hover:bg-primary hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
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
