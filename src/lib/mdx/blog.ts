// src/lib/mdx/blog.ts
import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  excerpt: string;
  date: string; // ISO date (YYYY-MM-DD)
  author?: string;
  category?: string;
  coverImage?: string;
  featured?: boolean;
  readTime?: string;
  tags?: string[];
  recommendedProducts?: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readMdxFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function fileNameToSlug(fileName: string) {
  return fileName.replace(/\.mdx$/i, "");
}

function normalizeString(v: unknown) {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

function normalizeStringArray(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const out = v
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean);
  return out.length ? out : undefined;
}

function isIsoDate(v: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
}

function normalizeFrontmatter(
  fileName: string,
  fm: BlogFrontmatter
): BlogFrontmatter {
  const title = normalizeString(fm.title);
  const excerpt = normalizeString(fm.excerpt);
  const date = normalizeString(fm.date);

  if (!title || !excerpt || !date || !isIsoDate(date)) {
    throw new Error(
      `Invalid blog frontmatter in ${fileName}. Required: title, excerpt, date(YYYY-MM-DD).`
    );
  }

  return {
    title,
    excerpt,
    date,
    author: normalizeString(fm.author) ?? "GleamCare Team",
    category: normalizeString(fm.category) ?? "Beauty Journal",
    coverImage: normalizeString(fm.coverImage) ?? "/images/about/about-hero.jpg",
    featured: Boolean(fm.featured),
    readTime: normalizeString(fm.readTime) ?? "5 min read",
    tags: normalizeStringArray(fm.tags),
    recommendedProducts: normalizeStringArray(fm.recommendedProducts),
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.toLowerCase().endsWith(".mdx"));

  const posts: BlogPost[] = files.map((file) => {
    const slug = fileNameToSlug(file);
    const filePath = path.join(BLOG_DIR, file);
    const { data, content } = readMdxFile(filePath);
    const frontmatter = normalizeFrontmatter(file, data as BlogFrontmatter);

    return {
      id: slug,
      slug,
      frontmatter,
      content,
    };
  });

  posts.sort((a, b) => {
    const af = a.frontmatter.featured ? 1 : 0;
    const bf = b.frontmatter.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return b.frontmatter.date.localeCompare(a.frontmatter.date);
  });

  return posts;
}

export function getFeaturedBlogPost(): BlogPost | null {
  return getAllBlogPosts().find((p) => p.frontmatter.featured) ?? null;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const normalized = (slug ?? "").trim();
  if (!normalized) return null;

  const directPath = path.join(BLOG_DIR, `${normalized}.mdx`);
  if (fs.existsSync(directPath)) {
    const { data, content } = readMdxFile(directPath);
    const frontmatter = normalizeFrontmatter(
      `${normalized}.mdx`,
      data as BlogFrontmatter
    );

    return {
      id: normalized,
      slug: normalized,
      frontmatter,
      content,
    };
  }

  const all = getAllBlogPosts();
  const hit =
    all.find((p) => p.slug.toLowerCase() === normalized.toLowerCase()) ??
    all.find((p) => p.id.toLowerCase() === normalized.toLowerCase());

  return hit ?? null;
}
