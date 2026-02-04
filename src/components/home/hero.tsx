// src/components/home/hero.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative">
      <div className="relative h-[68vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="GleamCare beauty essentials"
          fill
          priority
          className="object-cover"
        />

        {/* Very light overlay */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/30" />

        <div className="absolute inset-0">
          <div
            className="
              mx-auto flex h-full max-w-6xl px-4 sm:px-6
              items-end pb-16
              md:items-center md:pb-0
            "
          >
            {/* 
              Mobile: centered horizontally, pushed down
              Desktop: left-aligned, vertically centered
            */}
            <div className="mx-auto max-w-xl text-center text-white md:mx-0 md:max-w-2xl md:text-left">
              <h1 className="font-[var(--font-sans)] text-3xl font-medium uppercase leading-[1.05] tracking-[0.1em] sm:text-4xl md:text-5xl lg:text-6xl">
                Glow starts with
                <br />
                what you trust.
              </h1>

              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/90 sm:text-base md:mx-0 md:max-w-lg">
                Discover authentic skincare and beauty essentials in Nairobi—
                carefully curated to support healthy, radiant skin.
              </p>

              <div className="mt-8 flex justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="rounded-none bg-white px-10 text-xs font-semibold uppercase tracking-[0.18em] text-black hover:bg-white/90"
                >
                  <Link href="/shop">Shop now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
