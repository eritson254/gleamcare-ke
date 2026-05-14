export const siteConfig = {
  name: "GleamCare",
  legalName: "GleamCare Kenya",
  url: "https://gleamcare.ke",
  description:
    "Authentic skincare, Korean beauty, cosmetics, body care, and fragrance in Kenya with WhatsApp ordering and Kenya-wide delivery.",
  locale: "en_KE",
  country: "KE",
  currency: "KES",
  phone: "+254729702701",
  whatsappUrl: "https://wa.me/254729702701",
  logo: "/brand/logo.png",
  defaultImage: "/images/home/hero-premium.jpg",
  freeShippingThresholdKes: 12000,
  address: {
    streetAddress: "Mithoo Business Centre, First Floor, Shop F08, Moi Avenue",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE",
  },
  geo: {
    latitude: -1.2817526,
    longitude: 36.8192313,
  },
  mapUrl: "https://maps.app.goo.gl/xVn1amTSzcKZ1Cj19",
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(normalized, siteConfig.url);
  const lastSegment = url.pathname.split("/").filter(Boolean).at(-1) ?? "";
  const hasFileExtension = /\.[a-z0-9]+$/i.test(lastSegment);

  if (!hasFileExtension && url.pathname !== "/" && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}
