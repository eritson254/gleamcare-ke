// src/components/home/featured-products.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { getFeaturedProducts } from "@/lib/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="font-[var(--font-heading)] text-2xl tracking-tight sm:text-3xl">
            Featured products
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            A curated edit of customer favorites—chosen for quality, comfort,
            and results you can trust.
          </p>
        </div>

        <Button asChild variant="ghost" className="hidden rounded-2xl sm:inline-flex">
          <Link href="/shop">View all</Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="sm:hidden">
        <Button asChild className="w-full rounded-2xl">
          <Link href="/shop">View all products</Link>
        </Button>
      </div>
    </section>
  );
}
