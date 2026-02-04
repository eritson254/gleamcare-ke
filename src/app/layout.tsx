// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, DM_Serif_Display } from "next/font/google";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const headingFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "GleamCare",
  description: "Authentic skincare and curated beauty essentials in Nairobi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${headingFont.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-dvh bg-background">
            <SiteHeader />
            {/* IMPORTANT: pt-0 so content starts immediately under the header */}
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
