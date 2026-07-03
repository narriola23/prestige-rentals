import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      startDate, endDate, productId, fullName, phone, email,
      deliveryAddress, city, state, zipCode, startTime, endTime, notes, paymentType,
    } = body;

    if (!startDate || !endDate || !productId || !fullName || !phone || !email || !deliveryAddress || !city || !zipCode || !paymentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { isZipServiceable, checkDateRangeAvailability } = await import('@/lib/availability');
    const { createBooking } = await import('@/lib/bookings');

    const serviceable = await isZipServiceable(zipCode);
    if (!serviceable) {
      return NextResponse.json({ error: "We don't currently deliver to that ZIP code." }, { status: 409 });
    }

    const available = await checkDateRangeAvailability(Number(productId), startDate, endDate);
    if (!available) {
      return NextResponse.json({ error: 'This date range is no longer available. Please choose different dates.' }, { status: 409 });
    }

    const { bookingId, bookingNumber } = await createBooking({
      fullName, phone, email, productId, startDate, endDate,
      startTime: startTime || '10:00',
      endTime: endTime || '16:00',
      deliveryAddress, city, state: state || 'TX', zipCode, notes: notes || '',
      paymentType,
    });

    return NextResponse.json({ bookingId, bookingNumber }, { status: 201 });
  } catch (error: any) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create booking' }, { status: 500 });
  }
}
