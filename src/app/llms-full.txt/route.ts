import { getAllBlogPosts } from "@/lib/mdx/blog";
import { getAllProducts } from "@/lib/mdx/products";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function summarizeProduct(product: ReturnType<typeof getAllProducts>[number]) {
  const fm = product.frontmatter;
  const label = fm.brand ? `${fm.brand} - ${fm.title}` : fm.title;
  const description =
    fm.metaDescription ??
    fm.shortDescription ??
    `${label} from GleamCare Kenya.`;
  const tags = [
    fm.category,
    fm.productType,
    fm.routineStep,
    ...(fm.skinType ?? []),
    ...(fm.skinConcern ?? []),
  ].filter(Boolean);

  return `## ${label}
- URL: ${absoluteUrl(`/products/${product.slug}`)}
- Price: ${siteConfig.currency} ${fm.priceKes}
- Availability: ${fm.inStock === false ? "Out of stock" : "In stock"}
- Brand: ${fm.brand ?? siteConfig.name}
- Category: ${fm.category ?? "Beauty"}
- Tags: ${tags.join(", ") || "Beauty"}
- Summary: ${description}`;
}

function summarizePost(post: ReturnType<typeof getAllBlogPosts>[number]) {
  return `## ${post.frontmatter.title}
- URL: ${absoluteUrl(`/blog/${post.slug}`)}
- Date: ${post.frontmatter.date}
- Category: ${post.frontmatter.category}
- Summary: ${post.frontmatter.excerpt}`;
}

export function GET() {
  const products = getAllProducts();
  const posts = getAllBlogPosts();

  const text = `# GleamCare Kenya Full AI Inventory

This file is designed for AI answer engines and retrieval systems. It lists current public product and editorial content from ${siteConfig.name}. Prices and availability should be confirmed on product pages or WhatsApp before purchase.

# Core Pages
- Home: ${absoluteUrl("/")}
- Shop: ${absoluteUrl("/shop")}
- Skincare: ${absoluteUrl("/shop/skincare")}
- Korean skincare / K-beauty: ${absoluteUrl("/shop/k-beauty")}
- Body care and fragrance: ${absoluteUrl("/shop/body-and-fragrance")}
- All products: ${absoluteUrl("/products")}
- Beauty Journal: ${absoluteUrl("/blog")}
- FAQs: ${absoluteUrl("/faqs")}
- Contact: ${absoluteUrl("/contact")}

# Products
${products.map(summarizeProduct).join("\n\n")}

# Beauty Journal Articles
${posts.map(summarizePost).join("\n\n")}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
