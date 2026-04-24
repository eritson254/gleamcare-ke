import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/shop/skincare", label: "Skincare" },
      { href: "/shop/k-beauty", label: "K-beauty" },
      { href: "/shop/body-and-fragrance", label: "Body care" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faqs", label: "FAQs" },
      { href: "/contact", label: "Contact" },
      { href: "/wishlist", label: "Wishlist" },
      { href: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Brand",
    links: [
      { href: "/about", label: "Why GleamCare" },
      { href: "/blog", label: "The Journal" },
      { href: "/checkout", label: "Checkout" },
      { href: "/products", label: "Product index" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[color:var(--foreground)] text-[color:var(--background)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <div>
            <Badge
              variant="secondary"
              className="border-0 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[color:var(--background)]"
            >
              Curated beauty boutique
            </Badge>
            <h2 className="mt-5 font-[var(--font-heading)] text-5xl font-medium tracking-[-0.04em] text-[color:var(--background)]">
              GleamCare
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--background)]/70">
              Genuine skincare, K-beauty, body care, and fragrance for Kenyan
              shoppers who want trusted products, soft luxury, and easy support on
              WhatsApp.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs text-[color:var(--background)]/80">
                <Truck className="h-3.5 w-3.5" />
                Kenya-wide delivery
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs text-[color:var(--background)]/80">
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp support
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/6 transition hover:bg-white/10"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://wa.me/254729702701"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/6 transition hover:bg-white/10"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--background)]/55">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[color:var(--background)]/78">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-[color:var(--background)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 py-5 text-xs text-[color:var(--background)]/58 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} GleamCare Kenya</span>
            <span className="hidden sm:inline">·</span>
            <span>Prices shown in KES</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Nairobi CBD
            </span>
            <span className="hidden sm:inline">·</span>
            <span>Orders confirmed on WhatsApp before dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
