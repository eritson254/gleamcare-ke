// src/components/site/site-footer.tsx
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-[var(--font-serif)] text-lg">Gleamcare Ke</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Curated beauty essentials with a soft, elegant touch.
          </p>
        </div>

        <div className="text-sm">
          <p className="font-medium">Shop</p>
          <ul className="mt-2 space-y-2 text-muted-foreground">
            <li>
              <Link href="/shop" className="hover:text-foreground">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/policies" className="hover:text-foreground">
                Delivery & Returns
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-medium">Contact</p>
          <p className="mt-2 text-muted-foreground">
            Orders via WhatsApp
            <br />
            <span className="text-foreground">+254 729 702 701</span>
          </p>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gleamcare Ke. All rights reserved.
      </div>
    </footer>
  );
}
