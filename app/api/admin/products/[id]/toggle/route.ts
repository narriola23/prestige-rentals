import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { is_active } = await request.json();
    const { query } = await import('@/lib/db');
    await query('UPDATE products SET is_active = $1 WHERE id = $2', [is_active, params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Toggle product error:', error);
    return NextResponse.json({ error: 'Failed to toggle product' }, { status: 500 });
  }
}
