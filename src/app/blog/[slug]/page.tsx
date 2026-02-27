// src/app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CalendarDays, Clock3, ArrowLeft, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FullBleed } from "@/components/layout/full-bleed";
import { blogMdxComponents } from "@/components/mdx/blog-mdx-components";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx/blog";
import { getAllProducts } from "@/lib/mdx/products";
import { ProductCard } from "@/components/products/product-card";

type PageProps = {
  params: Promise<{ slug?: string }> | { slug?: string };
};

async function unwrapParams<T extends object>(
  params: Promise<T> | T
): Promise<T> {
  return params instanceof Promise ? await params : params;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const p = await unwrapParams(params);
  const post = p?.slug ? getBlogPostBySlug(p.slug) : null;

  if (!post) {
    return {
      title: "Post not found | GleamCare",
      description: "This blog post is not available.",
    };
  }

  return {
    title: `${post.frontmatter.title} | Beauty Journal`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: `${post.frontmatter.title} | Beauty Journal`,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.coverImage
        ? [{ url: post.frontmatter.coverImage }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const p = await unwrapParams(params);
  const post = p?.slug ? getBlogPostBySlug(p.slug) : null;

  if (!post) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl">Post not found</h1>
        <p className="text-sm text-muted-foreground">
          This article may have been removed or moved.
        </p>
        <Button asChild variant="ghost" className="rounded-full">
          <Link href="/blog">Back to Beauty Journal</Link>
        </Button>
      </div>
    );
  }

  const related = getAllBlogPosts()
    .filter((x) => x.slug !== post.slug)
    .slice(0, 3);
  const allProducts = getAllProducts();
  const recommendedSlugs = post.frontmatter.recommendedProducts ?? [];

  const recommendedProducts = allProducts
    .filter((p) => recommendedSlugs.includes(p.slug))
    .slice(0, 2)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.frontmatter.title,
      brand: p.frontmatter.brand,
      category: p.frontmatter.category,
      priceKes: p.frontmatter.priceKes,
      compareAtKes: p.frontmatter.compareAtKes,
      image: p.frontmatter.image,
      tag: p.frontmatter.tag,
      featured: p.frontmatter.featured,
      inStock: p.frontmatter.inStock,
      saleTag: p.frontmatter.saleTag,
    }));

  const fallbackProducts = allProducts
    .slice(0, 2)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.frontmatter.title,
      brand: p.frontmatter.brand,
      category: p.frontmatter.category,
      priceKes: p.frontmatter.priceKes,
      compareAtKes: p.frontmatter.compareAtKes,
      image: p.frontmatter.image,
      tag: p.frontmatter.tag,
      featured: p.frontmatter.featured,
      inStock: p.frontmatter.inStock,
      saleTag: p.frontmatter.saleTag,
    }));

  const promotedProducts =
    recommendedProducts.length > 0 ? recommendedProducts : fallbackProducts;

  return (
    <div className="space-y-10">
      <FullBleed>
        <section className="border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="mx-auto max-w-6xl space-y-5 px-4 py-10 sm:px-6 sm:py-12">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground">
                Beauty Journal
              </Link>
              <span>/</span>
              <span className="text-foreground">Article</span>
            </div>

            <Badge variant="secondary" className="rounded-full">
              {post.frontmatter.category}
            </Badge>

            <h1 className="max-w-4xl text-4xl leading-[1.08] sm:text-5xl">
              {post.frontmatter.title}
            </h1>

            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {post.frontmatter.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {post.frontmatter.readTime}
              </span>
              <span>{post.frontmatter.author}</span>
            </div>
          </div>
        </section>
      </FullBleed>

      <div className="overflow-hidden rounded-3xl border bg-muted">
        <div className="relative aspect-[16/7] sm:aspect-[16/6]">
          <Image
            src={post.frontmatter.coverImage ?? "/images/about/about-hero.jpg"}
            alt={post.frontmatter.title}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <article className="rounded-3xl border bg-card p-6 sm:p-8">
        <div className="prose prose-product prose-blog dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            components={blogMdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </article>

      {promotedProducts.length ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl sm:text-4xl">Products mentioned in this topic</h2>
            <Badge variant="secondary" className="rounded-full">
              Recommended picks
            </Badge>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {promotedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href="/blog" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </Button>
      </div>

      {related.length ? (
        <section className="space-y-5">
          <h2 className="text-3xl sm:text-4xl">Related reads</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Card key={r.id} className="gap-0 overflow-hidden rounded-2xl border bg-card p-0">
                <Link href={`/blog/${r.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.frontmatter.coverImage ?? "/images/about/about-skincare.jpg"}
                      alt={r.frontmatter.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="space-y-2 p-5">
                    <Badge variant="secondary" className="rounded-full">
                      {r.frontmatter.category}
                    </Badge>
                    <h3 className="line-clamp-2 text-xl">{r.frontmatter.title}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {r.frontmatter.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
