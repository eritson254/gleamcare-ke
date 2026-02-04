// src/components/home/hero.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-card">
      {/* Subtle brand glow (no harsh shadows) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[hsl(var(--primary)/0.10)] blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[hsl(var(--primary)/0.08)] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))] via-transparent to-[hsl(var(--background))]" />
      </div>

      <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 md:grid-cols-2 md:py-16">
        {/* Copy */}
        <div className="space-y-6">
          <Badge variant="secondary" className="w-fit rounded-full">
            Nairobi • Authentic Beauty Essentials
          </Badge>

          <div className="space-y-4">
            <h1 className="font-[var(--font-serif)] text-4xl tracking-tight sm:text-5xl">
              Healthy, glowing skin starts here.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Gleamcare Ke is a beauty, cosmetic, and personal care shop in
              Nairobi—curating authentic skincare and everyday essentials with a
              focus on quality, comfort, and results.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="rounded-2xl">
              <Link href="/shop">Shop Products</Link>
            </Button>

            <Button asChild variant="ghost" className="rounded-2xl">
              <Link href="/about">Visit Our Store</Link>
            </Button>
          </div>

          <div className="rounded-2xl border bg-background/60 p-4 backdrop-blur">
            <p className="text-sm">
              Order via WhatsApp:{" "}
              <span className="font-medium text-foreground">
                +254 729 702 701
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Mithoo Business Centre, Moi Avenue (opposite the Bazaar), Nairobi
              Area, Kenya.
            </p>
          </div>
        </div>

        {/* Image + editorial blocks */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border bg-muted">
            <Image
              src="/images/hero/hero.jpg"
              alt="Gleamcare beauty essentials"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-card p-4">
              <p className="text-sm font-medium">Authenticity First</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Carefully sourced products you can trust—skincare included.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-4">
              <p className="text-sm font-medium">Curated for Routine</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Essentials that fit real life—simple, effective, consistent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
