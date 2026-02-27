// src/components/site/site-search-dialog.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { formatKes } from "@/lib/money";

export type SearchProductItem = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  category?: string;
  priceKes: number;
  image: string;
};

export function SiteSearchDialog({ products }: { products: SearchProductItem[] }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-2xl"
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 sm:max-w-[640px]">
          <DialogTitle className="sr-only">Search products</DialogTitle>

          <Command>
            <div className="border-b">
              <CommandInput placeholder="Search products…" />
            </div>

            <CommandList className="max-h-[420px]">
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Products">
                {products.map((p) => {
                  const label = p.brand ? `${p.brand} — ${p.title}` : p.title;
                  return (
                    <CommandItem
                      key={p.id}
                      value={`${label} ${p.category ?? ""}`}
                      onSelect={() => setOpen(false)}
                      asChild
                    >
                      <Link
                        href={`/products/${p.slug}`}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-10 w-10 overflow-hidden bg-muted">
                          <Image
                            src={p.image}
                            alt={label}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">
                            {p.category ?? "Beauty"}
                          </p>
                        </div>

                        <p className="text-sm font-semibold">{formatKes(p.priceKes)}</p>
                      </Link>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>

            <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
              <span>Tip: Press</span>
              <span className="border bg-muted px-2 py-1">Ctrl / ⌘ + K</span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
