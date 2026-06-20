import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const { getActiveProducts } = await import('@/lib/products');
    return await getActiveProducts();
  } catch {
    return [];
  }
}

export default async function RentalsPage() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-950 text-white py-14 text-center">
        <h1 className="text-4xl font-black mb-2">Our Inflatables</h1>
        <p className="text-gray-300 text-lg">Houston's best bounce houses, combos, and water slides</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">🏰</div>
            <p className="text-xl font-semibold mb-2">No inflatables loaded yet.</p>
            <p className="text-sm">Run the seed script to populate products, or <Link href="/contact" className="text-yellow-600 underline">contact us</Link> directly.</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div key={product.id} className="card overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img src={product.image_url || ("https://picsum.photos/seed/" + product.slug + "/600/400")} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-yellow-500 text-blue-950 font-bold px-3 py-1.5 rounded-full text-sm shadow">{"$" + (product.base_price / 100).toFixed(0) + "/day"}</div>
                {product.category && <div className="absolute top-3 left-3 bg-blue-950 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">{product.category}</div>}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-blue-950 text-lg mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  {product.capacity && <span>{"👥 Up to " + product.capacity + " kids"}</span>}
                  {product.length_ft && product.width_ft && <span>{"📐 " + product.length_ft + "' × " + product.width_ft + "'"}</span>}
                </div>
                <Link href={"/rentals/" + product.slug} className="btn-secondary text-sm w-full text-center block">View Details →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
