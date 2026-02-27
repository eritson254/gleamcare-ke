// src/app/faqs/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FullBleed } from "@/components/layout/full-bleed";

export const metadata = {
  title: "FAQs | GleamCare",
  description:
    "Find answers to common questions about GleamCare products, orders, delivery, authenticity, and returns.",
};

const FAQS: Array<{ value: string; q: string; a: string }> = [
  {
    value: "auth",
    q: "Are your products genuine?",
    a: "Yes. GleamCare focuses on authentic skincare, beauty, and personal care products sourced with quality in mind.",
  },
  {
    value: "delivery",
    q: "Do you deliver outside Nairobi?",
    a: "Yes. We deliver across Kenya. Delivery options and timing are confirmed on WhatsApp during checkout.",
  },
  {
    value: "shipping-fee",
    q: "How is shipping charged?",
    a: "Shipping depends on your location and order size. We share the final total, including delivery, before dispatch.",
  },
  {
    value: "free-shipping",
    q: "Do you offer free shipping?",
    a: "Eligible orders above KES 5,000 may qualify for free shipping depending on delivery area.",
  },
  {
    value: "bulk",
    q: "Can I place a bulk order?",
    a: "Yes. We support bulk purchasing for resellers, salons, and quantity buyers. Contact us on WhatsApp for availability and pricing.",
  },
  {
    value: "order-flow",
    q: "How does checkout work?",
    a: "Add products to cart, proceed to checkout, then submit your details. WhatsApp opens with your order summary for confirmation.",
  },
  {
    value: "payment",
    q: "How do I pay?",
    a: "Payment instructions are confirmed during order verification on WhatsApp after stock and delivery details are finalized.",
  },
  {
    value: "returns",
    q: "What is your return policy?",
    a: "Returns are accepted for unopened items in original condition. If you receive a damaged or incorrect item, contact us within 24 hours.",
  },
  {
    value: "out-of-stock",
    q: "What if an item becomes unavailable?",
    a: "If stock changes after your order request, we will offer alternatives or adjust your order before payment confirmation.",
  },
  {
    value: "routine-help",
    q: "Can you help me choose products for my routine?",
    a: "Yes. Message us on WhatsApp and we can recommend options based on your skin concerns, goals, and budget.",
  },
  {
    value: "store-location",
    q: "Do you have a physical store?",
    a: "Yes. We are located at Mithoo Business Centre, Moi Avenue, Nairobi CBD, opposite the Bazaar.",
  },
  {
    value: "support-hours",
    q: "When can I contact support?",
    a: "You can message us anytime. We respond as quickly as possible and prioritize active order requests.",
  },
];

export default function FaqsPage() {
  return (
    <div className="space-y-10">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="GleamCare FAQs"
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
                  Help Center
                </Badge>
                <h1 className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  Answers to the questions we get most.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Everything you need to know about authenticity, delivery,
                  returns, bulk ordering, and WhatsApp checkout at GleamCare.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    Orders
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Delivery
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Authenticity
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Returns
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href="https://wa.me/254729702701" target="_blank" rel="noreferrer">
                    WhatsApp support
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full px-8 lg:w-auto"
                >
                  <Link href="/contact">Contact page</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      <section className="rounded-3xl border bg-gradient-to-r from-card via-muted/35 to-background p-5 sm:p-6">
        <h2 className="text-2xl sm:text-3xl">Frequently asked questions</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          If your question is not listed, message us directly and we will help.
        </p>
      </section>

      <section className="rounded-3xl border bg-card p-2 sm:p-4">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((item) => (
            <AccordionItem key={item.value} value={item.value} className="px-3 sm:px-4">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
