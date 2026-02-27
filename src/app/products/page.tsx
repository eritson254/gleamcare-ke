// src/app/products/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { FullBleed } from "@/components/layout/full-bleed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCollection } from "@/components/products/product-collection";
import { getAllProducts, type MdxProductFrontmatter } from "@/lib/mdx/products";

export const metadata = {
  title: "Products | GleamCare",
  description:
    "Explore all GleamCare products - genuine skincare, beauty, and personal care essentials available across Kenya. Filter by category, brand, and price.",
};

export default function ProductsPage() {
  const products = getAllProducts().map((p) => {
    const fm = p.frontmatter as MdxProductFrontmatter & { saleTag?: string };

    return {
      id: p.id,
      slug: p.slug,
      title: fm.title,
      brand: fm.brand,
      category: fm.category,
      priceKes: fm.priceKes,
      compareAtKes: fm.compareAtKes,
      image: fm.image,
      tag: fm.tag,
      featured: fm.featured,
      inStock: fm.inStock,
      saleTag: fm.saleTag,
    };
  });

  return (
    <div className="space-y-10">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare products collection"
              fill
              priority
              className="object-cover opacity-15"
              sizes="100vw"
            />
          </div>
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/45 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="space-y-5 lg:col-span-8">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                  GleamCare Products
                </Badge>

                <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                  Every product, curated for premium beauty routines.
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Discover the full GleamCare collection across skincare, K-beauty,
                  body care, and fragrance. Filter quickly and shop with confidence.
                </p>

                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Genuine products
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                    Kenya-wide delivery
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                    Authentic brands
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 lg:col-span-4 lg:justify-end">
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href="/shop">Go to Shop</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full px-8 lg:w-auto"
                >
                  <Link href="/about" className="inline-flex items-center gap-2">
                    Learn about us <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      <section className="rounded-3xl border bg-gradient-to-r from-card via-muted/40 to-background p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Collection overview
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Browse by category, brand, and price
            </h2>
          </div>
          <Badge variant="secondary" className="rounded-full">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Fast filter and sort
            </span>
          </Badge>
        </div>
      </section>

      <ProductCollection products={products} />
    </div>
  );
}
