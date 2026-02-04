// src/app/shop/page.tsx
import { ProductCard } from "@/components/products/product-card";
import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Shop | GleamCare",
  description: "Browse curated skincare, beauty, and personal care essentials.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
          Shop
        </h1>
        <p className="text-sm text-muted-foreground">
          Skincare, beauty, and personal care—curated for routines that work.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
