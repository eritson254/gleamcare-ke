import Image from "next/image";
import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";

import { FullBleed } from "@/components/layout/full-bleed";
import { ProductCollection } from "@/components/products/product-collection";
import { Badge } from "@/components/ui/badge";
import {
  getCatalogProducts,
  isBodyAndFragranceProduct,
} from "@/lib/product-catalog";
import { JsonLd } from "@/components/seo/json-ld";
import { buildProductItemListJsonLd } from "@/lib/seo";

export const metadata = {
  title: "Body Care & Fragrance Products in Kenya",
  description:
    "Shop body lotions, scrubs, body mists, perfumes, and fragrance picks in Kenya from GleamCare with WhatsApp ordering.",
  alternates: {
    canonical: "/shop/body-and-fragrance",
  },
  openGraph: {
    title: "Body Care & Fragrance Products in Kenya",
    description:
      "Browse body care and fragrance products from GleamCare Kenya with WhatsApp ordering and Kenya-wide delivery.",
    url: "/shop/body-and-fragrance",
  },
};

export default function BodyAndFragranceShopPage() {
  const products = getCatalogProducts().filter(isBodyAndFragranceProduct);
  const itemListJsonLd = buildProductItemListJsonLd({
    name: "Body care and fragrance products in Kenya",
    path: "/shop/body-and-fragrance",
    products,
  });

  return (
    <div className="space-y-10">
      <JsonLd data={itemListJsonLd} />

      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/why-gleamcare.jpg"
              alt="Body care and fragrance collection"
              fill
              priority
              className="object-cover object-top opacity-20"
              sizes="100vw"
            />
          </div>
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/45 blur-3xl" />

          <div className="relative mx-auto max-w-6xl space-y-5 px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <Badge variant="secondary" className="rounded-full px-4 py-1.5">
              Shop - Body and Fragrance
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Body care and fragrance for polished daily wear.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              See body essentials and fragrance picks together, then narrow your
              selection by brand in one place.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Genuine products
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                <Truck className="h-3.5 w-3.5 text-primary" />
                Kenya-wide delivery
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em]">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                Brand filtering
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      <ProductCollection products={products} />
    </div>
  );
}
