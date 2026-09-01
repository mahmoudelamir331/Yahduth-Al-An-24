import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings, isMaintenanceActive } from "@/lib/siteSettings";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "يحدث الآن 24 - أخبار عاجلة",
  description: "موقع يحدث الآن 24 الإخباري الأول، يتابع الأخبار لحظة بلحظة برؤية صحفية موضوعية",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const maintenanceActive = isMaintenanceActive(siteSettings);

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {maintenanceActive ? (
            <main className="flex-1 min-h-screen grid place-items-center px-6 py-16 text-center">
              <section className="max-w-xl space-y-4">
                <h1 className="text-3xl font-black">الموقع تحت الصيانة</h1>
                <p className="text-lg opacity-75">
                  {siteSettings?.maintenance_message || "سنعود إليكم قريبًا."}
                </p>
              </section>
            </main>
          ) : (
            <>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
