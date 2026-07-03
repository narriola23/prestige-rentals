import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { getStripe } = await import('@/lib/stripe');
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature || '', webhookSecret);
  } catch (error: any) {
    console.error('Stripe webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const { query } = await import('@/lib/db');

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as { id: string };
    await query(
      `UPDATE bookings SET
        status = 'confirmed',
        payment_status = 'paid',
        deposit_paid = true,
        paid_at = NOW(),
        balance_due = CASE WHEN payment_type = 'full' THEN 0 ELSE balance_due END
      WHERE stripe_payment_intent_id = $1`,
      [intent.id]
    );
  } else if (event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object as { id: string };
    await query(
      `UPDATE bookings SET payment_status = 'failed' WHERE stripe_payment_intent_id = $1`,
      [intent.id]
    );
  }

  return NextResponse.json({ received: true });
}
