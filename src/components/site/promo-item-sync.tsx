// src/components/site/promo-item-sync.tsx
"use client";

import * as React from "react";

import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

function withCategories<T extends { slug: string; category?: string }>(
  items: T[],
  categories: Map<string, string | undefined>
) {
  let changed = false;
  const next = items.map((item) => {
    const category = item.category ?? categories.get(item.slug);
    if (category === item.category) return item;
    changed = true;
    return { ...item, category };
  });
  return changed ? next : null;
}

// Saved carts and wishlists from before the promotion have no category, which
// promo eligibility depends on. Fill it in from the catalog.
export function PromoItemSync({
  products,
}: {
  products: Array<{ slug: string; category?: string }>;
}) {
  React.useEffect(() => {
    const categories = new Map(products.map((p) => [p.slug, p.category]));

    const cart = withCategories(useCartStore.getState().items, categories);
    if (cart) useCartStore.setState({ items: cart });

    const wishlist = withCategories(useWishlistStore.getState().items, categories);
    if (wishlist) useWishlistStore.setState({ items: wishlist });
  }, [products]);

  return null;
}
