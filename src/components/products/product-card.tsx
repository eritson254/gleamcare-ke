// src/components/products/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
  saleTag?: string;
  featured?: boolean;
  latest?: boolean;
  inStock?: boolean;
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
      className="group block overflow-hidden rounded-[1.4rem] bg-[#fbf3f1] p-3 shadow-[0_4px_18px_rgba(60,40,50,0.06)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(60,40,50,0.12)]"
    >
      <div className="relative overflow-hidden rounded-[1rem] bg-gradient-to-br from-white via-[#f6ebe6] to-[#edd9cf]">
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {product.kind === "bundle" ? (
            <Badge className="bg-[color:var(--foreground)] text-[color:var(--background)]">
              Bundle
            </Badge>
          ) : null}

          {product.latest ? (
            <Badge className="bg-primary text-primary-foreground">New in</Badge>
          ) : null}

          {product.tag ? (
            <Badge variant="secondary" className="border-0 bg-white/80 backdrop-blur">
              {product.tag}
            </Badge>
          ) : null}

          {isOnSale ? (
            <Badge className="bg-[#c19a5f] text-white">
              {product.saleTag ? product.saleTag : `Save ${sale!.pct}%`}
            </Badge>
          ) : null}
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem]">
          <Image
            src={product.image}
            alt={label}
            fill
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.045]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </div>

      <div className="px-1 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {product.category ?? "Beauty"}
            </p>
            <h3 className="mt-2 line-clamp-2 min-h-[4rem] font-[var(--font-heading)] text-[1.08rem] font-medium leading-7 tracking-[-0.02em] text-foreground sm:text-[1.14rem]">
              {product.brand ? `${product.brand} · ${product.title}` : product.title}
            </h3>
          </div>

          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition group-hover:text-primary">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-3 flex items-end gap-2">
          <p className="text-base font-semibold text-foreground">
            {formatKes(product.priceKes)}
          </p>
          {isOnSale ? (
            <p className="pb-0.5 text-xs text-muted-foreground line-through">
              {formatKes(product.compareAtKes!)}
            </p>
          ) : null}
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{product.inStock === false ? "Currently unavailable" : "Ready to order"}</span>
          <span>KES</span>
        </div>
      </div>
    </Link>
  );
}
