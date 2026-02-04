// src/app/products/[slug]/page.tsx
import { getAllProducts } from "@/lib/products";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getAllProducts().find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <div className="space-y-2">
        <h1 className="font-[var(--font-heading)] text-2xl">Product not found</h1>
        <p className="text-sm text-muted-foreground">
          This product is not available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h1 className="font-[var(--font-heading)] text-3xl tracking-tight">
        {product.brand ? `${product.brand} — ${product.title}` : product.title}
      </h1>
      <p className="text-sm text-muted-foreground">
        Product detail page coming next (MDX + cart + WhatsApp checkout).
      </p>
    </div>
  );
}
