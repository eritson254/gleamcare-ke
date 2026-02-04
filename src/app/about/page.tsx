// src/app/about/page.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "About Us | Gleamcare Ke",
  description:
    "Authentic skincare, beauty, cosmetic, and personal care — healthy, glowing skin starts here.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Badge className="w-fit" variant="secondary">
          Beauty • Cosmetic • Personal Care
        </Badge>

        <h1 className="font-[var(--font-serif)] text-3xl tracking-tight sm:text-4xl">
          About Gleamcare Ke
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          We sell beauty products, including (and not limited to) authentic
          skincare. Healthy, glowing skin starts here.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <p className="font-medium">Authenticity First</p>
          <p className="mt-2 text-sm text-muted-foreground">
            We focus on quality and authenticity—products you can trust, chosen
            with care.
          </p>
        </Card>

        <Card className="p-6">
          <p className="font-medium">Glow with Confidence</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Skincare doesn’t have to be complicated. We make it easier to find
            what works for your routine.
          </p>
        </Card>

        <Card className="p-6">
          <p className="font-medium">Curated Beauty Essentials</p>
          <p className="mt-2 text-sm text-muted-foreground">
            From skincare to personal care, our collection is built to support
            real results and everyday confidence.
          </p>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <p className="font-medium">Visit Us</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Nairobi, Mithoo Business Centre, along Moi Avenue, opposite the
            Bazaar, Moi, Nairobi Area, Kenya.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="text-muted-foreground">
              Category:{" "}
              <span className="text-foreground">
                Beauty, Cosmetic & Personal Care
              </span>
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <p className="font-medium">Our Promise</p>
          <p className="mt-2 text-sm text-muted-foreground">
            We’re here to help you find products you’ll love—whether you’re
            building a routine from scratch or upgrading what already works.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            If you need help choosing, place an order via WhatsApp and we’ll
            guide you.
          </p>
        </Card>
      </section>
    </div>
  );
}
