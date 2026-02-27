// src/components/home/home-product-section.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import {
  ProductCard,
  type ProductCardItem,
} from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function useIsDesktop(breakpointPx = 1024) {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(`(min-width: ${breakpointPx}px)`).matches;
  });

  React.useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpointPx]);

  return isDesktop;
}

function range(start: number, end: number) {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

type PagerItem = number | "...";

function getPagerItems(
  current: number,
  total: number,
  opts?: { siblings?: number; boundaries?: number }
): PagerItem[] {
  const siblings = opts?.siblings ?? 1;
  const boundaries = opts?.boundaries ?? 1;

  if (total <= 1) return [1];

  const maxVisible = boundaries * 2 + siblings * 2 + 3;
  if (total <= maxVisible) return range(1, total);

  const leftEdge = range(1, boundaries);
  const rightEdge = range(total - boundaries + 1, total);
  const windowStart = Math.max(boundaries + 1, current - siblings);
  const windowEnd = Math.min(total - boundaries, current + siblings);
  const windowPages = range(windowStart, windowEnd);

  const items: PagerItem[] = [];
  items.push(...leftEdge);
  if (windowStart > boundaries + 1) items.push("...");
  items.push(...windowPages);
  if (windowEnd < total - boundaries) items.push("...");
  items.push(...rightEdge);

  const deduped: PagerItem[] = [];
  for (const it of items) {
    const prev = deduped[deduped.length - 1];
    if (it === prev) continue;
    if (typeof it === "number" && deduped.includes(it)) continue;
    deduped.push(it);
  }
  return deduped;
}

export function HomeProductSection({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  products,
  paginate = false,
  emptyFallback,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  products: ProductCardItem[];
  paginate?: boolean;
  emptyFallback?: { title: string; subtitle: string };
}) {
  const isDesktop = useIsDesktop(1024);
  const pageSize = paginate ? (isDesktop ? 8 : 4) : products.length;
  const [page, setPage] = React.useState(1);

  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));

  React.useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const visible = products.slice(start, end);

  const hasProducts = total > 0;
  const showPager = paginate && totalPages > 1;

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-3xl border bg-gradient-to-r from-card via-muted/35 to-background p-5 sm:p-7">
        <div className="mx-auto max-w-4xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Curated section
          </div>

          <h2 className="text-3xl sm:text-4xl">{title}</h2>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>

          <div className="pt-1">
            <Button asChild className="rounded-full px-7">
              <Link href={ctaHref} className="inline-flex items-center gap-2">
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {hasProducts ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(paginate ? visible : products.slice(0, 8)).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {showPager ? (
            <div className="flex flex-col items-center gap-3 pt-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-none"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {getPagerItems(page, totalPages, {
                    siblings: 1,
                    boundaries: 1,
                  }).map((it, idx) => {
                    if (it === "...") {
                      return (
                        <span
                          key={`dots-${idx}`}
                          className="px-2 text-xs text-muted-foreground"
                          aria-hidden="true"
                        >
                          ...
                        </span>
                      );
                    }

                    const n = it;
                    const active = n === page;

                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPage(n)}
                        className={cn(
                          "h-9 min-w-9 border px-3 text-xs font-semibold",
                          "transition-colors",
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background hover:bg-accent"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-none"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Showing {start + 1}-{Math.min(end, total)} of {total}
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <div className="border bg-card p-8 text-center">
          <p className="text-sm font-medium">
            {emptyFallback?.title ?? "No products yet."}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {emptyFallback?.subtitle ?? "Add products and they will show up here."}
          </p>
        </div>
      )}
    </section>
  );
}
