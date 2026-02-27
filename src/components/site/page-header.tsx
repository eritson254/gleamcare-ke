// src/components/site/page-header.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type PageCrumb = {
  label: string;
  href?: string;
};

export function PageHeader({
  title,
  subtitle,
  crumbs,
  actions,
  badge,
  compact = false,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  crumbs?: PageCrumb[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  compact?: boolean;
  align?: "center" | "left";
}) {
  const isCentered = align === "center";

  return (
    <header className={cn("w-full", compact ? "py-8" : "py-12 sm:py-16")}>
      {/* Background band */}
      <div className="relative overflow-hidden border-y bg-secondary/40">
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
        >
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {/* Breadcrumbs */}
          {crumbs?.length ? (
            <nav
              aria-label="Breadcrumb"
              className={cn(
                "mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
                isCentered ? "justify-center" : "justify-start"
              )}
            >
              {crumbs.map((c, idx) => {
                const isLast = idx === crumbs.length - 1;

                return (
                  <span
                    key={`${c.label}-${idx}`}
                    className="inline-flex items-center gap-2"
                  >
                    {c.href && !isLast ? (
                      <Link
                        href={c.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span className={cn(isLast && "text-foreground")}>
                        {c.label}
                      </span>
                    )}
                    {!isLast ? (
                      <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                    ) : null}
                  </span>
                );
              })}
            </nav>
          ) : null}

          {/* Main content */}
          <div
            className={cn(
              "flex flex-col gap-4",
              isCentered ? "items-center text-center" : "items-start text-left"
            )}
          >
            {badge ? <div>{badge}</div> : null}

            <h1
              className={cn(
                "font-[var(--font-heading)] tracking-tight",
                compact
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl sm:text-4xl"
              )}
            >
              {title}
            </h1>

            {subtitle ? (
              <p
                className={cn(
                  "max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
                )}
              >
                {subtitle}
              </p>
            ) : null}

            {actions ? (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
