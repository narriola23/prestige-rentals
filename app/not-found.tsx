import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center text-white">
      <div className="text-center px-4">
        <div className="text-8xl font-black text-yellow-400 mb-4">404</div>
        <h1 className="text-3xl font-black mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/rentals" className="btn-secondary">Browse Inflatables</Link>
        </div>
      </div>
    </div>
  );
}
