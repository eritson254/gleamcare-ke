// src/app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FullBleed } from "@/components/layout/full-bleed";
import { Card } from "@/components/ui/card";
import { getAllBlogPosts, getFeaturedBlogPost } from "@/lib/mdx/blog";

export const metadata = {
  title: "Beauty Journal | GleamCare",
  description:
    "Practical skincare education, product guides, ingredient spotlights, and routine planning insights from GleamCare.",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BeautyJournalPage() {
  const posts = getAllBlogPosts();
  const featured = getFeaturedBlogPost();
  const regular = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="space-y-10">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare Beauty Journal"
              fill
              className="object-cover opacity-15"
              sizes="100vw"
            />
          </div>
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/45 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="space-y-5 lg:col-span-8">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                  Beauty Journal
                </Badge>

                <h1 className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  Professional skincare education for real routines.
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Explore practical guides, ingredient spotlights, and routine
                  frameworks designed to help you make better skincare decisions.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href="/shop">Shop products</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full px-8 lg:w-auto"
                >
                  <Link href="/about">About GleamCare</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      {featured ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl sm:text-4xl">Featured article</h2>
            <Badge variant="secondary" className="rounded-full">
              Editor&apos;s pick
            </Badge>
          </div>

          <Card className="overflow-hidden rounded-3xl border bg-card">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative min-h-[260px]">
                <Image
                  src={featured.frontmatter.coverImage ?? "/images/about/about-hero.jpg"}
                  alt={featured.frontmatter.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                <Badge variant="secondary" className="rounded-full">
                  {featured.frontmatter.category}
                </Badge>
                <h3 className="text-3xl leading-tight">{featured.frontmatter.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {featured.frontmatter.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(featured.frontmatter.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {featured.frontmatter.readTime}
                  </span>
                  <span>{featured.frontmatter.author}</span>
                </div>
                <Button asChild className="rounded-full px-7">
                  <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2">
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-3xl sm:text-4xl">Latest articles</h2>
          <Badge variant="secondary" className="rounded-full">
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </Badge>
        </div>

        {regular.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regular.map((post) => (
              <Card key={post.id} className="overflow-hidden rounded-2xl border bg-card">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.frontmatter.coverImage ?? "/images/about/about-skincare.jpg"}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <Badge variant="secondary" className="rounded-full">
                      {post.frontmatter.category}
                    </Badge>
                    <h3 className="line-clamp-2 text-xl leading-snug">
                      {post.frontmatter.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.frontmatter.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(post.frontmatter.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {post.frontmatter.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="rounded-2xl border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">No blog posts published yet.</p>
          </Card>
        )}
      </section>
    </div>
  );
}
