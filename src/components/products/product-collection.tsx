// src/components/products/product-collection.tsx
"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import {
  ProductCard,
  type ProductCardItem,
} from "@/components/products/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc";

type PagerItem = number | "...";

function uniq(values: (string | undefined | null)[]) {
  return Array.from(
    new Set(values.map((v) => (v ?? "").trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));
}

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

export function ProductCollection({
  products,
  defaultCategory,
}: {
  products: ProductCardItem[];
  defaultCategory?: string;
}) {
  const isDesktop = useIsDesktop(1024);

  const categories = React.useMemo(
    () => uniq(products.map((p) => p.category ?? "Beauty")),
    [products]
  );
  const brands = React.useMemo(() => uniq(products.map((p) => p.brand)), [products]);
  const tags = React.useMemo(() => uniq(products.map((p) => p.tag)), [products]);

  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState(defaultCategory ?? "all");
  const [brand, setBrand] = React.useState("all");
  const [tag, setTag] = React.useState("all");
  const [availability, setAvailability] = React.useState<"all" | "in">("all");
  const [sale, setSale] = React.useState<"all" | "sale">("all");
  const [sort, setSort] = React.useState<SortKey>("featured");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();

    return products
      .filter((p) => {
        const pCategory = (p.category ?? "Beauty").trim();
        if (category !== "all" && pCategory !== category) return false;
        if (brand !== "all" && (p.brand ?? "").trim() !== brand) return false;
        if (tag !== "all" && (p.tag ?? "").trim() !== tag) return false;
        if (availability === "in" && p.inStock === false) return false;

        if (sale === "sale") {
          const onSale =
            typeof p.compareAtKes === "number" && p.compareAtKes > p.priceKes;
          if (!onSale) return false;
        }

        if (!query) return true;

        const hay = `${p.brand ?? ""} ${p.title} ${p.category ?? ""} ${
          p.tag ?? ""
        }`
          .toLowerCase()
          .trim();
        return hay.includes(query);
      })
      .sort((a, b) => {
        const af = a.featured ? 1 : 0;
        const bf = b.featured ? 1 : 0;

        switch (sort) {
          case "featured":
            if (af !== bf) return bf - af;
            return a.title.localeCompare(b.title);
          case "price-asc":
            return a.priceKes - b.priceKes;
          case "price-desc":
            return b.priceKes - a.priceKes;
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
  }, [products, q, category, brand, tag, availability, sale, sort]);

  const activeFiltersCount =
    (q.trim() ? 1 : 0) +
    (category !== "all" ? 1 : 0) +
    (brand !== "all" ? 1 : 0) +
    (tag !== "all" ? 1 : 0) +
    (availability !== "all" ? 1 : 0) +
    (sale !== "all" ? 1 : 0) +
    (sort !== "featured" ? 1 : 0);

  const canReset = activeFiltersCount > 0;

  const pageSize = isDesktop ? 12 : 6;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [q, category, brand, tag, availability, sale, sort, pageSize]);

  React.useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const visible = filtered.slice(start, end);

  function resetAll() {
    setQ("");
    setCategory("all");
    setBrand("all");
    setTag("all");
    setAvailability("all");
    setSale("all");
    setSort("featured");
    setPage(1);
  }

  return (
    <div className="space-y-7">
      <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-card via-background to-muted/30 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xl">Filter and sort</p>

          <Badge variant="secondary" className="rounded-full">
            {activeFiltersCount ? `${activeFiltersCount} active` : "All products"}
          </Badge>

          <div className="ml-auto text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {total} results
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-11 rounded-xl border bg-background pl-9"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by product name, brand, category..."
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2">
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2">
            <Select value={tag} onValueChange={setTag}>
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tags</SelectItem>
                {tags.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-3">
            <Select
              value={availability}
              onValueChange={(v) => setAvailability(v === "in" ? "in" : "all")}
            >
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stock</SelectItem>
                <SelectItem value="in">In stock only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-3">
            <Select
              value={sale}
              onValueChange={(v) => setSale(v === "sale" ? "sale" : "all")}
            >
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="Sale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All products</SelectItem>
                <SelectItem value="sale">On sale only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-4">
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="title-asc">Name: A to Z</SelectItem>
                <SelectItem value="title-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2 lg:flex lg:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-11 w-full rounded-xl lg:w-auto"
              onClick={resetAll}
              disabled={!canReset}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {category !== "all" ? (
            <Badge variant="secondary" className="rounded-full">
              Category: {category}
            </Badge>
          ) : null}
          {brand !== "all" ? (
            <Badge variant="secondary" className="rounded-full">
              Brand: {brand}
            </Badge>
          ) : null}
          {tag !== "all" ? (
            <Badge variant="secondary" className="rounded-full">
              Tag: {tag}
            </Badge>
          ) : null}
          {availability === "in" ? (
            <Badge variant="secondary" className="rounded-full">
              In stock only
            </Badge>
          ) : null}
          {sale === "sale" ? (
            <Badge variant="secondary" className="rounded-full">
              On sale only
            </Badge>
          ) : null}
          {q.trim() ? (
            <Badge variant="secondary" className="rounded-full">
              Search: {q.trim()}
            </Badge>
          ) : null}
        </div>
      </div>

      {total ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="flex flex-col items-center gap-3 pt-1">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
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
                          "h-9 min-w-9 rounded-xl border px-3 text-xs font-semibold transition-colors",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
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
                  className="rounded-xl"
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
        <div className="rounded-2xl border bg-card p-10 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border bg-background">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-4 text-2xl">No products match your filters</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try clearing filters or searching a different keyword.
          </p>
          <div className="mt-5">
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-8"
              onClick={resetAll}
            >
              Reset filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
