import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prestige Rentals | Premium Bounce House Rentals in Houston, TX",
  description: "Houston's premier bounce house and inflatable rental company. Book online for birthdays, parties, and events across the greater Houston area.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Prestige Rentals",
  description: "Bounce house and inflatable rentals serving Houston, TX and Greater Houston.",
  telephone: "+13462443261",
  email: "info@prestigerentalshouston.com",
  url: SITE_URL,
  areaServed: {
    "@type": "State",
    name: "Texas",
  },
  openingHours: "Mo-Su 07:00-20:00",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
