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
    const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(346) 244-3261';

    if (!stripe) {
      return NextResponse.json(
        { error: `Payments aren't set up online yet — call us at ${phone} to finish your booking, your dates are already reserved.` },
        { status: 503 }
      );
    }

    const { query, queryOne } = await import('@/lib/db');
    const booking = await queryOne<{ id: number; subtotal: number; deposit_due: number; delivery_fee: number }>(
      'SELECT id, subtotal, deposit_due, delivery_fee FROM bookings WHERE id = $1',
      [bookingId]
    );
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const amount = paymentType === 'full' ? booking.subtotal + booking.delivery_fee : booking.deposit_due;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      // Cards only, by deliberate choice. This excludes Link and the BNPL /
      // alt methods (Klarna, Cash App Pay, Amazon Pay, Affirm) that
      // automatic_payment_methods would otherwise surface, and — because
      // Stripe periodically enables new methods by default — keeps them from
      // reappearing later without a code change. Apple Pay and Google Pay are
      // wallet presentations of a card, so they still show in the
      // PaymentElement on supported devices.
      payment_method_types: ['card'],
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
