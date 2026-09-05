import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Award, Newspaper, ShieldCheck, MapPin, Mail, Phone, UserCheck } from "lucide-react";

export const metadata = {
  title: "من نحن - يحدث الآن 24",
  description: "نبذة عن منصة يحدث الآن 24 الإخبارية برئاسة المراسل الصحفي بأسوان محمد الأمين.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-5xl">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-foreground/60 bg-foreground/5 px-4 py-2.5 rounded-2xl border border-foreground/10 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-primary font-black">من نحن</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 relative overflow-hidden">
        <div className="space-y-4 max-w-2xl text-center md:text-right z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-black">
            <Newspaper className="w-4 h-4" />
            <span>منصة صحفية مستقلة 24/7</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            عن &quot;يحدث الآن 24&quot;
          </h1>
          <p className="text-sm md:text-base text-slate-200 font-bold leading-relaxed">
            بوابة إخبارية صحفية تغطي كافة الأحداث المحلية والميدانية في محافظة أسوان وصعيد مصر والعالم بكل دقة وحيادية.
          </p>
        </div>

        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 bg-primary/20">
          <Image src="/brand-logo.jpg" alt="Logo" fill className="object-cover" priority />
        </div>
      </div>

      {/* Journalist & Editor Profile Card */}
      <div className="bg-background border border-foreground/10 rounded-3xl p-6 md:p-10 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6 border-b border-foreground/10 pb-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-amber-400 shadow-md shrink-0">
            <Image src="/brand-logo.jpg" alt="محمد الأمين" fill className="object-cover" />
          </div>
          <div className="space-y-2 text-center md:text-right">
            <h2 className="text-2xl font-black text-foreground">المراسل الصحفي / محمد الأمين</h2>
            <p className="text-xs text-foreground/60 font-bold">
              صحفي ومراسل ميداني متخصص في تغطية مشروعات وتطورات الجنوب ومحافظة أسوان.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-foreground">الشفافية والحياد</h3>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
              نلتزم بميثاق الشرف الصحفي وننقل الحقائق والمعلومات الميدانية من مصادرها الموثوقة دون تحيز.
            </p>
          </div>

          <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-foreground">التغطية المباشرة 24/7</h3>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
              متابعة مستمرة ومباشرة لكل ما يهم المواطن الأسواني والمصري لحظة بلحظة مع عاجل الأخبار.
            </p>
          </div>

          <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-urgent text-white flex items-center justify-center font-black">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-foreground">صوت الصعيد و الجنوب</h3>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
              تركيز خاص على مشروعات وتحديات وإنجازات محافظة أسوان وصعيد مصر وصوت المواطنين.
            </p>
          </div>

        </div>
      </div>

      {/* Quick Contact Bar */}
      <div className="bg-primary text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-right">
          <h3 className="text-xl font-black">هل لديك تواصل صحفي أو خبر للتغطية؟</h3>
          <p className="text-xs text-slate-200 font-bold">فريق العمل متاح لاستقبال اقتراحاتكم وبلاغات الأخبار العاجلة.</p>
        </div>
        <Link 
          href="/contact"
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-6 py-3.5 rounded-2xl shadow-md transition-all hover:scale-105"
        >
          تواصل معنا الآن
        </Link>
      </div>

    </div>
  );
}
