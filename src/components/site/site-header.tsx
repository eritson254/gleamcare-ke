// src/components/site/site-header.tsx
import Image from "next/image";
import Link from "next/link";
import { Instagram, Search, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/site/mode-toggle";

function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2 text-xs sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link href="/faqs" className="hover:opacity-90">
            F.A.Q.’s
          </Link>
          <Link href="/contact" className="hover:opacity-90">
            Contact Us
          </Link>
        </div>

        {/* Center */}
        <p className="hidden text-center sm:block">
          Free shipping for any orders above KES 5,000
        </p>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:opacity-90"
          >
            <Instagram className="h-4 w-4" />
          </Link>

          <Link
            href="https://wa.me/254729702701"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Center line on mobile (since center text is hidden above) */}
      <div className="border-t border-white/15 sm:hidden">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs sm:px-6">
          Free shipping for any orders above KES 5,000
        </p>
      </div>
    </div>
  );
}

function MainNav() {
  return (
    <div className="border-b bg-background">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center px-4 py-4 sm:px-6">
        {/* Left nav */}
        <nav className="flex items-center gap-1">
          <Button variant="ghost" asChild className="rounded-2xl px-3">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild className="rounded-2xl px-3">
            <Link href="/shop">Shop</Link>
          </Button>
          <Button variant="ghost" asChild className="rounded-2xl px-3">
            <Link href="/products">Products</Link>
          </Button>
          <Button variant="ghost" asChild className="rounded-2xl px-3">
            <Link href="/blog">Blog</Link>
          </Button>
          <Button variant="ghost" asChild className="rounded-2xl px-3">
            <Link href="/about">About Us</Link>
          </Button>
        </nav>

        {/* Center logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white ring-1 ring-border">
              <Image
                src="/brand/logo.png"
                alt="GleamCare"
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <span className="hidden font-[var(--font-heading)] text-2xl tracking-tight sm:inline">
              GleamCare
            </span>
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-2xl"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-2xl"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <MainNav />
    </header>
  );
}
