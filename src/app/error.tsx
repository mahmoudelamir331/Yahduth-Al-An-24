"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: Readonly<{
  error: Error & { digest?: string };
  retry: () => void;
}>) {
  useEffect(() => {
    console.error("Route rendering failed", error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center text-white" dir="rtl">
      <section className="max-w-md space-y-5 rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl">
        <h1 className="text-2xl font-black">حصلت مشكلة مؤقتة</h1>
        <p className="text-sm leading-7 text-slate-200">من فضلك حاول تاني. لو المشكلة مستمرة، تواصل مع إدارة الموقع.</p>
        <button type="button" onClick={retry} className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950">
          حاول تاني
        </button>
      </section>
    </main>
  );
}
