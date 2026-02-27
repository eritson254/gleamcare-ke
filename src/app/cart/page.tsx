// src/app/cart/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { PackageCheck, ShoppingBag, Truck } from "lucide-react";

import { FullBleed } from "@/components/layout/full-bleed";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="space-y-8 overflow-x-clip">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare cart"
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
                  Cart
                </Badge>
                <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">
                  Review your order before checkout.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Adjust quantities, review subtotal, and continue to WhatsApp
                  checkout for final confirmation.
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
                    Clear cart
                  </Button>
                ) : null}
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href="/shop">Continue shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      {items.length === 0 ? (
        <section className="rounded-3xl border bg-card p-8 text-center sm:p-12">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border bg-background">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add products from the shop, then checkout will open WhatsApp with your
            order summary.
          </p>
          <div className="mt-5">
            <Button asChild className="rounded-full px-8">
              <Link href="/shop">Browse products</Link>
            </Button>
          </div>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <section className="space-y-4">
            {items.map((item) => {
              const label = item.brand ? `${item.brand} - ${item.title}` : item.title;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5"
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border bg-muted">
                      <Image src={item.image} alt={label} fill className="object-cover" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {formatKes(item.priceKes)}
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          className="rounded-full text-xs font-semibold uppercase tracking-[0.14em]"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Qty
                          </span>
                          <Input
                            className="h-10 w-24 rounded-xl"
                            type="number"
                            inputMode="numeric"
                            min={1}
                            max={99}
                            value={item.qty}
                            onChange={(e) =>
                              setQty(item.id, Math.max(1, Number(e.target.value) || 1))
                            }
                          />
                        </div>

                        <p className="text-sm font-semibold">
                          {formatKes(item.priceKes * item.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <aside className="rounded-3xl border bg-gradient-to-br from-card to-muted/40 p-6 sm:p-8 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl">Order summary</h2>
              <Badge variant="secondary" className="rounded-full">
                {items.length} item{items.length === 1 ? "" : "s"}
              </Badge>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatKes(subtotalKes)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="h-4 w-4" />
                Shipping confirmed on WhatsApp.
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <PackageCheck className="h-4 w-4" />
                Free shipping above KES 5,000 (eligible orders).
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <Button asChild className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.18em]">
                <Link href="/checkout">Proceed to checkout</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.18em]"
              >
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
