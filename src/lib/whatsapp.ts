// src/lib/whatsapp.ts
import type { CartItem } from "@/store/cart";
import { formatKes } from "@/lib/money";

type CheckoutDetails = {
  name: string;
  phone: string;
  location: string;
  notes?: string;
};

export const ORDER_CONTACT_NUMBER = "254729702701";

function buildOrderMessage(args: {
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
    const label = item.brand ? `${item.brand} - ${item.title}` : item.title;
    lines.push(`- ${label} x${item.qty} - ${formatKes(item.priceKes * item.qty)}`);
  }

  lines.push("");
  lines.push(`Subtotal: ${formatKes(subtotalKes)}`);
  lines.push("");
  lines.push("Please confirm availability and delivery details. Asante.");

  return lines.join("\n");
}

function compact(v: string) {
  return v.replace(/\s+/g, " ").trim();
}

function buildSmsOrderMessage(args: {
  items: CartItem[];
  details: CheckoutDetails;
  subtotalKes: number;
}) {
  const { items, details, subtotalKes } = args;
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  const itemLines = items.map((item) => {
    const label = compact(item.brand ? `${item.brand} ${item.title}` : item.title);
    const itemTotal = formatKes(item.priceKes * item.qty);
    return `- ${label} x${item.qty} (${itemTotal})`;
  });

  const lines = [
    "GleamCare Order",
    `Name: ${compact(details.name)}`,
    `Phone: ${compact(details.phone)}`,
    `Location: ${compact(details.location)}`,
    `Items (${itemCount}):`,
    ...itemLines,
    `Subtotal: ${formatKes(subtotalKes)}`,
  ];

  if (details.notes?.trim()) {
    lines.push(`Notes: ${compact(details.notes)}`);
  }

  const message = lines.join("\n");
  return message.length > 435 ? `${message.slice(0, 432)}...` : message;
}

export function buildWhatsAppOrderUrl(args: {
  items: CartItem[];
  details: CheckoutDetails;
  subtotalKes: number;
}) {
  const text = encodeURIComponent(buildOrderMessage(args));
  return `https://wa.me/${ORDER_CONTACT_NUMBER}?text=${text}`;
}

export function buildSmsOrderUrl(args: {
  items: CartItem[];
  details: CheckoutDetails;
  subtotalKes: number;
}) {
  const text = encodeURIComponent(buildSmsOrderMessage(args));
  return `sms:+${ORDER_CONTACT_NUMBER}?body=${text}`;
}

export function getOrderCallUrl() {
  return `tel:+${ORDER_CONTACT_NUMBER}`;
}
