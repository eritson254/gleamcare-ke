// src/components/wishlist/wishlist-toggle.tsx
"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWishlistStore, type WishlistItem } from "@/store/wishlist";

export function WishlistToggle({ item }: { item: WishlistItem }) {
  const toggle = useWishlistStore((s) => s.toggle);
  const has = useWishlistStore((s) => s.has(item.id));

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-2xl"
      aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => {
        toggle(item);
        toast.success(has ? "Removed from wishlist" : "Added to wishlist");
      }}
    >
      <Heart className={has ? "h-5 w-5 fill-current" : "h-5 w-5"} />
    </Button>
  );
}
