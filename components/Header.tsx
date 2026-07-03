"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-950 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-yellow-400 text-2xl font-black tracking-tight">
              ⭐ Prestige Rentals
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/rentals" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">Inflatables</Link>
            <Link href="/faq" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">FAQ</Link>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">Contact</Link>
            <Link href="/book" className="btn-primary text-sm">Book Now</Link>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-blue-900 space-y-3">
            <Link href="/rentals" className="block px-2 py-2 text-gray-300 hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Inflatables</Link>
            <Link href="/faq" className="block px-2 py-2 text-gray-300 hover:text-yellow-400" onClick={() => setMenuOpen(false)}>FAQ</Link>
            <Link href="/contact" className="block px-2 py-2 text-gray-300 hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/book" className="block btn-primary text-center text-sm mt-2" onClick={() => setMenuOpen(false)}>Book Now</Link>
          </div>
        )}
      </div>
    </header>
  );
}
