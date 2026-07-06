import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
  try {
    const { getProductBySlug } = await import('@/lib/products');
    return await getProductBySlug(slug);
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} Rental in Houston, TX | Prestige Rentals`,
    description: `Rent ${product.name} in Houston, TX — $${(product.base_price / 100).toFixed(0)}/day. ${product.description || ""} Free delivery within 20 miles, setup and pickup included.`.trim(),
  };
}

async function getGallery(productId: number, fallbackUrl: string | null, slug: string) {
  try {
    const { getProductImages } = await import('@/lib/products');
    const images = await getProductImages(productId);
    if (images.length > 0) return images.map((img) => img.image_url);
  } catch { /* fall through to placeholder */ }
  return [fallbackUrl || ("https://picsum.photos/seed/" + slug + "/800/500")];
}

async function getAddOns() {
  try {
    const { getActiveAddOns } = await import('@/lib/products');
    return await getActiveAddOns();
  } catch { return []; }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) { notFound(); }
  const [gallery, addOns] = await Promise.all([
    getGallery(product.id, product.image_url, product.slug),
    getAddOns(),
  ]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: gallery.map((img) => (img.startsWith("/") ? SITE_URL + img : img)),
    category: product.category || undefined,
    offers: {
      "@type": "Offer",
      url: SITE_URL + "/rentals/" + product.slug,
      priceCurrency: "USD",
      price: (product.base_price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-yellow-600">Home</Link> {" / "}
          <Link href="/rentals" className="hover:text-yellow-600">Inflatables</Link> {" / "}
          <span className="text-blue-950 font-medium">{product.name}</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg mb-4 h-80">
              <img src={gallery[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {gallery.slice(1).map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden h-24 shadow">
                    <img src={img} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {product.category && <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{product.category}</span>}
              {product.wet_dry && <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{product.wet_dry === "Both" ? "Wet or Dry" : product.wet_dry}</span>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-blue-950 mt-3 mb-4">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            {product.special_requirements && (
              <p className="text-xs text-gray-500 mb-6 -mt-4">⚠️ {product.special_requirements}</p>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Daily Rental Rate</span>
                <span className="text-2xl font-black text-blue-950">{"$" + (product.base_price / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Deposit Due at Booking</span>
                <span className="font-semibold text-blue-700">{"$" + (product.deposit_amount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-500">Balance Due at Event</span>
                <span className="font-semibold text-blue-700">{"$" + ((product.base_price - product.deposit_amount) / 100).toFixed(2)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.capacity && <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-2xl mb-1">👥</div><div className="text-xs text-gray-500 uppercase">Capacity</div><div className="font-bold text-blue-950">{"Up to " + product.capacity + " kids"}</div></div>}
              {product.length_ft && product.width_ft && <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-2xl mb-1">📐</div><div className="text-xs text-gray-500 uppercase">Dimensions</div><div className="font-bold text-blue-950">{product.length_ft + "' × " + product.width_ft + "' × " + product.height_ft + "'H"}</div></div>}
              {product.setup_time_minutes && <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-2xl mb-1">⏱️</div><div className="text-xs text-gray-500 uppercase">Setup Time</div><div className="font-bold text-blue-950">{product.setup_time_minutes + " min"}</div></div>}
              <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-2xl mb-1">✅</div><div className="text-xs text-gray-500 uppercase">Includes</div><div className="font-bold text-blue-950">Delivery &amp; Setup</div></div>
            </div>
            <AvailabilitySearchWidget presetProductSlug={product.slug} />
            <p className="text-center text-xs text-gray-400 mt-3">✅ No charge until confirmed • Free cancellation 48hrs prior</p>
            {addOns.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="font-bold text-blue-950 mb-3">Popular Add-Ons</h2>
                <p className="text-xs text-gray-500 mb-3">Ask about adding any of these when you call or message us to book.</p>
                <ul className="space-y-2">
                  {addOns.map((a) => (
                    <li key={a.id} className="flex justify-between items-center text-sm bg-white rounded-lg border border-gray-200 px-4 py-2">
                      <div>
                        <span className="font-semibold text-blue-950">{a.name}</span>
                        {a.description && <span className="text-gray-500"> — {a.description}</span>}
                      </div>
                      <span className="font-bold text-blue-700">{"+$" + (a.price / 100).toFixed(0)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
