export const dynamic = "force-dynamic";
import Link from "next/link";

async function getDashboardStats() {
  try {
    const { query } = await import('@/lib/db');
    const [bookings, products, pending, revenue] = await Promise.all([
      query('SELECT COUNT(*) as count FROM bookings'),
      query('SELECT COUNT(*) as count FROM products WHERE is_active = true'),
      query("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'"),
      query("SELECT COALESCE(SUM(subtotal), 0) as total FROM bookings WHERE status != 'cancelled'"),
    ]);
    return {
      totalBookings: Number(bookings[0]?.count || 0),
      activeProducts: Number(products[0]?.count || 0),
      pendingBookings: Number(pending[0]?.count || 0),
      revenue: Number(revenue[0]?.total || 0),
    };
  } catch { return { totalBookings: 0, activeProducts: 0, pendingBookings: 0, revenue: 0 }; }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-950 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">⭐ Prestige Rentals Admin</h1>
            <p className="text-gray-400 text-sm mt-0.5">Management Dashboard</p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="text-sm text-gray-400 hover:text-white border border-gray-600 px-4 py-2 rounded-lg transition">Log Out</button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Bookings", value: stats.totalBookings, icon: "📅", color: "bg-blue-50 border-blue-200" },
            { label: "Pending Review", value: stats.pendingBookings, icon: "⏳", color: "bg-yellow-50 border-yellow-200" },
            { label: "Active Products", value: stats.activeProducts, icon: "🏰", color: "bg-green-50 border-green-200" },
            { label: "Gross Revenue", value: "$" + (stats.revenue / 100).toFixed(2), icon: "💰", color: "bg-purple-50 border-purple-200" },
          ].map((stat) => (
            <div key={stat.label} className={"bg-white rounded-2xl border p-6 " + stat.color}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-blue-950">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/bookings" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition group">
            <div className="text-3xl mb-3">📋</div>
            <h2 className="text-xl font-black text-blue-950 group-hover:text-yellow-600 transition">Manage Bookings</h2>
            <p className="text-gray-500 text-sm mt-1">View all bookings, update statuses, and manage orders.</p>
            <div className="mt-4 text-yellow-600 font-semibold text-sm">View Bookings →</div>
          </Link>
          <Link href="/admin/inventory" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition group">
            <div className="text-3xl mb-3">🏰</div>
            <h2 className="text-xl font-black text-blue-950 group-hover:text-yellow-600 transition">Manage Inventory</h2>
            <p className="text-gray-500 text-sm mt-1">Add, edit, and toggle availability of your inflatable inventory.</p>
            <div className="mt-4 text-yellow-600 font-semibold text-sm">View Inventory →</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
