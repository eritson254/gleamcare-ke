// src/lib/products.ts
export type Product = {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  priceKes: number;
  compareAtKes?: number;
  image: string;
  tag?: string; // e.g., "Best Seller", "New"
  category?: string;
  featured?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "cerave-hydrating-cleanser",
    title: "Hydrating Cleanser",
    brand: "CeraVe",
    priceKes: 2850,
    compareAtKes: 3200,
    image: "/images/products/cerave-cleanser.jpg",
    tag: "Best Seller",
    category: "Skincare",
    featured: true,
  },
  {
    id: "p2",
    slug: "la-roche-posay-anthelios-spf50",
    title: "Anthelios SPF 50+",
    brand: "La Roche-Posay",
    priceKes: 4200,
    image: "/images/products/lrp-anthelios.jpg",
    tag: "Derm Favorite",
    category: "Skincare",
    featured: true,
  },
  {
    id: "p3",
    slug: "the-ordinary-niacinamide-10-zinc-1",
    title: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    priceKes: 2100,
    image: "/images/products/ordinary-niacinamide.jpg",
    tag: "Brightening",
    category: "Skincare",
    featured: true,
  },
  {
    id: "p4",
    slug: "fenty-gloss-bomb",
    title: "Gloss Bomb",
    brand: "Fenty Beauty",
    priceKes: 3900,
    image: "/images/products/fenty-gloss.jpg",
    tag: "Trending",
    category: "Beauty",
    featured: true,
  },
];

export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.featured).slice(0, 4);
}

export function getAllProducts() {
  return PRODUCTS;
}
