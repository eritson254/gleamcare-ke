// src/app/products/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  BadgeCheck,
  BookOpen,
  Check,
  Info,
  Package2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FullBleed } from "@/components/layout/full-bleed";
import {
  getAllProducts,
  getProductBySlug,
  type MdxProductFrontmatter,
} from "@/lib/mdx/products";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ProductPurchasePanel } from "@/components/products/product-purchase-panel";
import { ProductCard } from "@/components/products/product-card";

type PageProps = {
  params: Promise<{ slug?: string }> | { slug?: string };
};

type ProductFrontmatter = MdxProductFrontmatter & {
  saleTag?: string;
  overview?: string;
  whyLove?: string[];
  bestFor?: string[];
  keyDetails?: string[];
  metaDescription?: string;
  gallery?: string[];
  sizeOptions?: Array<{
    label: string;
    ml?: number;
    priceKes: number;
  }>;
};

async function unwrapParams<T extends object>(
  params: Promise<T> | T
): Promise<T> {
  return params instanceof Promise ? await params : params;
}

function splitMdxIntoTabs(source: string) {
  const match = source.match(/^##\s+How to use\b.*$/im);
  if (!match || match.index == null) {
    return { description: source.trim(), howTo: "" };
  }

  return {
    description: source.slice(0, match.index).trim(),
    howTo: source.slice(match.index).trim(),
  };
}

function cleanMarkdownText(input: string) {
  return input
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .trim();
}

function extractListItems(source: string) {
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^([-*]|\d+\.)\s+/.test(line))
    .map((line) => cleanMarkdownText(line))
    .filter(Boolean);
}

function inferRoutineStep(source: string, category?: string, title?: string) {
  const hay = `${source} ${category ?? ""} ${title ?? ""}`.toLowerCase();
  if (hay.includes("protect")) return "Protect";
  if (hay.includes("moisturize") || hay.includes("cream")) return "Moisturize";
  if (hay.includes("cleanse") || hay.includes("cleanser")) return "Cleanse";
  return "Treat";
}

function formatProductType(category?: string, title?: string) {
  const hay = `${category ?? ""} ${title ?? ""}`.toLowerCase();
  if (hay.includes("sunscreen") || hay.includes("sun")) return "Sunscreen";
  if (hay.includes("cleanser") || hay.includes("cleansing")) return "Cleanser";
  if (hay.includes("toner")) return "Toner";
  if (hay.includes("serum")) return "Serum";
  if (hay.includes("essence")) return "Essence";
  if (hay.includes("cream")) return "Cream";
  return "Skincare";
}

function buildQuickFacts(fm: ProductFrontmatter, howTo: string) {
  const facts = [];
  const productType = formatProductType(fm.category, fm.title);
  const sizeLabel = fm.sizeOptions?.[0]?.label ?? "";
  const titleLower = fm.title.toLowerCase();
  const sizeFromTitle = fm.title.match(/\b\d+\s?(ml|g)\b/i)?.[0];
  const useWindow = howTo.toLowerCase().includes("am only")
    ? "AM only"
    : howTo.toLowerCase().includes("am")
      ? "AM or PM"
      : "Daily routine";

  if (titleLower.includes("spf")) {
    const spf = fm.title.match(/spf\s*\d+\+?/i)?.[0]?.toUpperCase();
    if (spf) facts.push({ icon: <SunMedium className="h-4 w-4" />, label: spf });
  }

  facts.push({
    icon: <Package2 className="h-4 w-4" />,
    label: `${sizeLabel || sizeFromTitle || "Standard size"} · ${productType}`,
  });
  facts.push({
    icon: <Info className="h-4 w-4" />,
    label: useWindow,
  });

  return facts.slice(0, 3);
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const p = await unwrapParams(params);
  const product = p?.slug ? getProductBySlug(p.slug) : null;

  if (!product) {
    return {
      title: "Product not found | GleamCare",
      description: "This product is not available.",
    };
  }

  const fm = product.frontmatter as ProductFrontmatter;
  const label = fm.brand ? `${fm.brand} - ${fm.title}` : fm.title;
  const description =
    fm.metaDescription ??
    `Shop ${label} in Kenya. Genuine beauty products, prices in KES, and WhatsApp checkout support.`;

  return {
    title: `${label} | GleamCare`,
    description,
    openGraph: {
      title: `${label} | GleamCare`,
      description,
      images: fm.image ? [{ url: fm.image }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const p = await unwrapParams(params);
  const product = p?.slug ? getProductBySlug(p.slug) : null;

  if (!product) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl">Product not found</h1>
        <p className="text-sm text-muted-foreground">
          This product is not available.
        </p>
        <Button asChild variant="ghost" className="rounded-full">
          <Link href="/shop">Back to shop</Link>
        </Button>
      </div>
    );
  }

  const fm = product.frontmatter as ProductFrontmatter;
  const label = fm.brand ? `${fm.brand} - ${fm.title}` : fm.title;

  const { description, howTo } = splitMdxIntoTabs(product.content);
  const routineStep = inferRoutineStep(howTo, fm.category, fm.title);
  const quickFacts = buildQuickFacts(fm, howTo);
  const benefitItems = Array.isArray(fm.whyLove) ? fm.whyLove.slice(0, 4) : [];
  const bestForItems = Array.isArray(fm.bestFor) ? fm.bestFor.slice(0, 5) : [];
  const detailItems = Array.isArray(fm.keyDetails) ? fm.keyDetails.slice(0, 4) : [];
  const howToItems = extractListItems(howTo);
  const quickTips = howToItems.slice(0, 3);
  const howToIntro = cleanMarkdownText(howTo.split("\n").slice(0, 3).join(" "));
  const routineSteps = [
    { label: "Cleanse", current: routineStep === "Cleanse" },
    { label: "Treat", current: routineStep === "Treat" },
    { label: "Moisturize", current: routineStep === "Moisturize" },
    { label: "Protect", current: routineStep === "Protect" },
  ];

  const descriptionNode = (
    <div className="prose prose-product dark:prose-invert">
      <MDXRemote
        source={description}
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );

  const howToNode =
    howTo.trim().length > 0 ? (
      <div className="prose prose-product dark:prose-invert">
        <MDXRemote
          source={howTo}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    ) : null;

  const gallery = (fm.gallery ?? [])
    .filter((src) => src && src !== fm.image)
    .slice(0, 6);

  const related = getAllProducts()
    .filter((p2) => p2.slug !== product.slug)
    .sort((a, b) => {
      const ac = (a.frontmatter.category ?? "").toLowerCase();
      const bc = (b.frontmatter.category ?? "").toLowerCase();
      const target = (fm.category ?? "").toLowerCase();
      const aMatch = ac === target ? 1 : 0;
      const bMatch = bc === target ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    })
    .slice(0, 4)
    .map((p2) => ({
      id: p2.id,
      slug: p2.slug,
      title: p2.frontmatter.title,
      brand: p2.frontmatter.brand,
      category: p2.frontmatter.category,
      priceKes: p2.frontmatter.priceKes,
      compareAtKes: p2.frontmatter.compareAtKes,
      image: p2.frontmatter.image,
      tag: p2.frontmatter.tag,
      featured: p2.frontmatter.featured,
      inStock: p2.frontmatter.inStock,
      saleTag: (p2.frontmatter as ProductFrontmatter).saleTag,
    }));

  return (
    <div className="space-y-10 sm:space-y-12">
      <FullBleed>
        <section className="border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="mx-auto max-w-6xl space-y-4 px-4 py-8 sm:px-6 sm:py-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-foreground">
                Shop
              </Link>
              <span>/</span>
              <span className="text-foreground">{fm.title}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {fm.category ?? "Beauty"}
              </Badge>
              {fm.tag ? (
                <Badge variant="secondary" className="rounded-full">
                  {fm.tag}
                </Badge>
              ) : null}
              {fm.saleTag ? <Badge className="rounded-full">{fm.saleTag}</Badge> : null}
            </div>

            <h1 className="max-w-4xl text-3xl leading-tight sm:text-4xl">
              {label}
            </h1>

            {fm.shortDescription ? (
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {fm.shortDescription}
              </p>
            ) : null}
          </div>
        </section>
      </FullBleed>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <section className="space-y-4 lg:col-span-7">
          <div className="overflow-hidden rounded-3xl border bg-muted">
            <div className="relative aspect-[4/5]">
              <Image
                src={fm.image}
                alt={label}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          {gallery.length ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {gallery.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="overflow-hidden rounded-xl border bg-muted"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={src}
                      alt={`${label} gallery image ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 16vw, 10vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ProductPurchasePanel
            product={{
              id: product.id,
              slug: product.slug,
              title: fm.title,
              brand: fm.brand,
              category: fm.category ?? "Beauty",
              tag: fm.tag,
              image: fm.image,
              priceKes: fm.priceKes,
              compareAtKes: fm.compareAtKes,
              sizeOptions: fm.sizeOptions,
              inStock: fm.inStock ?? true,
              shortDescription: fm.shortDescription,
              saleTag: fm.saleTag,
            }}
          />
        </div>
      </div>

      <section className="space-y-4">
        <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-[#fbf3f1] via-background to-[#fbf7f0] p-6 shadow-[0_18px_40px_rgba(60,40,50,0.06)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Product overview
              </p>
              <h2 className="mt-3 text-4xl tracking-[-0.03em] sm:text-5xl">
                {fm.overview ?? "A curated product designed to fit beautifully into a real routine."}
              </h2>
              {fm.shortDescription ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {fm.shortDescription}
                </p>
              ) : null}
            </div>

            <div className="grid gap-3 border-border/70 lg:min-w-64 lg:border-l lg:pl-8">
              {quickFacts.map((fact, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {fact.icon}
                  </span>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-[0_16px_36px_rgba(60,40,50,0.05)]">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Why you&apos;ll love it
              <span className="h-px flex-1 bg-border" />
            </div>

            {benefitItems.length ? (
              <ul className="space-y-4">
                {benefitItems.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground sm:text-[0.95rem]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Carefully chosen for a smoother routine, easier layering, and a more polished result.
              </p>
            )}
          </div>

          <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-[0_16px_36px_rgba(60,40,50,0.05)]">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Key details
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-border/60 pb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Category
                </span>
                <span className="text-sm text-foreground">{fm.category ?? "Beauty"}</span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-border/60 pb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Product type
                </span>
                <span className="text-sm text-foreground">
                  {formatProductType(fm.category, fm.title)}
                </span>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-border/60 pb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Routine step
                </span>
                <div>
                  <Badge className="px-3 py-1">{routineStep}</Badge>
                </div>
              </div>
              {bestForItems.length ? (
                <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-border/60 pb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Best for
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {bestForItems.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {detailItems.length ? (
                <div className="grid grid-cols-[110px_1fr] gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Notes
                  </span>
                  <div className="space-y-2 text-sm text-foreground">
                    {detailItems.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_18px_42px_rgba(60,40,50,0.06)]">
        <Tabs defaultValue="description">
          <div className="border-b border-border/70 bg-background/70 p-3">
            <TabsList
              className="grid h-auto w-full grid-cols-1 gap-2 rounded-2xl bg-secondary/70 p-2 sm:grid-cols-3"
            >
              <TabsTrigger
                value="description"
                className="h-auto rounded-xl px-4 py-3 text-sm font-semibold"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="h-auto rounded-xl px-4 py-3 text-sm font-semibold"
              >
                Shipping and returns
              </TabsTrigger>
              <TabsTrigger
                value="how"
                className="h-auto rounded-xl px-4 py-3 text-sm font-semibold"
              >
                How to use
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="description" className="p-6 sm:p-8">
            {descriptionNode}
          </TabsContent>

          <TabsContent value="shipping" className="p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.25rem] bg-secondary/60 p-5">
                <Truck className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-2xl">Delivery across Kenya</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We confirm availability, timeline, and final delivery details on WhatsApp after checkout.
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-secondary/60 p-5">
                <RotateCcw className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-2xl">Returns</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Unopened items may be returned in original condition. For damaged or incorrect items, contact us within 24 hours.
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-secondary/60 p-5">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-2xl">Order assurance</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Free shipping above KES 5,000 where applicable, with WhatsApp support before dispatch.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="how" className="p-6 sm:p-8">
            {howToNode ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl tracking-[-0.02em] sm:text-4xl">
                    How it fits in your routine
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {howToIntro || "Use this as part of a simple, well-layered routine that feels easy to follow."}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {routineSteps.map((step, index) => (
                    <div
                      key={step.label}
                      className={`rounded-[1.1rem] p-4 ${
                        step.current
                          ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                          : "bg-secondary/70 text-foreground"
                      }`}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          step.current ? "text-primary/80" : "text-muted-foreground"
                        }`}
                      >
                        Step {index + 1}
                      </p>
                      <p className="mt-2 text-2xl">{step.label}</p>
                      {step.current ? (
                        <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                          You are here
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>

                {quickTips.length ? (
                  <div>
                    <h4 className="text-2xl tracking-[-0.02em]">Quick tips</h4>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {quickTips.map((tip, index) => (
                        <div key={index} className="flex gap-3 rounded-[1rem] bg-secondary/60 p-4">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-primary">
                            {index + 1}
                          </span>
                          <p className="text-sm leading-relaxed text-muted-foreground">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="rounded-[1.25rem] border border-border/70 bg-background/60 p-5">
                  <div className="flex items-start gap-3">
                    <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="prose prose-product dark:prose-invert max-w-none">
                      <MDXRemote
                        source={howTo}
                        components={mdxComponents}
                        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p>How to use instructions will be added for this product.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {related.length ? (
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl">You may also like</h2>
            <p className="text-sm text-muted-foreground">
              More curated options from the same collection.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p2) => (
              <ProductCard key={p2.id} product={p2} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
