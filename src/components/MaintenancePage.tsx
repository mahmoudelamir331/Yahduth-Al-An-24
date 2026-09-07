"use client";

import { useEffect, useState } from "react";

export function MaintenancePage({ message, endsAt }: { message: string; endsAt: string | null }) {
  const [remaining, setRemaining] = useState(() => endsAt ? Math.max(0, new Date(endsAt).getTime() - Date.now()) : 0);
  useEffect(() => { if (!endsAt) return; const timer = window.setInterval(() => setRemaining(Math.max(0, new Date(endsAt).getTime() - Date.now())), 1000); return () => window.clearInterval(timer); }, [endsAt]);
  const seconds = Math.floor(remaining / 1000); const days = Math.floor(seconds / 86400); const hours = Math.floor(seconds % 86400 / 3600); const minutes = Math.floor(seconds % 3600 / 60); const secs = seconds % 60;
  return <main className="maintenance-page"><div className="maintenance-logo">ي</div><h1>الموقع تحت الصيانة</h1><p>{message || "بنجهزلكم تجربة أحسن، هنرجع قريب."}</p>{endsAt && <div className="maintenance-countdown" aria-label="الوقت المتبقي"><b>{days} <small>يوم</small></b><b>{hours} <small>ساعة</small></b><b>{minutes} <small>دقيقة</small></b><b>{secs} <small>ثانية</small></b></div>}<form className="maintenance-form" onSubmit={event => { event.preventDefault(); alert("تمام، هنبعتلك تنبيه أول ما الموقع يرجع."); }}><input type="email" required placeholder="إيميلك عشان نبلغك" aria-label="إيميلك عشان نبلغك" /><button type="submit">Notify Me</button></form><div className="maintenance-social"><a href="#facebook">Facebook</a><a href="#instagram">Instagram</a><a href="#youtube">YouTube</a></div></main>;
}
