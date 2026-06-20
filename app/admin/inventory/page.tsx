export const dynamic = "force-dynamic";
import Link from "next/link";
import { ToggleProductActive } from "./actions";

async function getProducts() {
  try {
    const { getAllProducts } = await import('@/lib/products');
    return await getAllProducts();
  } catch { return []; }
}

export default async function AdminInventoryPage() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-950 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-white transition">← Dashboard</Link>
          <div><h1 className="text-2xl font-black">Inventory</h1><p className="text-gray-400 text-sm">{products.length} products</p></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center"><div className="text-5xl mb-4">🏰</div><p className="text-gray-500 text-lg">No products. Run the seed script.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <div key={p.id} className={"bg-white rounded-2xl shadow overflow-hidden " + (p.is_active ? "" : "opacity-60")}>
                <div className="relative h-44 overflow-hidden">
                  <img src={p.image_url || ("https://picsum.photos/seed/" + p.slug + "/600/400")} alt={p.name} className="w-full h-full object-cover" />
                  <div className={"absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full " + (p.is_active ? "bg-green-500 text-white" : "bg-gray-400 text-white")}>{p.is_active ? "Active" : "Inactive"}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-blue-950 text-base mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400 mb-2 font-mono">{p.slug}</p>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{p.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                    <span>💰 {"$" + (p.base_price / 100).toFixed(0) + "/day"}</span>
                    <span>🔑 {"Deposit: $" + (p.deposit_amount / 100).toFixed(0)}</span>
                    {p.capacity && <span>{"👥 " + p.capacity + " kids"}</span>}
                    {p.length_ft && <span>{"📐 " + p.length_ft + "' × " + p.width_ft + "'"}</span>}
                  </div>
                  <div className="flex gap-2">
                    <ToggleProductActive productId={p.id} isActive={p.is_active} />
                    <Link href={"/rentals/" + p.slug} target="_blank" className="flex-1 text-center border border-gray-300 text-gray-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition">View Live →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
