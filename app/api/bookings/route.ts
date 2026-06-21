import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventDate, productId, fullName, phone, email, deliveryAddress, city, state, zipCode, startTime, endTime, notes } = body;

    if (!eventDate || !productId || !fullName || !phone || !email || !deliveryAddress || !city || !zipCode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { checkAvailability, createBooking } = await import('@/lib/bookings');

    const available = await checkAvailability(Number(productId), eventDate);
    if (!available) {
      return NextResponse.json({ error: 'This date is no longer available. Please choose another date.' }, { status: 409 });
    }

    const bookingNumber = await createBooking({
      fullName, phone, email, productId, eventDate,
      startTime: startTime || '10:00',
      endTime: endTime || '16:00',
      deliveryAddress, city, state: state || 'TX', zipCode, notes: notes || '',
    });

    return NextResponse.json({ bookingNumber }, { status: 201 });
  } catch (error: any) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create booking' }, { status: 500 });
  }
}
