"use client";

import { useEffect } from "react";

/** يسجل زيارة واحدة لكل جلسة تصفح في قاعدة البيانات. */
export function VisitTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("visit-tracked") === "1") return;
    window.sessionStorage.setItem("visit-tracked", "1");
    fetch("/api/visit", { method: "POST" }).catch(() => undefined);
  }, []);
  return null;
}
