import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { bookingId, paymentType } = await request.json();
    if (!bookingId || !paymentType) {
      return NextResponse.json({ error: 'Missing bookingId or paymentType' }, { status: 400 });
    }

    const { getStripe } = await import('@/lib/stripe');
    const stripe = getStripe();
    const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(832) 716-1836';

    if (!stripe) {
      return NextResponse.json(
        { error: `Payments aren't set up online yet — call us at ${phone} to finish your booking, your dates are already reserved.` },
        { status: 503 }
      );
    }

    const { query, queryOne } = await import('@/lib/db');
    const booking = await queryOne<{ id: number; subtotal: number; deposit_due: number }>(
      'SELECT id, subtotal, deposit_due FROM bookings WHERE id = $1',
      [bookingId]
    );
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const amount = paymentType === 'full' ? booking.subtotal : booking.deposit_due;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { bookingId: String(bookingId) },
    });

    await query(
      'UPDATE bookings SET stripe_payment_intent_id = $1, payment_type = $2, amount_charged = $3 WHERE id = $4',
      [paymentIntent.id, paymentType, amount, bookingId]
    );

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Create PaymentIntent error:', error);
    return NextResponse.json({ error: error.message || 'Could not start payment' }, { status: 500 });
  }
}
