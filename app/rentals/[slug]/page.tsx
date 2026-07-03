import { notFound } from "next/navigation";
import Link from "next/link";
import AvailabilitySearchWidget from "@/components/AvailabilitySearchWidget";

export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
  try {
    const { getProductBySlug } = await import('@/lib/products');
    return await getProductBySlug(slug);
  } catch { return null; }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) { notFound(); }
  const gallery = [
    product.image_url || ("https://picsum.photos/seed/" + product.slug + "/800/500"),
    ("https://picsum.photos/seed/" + product.slug + "b/800/500"),
    ("https://picsum.photos/seed/" + product.slug + "c/800/500"),
  ];
  return (
    <div className="min-h-screen bg-gray-50">
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
            <div className="grid grid-cols-3 gap-3">
              {gallery.slice(1).map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden h-24 shadow">
                  <img src={img} alt={product.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div>
            {product.category && <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{product.category}</span>}
            <h1 className="text-3xl sm:text-4xl font-black text-blue-950 mt-3 mb-4">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
