// src/app/products/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart/add-to-cart";
import { formatKes } from "@/lib/money";
import { getAllProducts } from "@/lib/products";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getAllProducts().find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <div className="space-y-2">
        <h1 className="font-[var(--font-heading)] text-2xl">Product not found</h1>
        <p className="text-sm text-muted-foreground">
          This product is not available.
        </p>
        <Button asChild variant="ghost" className="rounded-2xl">
          <Link href="/shop">Back to shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-sm text-muted-foreground">
        <Link href="/shop" className="hover:text-foreground">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{product.title}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-3xl border bg-muted">
          <div className="relative aspect-[4/5]">
            <Image
              src={product.image}
              alt={`${product.brand ?? ""} ${product.title}`.trim()}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{product.category ?? "Beauty"}</p>

            <h1 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
              {product.brand ? `${product.brand} — ${product.title}` : product.title}
            </h1>

            {product.tag ? (
              <Badge variant="secondary" className="rounded-full">
                {product.tag}
              </Badge>
            ) : null}
          </div>

          <div className="flex items-end gap-3">
            <p className="text-2xl font-semibold">{formatKes(product.priceKes)}</p>
            {product.compareAtKes ? (
              <p className="pb-1 text-sm text-muted-foreground line-through">
                {formatKes(product.compareAtKes)}
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Carefully curated for quality and consistency. If you’d like help choosing
              the right option for your routine, place your order via WhatsApp and we’ll guide you.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <AddToCartButton
                item={{
                  id: product.id,
                  slug: product.slug,
                  title: product.title,
                  brand: product.brand,
                  image: product.image,
                  priceKes: product.priceKes,
                }}
              />

              <Button asChild variant="ghost" className="rounded-none">
                <Link href="/cart">View cart</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Orders are confirmed on WhatsApp. Prices in KES.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
