"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: Readonly<{
  error: Error & { digest?: string };
  retry: () => void;
}>) {
  useEffect(() => {
    console.error("Root layout rendering failed", error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#020617", color: "white", fontFamily: "Arial, sans-serif", textAlign: "center", padding: "24px" }}>
        <main style={{ maxWidth: "448px" }}>
          <h1>حصلت مشكلة مؤقتة</h1>
          <p>من فضلك حاول تاني بعد لحظات.</p>
          <button type="button" onClick={retry} style={{ border: 0, borderRadius: "12px", background: "#fbbf24", color: "#020617", cursor: "pointer", fontWeight: 700, marginTop: "12px", padding: "12px 20px" }}>
            حاول تاني
          </button>
        </main>
      </body>
    </html>
  );
}
