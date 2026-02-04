// src/components/cart/add-to-cart.tsx
"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

export function AddToCartButton(props: {
  item: {
    id: string;
    slug: string;
    title: string;
    brand?: string;
    image: string;
    priceKes: number;
  };
}) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button
      className="rounded-none px-10 text-xs font-semibold uppercase tracking-[0.18em]"
      onClick={() => {
        addItem(props.item, 1);
        toast.success("Added to cart", {
          description: "You can checkout via WhatsApp when ready.",
        });
      }}
    >
      Add to cart
    </Button>
  );
}
