// src/app/checkout/page.tsx
import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | GleamCare",
  description:
    "Checkout on GleamCare. Submit your details and place your order via WhatsApp. Delivery available across Kenya.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
