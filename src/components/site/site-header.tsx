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
import { ModeToggle } from "@/components/site/mode-toggle";
import { SiteSearchDialog } from "@/components/site/site-search-dialog";
import { WishlistIcon } from "@/components/site/wishlist-icon";
import { getProductIndex } from "@/lib/mdx/products";

const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
];

const SHOP_MENU_LINKS = [
  { href: "/shop", label: "All shop items" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
];

const PRODUCT_MENU_LINKS = [
  { href: "/products", label: "All products" },
  { href: "/shop/skincare", label: "Skincare" },
  { href: "/shop/k-beauty", label: "K-Beauty" },
  { href: "/shop/body-and-fragrance", label: "Body and Fragrance" },
];

const SECONDARY_LINKS = [
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
];

function TopBar() {
  return (
    <div className="border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-full">
            Free shipping over KES 5,000
          </Badge>
          <span className="hidden text-muted-foreground sm:inline">
            Authentic skincare and beauty essentials
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="/faqs" className="hover:text-foreground">
            FAQs
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-foreground"
          >
            <Instagram className="h-4 w-4" />
          </Link>
          <Link
            href="https://wa.me/254729702701"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" />
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
          className="rounded-full"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[330px] p-0">
        <div className="border-b p-4">
          <SheetHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl">Menu</SheetTitle>

              <SheetClose asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium beauty, skincare, and personal care
            </p>
          </SheetHeader>
        </div>

        <div className="space-y-3 p-3">
          <p className="px-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Main
          </p>
          <SheetClose asChild>
            <Link
              href="/shop"
              className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3 text-sm font-medium hover:bg-accent"
            >
              Shop
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/products"
              className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3 text-sm font-medium hover:bg-accent"
            >
              Products
            </Link>
          </SheetClose>
          {PRIMARY_LINKS.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3 text-sm font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </div>

        <div className="space-y-3 border-t p-3">
          <p className="px-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Product categories
          </p>
          {PRODUCT_MENU_LINKS.slice(1).map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3 text-sm font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </div>

        <div className="space-y-3 border-t p-3">
          <p className="px-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Quick links
          </p>
          {SECONDARY_LINKS.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3 text-sm font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </div>

        <div className="mt-auto border-t p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            WhatsApp orders
          </p>
          <Link
            href="https://wa.me/254729702701"
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-sm font-medium hover:text-primary"
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
    <div className="border-b bg-background/95 backdrop-blur">
      <div className="mx-auto hidden w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:flex">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border bg-white">
            <Image
              src="/brand/logo.png"
              alt="GleamCare"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
          <div className="leading-tight">
            <p className="text-base">GleamCare</p>
            <p className="text-xs text-muted-foreground">Kenya</p>
          </div>
        </Link>

        <nav className="flex items-center rounded-full border bg-card px-2 py-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full px-4">
                Shop <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-52">
              <DropdownMenuLabel>Shop</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SHOP_MENU_LINKS.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full px-4">
                Products <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuLabel>Products</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PRODUCT_MENU_LINKS.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {PRIMARY_LINKS.map((item) => (
            <Button key={item.href} variant="ghost" asChild className="rounded-full px-4">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <SiteSearchDialog products={searchProducts} />
          <WishlistIcon />
          <Button
            asChild
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Cart"
          >
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 md:hidden">
        <div className="flex items-center gap-1">
          <SiteSearchDialog products={searchProducts} />
          <WishlistIcon />
          <Button
            asChild
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Cart"
          >
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl border bg-white">
            <Image
              src="/brand/logo.png"
              alt="GleamCare"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
          <span className="text-sm">GleamCare</span>
        </Link>

        <div className="flex items-center gap-1">
          <ModeToggle />
          <MobileMenu />
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
