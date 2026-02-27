// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  MessageCircleMore,
  Package,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import { FullBleed } from "@/components/layout/full-bleed";
import { HomeProductSection } from "@/components/home/home-product-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllProducts, type MdxProductFrontmatter } from "@/lib/mdx/products";
import { getAllBlogPosts } from "@/lib/mdx/blog";

const BRAND_LOGOS: { name: string; src: string }[] = [
  { name: "CeraVe", src: "/brands/cerave.png" },
  { name: "The Ordinary", src: "/brands/the-ordinary.png" },
  { name: "Neutrogena", src: "/brands/neutrogena.png" },
  { name: "COSRX", src: "/brands/cosrx.png" },
  { name: "NIVEA", src: "/brands/nivea.png" },
  { name: "Vaseline", src: "/brands/vaseline.png" },
  { name: "Enchanteur", src: "/brands/enchanteur.png" },
];

const TESTIMONIALS = [
  {
    name: "Amina | Nairobi",
    text: "Fast delivery and authentic products. My routine is simpler and my skin looks better within weeks.",
  },
  {
    name: "Faith | Ruaka",
    text: "WhatsApp checkout is smooth and responsive. Clear updates from order to delivery.",
  },
  {
    name: "Lydia | Westlands",
    text: "Clean packaging, fair pricing, and genuine brands I already trust.",
  },
];

type HomeProduct = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  category?: string;
  priceKes: number;
  compareAtKes?: number;
  image: string;
  tag?: string;
  featured?: boolean;
  inStock?: boolean;
  latest?: boolean;
  kind?: "product" | "bundle";
};

function TrustPill({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground backdrop-blur-sm">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function CategorySpotlight({
  title,
  body,
  image,
  href,
}: {
  title: string;
  body: string;
  image: string;
  href: string;
}) {
  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl border bg-card p-0">
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-3 p-5">
        <h3 className="font-[var(--font-heading)] text-2xl tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
        >
          Explore collection <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

function formatBlogDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomePage() {
  const all: HomeProduct[] = getAllProducts().map((p) => {
    const fm = p.frontmatter as MdxProductFrontmatter & {
      kind?: "product" | "bundle";
      bundle?: boolean;
    };

    return {
      id: p.id,
      slug: p.slug,
      title: p.frontmatter.title,
      brand: p.frontmatter.brand,
      category: p.frontmatter.category ?? "Beauty",
      priceKes: p.frontmatter.priceKes,
      compareAtKes: p.frontmatter.compareAtKes,
      image: p.frontmatter.image,
      tag: p.frontmatter.tag,
      featured: Boolean(fm.featured),
      inStock: p.frontmatter.inStock ?? true,
      latest: Boolean(fm.latest),
      kind:
        (fm.kind as "product" | "bundle" | undefined) ??
        (fm.bundle ? "bundle" : "product"),
    };
  });

  const featured = all.filter((p) => p.featured).slice(0, 4);
  const bundles = all.filter((p) => p.kind === "bundle").slice(0, 24);
  const latest = all.filter((p) => p.latest).slice(0, 12);

  const skincare = all.filter((p) =>
    (p.category ?? "").toLowerCase().includes("skin")
  );

  const bodycare = all.filter((p) => {
    const c = (p.category ?? "").toLowerCase();
    const t = (p.tag ?? "").toLowerCase();
    return c.includes("body") || t.includes("body");
  });

  const fragrance = all.filter((p) => {
    const c = (p.category ?? "").toLowerCase();
    const t = (p.tag ?? "").toLowerCase();
    const title = (p.title ?? "").toLowerCase();
    return (
      c.includes("fragrance") ||
      c.includes("perfume") ||
      t.includes("fragrance") ||
      t.includes("mist") ||
      title.includes("mist") ||
      title.includes("body splash")
    );
  });
  const latestBlogPosts = getAllBlogPosts().slice(0, 3);

  return (
    <div className="space-y-18 sm:space-y-22">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/40">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare premium skincare collection"
              fill
              priority
              className="object-cover opacity-30"
              sizes="100vw"
            />
          </div>
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/60 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="space-y-6 lg:col-span-7">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                  GleamCare Kenya
                </Badge>

                <h1 className="max-w-3xl font-[var(--font-heading)] text-5xl leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
                  Premium beauty, authentic by design.
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Curated skincare, K-beauty, body care, and fragrance from
                  trusted brands. Built for everyday routines, delivered
                  Kenya-wide, and supported on WhatsApp.
                </p>

                <div className="flex flex-wrap gap-2">
                  <TrustPill
                    icon={<ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                    label="Genuine only"
                  />
                  <TrustPill
                    icon={<Truck className="h-3.5 w-3.5 text-primary" />}
                    label="Delivery across Kenya"
                  />
                  <TrustPill
                    icon={<MessageCircleMore className="h-3.5 w-3.5 text-primary" />}
                    label="WhatsApp support"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                  <Button asChild className="rounded-full px-8">
                    <Link href="/shop">Shop now</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-8">
                    <Link href="/shop">Explore bestsellers</Link>
                  </Button>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
                  <span className="inline-flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </span>
                  <span className="font-semibold">Loved by 100+ happy customers</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-3xl border bg-card/80 shadow-sm backdrop-blur">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/images/home/why-gleamcare.jpg"
                      alt="Curated GleamCare beauty shelf"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t bg-background/80 p-3 text-center">
                    <div>
                      <p className="font-[var(--font-heading)] text-xl tracking-tight">
                        100%
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        Authentic
                      </p>
                    </div>
                    <div>
                      <p className="font-[var(--font-heading)] text-xl tracking-tight">
                        24/7
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        WhatsApp
                      </p>
                    </div>
                    <div>
                      <p className="font-[var(--font-heading)] text-xl tracking-tight">
                        KE
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        Delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      <section className="space-y-7">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            Trusted beauty brands, verified quality
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            We stock brands customers already trust, then curate only what fits
            real routines and real skin goals.
          </p>
          <Badge variant="secondary" className="rounded-full px-4 py-1.5">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              Authentic products and curated selections
            </span>
          </Badge>
        </div>

        <div className="rounded-2xl border bg-card p-5 sm:p-8">
          <div className="grid items-center gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {BRAND_LOGOS.map((b) => (
              <div
                key={b.name}
                className="flex items-center justify-center rounded-xl border bg-white px-4 py-5"
                title={b.name}
              >
                <div className="relative h-10 w-28">
                  <Image
                    src={b.src}
                    alt={`${b.name} logo`}
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-7">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            Latest from the Journal
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Fresh skincare education, routine frameworks, and ingredient guides.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {latestBlogPosts.map((post) => (
            <Card key={post.id} className="gap-0 overflow-hidden rounded-2xl border bg-card p-0">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.frontmatter.coverImage ?? "/images/about/about-hero.jpg"}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <Badge variant="secondary" className="rounded-full">
                    {post.frontmatter.category}
                  </Badge>
                  <h3 className="line-clamp-2 text-xl leading-snug">
                    {post.frontmatter.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.frontmatter.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBlogDate(post.frontmatter.date)} • {post.frontmatter.readTime}
                  </p>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link href="/blog">View all articles</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-7">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            Shop by mood and routine
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            From barrier-care basics to high-glow finishing touches, discover
            categories built for how you actually shop.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <CategorySpotlight
            title="Skincare"
            body="Cleansers, treatments, SPF, and hydration heroes for balanced skin."
            image="/images/about/about-skincare.jpg"
            href="/shop/skincare"
          />
          <CategorySpotlight
            title="K-Beauty"
            body="Curated Korean skincare picks selected for texture, performance, and consistency."
            image="/images/about/about-kbeauty.jpg"
            href="/shop/k-beauty"
          />
          <CategorySpotlight
            title="Body and Fragrance"
            body="Daily body care and wearable scents for a complete, polished routine."
            image="/images/home/why-gleamcare.jpg"
            href="/shop/body-and-fragrance"
          />
        </div>
      </section>

      <HomeProductSection
        title="Featured Picks"
        subtitle="Bestsellers and staff favorites chosen for routines that consistently perform."
        ctaLabel="Shop featured"
        ctaHref="/shop"
        products={featured}
        paginate={false}
        emptyFallback={{
          title: "No featured products yet",
          subtitle:
            "Mark products with featured: true in frontmatter and they will appear here.",
        }}
      />

      <section className="overflow-hidden rounded-3xl border bg-gradient-to-r from-card via-muted/40 to-background p-6 sm:p-8">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
          <div className="space-y-3 lg:col-span-8">
            <Badge variant="secondary" className="rounded-full px-4 py-1.5">
              <span className="inline-flex items-center gap-2">
                <Package className="h-4 w-4" />
                Routine bundles
              </span>
            </Badge>
            <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
              Build complete routines in one checkout
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Our bundles combine compatible products for hydration, acne
              support, glow, and everyday maintenance with clear value.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Button asChild className="rounded-full px-7">
              <Link href="/shop">Shop bundles</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-7">
              <Link href="/about">Why GleamCare</Link>
            </Button>
          </div>
        </div>
      </section>

      <HomeProductSection
        title="Bundle Sets"
        subtitle="Curated combinations for hydration, acne support, glow, body care, and daily essentials."
        ctaLabel="Browse all bundles"
        ctaHref="/shop"
        products={bundles}
        paginate
        emptyFallback={{
          title: "No bundles yet",
          subtitle:
            "Set kind: bundle (or bundle: true) in product frontmatter and they will show here.",
        }}
      />

      <HomeProductSection
        title="Latest Arrivals"
        subtitle="Fresh drops and restocks worth adding to your next order."
        ctaLabel="Explore what is new"
        ctaHref="/shop"
        products={latest}
        paginate
        emptyFallback={{
          title: "No latest products yet",
          subtitle:
            "Mark products with latest: true in frontmatter and they will appear here.",
        }}
      />

      <HomeProductSection
        title="Skincare Essentials"
        subtitle="Cleansers, sunscreen, serums, and hydration anchors for simple, consistent routines."
        ctaLabel="Shop skincare"
        ctaHref="/shop"
        products={skincare}
        paginate
        emptyFallback={{
          title: "Skincare coming soon",
          subtitle:
            "Add products with category containing Skin and they will populate this section.",
        }}
      />

      <HomeProductSection
        title="Body Care"
        subtitle="Nourishing body essentials for smooth skin and everyday comfort."
        ctaLabel="Shop body care"
        ctaHref="/shop"
        products={bodycare}
        paginate
        emptyFallback={{
          title: "Body care loading",
          subtitle:
            "Add products with Body in category or tag and they will appear automatically.",
        }}
      />

      <HomeProductSection
        title="Fragrance and Mists"
        subtitle="Light wearable scents designed for layering and daily freshness."
        ctaLabel="Shop fragrance"
        ctaHref="/shop"
        products={fragrance}
        paginate
        emptyFallback={{
          title: "Fragrance section ready",
          subtitle:
            "Add products with Fragrance or Mist in title, tag, or category to populate this area.",
        }}
      />

      <section className="space-y-7">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            Why customers choose GleamCare
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Reliable authenticity, smooth checkout, and premium curation at every step.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border bg-muted">
            <div className="relative aspect-[5/4] lg:aspect-auto lg:h-full">
              <Image
                src="/images/home/why-gleamcare.jpg"
                alt="GleamCare curated beauty collection"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <Card className="rounded-2xl border bg-card p-6 sm:p-8">
            <div className="space-y-4">
              <h3 className="font-[var(--font-heading)] text-3xl tracking-tight">
                Beauty shopping without the guesswork
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We focus on trusted products and practical routines, then support
                your order quickly from selection to delivery.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Genuine product sourcing",
                  "Curated routine-first catalog",
                  "Fast WhatsApp coordination",
                  "Kenya-wide delivery",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border bg-background px-4 py-3 text-sm text-foreground"
                  >
                    <span className="inline-flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full px-7">
                  <Link href="/shop">Shop now</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-7">
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-7">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            What customers are saying
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Real feedback from customers who value authentic products and quick service.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="rounded-2xl border bg-card p-6">
              <div className="inline-flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold">{t.name}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
