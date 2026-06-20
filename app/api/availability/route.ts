import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const date = searchParams.get('date');
  if (!productId || !date) return NextResponse.json({ error: 'Missing productId or date' }, { status: 400 });
  try {
    const { checkAvailability } = await import('@/lib/bookings');
    const available = await checkAvailability(Number(productId), date);
    return NextResponse.json({ available });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json({ available: true, warning: 'Could not verify against database' });
  }
}
