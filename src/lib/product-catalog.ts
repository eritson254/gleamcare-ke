import type { ProductCardItem } from "@/components/products/product-card";
import { getAllProducts, type MdxProductFrontmatter } from "@/lib/mdx/products";

function includesTerm(value: string | undefined, terms: string[]) {
  const normalized = (value ?? "").trim().toLowerCase();
  if (!normalized) return false;
  return terms.some((term) => normalized.includes(term));
}

export function getCatalogProducts(): ProductCardItem[] {
  return getAllProducts().map((p) => {
    const fm = p.frontmatter as MdxProductFrontmatter & {
      saleTag?: string;
      kind?: "product" | "bundle";
      bundle?: boolean;
    };

    return {
      id: p.id,
      slug: p.slug,
      title: fm.title,
      brand: fm.brand,
      category: fm.category,
      priceKes: fm.priceKes,
      compareAtKes: fm.compareAtKes,
      image: fm.image,
      tag: fm.tag,
      featured: fm.featured,
      inStock: fm.inStock,
      saleTag: fm.saleTag,
      kind: fm.kind ?? (fm.bundle ? "bundle" : "product"),
    };
  });
}

export function isSkincareProduct(product: ProductCardItem) {
  return includesTerm(product.category, ["skin"]);
}

export function isKBeautyProduct(product: ProductCardItem) {
  return (
    includesTerm(product.category, ["k-beauty", "kbeauty", "k beauty", "korean"]) ||
    includesTerm(product.tag, ["k-beauty", "kbeauty", "k beauty", "korean"]) ||
    includesTerm(product.title, ["k-beauty", "kbeauty", "k beauty", "korean"])
  );
}

export function isBodyAndFragranceProduct(product: ProductCardItem) {
  return (
    includesTerm(product.category, ["body", "fragrance", "perfume", "mist"]) ||
    includesTerm(product.tag, ["body", "fragrance", "perfume", "mist"]) ||
    includesTerm(product.title, ["body", "fragrance", "perfume", "mist", "body splash"])
  );
}
