"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-5xl">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-foreground/60 bg-foreground/5 px-4 py-2.5 rounded-2xl border border-foreground/10 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-primary font-black">اتصل بنا</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-3 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-black">
            <MessageSquare className="w-4 h-4" />
            <span>التواصل المباشر والاستفسارات</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black">
            تواصل مع هيئة تحرير "يحدث الآن 24"
          </h1>
          <p className="text-xs md:text-sm text-slate-200 font-bold max-w-xl">
            نرحب بكافة الاستفسارات الصحفية، الاقتراحات، والبلاغات الإخبارية على مدار الساعة.
          </p>
        </div>

        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 shadow-lg">
          <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 bg-background border border-foreground/10 rounded-3xl p-6 md:p-8 shadow-lg space-y-6">
          <div>
            <h2 className="text-xl font-black text-foreground">أرسل لنا رسالة أو تغطية صحفية</h2>
            <p className="text-xs text-foreground/60 font-bold">يرجى ملء النموذج وسيقوم فريق التحرير بالتواصل معكم فوراً.</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-black text-emerald-600">تم استلام رسالتكم بنجاح!</h3>
              <p className="text-xs text-foreground/70 font-bold">شكراً لتواصلكم معنا. سيتم مراجعة الرسالة من قبل المحرر المسؤول محمد الأمين.</p>
              <button 
                onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", message: "" }); }}
                className="text-xs text-primary font-black underline pt-2 block mx-auto"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-foreground">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أدخل اسمك الكريم..."
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-foreground">رقم الهاتف / واتساب</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="مثال: 010xxxxxxxx"
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-foreground">نص الرسالة أو الخبر *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب تفاصيل الخبر أو الاستفسار هنا..."
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-black text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                إرسال الرسالة
              </button>
            </form>
          )}
        </div>

        {/* Info & Location Box (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          
          <div className="bg-foreground/5 border border-foreground/10 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-black text-primary border-b border-foreground/10 pb-3">
              معلومات التواصل المباشر
            </h3>

            <div className="space-y-4 text-xs font-bold text-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-foreground/50 block text-[10px]">مقر الجريدة والمكتب الصحفي:</span>
                  <span>محافظة أسوان - كورنيش النيل الرئيسي</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-foreground/50 block text-[10px]">الهاتف والواتساب المباشر:</span>
                  <a href="https://api.whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-extrabold hover:underline">
                    +20 100 000 0000 (واتساب التحرير)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-foreground/50 block text-[10px]">البريد الإلكتروني للتحرير:</span>
                  <span>contact@yahduthalan24.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-primary text-white rounded-3xl p-6 space-y-3 shadow-lg">
            <h4 className="font-black text-sm">المحرر والمسؤول الصحفي</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-bold">
              المراسل الصحفي / **محمد الأمين** متواجد لتغطية الفعاليات والمؤتمرات الميدانية في أسوان والصعيد.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
