import React from "react";
import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "سياسة الخصوصية - يحدث الآن 24",
  description: "سياسة الخصوصية وحماية البيانات في بوابة يحدث الآن 24 الإخبارية.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
      <nav className="flex items-center gap-2 text-xs font-bold text-foreground/60 bg-foreground/5 px-4 py-2.5 rounded-2xl border border-foreground/10 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-primary font-black">سياسة الخصوصية</span>
      </nav>

      <div className="bg-background border border-foreground/10 rounded-3xl p-6 md:p-10 shadow-lg space-y-6">
        <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground">سياسة الخصوصية وحماية البيانات</h1>
            <p className="text-xs text-foreground/60 font-bold">بوابة يحدث الآن 24 - الصحفي محمد الأمين</p>
          </div>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-foreground/80 leading-relaxed font-medium">
          <p>
            تلتزم بوابة <strong>"يحدث الآن 24"</strong> بحماية خصوصية زوارها ومستخدميها بأعلى معايير الأمان والتشفير. توضح هذه الوثيقة طبيعة المعلومات التي يتم جمعها وكيفية التعامل معها.
          </p>

          <h2 className="text-base font-black text-foreground pt-2">1. المعلومات التي نجمعها</h2>
          <p>
            لا تتطلب تصفح الأخبار والتقارير العامة تسجيلاً أو تقديم بيانات شخصية. نقوم فقط بجمع بيانات تحليلية مجهولة حول حركة المرور لتحسين سرعة وأداء الموقع وتجربة التصفح على أجهزة الموبايل.
          </p>

          <h2 className="text-base font-black text-foreground pt-2">2. ملفات تعريف الارتباط (Cookies)</h2>
          <p>
            نستخدم ملفات تعريف الارتباط البسيطة فقط لحفظ تفضيلات المظهر (الوضع الليلي والنهاري) وتسهيل تصفح الأقسام والبحث السريع.
          </p>

          <h2 className="text-base font-black text-foreground pt-2">3. حماية البيانات والتواصل</h2>
          <p>
            أي بيانات يتم تقديمها عبر نموذج "اتصل بنا" أو الواتساب تظل سرية تماماً وتستخدم حصرياً للتواصل الصحفي ولا يتم مشاركتها مطلقاً مع أي طرف ثالث.
          </p>
        </div>
      </div>
    </div>
  );
}
