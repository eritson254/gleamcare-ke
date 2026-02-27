// src/app/checkout/CheckoutClient.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";

import { FullBleed } from "@/components/layout/full-bleed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cart";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { formatKes } from "@/lib/money";

export default function CheckoutClient() {
  const items = useCartStore((s) => s.items);
  const subtotalKes = useCartStore((s) => s.subtotalKes());

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [notes, setNotes] = React.useState("");

  function placeOrder() {
    if (!name.trim() || !phone.trim() || !location.trim()) {
      toast.error("Please fill in your name, phone, and delivery location.");
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
  }

  return (
    <div className="space-y-8">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare Checkout"
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
                  Checkout
                </Badge>
                <h1 className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl">
                  Finalize your order in minutes.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Fill in your details and submit to WhatsApp. We confirm stock,
                  delivery timeline, and final totals before dispatch.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                    <MessageCircle className="h-3.5 w-3.5 text-primary" />
                    WhatsApp confirmation
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                    Kenya-wide delivery
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Secure order flow
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href="/cart">Back to cart</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full px-8 lg:w-auto"
                >
                  <Link href="/shop">Continue shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      {items.length === 0 ? (
        <section className="rounded-3xl border bg-card p-8 text-center sm:p-12">
          <h2 className="text-2xl">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add products from the shop first, then return here to complete your
            WhatsApp checkout.
          </p>
          <div className="mt-5">
            <Button asChild className="rounded-full px-8">
              <Link href="/shop">Go to shop</Link>
            </Button>
          </div>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <section className="min-w-0 rounded-3xl border bg-card p-6 sm:p-8">
            <div className="space-y-1">
              <h2 className="text-2xl">Customer details</h2>
              <p className="text-sm text-muted-foreground">
                We use these details to confirm delivery and complete your order
                on WhatsApp.
              </p>
            </div>

            <div className="mt-6 grid gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full name</label>
                <Input
                  className="h-11 rounded-xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Amina Wanjiku"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone number</label>
                <Input
                  className="h-11 rounded-xl"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., 07xx xxx xxx"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Delivery location</label>
                <Input
                  className="h-11 rounded-xl"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., CBD, Westlands, Ruaka..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Order notes{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <Textarea
                  className="min-h-[120px] rounded-xl"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any notes about delivery time, preferences, or product questions..."
                />
              </div>

              <div className="pt-1">
                <Button
                  type="button"
                  className="h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
                  onClick={placeOrder}
                >
                  Place order on WhatsApp
                </Button>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Delivery fees may apply based on location. Final totals are
                  confirmed on WhatsApp before dispatch.
                </p>
              </div>
            </div>
          </section>

          <aside className="min-w-0 rounded-3xl border bg-gradient-to-br from-card to-muted/40 p-6 sm:p-8 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl">Order summary</h2>
              <Badge variant="secondary" className="rounded-full">
                {items.length} item{items.length === 1 ? "" : "s"}
              </Badge>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              {items.map((item) => {
                const label = item.brand ? `${item.brand} - ${item.title}` : item.title;
                return (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-muted-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <p className="shrink-0 font-medium">
                      {formatKes(item.priceKes * item.qty)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatKes(subtotalKes)}</span>
            </div>

            <div className="mt-5 grid gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
                onClick={placeOrder}
              >
                Open WhatsApp
              </Button>
              <Button asChild variant="ghost" className="h-11 w-full rounded-full">
                <Link href="/cart">Back to cart</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
