import { getAllProducts } from "@/lib/mdx/products";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function googleProductCategory(category?: string, title?: string) {
  const hay = `${category ?? ""} ${title ?? ""}`.toLowerCase();

  if (hay.includes("fragrance") || hay.includes("perfume")) {
    return "Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne";
  }

  if (hay.includes("body") || hay.includes("lotion") || hay.includes("scrub")) {
    return "Health & Beauty > Personal Care > Cosmetics > Skin Care";
  }

  return "Health & Beauty > Personal Care > Cosmetics > Skin Care";
}

function productDescription(product: ReturnType<typeof getAllProducts>[number]) {
  const fm = product.frontmatter;
  const label = fm.brand ? `${fm.brand} ${fm.title}` : fm.title;
  return (
    fm.metaDescription ??
    fm.shortDescription ??
    `${label} available from GleamCare Kenya with WhatsApp ordering and Kenya-wide delivery.`
  );
}

export function GET() {
  const products = getAllProducts();

  const items = products
    .map((product) => {
      const fm = product.frontmatter;
      const label = fm.brand ? `${fm.brand} - ${fm.title}` : fm.title;

      return `
    <item>
      <g:id>${escapeXml(product.slug)}</g:id>
      <g:title>${escapeXml(label)}</g:title>
      <g:description>${escapeXml(productDescription(product))}</g:description>
      <g:link>${escapeXml(absoluteUrl(`/products/${product.slug}`))}</g:link>
      <g:image_link>${escapeXml(absoluteUrl(fm.image))}</g:image_link>
      <g:availability>${fm.inStock === false ? "out_of_stock" : "in_stock"}</g:availability>
      <g:price>${escapeXml(`${fm.priceKes.toFixed(2)} ${siteConfig.currency}`)}</g:price>
      <g:brand>${escapeXml(fm.brand ?? siteConfig.name)}</g:brand>
      <g:condition>new</g:condition>
      <g:product_type>${escapeXml(fm.category ?? "Beauty")}</g:product_type>
      <g:google_product_category>${escapeXml(googleProductCategory(fm.category, fm.title))}</g:google_product_category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(siteConfig.name)} product feed</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
