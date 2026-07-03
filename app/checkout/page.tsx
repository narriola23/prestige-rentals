import { redirect } from "next/navigation";
import Link from "next/link";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

interface SearchParams {
  product?: string;
  start?: string;
  end?: string;
  zip?: string;
}

export default async function CheckoutPage({ searchParams }: { searchParams: SearchParams }) {
  const { product: slug, start, end, zip } = searchParams;

  if (!slug || !start || !end || !zip) {
    redirect("/availability");
  }

  const { getProductBySlug } = await import("@/lib/products");
  const { isZipServiceable, checkDateRangeAvailability } = await import("@/lib/availability");

  const product = await getProductBySlug(slug!);
  if (!product) {
    redirect("/availability");
  }

  const serviceable = await isZipServiceable(zip!);
  const available = serviceable && (await checkDateRangeAvailability(product!.id, start!, end!));

  if (!serviceable || !available) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="text-5xl mb-4">😔</div>
          <h1 className="text-xl font-black text-blue-950 mb-2">Sorry, That Just Got Booked</h1>
          <p className="text-gray-600 mb-6">
            {product!.name} is no longer available for those dates/ZIP. Let&apos;s find you something else.
          </p>
          <Link href="/availability" className="btn-primary inline-block">← Back to Availability Search</Link>
        </div>
      </div>
    );
  }

  return (
    <CheckoutForm
      product={{
        id: product!.id,
        name: product!.name,
        slug: product!.slug,
        base_price: product!.base_price,
        deposit_amount: product!.deposit_amount,
      }}
      startDate={start!}
      endDate={end!}
      zip={zip!}
    />
  );
}
