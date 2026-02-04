// src/app/cart/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatKes } from "@/lib/money";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQty = useCartStore((s) => s.setQty);
  const clear = useCartStore((s) => s.clear);
  const subtotalKes = useCartStore((s) => s.subtotalKes());

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
          Cart
        </h1>
        <p className="text-sm text-muted-foreground">
          Your cart is currently empty.
        </p>
        <Button asChild className="rounded-none">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            Cart
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your items. Checkout will open WhatsApp with your order details.
          </p>
        </div>

        <Button variant="ghost" className="rounded-2xl" onClick={clear}>
          Clear cart
        </Button>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => {
            const label = item.brand ? `${item.brand} — ${item.title}` : item.title;

            return (
              <div
                key={item.id}
                className="flex gap-4 rounded-3xl border bg-card p-4"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-muted">
                  <Image src={item.image} alt={label} fill className="object-cover" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatKes(item.priceKes)}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      className="rounded-2xl"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Qty</span>
                      <Input
                        className="h-9 w-20 rounded-2xl"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={99}
                        value={item.qty}
                        onChange={(e) => setQty(item.id, Number(e.target.value))}
                      />
                    </div>

                    <p className="text-sm font-semibold">
                      {formatKes(item.priceKes * item.qty)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-3xl border bg-card p-6">
          <p className="text-sm font-medium">Order summary</p>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatKes(subtotalKes)}</span>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Shipping is confirmed on WhatsApp. Free shipping for orders above KES 5,000.
          </p>

          <div className="mt-6 space-y-3">
            <Button asChild className="w-full rounded-none">
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>

            <Button asChild variant="ghost" className="w-full rounded-none">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
