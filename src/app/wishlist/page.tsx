// src/app/wishlist/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { useWishlistStore } from "@/store/wishlist";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const clear = useWishlistStore((s) => s.clear);

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
          Wishlist
        </h1>
        <p className="text-sm text-muted-foreground">
          Your wishlist is empty.
        </p>
        <Button asChild className="rounded-none">
          <Link href="/shop">Browse products</Link>
        </Button>
      </div>
    );
  }

  // Map wishlist items into ProductCard-compatible shape
  const products = items.map((x) => ({
    ...x,
    slug: x.slug,
    priceKes: x.priceKes,
    image: x.image,
    featured: false,
  }));

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            Wishlist
          </h1>
          <p className="text-sm text-muted-foreground">
            Saved products for later.
          </p>
        </div>

        <Button variant="ghost" className="rounded-2xl" onClick={clear}>
          Clear
        </Button>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={{
              id: p.id,
              slug: p.slug,
              title: p.title,
              brand: p.brand,
              priceKes: p.priceKes,
              image: p.image,
            }}
          />
        ))}
      </div>
    </div>
  );
}
