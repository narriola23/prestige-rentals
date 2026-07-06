import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const cities = [
  "houston", "katy", "sugar-land", "pearland", "cypress", "spring",
  "the-woodlands", "humble", "conroe", "tomball", "jersey-village", "klein",
];

const packages = [
  "backyard-birthday", "summer-water-slide", "school-church", "toddler", "large-event",
];

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/rentals", priority: 0.9, changeFrequency: "weekly" },
  { path: "/rentals/bounce-houses", priority: 0.8, changeFrequency: "weekly" },
  { path: "/rentals/water-slides", priority: 0.8, changeFrequency: "weekly" },
  { path: "/rentals/combo-units", priority: 0.6, changeFrequency: "weekly" },
  { path: "/rentals/obstacle-courses", priority: 0.6, changeFrequency: "weekly" },
  { path: "/rentals/party-rentals", priority: 0.6, changeFrequency: "weekly" },
  { path: "/rentals/tables-chairs", priority: 0.7, changeFrequency: "weekly" },
  { path: "/rentals/concessions", priority: 0.6, changeFrequency: "weekly" },
  { path: "/packages", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service-areas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/availability", priority: 0.9, changeFrequency: "weekly" },
  { path: "/quote", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/policies/cancellation", priority: 0.3, changeFrequency: "yearly" },
  { path: "/policies/rain", priority: 0.3, changeFrequency: "yearly" },
  { path: "/policies/safety", priority: 0.3, changeFrequency: "yearly" },
  { path: "/policies/rental-agreement", priority: 0.3, changeFrequency: "yearly" },
  { path: "/policies/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/policies/terms", priority: 0.2, changeFrequency: "yearly" },
];

async function getProductSlugs(): Promise<string[]> {
  try {
    const { getActiveProducts } = await import("@/lib/products");
    const products = await getActiveProducts();
    return products.map((p) => p.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productSlugs = await getProductSlugs();
  const now = new Date();

  return [
    ...staticRoutes.map((r) => ({
      url: SITE_URL + r.path,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...cities.map((slug) => ({
      url: SITE_URL + "/service-areas/" + slug,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...packages.map((slug) => ({
      url: SITE_URL + "/packages/" + slug,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...productSlugs.map((slug) => ({
      url: SITE_URL + "/rentals/" + slug,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
