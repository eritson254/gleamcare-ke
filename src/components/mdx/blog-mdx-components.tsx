// src/components/mdx/blog-mdx-components.tsx
import type { MDXComponents } from "mdx/types";

export const blogMdxComponents: MDXComponents = {
  a: (props) => (
    <a
      {...props}
      className="font-medium underline underline-offset-4 hover:opacity-80"
    />
  ),
};
