// src/app/shop/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from "lucide-react";

import { FullBleed } from "@/components/layout/full-bleed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCollection } from "@/components/products/product-collection";
import { getAllProducts, type MdxProductFrontmatter } from "@/lib/mdx/products";

export const metadata = {
  title: "Shop | GleamCare",
  description:
    "Shop genuine skincare, beauty, and personal care essentials in Kenya. Filter by category, brand, and price - order via WhatsApp.",
};

export default function ShopPage() {
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
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/40">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare premium beauty shop"
              fill
              priority
              className="object-cover opacity-20"
              sizes="100vw"
            />
          </div>
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/50 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="space-y-5 lg:col-span-8">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                  GleamCare Shop
                </Badge>

                <h1 className="max-w-3xl font-[var(--font-heading)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Curated beauty essentials for routines that work.
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Browse genuine skincare, K-beauty, personal care, and fragrance.
                  Filter by category, brand, and price to find your perfect match.
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
                    Verified brands
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 lg:col-span-4 lg:justify-end">
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href="/about">Why GleamCare</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full px-8 lg:w-auto"
                >
                  <Link href="/shop" className="inline-flex items-center gap-2">
                    Browse all products <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      <ProductCollection products={products} />
    </div>
  );
}
