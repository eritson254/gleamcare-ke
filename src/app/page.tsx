// src/app/page.tsx
import { FullBleed } from "@/components/layout/full-bleed";
import { HomeHero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";

export default function HomePage() {
  return (
    <div className="space-y-14">
      <FullBleed>
        <HomeHero />
      </FullBleed>

      <FeaturedProducts />
    </div>
  );
}
