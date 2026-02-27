// src/components/site/site-footer.tsx
import Link from "next/link";
import { Instagram, MapPin, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-2xl">GleamCare Kenya</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Authentic skincare, beauty, and personal care essentials with
            curated product selection, WhatsApp-first support, and Kenya-wide
            delivery.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-accent"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="https://wa.me/254729702701"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-accent"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-primary">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary">
                Beauty Journal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
            Support
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/faqs" className="hover:text-primary">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-primary">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-primary">
                Cart
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Mithoo Business Centre, Moi Avenue, Nairobi CBD</span>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} GleamCare Kenya. All rights reserved.</p>
          <p>Orders are confirmed on WhatsApp before dispatch.</p>
        </div>
      </div>
    </footer>
  );
}
