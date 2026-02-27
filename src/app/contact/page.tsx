// src/app/contact/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FullBleed } from "@/components/layout/full-bleed";
import { Card } from "@/components/ui/card";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us | GleamCare",
  description:
    "Get in touch with GleamCare for product inquiries, bulk orders, and delivery across Kenya. Visit us in Nairobi or contact us via WhatsApp.",
};

const WHATSAPP_URL = "https://wa.me/254729702701";
const MAPS_URL = "https://maps.app.goo.gl/xVn1amTSzcKZ1Cj19";

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <FullBleed>
        <section className="relative overflow-hidden border-y bg-gradient-to-br from-card via-background to-muted/35">
          <div className="absolute inset-0">
            <Image
              src="/images/home/hero-premium.jpg"
              alt="Contact GleamCare"
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
                  Contact Us
                </Badge>
                <h1 className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                  Reach us fast for orders, support, and inquiries.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We support retail and bulk customers across Kenya. Most orders
                  are confirmed quickly on WhatsApp for speed and clarity.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    WhatsApp support
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Bulk inquiries
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Nairobi location
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                <Button asChild className="w-full rounded-full px-8 lg:w-auto">
                  <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    Chat on WhatsApp
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full px-8 lg:w-auto"
                >
                  <Link href={MAPS_URL} target="_blank" rel="noreferrer">
                    Open map
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </FullBleed>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border bg-card p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-primary">
            <MessageCircle className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-xl">WhatsApp orders</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Fastest way to place orders, confirm stock, and arrange delivery.
          </p>
          <Button asChild className="mt-4 rounded-full px-6">
            <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Start chat
            </Link>
          </Button>
        </Card>

        <Card className="rounded-2xl border bg-card p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-primary">
            <Phone className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-xl">Phone contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            +254 729 702 701
            <br />
            Beauty, cosmetics, and personal care support.
          </p>
          <Button asChild variant="outline" className="mt-4 rounded-full px-6">
            <Link href="tel:+254729702701">Call now</Link>
          </Button>
        </Card>

        <Card className="rounded-2xl border bg-card p-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-primary">
            <Clock3 className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-xl">Support timing</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Message anytime. We respond as quickly as possible and prioritize
            active orders and delivery requests.
          </p>
          <Button asChild variant="ghost" className="mt-4 rounded-full px-6">
            <Link href="/faqs">Read FAQs</Link>
          </Button>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Store location
          </div>
          <h3 className="mt-3 text-2xl">Visit us in Nairobi CBD</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Mithoo Business Centre, along Moi Avenue, opposite the Bazaar,
            Nairobi Area, Kenya.
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
          <h3 className="text-2xl">How we handle requests</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We keep communication clear from inquiry to delivery confirmation.
          </p>

          <div className="mt-5 space-y-3">
            {[
              "Share products you need and your location.",
              "We confirm stock, pricing, and delivery options.",
              "You receive dispatch and final confirmation details.",
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

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button asChild className="rounded-full">
              <Link href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                WhatsApp us
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/shop">Browse products</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
