import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const validStatuses = ['pending_payment', 'pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    const { query } = await import('@/lib/db');
    await query('UPDATE bookings SET status = $1 WHERE id = $2', [status, params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update booking status error:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
