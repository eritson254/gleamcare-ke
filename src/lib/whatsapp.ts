// src/lib/whatsapp.ts
import type { CartItem } from "@/store/cart";
import { formatKes } from "@/lib/money";

type CheckoutDetails = {
  name: string;
  phone: string;
  location: string;
  notes?: string;
};

const WHATSAPP_NUMBER = "254729702701";

export function buildWhatsAppOrderUrl(args: {
  items: CartItem[];
  details: CheckoutDetails;
  subtotalKes: number;
}) {
  const { items, details, subtotalKes } = args;

  const lines: string[] = [];
  lines.push("GLEAMCARE ORDER");
  lines.push("");
  lines.push(`Name: ${details.name}`);
  lines.push(`Phone: ${details.phone}`);
  lines.push(`Location: ${details.location}`);
  if (details.notes?.trim()) lines.push(`Notes: ${details.notes.trim()}`);
  lines.push("");
  lines.push("Items:");

  for (const item of items) {
    const label = item.brand ? `${item.brand} — ${item.title}` : item.title;
    lines.push(`- ${label} x${item.qty} — ${formatKes(item.priceKes * item.qty)}`);
  }

  lines.push("");
  lines.push(`Subtotal: ${formatKes(subtotalKes)}`);
  lines.push("");
  lines.push("Please confirm availability and delivery details. धन्यवाद/Asante.");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
