// src/components/products/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatKes } from "@/lib/money";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const hasCompare = typeof product.compareAtKes === "number";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border bg-card transition-colors hover:bg-background/60"
    >
      <div className="relative aspect-[4/5] bg-muted">
        <Image
          src={product.image}
          alt={`${product.brand ?? ""} ${product.title}`.trim()}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {product.tag ? (
          <div className="absolute left-3 top-3">
            <Badge variant="secondary" className="rounded-full">
              {product.tag}
            </Badge>
          </div>
        ) : null}
      </div>

      <div className="space-y-1 p-5">
        <p className="text-xs text-muted-foreground">
          {product.category ?? "Beauty"}
        </p>

        <p className="line-clamp-1 text-sm font-medium">
          {product.brand ? `${product.brand} — ${product.title}` : product.title}
        </p>

        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{formatKes(product.priceKes)}</p>

          {hasCompare ? (
            <p className="text-xs text-muted-foreground line-through">
              {formatKes(product.compareAtKes!)}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
