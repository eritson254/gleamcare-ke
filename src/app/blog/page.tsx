// src/app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, Sparkles } from "lucide-react";

import { FullBleed } from "@/components/layout/full-bleed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Beauty Journal | GleamCare",
  description:
    "Explore beauty tips, skincare routines, product guides, and expert advice from GleamCare. Learn how to care for healthy, glowing skin.",
};

const UPCOMING = [
  {
    title: "How to build a simple 4-step routine",
    body: "A practical breakdown for cleanser, treatment, moisturizer, and SPF.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Ingredient spotlight: Niacinamide",
    body: "What it does, who it works for, and how to layer it correctly.",
    icon: <FlaskConical className="h-5 w-5" />,
  },
  {
    title: "Morning vs evening routines",
    body: "A clean structure for consistency without overloading your skin.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

export default function BeautyJournalPage() {
  return (
    <div className="space-y-10">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare Beauty Journal"
              fill
              className="object-cover opacity-15"
              sizes="100vw"
            />
          </div>
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/45 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="space-y-5 lg:col-span-8">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                  Beauty Journal
                </Badge>

                <h1 className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  Practical skincare knowledge, beautifully delivered.
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We are building a premium editorial space with product guides,
                  routine education, ingredient explainers, and skincare tips that
                  are actually useful for daily life.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    Routine guides
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Ingredient education
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Product breakdowns
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href="/shop">Shop now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full px-8 lg:w-auto"
                >
                  <Link href="/about" className="inline-flex items-center gap-2">
                    About GleamCare <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      <section className="rounded-3xl border bg-gradient-to-r from-card via-muted/35 to-background p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Coming soon
          </p>
          <h2 className="text-2xl sm:text-3xl">What we are preparing next</h2>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {UPCOMING.map((item) => (
          <Card key={item.title} className="rounded-2xl border bg-card p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-primary">
              {item.icon}
            </div>
            <h3 className="mt-4 text-xl">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </Card>
        ))}
      </section>
    </div>
  );
}
