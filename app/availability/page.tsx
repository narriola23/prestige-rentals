import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

interface SearchParams {
  start?: string;
  end?: string;
  product?: string;
  zip?: string;
}

async function getResults(start: string, end: string) {
  try {
    const { getAvailableProducts } = await import("@/lib/availability");
    return await getAvailableProducts({ startDate: start, endDate: end });
  } catch (error) {
    console.error("Availability lookup error:", error);
    return [] as Product[];
  }
}

async function checkZipServiceable(zip: string): Promise<boolean> {
  try {
    const { isZipServiceable } = await import("@/lib/availability");
    return await isZipServiceable(zip);
  } catch (error) {
    console.error("ZIP serviceability lookup error:", error);
    return true; // fail open — the booking API still enforces ZIP as a backstop
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
  const { start, end, product: presetProduct, zip } = searchParams;
  const hasFullSearch = !!start;
  const effectiveEnd = end || start;

  // ZIP gates the availability flow: an out-of-area ZIP shows a call/quote
  // prompt instead of results. No delivery fee is calculated or shown here —
  // that happens only at checkout from the full delivery address.
  const serviceable = zip ? await checkZipServiceable(zip) : true;
  const outOfArea = hasFullSearch && !!zip && !serviceable;

  let products: Product[] = [];
  if (hasFullSearch && start && effectiveEnd && !outOfArea) {
    products = await getResults(start, effectiveEnd);
  }

  // Task 4 ordering: inflatables first (most expensive → least), Tables & Chairs last.
  const sortedProducts = [...products].sort((a, b) => {
    const aLast = a.category === "Tables & Chairs" ? 1 : 0;
    const bLast = b.category === "Tables & Chairs" ? 1 : 0;
    if (aLast !== bLast) return aLast - bLast;
    return b.base_price - a.base_price;
  });

  const pinnedProduct = presetProduct ? sortedProducts.find((p) => p.slug === presetProduct) : undefined;
  const restProducts = pinnedProduct ? sortedProducts.filter((p) => p.slug !== presetProduct) : sortedProducts;
  const orderedProducts = pinnedProduct ? [pinnedProduct, ...restProducts] : restProducts;

  const zipParam = zip ? "&zip=" + zip : "";

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
          Tell us your dates — we&apos;ll show you only what&apos;s actually available.
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
          <p className="text-center text-gray-500">Enter your dates and delivery ZIP above to see availability.</p>
        )}

        {outOfArea && (
          <div className="text-center py-12 bg-blue-50 rounded-2xl border border-blue-100 max-w-xl mx-auto">
            <div className="text-5xl mb-4">📍</div>
            <h2 className="text-xl font-black text-blue-950 mb-2">You&apos;re Just Outside Our Standard Area</h2>
            <p className="text-gray-600 mb-6">
              We may still be able to help with your event in {zip}! Give us a call or send us a message and we&apos;ll put together a custom quote for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+13462443261" className="btn-primary inline-block">📞 Call (346) 244-3261</a>
              <Link href="/quote" className="btn-secondary inline-block">✉️ Request a Custom Quote</Link>
            </div>
          </div>
        )}

        {hasFullSearch && !outOfArea && orderedProducts.length === 0 && (
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
                    href={"/availability?start=" + d.start + "&end=" + d.end + zipParam + (presetProduct ? "&product=" + presetProduct : "")}
                    className="bg-white border border-gray-200 hover:border-yellow-400 text-blue-950 font-semibold px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    Try {d.label}
                  </Link>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="sms:+13462443261" className="btn-primary inline-block">💬 Text Us</a>
              <Link href="/quote" className="btn-secondary inline-block">Get a Quote</Link>
            </div>
          </div>
        )}

        {hasFullSearch && !outOfArea && orderedProducts.length > 0 && (
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
                      href={"/checkout?product=" + p.slug + "&start=" + start + "&end=" + effectiveEnd}
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
