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
  Sparkles,
  MapPin,
  ShieldCheck,
  Truck,
  MessageCircleMore,
  PackageCheck,
} from "lucide-react";

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

function Pill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border bg-card px-5 py-4">
      <p className="font-[var(--font-heading)] text-2xl tracking-tight">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="rounded-2xl border bg-card/90 p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-primary">
        {icon}
      </div>
      <h3 className="mt-4 font-[var(--font-heading)] text-xl tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Card>
  );
}

function MapsEmbedCard() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
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
  );
}

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-6 pt-8">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-card via-background to-muted/40 p-6 sm:p-10">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-secondary blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-7">
            <Badge variant="secondary" className="rounded-full px-4 py-1.5">
              Premium beauty retail in Nairobi
            </Badge>

            <h1 className="max-w-2xl font-[var(--font-heading)] text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              Authentic beauty, curated with intention.
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              GleamCare is a Nairobi-based beauty store focused on genuine
              skincare, Korean beauty, and everyday personal care. We serve both
              retail and bulk clients with nationwide delivery and fast WhatsApp
              support.
            </p>

            <div className="flex flex-wrap gap-2">
              <Pill
                icon={<ShieldCheck className="h-3.5 w-3.5" />}
                label="Genuine products"
              />
              <Pill
                icon={<PackageCheck className="h-3.5 w-3.5" />}
                label="Retail and bulk"
              />
              <Pill
                icon={<Truck className="h-3.5 w-3.5" />}
                label="Delivery across Kenya"
              />
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <Button asChild className="rounded-full px-8">
                <Link href="/shop">Shop collection</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Order on WhatsApp
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border bg-muted">
              <div className="relative aspect-[4/5] sm:aspect-[16/12]">
                <Image
                  src="/images/about/about-hero.jpg"
                  alt="GleamCare Kenya - genuine skincare and beauty products"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
          <Metric value="Genuine Only" label="Authenticity standard" />
          <Metric value="Nairobi CBD" label="Physical location" />
          <Metric value="Kenya-wide" label="Delivery coverage" />
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            What makes GleamCare different
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            We combine clean curation with practical service, so shopping feels
            confident, not overwhelming.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ValueCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Authenticity first"
            body="Every product we list is selected with sourcing quality in mind to reduce counterfeit risk."
          />
          <ValueCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Curated selection"
            body="From routine staples to trend-led drops, we stock what works for real skin goals."
          />
          <ValueCard
            icon={<MessageCircleMore className="h-5 w-5" />}
            title="Fast support"
            body="WhatsApp-based ordering and confirmation keeps communication quick and clear."
          />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:col-span-5">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            Built for real routines
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            We focus on products people use consistently: skincare essentials,
            K-Beauty favorites, cosmetics, and personal care.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              Cleansers, moisturizers, SPF, serums, and treatment essentials.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              Korean skincare picks curated for consistency and results.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              Daily beauty and personal care items for complete routines.
            </li>
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border bg-muted sm:col-span-2">
            <div className="relative aspect-[16/8]">
              <Image
                src="/images/about/about-skincare.jpg"
                alt="Genuine skincare and beauty essentials in Kenya"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border bg-muted">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/about/about-kbeauty.jpg"
                alt="Korean skincare products available at GleamCare"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <Card className="rounded-2xl border bg-card p-6">
            <h3 className="font-[var(--font-heading)] text-2xl tracking-tight">
              Retail and bulk support
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Whether you are buying for personal use, salon inventory, or
              resale, we can guide availability and quantity planning.
            </p>
            <div className="mt-5">
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Request bulk pricing
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Store location
          </div>
          <h3 className="mt-3 font-[var(--font-heading)] text-2xl tracking-tight">
            Nairobi CBD
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Mithoo Business Centre, Moi Avenue, opposite the Bazaar, Nairobi.
            Visit us for walk-in shopping or arrange pickup via WhatsApp.
          </p>
          <div className="mt-5">
            <MapsEmbedCard />
          </div>
          <Button asChild variant="outline" className="mt-5 w-full rounded-full">
            <Link href={MAPS_URL} target="_blank" rel="noreferrer">
              Open in Google Maps
            </Link>
          </Button>
        </Card>

        <Card className="rounded-3xl border bg-gradient-to-br from-card to-muted/50 p-6 sm:p-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Delivery and fulfillment
            </p>
            <h3 className="font-[var(--font-heading)] text-2xl tracking-tight">
              Nationwide delivery, clean process
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We confirm stock quickly, coordinate delivery details, and support
              both single-item and multi-item orders.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {[
              "Share your order through website checkout or WhatsApp.",
              "Receive confirmation on availability and pricing.",
              "We finalize delivery and dispatch details with you.",
            ].map((step, idx) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-2xl border bg-background/70 p-4"
              >
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold">
                  {idx + 1}
                </div>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>

          <Button asChild className="mt-6 w-full rounded-full">
            <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </Link>
          </Button>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Quick answers about authenticity, delivery, and ordering.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border bg-card px-2 sm:px-4"
        >
          <AccordionItem value="auth">
            <AccordionTrigger className="text-left">
              Do you sell genuine products?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Yes. GleamCare focuses on genuine skincare, beauty, and personal
              care products, including Korean skincare.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="delivery">
            <AccordionTrigger className="text-left">
              Do you deliver outside Nairobi?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Yes. We deliver across Kenya. Share your location and we will
              confirm options and timing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bulk">
            <AccordionTrigger className="text-left">
              Do you support bulk orders?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Yes. We support bulk purchasing for resellers, salons, and
              quantity buyers. Contact us for availability and pricing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-order">
            <AccordionTrigger className="text-left">
              How do I place an order?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Add items to cart and checkout, or order directly via WhatsApp
              for quick confirmation and support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="overflow-hidden rounded-3xl border bg-gradient-to-r from-primary/10 via-secondary/30 to-background p-7 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="space-y-3">
            <h2 className="font-[var(--font-heading)] text-3xl tracking-tight sm:text-4xl">
              Ready to build your next routine?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore curated products or message us directly for personalized
              recommendations and order support.
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
