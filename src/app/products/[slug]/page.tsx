// src/app/products/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  BadgeCheck,
  BookOpen,
  Droplets,
  Info,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="h-full rounded-2xl border bg-card p-5">
      <div className="flex gap-3">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-base">{title}</p>
          <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
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
      <div className="rounded-3xl border bg-gradient-to-br from-card via-background to-muted/35 p-5 sm:p-7">
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

        <div className="mt-4 flex flex-wrap items-center gap-2">
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
      </div>

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
              inStock: fm.inStock ?? true,
              shortDescription: fm.shortDescription,
              saleTag: fm.saleTag,
            }}
          />
        </div>
      </div>

      <section className="grid items-stretch gap-4 md:grid-cols-2">
        {fm.overview ? (
          <InfoCard icon={<Info className="h-5 w-5" />} title="Overview">
            {fm.overview}
          </InfoCard>
        ) : null}

        {Array.isArray(fm.whyLove) && fm.whyLove.length ? (
          <InfoCard icon={<Sparkles className="h-5 w-5" />} title="Why you will love it">
            <ul className="space-y-1 pl-5">
              {fm.whyLove.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </InfoCard>
        ) : null}

        {Array.isArray(fm.bestFor) && fm.bestFor.length ? (
          <InfoCard icon={<Droplets className="h-5 w-5" />} title="Best for">
            <ul className="space-y-1 pl-5">
              {fm.bestFor.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </InfoCard>
        ) : null}

        {Array.isArray(fm.keyDetails) && fm.keyDetails.length ? (
          <InfoCard icon={<ShieldCheck className="h-5 w-5" />} title="Key details">
            <ul className="space-y-1 pl-5">
              {fm.keyDetails.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </InfoCard>
        ) : null}
      </section>

      <section className="overflow-hidden rounded-3xl border bg-card">
        <Tabs defaultValue="description">
          <div className="border-b bg-background/70 p-2">
            <TabsList
              variant="line"
              className="flex w-full justify-start gap-1 overflow-x-auto [scrollbar-width:none]"
            >
              <TabsTrigger
                value="description"
                className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                Shipping and returns
              </TabsTrigger>
              <TabsTrigger
                value="how"
                className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                How to use
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="description" className="p-5 sm:p-6">
            {descriptionNode}
          </TabsContent>

          <TabsContent value="shipping" className="p-5 sm:p-6">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p>
                  We deliver across Kenya. After checkout we confirm availability,
                  timeline, and final cost on WhatsApp.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p>
                  Returns are accepted for unopened items in original condition.
                  If you receive a damaged or incorrect item, contact us within 24
                  hours of delivery.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p>Free shipping above KES 5,000 where applicable.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="how" className="p-5 sm:p-6">
            {howToNode ? (
              howToNode
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
