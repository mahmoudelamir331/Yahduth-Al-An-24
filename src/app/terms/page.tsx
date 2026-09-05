import React from "react";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";

export const metadata = {
  title: "الشروط والأحكام - يحدث الآن 24",
  description: "الشروط والأحكام الخاصة باستمال بوابة يحدث الآن 24 الإخبارية.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
      <nav className="flex items-center gap-2 text-xs font-bold text-foreground/60 bg-foreground/5 px-4 py-2.5 rounded-2xl border border-foreground/10 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-primary font-black">الشروط والأحكام</span>
      </nav>

      <div className="bg-background border border-foreground/10 rounded-3xl p-6 md:p-10 shadow-lg space-y-6">
        <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
          <FileText className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground">الشروط والأحكام الاستخدام</h1>
            <p className="text-xs text-foreground/60 font-bold">بوابة يحدث الآن 24 - الصحفي محمد الأمين</p>
          </div>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-foreground/80 leading-relaxed font-medium">
          <p>
            أهلاً بكم في بوابة <strong>&quot;يحدث الآن 24&quot;</strong>. استخدامكم لهذه البوابة يعني موافقتكم الكاملة على الالتزام بنقاط الشروط والأحكام التالية:
          </p>

          <h2 className="text-base font-black text-foreground pt-2">1. حقوق الملكية الفكرية</h2>
          <p>
            جميع المحتويات الصحفية والتقارير والصور المنشورة على هذا الموقع هي ملك حصري لمنصة &quot;يحدث الآن 24&quot; وللصحفي محمد الأمين، ويحظر إعادة نشرها أو اقتباسها دون مراجعة وتوضيح المصدر بصراحة.
          </p>

          <h2 className="text-base font-black text-foreground pt-2">2. الدقة والمسؤولية الصحفية</h2>
          <p>
            نسعى جاهدين لتحري أقصى درجات الدقة والحيادية والموضوعية في نقل الأخبار الميدانية من مصادرها الرسمية والموثوقة.
          </p>
        </div>
      </div>
    </div>
  );
}
