// src/lib/mdx/bundles.ts
import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type MdxBundleFrontmatter = {
  title: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  latest?: boolean;

  priceKes: number;
  compareAtKes?: number;

  image: string;

  items: string[]; // product slugs

  metaDescription?: string;
  shortDescription?: string;
};

export type MdxBundle = {
  id: string;
  slug: string;
  frontmatter: MdxBundleFrontmatter;
  content: string;
};

const BUNDLES_DIR = path.join(process.cwd(), "content", "bundles");

function readMdxFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function fileNameToSlug(fileName: string) {
  return fileName.replace(/\.mdx$/i, "");
}

export function getAllBundles(): MdxBundle[] {
  if (!fs.existsSync(BUNDLES_DIR)) return [];

  const files = fs
    .readdirSync(BUNDLES_DIR)
    .filter((f) => f.toLowerCase().endsWith(".mdx"));

  return files.map((file) => {
    const slug = fileNameToSlug(file);
    const filePath = path.join(BUNDLES_DIR, file);
    const { data, content } = readMdxFile(filePath);

    return {
      id: slug,
      slug,
      frontmatter: data as MdxBundleFrontmatter,
      content,
    };
  });
}
