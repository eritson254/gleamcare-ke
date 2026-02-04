// src/components/site/site-header.tsx
import Image from "next/image";
import Link from "next/link";
import { Instagram, Menu, MessageCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from "@/components/site/mode-toggle";
import { SiteSearchDialog } from "@/components/site/site-search-dialog";
import { WishlistIcon } from "@/components/site/wishlist-icon";

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

        {/* Center (desktop) */}
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

      {/* Center line on mobile */}
      <div className="border-t border-white/15 sm:hidden">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs sm:px-6">
          Free shipping for any orders above KES 5,000
        </p>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-2xl"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[320px] p-0">
        <div className="border-b p-4">
          <SheetHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-[var(--font-heading)] text-xl tracking-tight">
                GleamCare
              </SheetTitle>

              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>

            <p className="text-sm text-muted-foreground">
              Beauty • Skincare • Personal Care
            </p>
          </SheetHeader>
        </div>

        <nav className="p-2">
          {[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            { href: "/products", label: "Products" },
            { href: "/blog", label: "Blog" },
            { href: "/about", label: "About Us" },
            { href: "/faqs", label: "F.A.Q.’s" },
            { href: "/contact", label: "Contact Us" },
            { href: "/wishlist", label: "Wishlist" },
            { href: "/cart", label: "Cart" },
          ].map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-2 border-t p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Orders via WhatsApp
          </p>
          <p className="mt-1 text-sm font-medium">+254 729 702 701</p>

          <div className="mt-4 flex items-center gap-3">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-accent"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Link>

            <Link
              href="https://wa.me/254729702701"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MainNav() {
  return (
    <div className="border-b bg-background">
      {/* Desktop layout */}
      <div className="mx-auto hidden w-full max-w-6xl grid-cols-3 items-center px-4 py-4 sm:px-6 md:grid">
        {/* Left nav (desktop) */}
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

        {/* Center logo (desktop) */}
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

            <span className="font-[var(--font-heading)] text-2xl tracking-tight">
              GleamCare
            </span>
          </Link>
        </div>

        {/* Right actions (desktop) */}
        <div className="flex items-center justify-end gap-1">
          <SiteSearchDialog />
          <WishlistIcon />
          <ModeToggle />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:hidden">
        <div className="flex items-center gap-2">
          <MobileMenu />
        </div>

        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white ring-1 ring-border">
            <Image
              src="/brand/logo.png"
              alt="GleamCare"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
          <span className="font-[var(--font-heading)] text-lg tracking-tight">
            GleamCare
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <SiteSearchDialog />
          <WishlistIcon />
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
