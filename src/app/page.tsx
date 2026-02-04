// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home/hero";
import { Button } from "@/components/ui/button";

function CategoryTile(props: {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
}) {
  return (
    <Link
      href={props.href}
      className="group overflow-hidden rounded-3xl border bg-card transition-colors hover:bg-background/60"
    >
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={props.imageSrc}
          alt={props.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="space-y-2 p-5">
        <p className="text-base font-medium">{props.title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {props.description}
        </p>

        <p className="text-sm font-medium text-[hsl(var(--primary))]">
          Explore →
        </p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-14">
      <HomeHero />

      {/* Categories / Entry points */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-[var(--font-serif)] text-2xl tracking-tight sm:text-3xl">
              Shop by category
            </h2>
            <p className="text-sm text-muted-foreground">
              Beauty essentials selected for everyday confidence and care.
            </p>
          </div>

          <Button asChild variant="ghost" className="hidden rounded-2xl sm:inline-flex">
            <Link href="/shop">View all</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <CategoryTile
            title="Skincare"
            description="Cleansers, serums, moisturizers, and targeted treatments."
            href="/shop"
            imageSrc="/images/categories/skincare.jpg"
          />
          <CategoryTile
            title="Beauty"
            description="Makeup essentials and glow-focused staples for any look."
            href="/shop"
            imageSrc="/images/categories/beauty.jpg"
          />
          <CategoryTile
            title="Personal Care"
            description="Body care and daily self-care products that feel good."
            href="/shop"
            imageSrc="/images/categories/personal-care.jpg"
          />
        </div>

        <div className="sm:hidden">
          <Button asChild className="w-full rounded-2xl">
            <Link href="/shop">View all products</Link>
          </Button>
        </div>
      </section>

      {/* Store location / trust block */}
      <section className="grid gap-6 rounded-3xl border bg-card p-6 sm:p-8 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-[var(--font-serif)] text-xl tracking-tight sm:text-2xl">
            Visit us in Nairobi
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Find us at Mithoo Business Centre along Moi Avenue, opposite the
            Bazaar, Moi, Nairobi Area, Kenya.
          </p>

          <div className="rounded-2xl border bg-background/60 p-4 backdrop-blur">
            <p className="text-sm font-medium">Orders via WhatsApp</p>
            <p className="mt-1 text-sm text-muted-foreground">
              +254 729 702 701
            </p>
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border bg-muted">
          <Image
            src="/images/hero/store.jpg"
            alt="Gleamcare store location"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
