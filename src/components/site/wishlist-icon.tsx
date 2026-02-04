// src/components/site/wishlist-icon.tsx
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { Button } from "@/components/ui/button";

export function WishlistIcon() {
  const count = useWishlistStore((s) => s.count());

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative rounded-2xl"
      asChild
      aria-label="Wishlist"
    >
      <Link href="/wishlist">
        <Heart className="h-5 w-5" />
        {count > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
            {count}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
