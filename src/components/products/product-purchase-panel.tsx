// src/components/products/product-purchase-panel.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, Heart, MessageCircle, Share2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatKes } from "@/lib/money";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PanelProduct = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  category: string;
  tag?: string;
  image: string;
  priceKes: number;
  compareAtKes?: number;
  inStock: boolean;
  shortDescription?: string;
  saleTag?: string;
};

function getSaleMeta(priceKes: number, compareAtKes?: number) {
  if (typeof compareAtKes !== "number") return null;
  if (!(compareAtKes > priceKes)) return null;
  const pct = Math.round(((compareAtKes - priceKes) / compareAtKes) * 100);
  return { pct, savings: compareAtKes - priceKes };
}

export function ProductPurchasePanel({ product }: { product: PanelProduct }) {
  const [qty, setQty] = React.useState(1);

  const addToCart = useCartStore((s) => s.addItem);
  const wishlist = useWishlistStore((s) => s.items);
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const inWishlist = wishlist.some((w) => w.id === product.id);
  const sale = getSaleMeta(product.priceKes, product.compareAtKes);

  function dec() {
    setQty((q) => Math.max(1, q - 1));
  }
  function inc() {
    setQty((q) => Math.min(99, q + 1));
  }

  function addCurrentToCart() {
    addToCart({
      id: product.id,
      slug: product.slug,
      title: product.title,
      brand: product.brand,
      image: product.image,
      priceKes: product.priceKes,
      quantity: qty,
    });
  }

  function handleAddToCart() {
    addCurrentToCart();
    toast.success("Added to cart");
  }

  function handleBuyNow() {
    addCurrentToCart();
    toast.success("Proceeding to checkout");
    window.location.href = "/checkout";
  }

  function getProductUrl() {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/products/${product.slug}`;
  }

  function buildShareMessage() {
    const label = product.brand ? `${product.brand} - ${product.title}` : product.title;
    const priceLine = `Price: ${formatKes(product.priceKes)}${
      typeof product.compareAtKes === "number"
        ? ` (Was ${formatKes(product.compareAtKes)})`
        : ""
    }`;
    const stockLine = product.inStock ? "In stock" : "Currently out of stock";
    const short =
      product.shortDescription?.trim()?.length
        ? product.shortDescription.trim()
        : "Genuine beauty and skincare product available at GleamCare.";

    return `${label}
${priceLine}
Category: ${product.category}
${stockLine}

${short}

View product: ${getProductUrl()}`;
  }

  function shareToWhatsApp() {
    const msg = buildShareMessage();
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    const url = getProductUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      toast.success("Link copied");
    }
  }

  const label = product.brand ? `${product.brand} - ${product.title}` : product.title;

  return (
    <aside className="overflow-hidden rounded-3xl border bg-gradient-to-br from-card via-background to-muted/35 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="rounded-full">
          {product.category}
        </Badge>
        {product.tag ? (
          <Badge variant="secondary" className="rounded-full">
            {product.tag}
          </Badge>
        ) : null}
        {sale ? (
          <Badge className="rounded-full">
            {product.saleTag ? product.saleTag : `Save ${sale.pct}%`}
          </Badge>
        ) : null}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl leading-[1.1] sm:text-4xl">{label}</h1>
          <p className="text-sm text-muted-foreground">
            Genuine products - prices in KES - delivery across Kenya
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={shareToWhatsApp}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Share to WhatsApp
              </DropdownMenuItem>

              <DropdownMenuItem onClick={copyLink}>
                <Copy className="mr-2 h-4 w-4" />
                Copy link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() =>
              toggleWishlist({
                id: product.id,
                slug: product.slug,
                title: product.title,
                brand: product.brand,
                image: product.image,
                priceKes: product.priceKes,
              })
            }
          >
            <Heart className={inWishlist ? "fill-current" : ""} />
          </Button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-4">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <p className="text-3xl font-semibold">{formatKes(product.priceKes)}</p>
          {typeof product.compareAtKes === "number" ? (
            <p className="pb-1 text-sm text-muted-foreground line-through">
              {formatKes(product.compareAtKes)}
            </p>
          ) : null}
          {!product.inStock ? (
            <span className="pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-destructive">
              Out of stock
            </span>
          ) : null}
        </div>

        {sale ? (
          <p className="mt-2 text-xs text-muted-foreground">
            You save {formatKes(sale.savings)} ({sale.pct}%).
          </p>
        ) : null}
      </div>

      <div className="mt-4 rounded-2xl border bg-card p-4">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Product summary
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription?.trim()?.length
            ? product.shortDescription
            : "Carefully selected for quality and authenticity. Need help choosing? Message us on WhatsApp and we will guide you."}
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between rounded-2xl border bg-background p-3">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Quantity
          </p>
          <div className="inline-flex items-center rounded-full border">
            <Button
              type="button"
              variant="ghost"
              className="h-9 w-10 rounded-full"
              onClick={dec}
              aria-label="Decrease quantity"
              disabled={!product.inStock}
            >
              -
            </Button>
            <div className="flex h-9 min-w-8 items-center justify-center text-sm font-semibold">
              {qty}
            </div>
            <Button
              type="button"
              variant="ghost"
              className="h-9 w-10 rounded-full"
              onClick={inc}
              aria-label="Increase quantity"
              disabled={!product.inStock}
            >
              +
            </Button>
          </div>
        </div>

        <Button
          type="button"
          className="h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
          onClick={handleBuyNow}
          disabled={!product.inStock}
        >
          Buy now
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Add to cart
        </Button>

        <Button
          asChild
          variant="ghost"
          className="h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
        >
          <Link href="/cart" className="inline-flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            View cart
          </Link>
        </Button>
      </div>
    </aside>
  );
}
