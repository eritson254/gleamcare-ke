// src/components/products/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatKes } from "@/lib/money";

export type ProductCardItem = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  category?: string;

  priceKes: number;
  compareAtKes?: number;

  image: string;
  tag?: string;

  /**
   * Optional: custom sale label from MDX frontmatter (e.g. "On Sale")
   * If omitted and item is on sale, we auto-show "Save X%".
   */
  saleTag?: string;

  // extra flags (future-proof)
  featured?: boolean;
  latest?: boolean;

  // keep in data model (don’t show to users directly)
  inStock?: boolean;

  /**
   * Used to distinguish between product and bundle
   */
  kind?: "product" | "bundle";
};

function getSaleMeta(priceKes: number, compareAtKes?: number) {
  if (typeof compareAtKes !== "number") return null;
  if (!(compareAtKes > priceKes)) return null;

  const pct = Math.round(((compareAtKes - priceKes) / compareAtKes) * 100);
  return { pct };
}

export function ProductCard({ product }: { product: ProductCardItem }) {
  const label = `${product.brand ?? ""} ${product.title}`.trim();

  const sale = getSaleMeta(product.priceKes, product.compareAtKes);
  const isOnSale = Boolean(sale);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden border bg-card transition-colors hover:bg-background/60"
    >
      <div className="relative aspect-[4/5] bg-muted">
        <Image
          src={product.image}
          alt={label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Top-left badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.kind === "bundle" ? (
            <Badge className="rounded-full">Routine Set</Badge>
          ) : null}

          {product.tag ? (
            <Badge variant="secondary" className="rounded-full">
              {product.tag}
            </Badge>
          ) : null}

          {isOnSale ? (
            <Badge className="rounded-full">
              {product.saleTag ? product.saleTag : `Save ${sale!.pct}%`}
            </Badge>
          ) : null}
        </div>
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

          {isOnSale ? (
            <p className="text-xs text-muted-foreground line-through">
              {formatKes(product.compareAtKes!)}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
