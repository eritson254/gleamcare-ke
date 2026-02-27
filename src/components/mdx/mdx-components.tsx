// src/components/mdx/mdx-components.tsx
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="font-[var(--font-heading)] text-2xl tracking-tight sm:text-3xl"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="font-[var(--font-heading)] text-xl tracking-tight"
    />
  ),
  p: (props) => <p {...props} className="text-sm leading-relaxed sm:text-base" />,
  ul: (props) => (
    <ul {...props} className="list-disc space-y-2 pl-6 text-sm sm:text-base" />
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal space-y-2 pl-6 text-sm sm:text-base" />
  ),
  a: (props) => (
    <a {...props} className="underline underline-offset-4 hover:opacity-80" />
  ),
};
