// src/components/checkout/buy-now-dialog.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { formatKes } from "@/lib/money";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

export type BuyNowItem = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  image: string;
  priceKes: number;
  qty: number;
};

export function BuyNowDialog({
  open,
  onOpenChange,
  items,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: BuyNowItem[];
}) {
  const subtotalKes = React.useMemo(
    () => items.reduce((sum, i) => sum + i.priceKes * i.qty, 0),
    [items]
  );

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [notes, setNotes] = React.useState("");

  function confirm() {
    if (!name.trim() || !phone.trim() || !location.trim()) {
      toast.error("Please enter your name, phone, and delivery location.");
      return;
    }

    const url = buildWhatsAppOrderUrl({
      items: items.map((i) => ({
        id: i.id,
        slug: i.slug,
        title: i.title,
        brand: i.brand,
        image: i.image,
        priceKes: i.priceKes,
        qty: i.qty,
      })),
      subtotalKes,
      details: {
        name: name.trim(),
        phone: phone.trim(),
        location: location.trim(),
        notes: notes.trim(),
      },
    });

    window.open(url, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px] rounded-none p-0">
        <div className="border-b bg-secondary/40 px-6 py-5">
          <DialogHeader className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <DialogTitle className="font-[var(--font-heading)] text-xl tracking-tight">
                Checkout
              </DialogTitle>

              <Badge variant="secondary" className="rounded-full">
                WhatsApp confirmation
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Enter your details. We’ll open WhatsApp with your order summary for confirmation.
            </p>
          </DialogHeader>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
          {/* Form */}
          <div className="px-6 py-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full name</label>
                <Input
                  className="rounded-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Amina Wanjiku"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone number</label>
                <Input
                  className="rounded-none"
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
                  className="rounded-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., CBD, Westlands, Ruaka..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Notes <span className="text-muted-foreground">(optional)</span>
                </label>
                <Textarea
                  className="min-h-[110px] rounded-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Delivery time preferences, product questions, etc."
                />
              </div>

              <div className="pt-1">
                <Button
                  type="button"
                  className="h-12 w-full rounded-none text-xs font-semibold uppercase tracking-[0.18em]"
                  onClick={confirm}
                >
                  Confirm on WhatsApp
                </Button>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  We’ll confirm availability, delivery timeline, and final total on WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="border-t lg:border-l lg:border-t-0 bg-card px-6 py-6">
            <p className="text-sm font-medium">Order summary</p>

            <div className="mt-4 space-y-3 text-sm">
              {items.map((i) => {
                const label = i.brand ? `${i.brand} — ${i.title}` : i.title;
                return (
                  <div key={i.id} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-muted-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">Qty: {i.qty}</p>
                    </div>
                    <p className="shrink-0 font-medium">
                      {formatKes(i.priceKes * i.qty)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatKes(subtotalKes)}</span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Free shipping for orders above KES 5,000 (where eligible). Delivery fees may apply
              depending on your location.
            </p>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
