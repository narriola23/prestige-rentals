import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";
import type { Product } from "@/lib/products";
import { calculateDeliveryFee } from "@/lib/delivery-fee";

export const dynamic = "force-dynamic";

interface SearchParams {
  start?: string;
  end?: string;
  zip?: string;
  product?: string;
}

async function getResults(start: string, end: string, zip: string) {
  try {
    const { isZipServiceable, getAvailableProducts } = await import("@/lib/availability");
    const serviceable = await isZipServiceable(zip);
    if (!serviceable) return { serviceable: false as const, products: [] as Product[] };
    const products = await getAvailableProducts({ startDate: start, endDate: end, zip });
    return { serviceable: true as const, products };
  } catch (error) {
    console.error("Availability lookup error:", error);
    return { serviceable: true as const, products: [] as Product[] };
  }
}

function shiftDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default async function AvailabilityPage({ searchParams }: { searchParams: SearchParams }) {
  const { start, end, zip, product: presetProduct } = searchParams;
  const hasFullSearch = !!(start && zip);
  const effectiveEnd = end || start;

  let serviceable = true;
  let products: Product[] = [];
  if (hasFullSearch && start && effectiveEnd && zip) {
    const result = await getResults(start, effectiveEnd, zip);
    serviceable = result.serviceable;
    products = result.products;
  }

  const deliveryFee = hasFullSearch && serviceable && zip ? calculateDeliveryFee(zip) : null;

  const pinnedProduct = presetProduct ? products.find((p) => p.slug === presetProduct) : undefined;
  const restProducts = pinnedProduct ? products.filter((p) => p.slug !== presetProduct) : products;
  const orderedProducts = pinnedProduct ? [pinnedProduct, ...restProducts] : restProducts;

  const nearbyDates = hasFullSearch && start
    ? [-2, -1, 1, 2].map((offset) => ({
        start: shiftDate(start, offset),
        end: shiftDate(effectiveEnd!, offset),
        label: formatDate(shiftDate(start, offset)),
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-950 text-white py-14 text-center">
        <div className="inline-block bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Check Availability
        </div>
        <h1 className="text-4xl font-black mb-3">
          {hasFullSearch ? "Available Inflatables for Your Date" : "Find What's Available"}
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Tell us your dates and delivery ZIP — we'll show you only what's actually available.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="max-w-2xl mx-auto -mt-20">
          <AvailabilitySearchWidget
            presetStart={start}
            presetEnd={end}
            presetZip={zip}
            presetProductSlug={presetProduct}
          />
        </div>

        {!hasFullSearch && (
          <p className="text-center text-gray-500">Enter your dates and ZIP above to see availability.</p>
        )}

        {hasFullSearch && !serviceable && (
          <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100 max-w-xl mx-auto">
            <div className="text-5xl mb-4">📍</div>
            <h2 className="text-xl font-black text-blue-950 mb-2">We Don&apos;t Currently Deliver to {zip}</h2>
            <p className="text-gray-600 mb-6">
              We&apos;re always expanding our service area — text us and we&apos;ll let you know if that changes, or get a quote and we may still be able to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="sms:+18327161836" className="btn-primary inline-block">💬 Text Us</a>
              <Link href="/quote" className="btn-secondary inline-block">Get a Quote</Link>
            </div>
          </div>
        )}

        {hasFullSearch && serviceable && orderedProducts.length === 0 && (
          <div className="text-center py-12 bg-blue-50 rounded-2xl border border-blue-100 max-w-xl mx-auto">
            <div className="text-5xl mb-4">🗓️</div>
            <h2 className="text-xl font-black text-blue-950 mb-2">Nothing Available for That Date</h2>
            <p className="text-gray-600 mb-6">
              Everything&apos;s booked for {formatDate(start!)}
              {effectiveEnd !== start ? " – " + formatDate(effectiveEnd!) : ""}. Try a nearby date, or reach out and we&apos;ll help you find something.
            </p>
            {nearbyDates.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {nearbyDates.map((d) => (
                  <Link
                    key={d.start}
                    href={"/availability?start=" + d.start + "&end=" + d.end + "&zip=" + zip + (presetProduct ? "&product=" + presetProduct : "")}
                    className="bg-white border border-gray-200 hover:border-yellow-400 text-blue-950 font-semibold px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    Try {d.label}
                  </Link>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="sms:+18327161836" className="btn-primary inline-block">💬 Text Us</a>
              <Link href="/quote" className="btn-secondary inline-block">Get a Quote</Link>
            </div>
          </div>
        )}

        {hasFullSearch && serviceable && deliveryFee && (
          <div className="max-w-xl mx-auto text-center -mt-6">
            <span className={"inline-block text-sm font-semibold px-4 py-2 rounded-full " + (deliveryFee.feeCents > 0 ? "bg-blue-50 text-blue-800 border border-blue-100" : "bg-green-50 text-green-800 border border-green-100")}>
              {deliveryFee.feeCents > 0
                ? "🚚 Delivery to " + zip + ": $" + (deliveryFee.feeCents / 100).toFixed(2)
                : "🚚 Free delivery to " + zip}
            </span>
          </div>
        )}

        {hasFullSearch && serviceable && orderedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-blue-950 mb-8 text-center">
              {orderedProducts.length} Available for {formatDate(start!)}
              {effectiveEnd !== start ? " – " + formatDate(effectiveEnd!) : ""}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {orderedProducts.map((p) => (
                <div key={p.id} className={"card overflow-hidden group" + (p.slug === presetProduct ? " ring-2 ring-yellow-400" : "")}>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.image_url || "https://picsum.photos/seed/" + p.slug + "/600/400"}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-yellow-500 text-blue-950 font-bold px-3 py-1.5 rounded-full text-sm shadow">
                      {"$" + (p.base_price / 100).toFixed(0) + "/day"}
                    </div>
                    {p.slug === presetProduct && (
                      <div className="absolute top-3 left-3 bg-blue-950 text-yellow-400 font-bold px-3 py-1 rounded-full text-xs shadow">
                        Your Pick
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-blue-950 text-lg mb-1">{p.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.description}</p>
                    <Link
                      href={"/checkout?product=" + p.slug + "&start=" + start + "&end=" + effectiveEnd + "&zip=" + zip}
                      className="btn-primary text-sm w-full text-center block"
                    >
                      Book This Unit →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
