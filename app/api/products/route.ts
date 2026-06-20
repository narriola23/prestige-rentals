import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const { getActiveProducts } = await import('@/lib/products');
    const products = await getActiveProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ products: [], error: 'Database not available' }, { status: 200 });
  }
}
