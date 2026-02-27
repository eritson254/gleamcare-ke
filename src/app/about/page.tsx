// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  MapPin,
  MessageCircleMore,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { FullBleed } from "@/components/layout/full-bleed";
import { getAllBlogPosts } from "@/lib/mdx/blog";

export const metadata = {
  title:
    "About GleamCare | Genuine Skincare, Korean Beauty & Personal Care in Kenya",
  description:
    "GleamCare is a Nairobi-based beauty shop delivering across Kenya. Shop only genuine skincare, Korean skincare (K-Beauty), cosmetics & personal care products. Retail and bulk orders available.",
  keywords: [
    "GleamCare",
    "GleamCare Kenya",
    "beauty shop Nairobi",
    "skincare Kenya",
    "Korean skincare Kenya",
    "K-Beauty Kenya",
    "genuine skincare products",
    "authentic beauty products Kenya",
    "cosmetics Nairobi",
    "personal care Kenya",
    "bulk skincare Kenya",
    "retail skincare Nairobi",
    "Moi Avenue beauty shop",
    "Mithoo Business Centre",
    "deliver across Kenya",
  ],
};

const WHATSAPP_URL = "https://wa.me/254729702701";
const MAPS_URL = "https://maps.app.goo.gl/xVn1amTSzcKZ1Cj19";

function formatBlogDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatCard({
  title,
  value,
  body,
}: {
  title: string;
  value: string;
  body: string;
}) {
  return (
    <Card className="rounded-2xl border bg-card p-6">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </p>
      <p className="mt-2 text-2xl">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </Card>
  );
}

function ValueItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="rounded-2xl border bg-card p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Card>
  );
}

export default function AboutPage() {
  const latestBlogPosts = getAllBlogPosts().slice(0, 3);

  return (
    <div className="space-y-10">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-secondary/50 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
              <div className="space-y-5 lg:col-span-7 lg:py-2">
                <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                  About GleamCare
                </Badge>

                <h1 className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  We built GleamCare to make authentic beauty shopping easier.
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We are a Nairobi-based beauty store focused on genuine skincare,
                  K-beauty, and personal care. Our approach is simple: stock
                  products people actually use, support customers quickly, and
                  deliver across Kenya with clear communication.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    Authentic products
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Retail and bulk
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Kenya-wide delivery
                  </Badge>
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                  <Button asChild className="rounded-full px-8">
                    <Link href="/shop">Shop collection</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-8">
                    <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                      WhatsApp us
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 lg:flex lg:flex-col">
                <div className="overflow-hidden rounded-2xl border bg-muted shadow-sm lg:h-full">
                  <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:h-full lg:aspect-auto">
                    <Image
                      src="/images/about/about-hero.jpg"
                      alt="GleamCare Kenya beauty products"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Authenticity"
          value="Genuine only"
          body="We prioritize trusted sourcing so customers can shop confidently."
        />
        <StatCard
          title="Location"
          value="Nairobi CBD"
          body="Based at Mithoo Business Centre, along Moi Avenue."
        />
        <StatCard
          title="Coverage"
          value="Across Kenya"
          body="Nationwide delivery with order confirmation via WhatsApp."
        />
      </section>

      <section className="rounded-3xl border bg-gradient-to-br from-card via-background to-muted/30 p-5 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-4 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Our model
            </div>
            <h2 className="text-3xl sm:text-4xl">
              Curated for routines, not clutter.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              GleamCare focuses on practical routines and quality essentials:
              cleansers, treatments, moisturizers, SPF, body care, and fragrance.
              We support both personal and bulk buyers with fast communication.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 rounded-xl border bg-card px-3 py-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Skincare and K-beauty picks selected for consistency.
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-xl border bg-card px-3 py-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Retail and bulk ordering with clear stock confirmation.
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-xl border bg-card px-3 py-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Delivery coordination and support handled on WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border bg-muted sm:col-span-2">
            <div className="relative aspect-[16/8]">
              <Image
                src="/images/about/about-skincare.jpg"
                alt="Skincare products curated by GleamCare"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border bg-muted">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/about/about-kbeauty.jpg"
                alt="Korean beauty products at GleamCare"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <Card className="rounded-2xl border bg-card p-6">
            <h3 className="text-2xl">Need bulk quantities?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We support salons, resellers, and quantity buyers. Message us for
              stock checks and bulk pricing details.
            </p>
            <Button asChild variant="outline" className="mt-4 rounded-full px-6">
              <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Request bulk pricing
              </Link>
            </Button>
          </Card>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Why choose us
          </p>
          <h2 className="text-3xl sm:text-4xl">What customers can expect</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ValueItem
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Trusted quality"
            body="We focus on genuine products and practical recommendations."
          />
          <ValueItem
            icon={<MessageCircleMore className="h-5 w-5" />}
            title="Fast communication"
            body="WhatsApp-first support keeps order updates and planning clear."
          />
          <ValueItem
            icon={<Truck className="h-5 w-5" />}
            title="Nationwide fulfillment"
            body="From Nairobi to upcountry deliveries, we coordinate quickly."
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Customer love
          </p>
          <h2 className="text-3xl sm:text-4xl">What people say about GleamCare</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Real feedback from customers who value authenticity, convenience, and
            fast support.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              name: "Amina | Nairobi",
              text: "I finally found a store that keeps products authentic and communication clear. Delivery updates were fast and reliable.",
            },
            {
              name: "Faith | Ruaka",
              text: "The WhatsApp flow is smooth. I got quick confirmations, useful recommendations, and my order arrived exactly as expected.",
            },
            {
              name: "Lydia | Westlands",
              text: "Great curation and fair pricing. The routine guidance helped me choose faster without guessing what to buy.",
            },
          ].map((t) => (
            <Card key={t.name} className="rounded-2xl border bg-card p-6">
              <div className="inline-flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold">{t.name}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Store location
          </div>
          <h3 className="mt-3 text-2xl">Visit us in Nairobi CBD</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Mithoo Business Centre, Moi Avenue, opposite the Bazaar, Nairobi.
            Walk in for shopping or coordinate pickup via WhatsApp.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border bg-muted">
            <div className="relative aspect-[16/10]">
              <iframe
                title="GleamCare location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.820004045954!2d36.81923127496572!3d-1.281752598706064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d456f12e63%3A0x928d2732fd2520b!2sMithoo!5e0!3m2!1sen!2ske!4v1770239271048!5m2!1sen!2ske"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <Button asChild variant="outline" className="mt-5 w-full rounded-full">
            <Link href={MAPS_URL} target="_blank" rel="noreferrer">
              Open in Google Maps
            </Link>
          </Button>
        </Card>

        <Card className="rounded-3xl border bg-gradient-to-br from-card to-muted/35 p-6 sm:p-8">
          <h3 className="text-2xl">Common questions</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Quick answers about ordering and delivery.
          </p>

          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="q1">
              <AccordionTrigger className="text-left">
                Do you sell genuine products?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Yes. Authenticity is a core part of how GleamCare curates products.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="text-left">
                Do you deliver outside Nairobi?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Yes. We deliver across Kenya and confirm details during checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="text-left">
                Can I place a bulk order?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Yes. Contact us on WhatsApp for quantity checks and bulk pricing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button asChild className="rounded-full">
              <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/shop">Shop now</Link>
            </Button>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Beauty Journal
          </p>
          <h2 className="text-3xl sm:text-4xl">Latest blog posts</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Explore our newest skincare guides and ingredient explainers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {latestBlogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden rounded-2xl border bg-card">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.frontmatter.coverImage ?? "/images/about/about-hero.jpg"}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <Badge variant="secondary" className="rounded-full">
                    {post.frontmatter.category}
                  </Badge>
                  <h3 className="line-clamp-2 text-xl leading-snug">
                    {post.frontmatter.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.frontmatter.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBlogDate(post.frontmatter.date)} • {post.frontmatter.readTime}
                  </p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border bg-gradient-to-r from-primary/10 via-secondary/30 to-background p-7 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl">
              Ready to shop premium beauty essentials?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Browse the collection or message us for product support and routine
              guidance.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button asChild className="rounded-full px-8">
              <Link href="/shop">Shop now</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                WhatsApp us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
