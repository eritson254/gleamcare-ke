// src/lib/mdx/products.ts
import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type RoutineStep =
  | "Cleanse"
  | "Treat"
  | "Moisturize"
  | "Protect"
  | "Body"
  | "Fragrance";

const ROUTINE_STEPS: RoutineStep[] = [
  "Cleanse",
  "Treat",
  "Moisturize",
  "Protect",
  "Body",
  "Fragrance",
];

export type MdxProductFrontmatter = {
  title: string;
  brand?: string;

  // Pricing
  priceKes: number;
  compareAtKes?: number;

  // Core grouping
  category?: string; // e.g. "Skincare", "Bodycare", "Fragrance"
  productType?: string; // e.g. "Cleanser", "Sunscreen", "Serum"
  tag?: string; // e.g. "Best Seller"
  featured?: boolean;
  latest?: boolean;
  inStock?: boolean;

  // Routine targeting
  routineStep?: RoutineStep;
  skinType?: string[]; // ["Normal", "Dry", "Sensitive"]
  skinConcern?: string[]; // ["Acne", "Dark Spots", "Dehydration"]

  // Images
  image: string;
  gallery?: string[];

  // SEO + ecommerce extras
  metaDescription?: string;
  shortDescription?: string;

  // Optional sale ribbon text like "SAVE 11%" or "SALE"
  saleTag?: string;

  // Structured highlights (for icon cards)
  overview?: string;
  whyLove?: string[];
  bestFor?: string[];
  keyDetails?: string[];

  /**
   * Bundles (we’ll activate later if/when you want)
   * isBundle?: boolean;
   * bundleItems?: string[]; // product slugs
   */
};

export type MdxProduct = {
  id: string; // slug
  slug: string;
  frontmatter: MdxProductFrontmatter;
  content: string;
};

const PRODUCTS_DIR = path.join(process.cwd(), "content", "products");

function readMdxFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function fileNameToSlug(fileName: string) {
  return fileName.replace(/\.mdx$/i, "");
}

function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

function normalizeString(v: unknown) {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

function normalizeStringArray(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const cleaned = v
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean);
  return cleaned.length ? cleaned : undefined;
}

function normalizeFrontmatter(fileName: string, fm: MdxProductFrontmatter): MdxProductFrontmatter {
  const title = normalizeString(fm.title);
  const image = normalizeString(fm.image);

  if (!title || !image || !isFiniteNumber(fm.priceKes)) {
    throw new Error(
      `Invalid frontmatter in ${fileName}. Required: title (string), priceKes (number), image (string).`
    );
  }

  const compareAtKes =
    fm.compareAtKes != null && isFiniteNumber(fm.compareAtKes) ? fm.compareAtKes : undefined;

  const routineStep =
    fm.routineStep && ROUTINE_STEPS.includes(fm.routineStep) ? fm.routineStep : undefined;

  return {
    ...fm,
    title,
    image,
    brand: normalizeString(fm.brand),
    category: normalizeString(fm.category),
    productType: normalizeString(fm.productType),
    tag: normalizeString(fm.tag),
    metaDescription: normalizeString(fm.metaDescription),
    shortDescription: normalizeString(fm.shortDescription),
    saleTag: normalizeString(fm.saleTag),
    overview: normalizeString(fm.overview),
    compareAtKes,
    routineStep,
    skinType: normalizeStringArray(fm.skinType),
    skinConcern: normalizeStringArray(fm.skinConcern),
    gallery: normalizeStringArray(fm.gallery),
    whyLove: normalizeStringArray(fm.whyLove),
    bestFor: normalizeStringArray(fm.bestFor),
    keyDetails: normalizeStringArray(fm.keyDetails),
    featured: Boolean(fm.featured),
    latest: Boolean(fm.latest),
    inStock: fm.inStock ?? true,
  };
}

export function getAllProducts(): MdxProduct[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];

  const files = fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.toLowerCase().endsWith(".mdx"));

  const products: MdxProduct[] = files.map((file) => {
    const slug = fileNameToSlug(file);
    const filePath = path.join(PRODUCTS_DIR, file);
    const { data, content } = readMdxFile(filePath);

    const frontmatter = normalizeFrontmatter(file, data as MdxProductFrontmatter);

    return {
      id: slug,
      slug,
      frontmatter,
      content,
    };
  });

  // featured first, then latest, then title
  products.sort((a, b) => {
    const af = a.frontmatter.featured ? 1 : 0;
    const bf = b.frontmatter.featured ? 1 : 0;
    if (af !== bf) return bf - af;

    const al = a.frontmatter.latest ? 1 : 0;
    const bl = b.frontmatter.latest ? 1 : 0;
    if (al !== bl) return bl - al;

    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });

  return products;
}

export function getFeaturedProducts(limit = 4): MdxProduct[] {
  return getAllProducts().filter((p) => p.frontmatter.featured).slice(0, limit);
}

export function getLatestProducts(limit = 8): MdxProduct[] {
  return getAllProducts().filter((p) => p.frontmatter.latest).slice(0, limit);
}

export function getProductBySlug(slug: string): MdxProduct | null {
  const normalized = (slug ?? "").trim();
  if (!normalized) return null;

  const directPath = path.join(PRODUCTS_DIR, `${normalized}.mdx`);
  if (fs.existsSync(directPath)) {
    const { data, content } = readMdxFile(directPath);
    const frontmatter = normalizeFrontmatter(`${normalized}.mdx`, data as MdxProductFrontmatter);

    return {
      id: normalized,
      slug: normalized,
      frontmatter,
      content,
    };
  }

  const all = getAllProducts();
  const hit =
    all.find((p) => p.slug.toLowerCase() === normalized.toLowerCase()) ??
    all.find((p) => p.id.toLowerCase() === normalized.toLowerCase());

  return hit ?? null;
}

export type ProductIndexItem = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  category?: string;
  productType?: string;
  routineStep?: RoutineStep;
  priceKes: number;
  image: string;
};

export function getProductIndex(): ProductIndexItem[] {
  return getAllProducts().map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.frontmatter.title,
    brand: p.frontmatter.brand,
    category: p.frontmatter.category,
    productType: p.frontmatter.productType,
    routineStep: p.frontmatter.routineStep,
    priceKes: p.frontmatter.priceKes,
    image: p.frontmatter.image,
  }));
}
