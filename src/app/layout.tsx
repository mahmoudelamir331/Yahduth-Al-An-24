import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VisitTracker } from "@/components/VisitTracker";
import { LiveBroadcastBanner } from "@/components/LiveBroadcastBanner";
import { SiteProtection } from "@/components/SiteProtection";
import { AdSlot } from "@/components/AdSlot";
import { MaintenancePage } from "@/components/MaintenancePage";
import { getActiveCategories, getSiteSettings, isMaintenanceActive } from "@/lib/siteSettings";
import { getSiteUrl } from "@/lib/site-url";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  openGraph: { title: "يحدث الآن 24", description: "أخبار عاجلة وتغطية صحفية شاملة", images: [{ url: "/brand-logo.jpg", width: 1408, height: 768, alt: "شعار يحدث الآن 24" }] },
  twitter: { card: "summary_large_image", images: ["/brand-logo.jpg"] },
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
  const categories = await getActiveCategories();
  const maintenanceActive = isMaintenanceActive(siteSettings);

  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <VisitTracker />
        {maintenanceActive ? (
          <MaintenancePage message={siteSettings?.maintenance_message || ""} endsAt={siteSettings?.maintenance_ends_at ?? null} />
        ) : (
          <>
            <SiteProtection enabled={siteSettings?.content_protection_enabled ?? false} antiAdblockEnabled={siteSettings?.anti_adblock_enabled ?? false}>
              <AdSlot slot="header" />
              <Header categories={categories} logoUrl={siteSettings?.logo_url ?? null} />
              <LiveBroadcastBanner enabled={siteSettings?.live_enabled ?? false} url={siteSettings?.live_url ?? null} platform={siteSettings?.live_platform ?? null} />
              <main className="flex-1">{children}</main>
              <Footer />
            </SiteProtection>
          </>
        )}
      </body>
    </html>
  );
}
