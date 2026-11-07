// src/lib/promotions.ts
import * as React from "react";

// Kenya time (UTC+3). The site is a static export, so these dates are checked
// in the browser: regular prices return on 1 December without a redeploy.
const PROMO_STARTS_AT = Date.parse("2026-11-01T00:00:00+03:00");
const PROMO_ENDS_AT = Date.parse("2026-12-01T00:00:00+03:00");
const PROMO_PERCENT_OFF = 15;
const PROMO_LABEL = `${PROMO_PERCENT_OFF}% off`;

const BUILD_TIME = Number(process.env.NEXT_PUBLIC_BUILD_TIME);

type PromoItem = {
  category?: string;
};

type PricedItem = PromoItem & {
  priceKes: number;
  compareAtKes?: number;
  saleTag?: string;
};

export function isPromoActive(now = Date.now()) {
  return now >= PROMO_STARTS_AT && now < PROMO_ENDS_AT;
}

// Body care and fragrance (perfume oils and body mists) are excluded. Items
// with no known category stay at the regular price.
export function isPromoEligible({ category }: PromoItem) {
  const normalized = category?.trim().toLowerCase();
  if (!normalized) return false;
  return normalized !== "body care" && normalized !== "fragrance";
}

// `priceKes` is always the regular price; this returns what the customer pays.
export function getPriceKes(item: PricedItem, promoActive = isPromoActive()) {
  if (!promoActive || !isPromoEligible(item)) return item.priceKes;
  return Math.round((item.priceKes * (100 - PROMO_PERCENT_OFF)) / 100);
}

export function getDisplayPricing(item: PricedItem, promoActive: boolean) {
  if (!promoActive || !isPromoEligible(item)) {
    return {
      priceKes: item.priceKes,
      compareAtKes: item.compareAtKes,
      saleTag: item.saleTag,
    };
  }

  return {
    priceKes: getPriceKes(item, true),
    compareAtKes: item.priceKes,
    saleTag: PROMO_LABEL,
  };
}

function subscribeToClock(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}

export function usePromoActive() {
  return React.useSyncExternalStore(
    subscribeToClock,
    () => isPromoActive(),
    // Must match the prerendered HTML during hydration.
    () => isPromoActive(BUILD_TIME)
  );
}
