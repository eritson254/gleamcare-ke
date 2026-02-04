// src/app/checkout/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { formatKes } from "@/lib/money";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotalKes = useCartStore((s) => s.subtotalKes());

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [notes, setNotes] = React.useState("");

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <p className="text-sm text-muted-foreground">
          Your cart is empty. Add products before checkout.
        </p>
        <Button asChild className="rounded-none">
          <Link href="/shop">Go to shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in your details. When you place the order, WhatsApp will open with your order summary.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div className="space-y-5 rounded-3xl border bg-card p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full name</label>
            <Input
              className="rounded-2xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Amina Wanjiku"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone number</label>
            <Input
              className="rounded-2xl"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., 07xx xxx xxx"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery location</label>
            <Input
              className="rounded-2xl"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., CBD, Westlands, Ruaka..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Order notes (optional)</label>
            <Textarea
              className="rounded-2xl"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes about delivery time, preferences, etc."
            />
          </div>

          <Button
            className="w-full rounded-none"
            onClick={() => {
              if (!name.trim() || !phone.trim() || !location.trim()) {
                toast.error("Please fill in your name, phone, and location.");
                return;
              }

              const url = buildWhatsAppOrderUrl({
                items,
                subtotalKes,
                details: {
                  name: name.trim(),
                  phone: phone.trim(),
                  location: location.trim(),
                  notes: notes.trim(),
                },
              });

              window.open(url, "_blank", "noopener,noreferrer");
            }}
          >
            Place order on WhatsApp
          </Button>

          <p className="text-xs text-muted-foreground">
            Your order is confirmed on WhatsApp. We’ll confirm availability and delivery details there.
          </p>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-3xl border bg-card p-6">
          <p className="text-sm font-medium">Order summary</p>

          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => {
              const label = item.brand ? `${item.brand} — ${item.title}` : item.title;
              return (
                <div key={item.id} className="flex items-start justify-between gap-3">
                  <span className="text-muted-foreground">
                    {label} <span className="text-xs">×{item.qty}</span>
                  </span>
                  <span className="font-medium">{formatKes(item.priceKes * item.qty)}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatKes(subtotalKes)}</span>
          </div>

          <Button asChild variant="ghost" className="mt-4 w-full rounded-none">
            <Link href="/cart">Back to cart</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
