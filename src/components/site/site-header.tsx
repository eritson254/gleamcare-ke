// src/components/site/site-header.tsx
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Instagram,
  Menu,
  MessageCircle,
  ShoppingBag,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SiteSearchDialog } from "@/components/site/site-search-dialog";
import { WishlistIcon } from "@/components/site/wishlist-icon";
import { getProductIndex } from "@/lib/mdx/products";

const CATEGORY_NAV_ITEMS = [
  { href: "/shop/skincare", label: "Skincare" },
  { href: "/shop/k-beauty", label: "K-beauty" },
  { href: "/shop/body-and-fragrance", label: "Body care" },
];

const DESKTOP_NAV_ITEMS = [
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "Why GleamCare" },
  { href: "/contact", label: "Contact" },
];

const SHOP_MENU_LINKS = [
  { href: "/shop", label: "All products" },
  { href: "/shop/skincare", label: "Skincare" },
  { href: "/shop/k-beauty", label: "K-beauty" },
  { href: "/shop/body-and-fragrance", label: "Body care" },
  { href: "/products", label: "Product index" },
];

const QUICK_LINKS = [
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/checkout", label: "Checkout" },
];

const WORDMARK_CLASS =
  "font-[var(--font-heading)] font-medium tracking-[-0.035em] leading-none";

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-border/70 bg-white/85 shadow-sm">
        <Image
          src="/brand/logo.png"
          alt="GleamCare"
          fill
          className="object-contain p-2"
          priority
        />
      </div>
      <div className="leading-none">
        <p className={`${WORDMARK_CLASS} text-[1.95rem]`}>
          GleamCare
        </p>
      </div>
    </Link>
  );
}

function TopBar() {
  return (
    <div className="border-b border-border/60 bg-[color:var(--foreground)] text-[color:var(--background)]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2.5 text-[11px] tracking-[0.03em] sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <span>Genuine products</span>
          <span>Kenya-wide delivery</span>
          <span>WhatsApp support</span>
        </div>
        <div className="flex items-center gap-4 text-[color:var(--background)]/75">
          <Link href="/faqs" className="transition hover:text-[color:var(--background)]">
            FAQs
          </Link>
          <Link href="/contact" className="transition hover:text-[color:var(--background)]">
            Contact
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition hover:text-[color:var(--background)]"
          >
            <Instagram className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="https://wa.me/254729702701"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="transition hover:text-[color:var(--background)]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[340px] max-w-[calc(100vw-1rem)] overflow-y-auto border-r border-border/70 bg-background/95 p-0 [-ms-overflow-style:none] [scrollbar-width:none] backdrop-blur [&::-webkit-scrollbar]:hidden"
      >
        <div className="border-b border-border/70 p-5">
          <SheetHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-[var(--font-heading)] text-3xl font-medium tracking-[-0.03em]">
                Menu
              </SheetTitle>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Soft luxury beauty shopping with genuine products, routine guidance,
              and WhatsApp-first support.
            </p>
          </SheetHeader>
        </div>

        <div className="space-y-6 p-4">
          <div className="space-y-3">
            <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Shop paths
            </p>
            {[{ href: "/shop", label: "Shop all" }, ...CATEGORY_NAV_ITEMS, ...DESKTOP_NAV_ITEMS].map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-[1.15rem] border border-border/70 bg-card/80 px-4 py-3.5 text-sm font-medium shadow-sm transition hover:bg-accent/50"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </div>

          <div className="space-y-3 border-t border-border/60 pt-5">
            <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Quick links
            </p>
            {QUICK_LINKS.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-[1.15rem] border border-border/70 bg-card/80 px-4 py-3.5 text-sm font-medium shadow-sm transition hover:bg-accent/50"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-border/60 p-5">
          <Badge variant="secondary" className="px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
            WhatsApp orders
          </Badge>
          <Link
            href="https://wa.me/254729702701"
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-sm font-medium transition hover:text-primary"
          >
            +254 729 702 701
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MainNav() {
  const searchProducts = getProductIndex();

  return (
    <div className="border-b border-border/60 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto hidden w-full max-w-7xl items-center gap-6 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[auto_1fr_auto]">
        <Wordmark />

        <div className="flex items-center justify-center gap-1 rounded-full border border-border/70 bg-card/80 px-2 py-1 shadow-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full px-5 text-sm">
                Shop <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-52 rounded-2xl">
              <DropdownMenuLabel>Browse</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SHOP_MENU_LINKS.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {CATEGORY_NAV_ITEMS.map((item) => (
            <Button key={item.href} variant="ghost" asChild className="rounded-full px-4 text-sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}

          <div className="mx-1 h-5 w-px bg-border/80" />

          {DESKTOP_NAV_ITEMS.map((item) => (
            <Button key={item.href} variant="ghost" asChild className="rounded-full px-4 text-sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-1.5">
          <SiteSearchDialog products={searchProducts} />
          <WishlistIcon />
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            aria-label="Cart"
          >
            <Link href="/cart">
              <ShoppingBag className="h-4.5 w-4.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:px-6 lg:hidden">
        <div className="flex items-center gap-2">
          <MobileMenu />
          <SiteSearchDialog products={searchProducts} />
        </div>

        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-border/70 bg-white/85 shadow-sm">
            <Image
              src="/brand/logo.png"
              alt="GleamCare"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
          <div className="leading-none">
            <p className={`${WORDMARK_CLASS} text-[1.7rem]`}>
              GleamCare
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Kenya
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <WishlistIcon />
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            aria-label="Cart"
          >
            <Link href="/cart">
              <ShoppingBag className="h-4.5 w-4.5" />
            </Link>
          </Button>
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
