// src/app/wishlist/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

import { FullBleed } from "@/components/layout/full-bleed";
import { ProductCard } from "@/components/products/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const clear = useWishlistStore((s) => s.clear);

  const products = items.map((x) => ({
    id: x.id,
    slug: x.slug,
    title: x.title,
    brand: x.brand,
    priceKes: x.priceKes,
    image: x.image,
  }));

  return (
    <div className="space-y-8">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare wishlist"
              fill
              className="object-cover opacity-15"
              sizes="100vw"
            />
          </div>
          <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-secondary/45 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="space-y-4 lg:col-span-8">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                  Wishlist
                </Badge>
                <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">
                  Your saved favorites, ready when you are.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Keep products you love in one place and move them to cart when
                  you are ready to checkout.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                {items.length ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-full px-8 lg:w-auto"
                    onClick={clear}
                  >
                    Clear wishlist
                  </Button>
                ) : null}
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href="/shop">Browse products</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      {items.length === 0 ? (
        <section className="rounded-3xl border bg-card p-8 text-center sm:p-12">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border bg-background">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl">Your wishlist is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore the shop and tap the heart icon on products you want to save.
          </p>
          <div className="mt-5">
            <Button asChild className="rounded-full px-8">
              <Link href="/shop">Start shopping</Link>
            </Button>
          </div>
        </section>
      ) : (
        <>
          <section className="rounded-3xl border bg-gradient-to-r from-card via-muted/35 to-background p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Saved collection
                </p>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  {items.length} item{items.length === 1 ? "" : "s"} in wishlist
                </h2>
              </div>
              <Badge variant="secondary" className="rounded-full">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Tap any card to view details
                </span>
              </Badge>
            </div>
          </section>

          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          </section>
        </>
      )}
    </div>
  );
}
