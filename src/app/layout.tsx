// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Merriweather, Inter } from "next/font/google";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

const heading = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GleamCare Kenya",
    template: "%s | GleamCare Kenya",
  },
  description: "Authentic skincare and beauty - Kenya-wide delivery.",
  applicationName: "GleamCare Kenya",
  metadataBase: new URL("https://gleamcare.ke"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GleamCare",
    title: "GleamCare",
    description:
      "Authentic skincare and curated beauty essentials in Kenya. Genuine products, including Korean skincare. Delivery across Kenya.",
    locale: "en_KE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      <body
        className={[
          "[--font-sans:var(--font-body)]",
          "min-h-dvh bg-background text-foreground antialiased",
          "font-[var(--font-body)]",
        ].join(" ")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
      </body>
    </html>
  );
}
