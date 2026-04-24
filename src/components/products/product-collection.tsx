// src/components/products/product-collection.tsx
"use client";

import * as React from "react";
import {
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

export function ProductCollection({
  products,
  defaultCategory,
}: {
  products: ProductCardItem[];
  defaultCategory?: string;
}) {
  const isDesktop = useIsDesktop(1024);
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

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

  const initialCount = isDesktop ? 24 : 12;
  const loadStep = isDesktop ? 12 : 6;
  const total = filtered.length;
  const [visibleCount, setVisibleCount] = React.useState(initialCount);

  React.useEffect(() => {
    setVisibleCount(initialCount);
  }, [q, category, brand, tag, availability, sale, sort, initialCount]);

  React.useEffect(() => {
    setVisibleCount((count) => Math.min(Math.max(initialCount, count), total));
  }, [initialCount, total]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visible.length < total;

  function resetAll() {
    setQ("");
    setCategory("all");
    setBrand("all");
    setTag("all");
    setAvailability("all");
    setSale("all");
    setSort("featured");
    setVisibleCount(initialCount);
  }

  function loadMore() {
    setVisibleCount((count) => Math.min(count + loadStep, total));
  }

  const handleSentinelIntersect = React.useEffectEvent(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry?.isIntersecting || !hasMore) return;
      loadMore();
    }
  );

  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(handleSentinelIntersect, {
      rootMargin: "320px 0px",
      threshold: 0,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, visible.length]);

  return (
    <div ref={sectionRef} className="scroll-mt-24 space-y-7">
      <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-[#fbf7f0] via-background to-[#f7efe8] p-4 shadow-[0_16px_40px_rgba(60,40,50,0.06)] sm:p-6">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 backdrop-blur-sm">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Curated discovery
            </p>
            <p className="mt-1 font-[var(--font-heading)] text-4xl font-medium tracking-[-0.03em]">
              Filter and sort
            </p>
          </div>

          <Badge variant="secondary" className="px-3 py-1">
            {activeFiltersCount ? `${activeFiltersCount} active` : "All products"}
          </Badge>

          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground sm:ml-auto">
            {total} results
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-12 rounded-2xl border-border/80 bg-background/85 pl-9 shadow-none"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by product name, brand, category..."
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 rounded-2xl border-border/80 bg-background/85">
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
              <SelectTrigger className="h-12 rounded-2xl border-border/80 bg-background/85">
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
              <SelectTrigger className="h-12 rounded-2xl border-border/80 bg-background/85">
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
              <SelectTrigger className="h-12 rounded-2xl border-border/80 bg-background/85">
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
              <SelectTrigger className="h-12 rounded-2xl border-border/80 bg-background/85">
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
              <SelectTrigger className="h-12 rounded-2xl border-border/80 bg-background/85">
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
              className="h-12 w-full rounded-full lg:w-auto"
              onClick={resetAll}
              disabled={!canReset}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {category !== "all" ? (
            <Badge variant="secondary" className="border-0 bg-card px-3 py-1">
              Category: {category}
            </Badge>
          ) : null}
          {brand !== "all" ? (
            <Badge variant="secondary" className="border-0 bg-card px-3 py-1">
              Brand: {brand}
            </Badge>
          ) : null}
          {tag !== "all" ? (
            <Badge variant="secondary" className="border-0 bg-card px-3 py-1">
              Tag: {tag}
            </Badge>
          ) : null}
          {availability === "in" ? (
            <Badge variant="secondary" className="border-0 bg-card px-3 py-1">
              In stock only
            </Badge>
          ) : null}
          {sale === "sale" ? (
            <Badge variant="secondary" className="border-0 bg-card px-3 py-1">
              On sale only
            </Badge>
          ) : null}
          {q.trim() ? (
            <Badge variant="secondary" className="border-0 bg-card px-3 py-1">
              Search: {q.trim()}
            </Badge>
          ) : null}
        </div>
      </div>

      {total ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 pt-1">
            <p className="text-xs text-muted-foreground">
              Showing {visible.length} of {total}
            </p>

            {hasMore ? (
              <Button
                type="button"
                variant="outline"
                className="rounded-full px-8"
                onClick={loadMore}
              >
                Load more products
              </Button>
            ) : null}

            <div
              ref={sentinelRef}
              aria-hidden="true"
              className={cn("h-1 w-full", !hasMore && "hidden")}
            />
          </div>
        </>
      ) : (
        <div className="rounded-[2rem] border border-border/70 bg-card/80 p-10 text-center shadow-[0_16px_40px_rgba(60,40,50,0.06)]">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/80">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-4 font-[var(--font-heading)] text-4xl font-medium tracking-[-0.03em]">
            No products match your filters
          </p>
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
