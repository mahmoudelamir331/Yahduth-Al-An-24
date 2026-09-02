"use client";

import { useEffect, useState } from "react";

type Props = { enabled: boolean; antiAdblockEnabled: boolean; children: React.ReactNode };

export function SiteProtection({ enabled, antiAdblockEnabled, children }: Props) {
  const [adblockDetected, setAdblockDetected] = useState(false);

  useEffect(() => {
    if (enabled) {
      const preventCopy = (event: ClipboardEvent) => event.preventDefault();
      const preventContextMenu = (event: MouseEvent) => {
        if ((event.target as HTMLElement).closest("img")) event.preventDefault();
      };
      document.addEventListener("copy", preventCopy);
      document.addEventListener("contextmenu", preventContextMenu);
      document.documentElement.classList.add("content-protected");
      return () => {
        document.removeEventListener("copy", preventCopy);
        document.removeEventListener("contextmenu", preventContextMenu);
        document.documentElement.classList.remove("content-protected");
      };
    }
  }, [enabled]);

  useEffect(() => {
    if (!antiAdblockEnabled) return;
    const bait = document.createElement("div");
    bait.className = "ad-banner ad adsbox";
    bait.setAttribute("aria-hidden", "true");
    bait.style.cssText = "position:absolute;left:-10000px;width:1px;height:1px;";
    document.body.appendChild(bait);
    const timer = window.setTimeout(() => {
      if (bait.offsetHeight === 0 || bait.clientHeight === 0) setAdblockDetected(true);
      bait.remove();
    }, 350);
    return () => {
      window.clearTimeout(timer);
      bait.remove();
    };
  }, [antiAdblockEnabled]);

  return (
    <>
      <div className={adblockDetected ? "hidden" : "contents"}>{children}</div>
      {adblockDetected && (
        <main className="min-h-screen grid place-items-center px-6 py-16 text-center bg-background">
          <section className="max-w-lg rounded-3xl border border-primary/20 bg-foreground/5 p-8 shadow-xl">
            <h1 className="text-2xl font-black text-primary">عفواً، لدعم صحافتنا</h1>
            <p className="mt-3 text-base font-semibold opacity-75">يرجى إيقاف مانع الإعلانات لقراءة الخبر.</p>
          </section>
        </main>
      )}
    </>
  );
}
