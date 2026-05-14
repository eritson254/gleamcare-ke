import { absoluteUrl, siteConfig } from "@/lib/site";

export type SeoProductListItem = {
  slug: string;
  title: string;
  brand?: string;
  image: string;
  priceKes: number;
  inStock?: boolean;
};

export function buildProductItemListJsonLd({
  name,
  path,
  products,
}: {
  name: string;
  path: string;
  products: SeoProductListItem[];
}) {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    name,
    url: pageUrl,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 100).map((product, index) => {
      const productUrl = absoluteUrl(`/products/${product.slug}`);
      const productName = product.brand
        ? `${product.brand} - ${product.title}`
        : product.title;

      return {
        "@type": "ListItem",
        position: index + 1,
        url: productUrl,
        item: {
          "@type": "Product",
          name: productName,
          image: absoluteUrl(product.image),
          url: productUrl,
          brand: product.brand
            ? {
                "@type": "Brand",
                name: product.brand,
              }
            : undefined,
          offers: {
            "@type": "Offer",
            priceCurrency: siteConfig.currency,
            price: product.priceKes,
            availability:
              product.inStock === false
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            url: productUrl,
          },
        },
      };
    }),
  };
}
