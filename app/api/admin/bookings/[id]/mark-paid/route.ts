import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { query } = await import('@/lib/db');
    await query(
      `UPDATE bookings SET
        payment_status = 'paid',
        deposit_paid = true,
        paid_at = NOW(),
        status = CASE WHEN status IN ('pending_payment', 'pending') THEN 'confirmed' ELSE status END
      WHERE id = $1`,
      [params.id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mark payment paid error:', error);
    return NextResponse.json({ error: 'Failed to mark payment as paid' }, { status: 500 });
  }
}
