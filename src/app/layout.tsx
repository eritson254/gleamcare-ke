// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GleamCare Kenya | Authentic Skincare, K-Beauty & Beauty Shop",
    template: "%s | GleamCare Kenya",
  },
  description: siteConfig.description,
  applicationName: "GleamCare Kenya",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  keywords: [
    "GleamCare Kenya",
    "skincare Kenya",
    "Korean skincare Kenya",
    "K-beauty Kenya",
    "beauty shop Nairobi",
    "authentic skincare products Kenya",
    "COSRX Kenya",
    "Beauty of Joseon Kenya",
    "sunscreen Kenya",
    "body care Kenya",
    "fragrance Kenya",
  ],
  openGraph: {
    type: "website",
    siteName: "GleamCare",
    title: "GleamCare Kenya",
    description: siteConfig.description,
    locale: siteConfig.locale,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: "GleamCare Kenya beauty and skincare shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GleamCare Kenya",
    description: siteConfig.description,
    images: [siteConfig.defaultImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
    publisher: {
      "@id": absoluteUrl("/#localbusiness"),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "Store"],
    "@id": absoluteUrl("/#localbusiness"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    image: absoluteUrl(siteConfig.defaultImage),
    logo: absoluteUrl(siteConfig.logo),
    priceRange: "KES",
    currenciesAccepted: "KES",
    paymentAccepted: "Cash, M-Pesa",
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.mapUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer support",
      areaServed: "KE",
      availableLanguage: ["en", "sw"],
      url: siteConfig.whatsappUrl,
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable}`}
    >
      <head>
        <link
          rel="alternate"
          type="text/plain"
          title="LLM-readable site summary"
          href={absoluteUrl("/llms.txt")}
        />
        <link
          rel="alternate"
          type="text/plain"
          title="LLM-readable full inventory"
          href={absoluteUrl("/llms-full.txt")}
        />
      </head>
      <body
        className={[
          "[--font-sans:var(--font-ui)]",
          "min-h-dvh bg-background text-foreground antialiased",
          "font-[var(--font-ui)]",
        ].join(" ")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-dvh">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-0 sm:px-6">
              {children}
            </main>
            <SiteFooter />
          </div>

          <Toaster richColors />
        </ThemeProvider>
        <Analytics />
        <JsonLd data={siteJsonLd} />
      </body>
    </html>
  );
}
