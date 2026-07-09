import { query, queryOne } from './db';
import type { Product } from './products';

export interface AvailabilityQuery {
  startDate: string;
  endDate: string;
}

const PENDING_PAYMENT_TTL_INTERVAL = "30 minutes";

export async function isZipServiceable(zip: string): Promise<boolean> {
  const row = await queryOne(
    'SELECT id FROM service_zip_codes WHERE zip_code = $1 AND is_active = true LIMIT 1',
    [zip]
  );
  return !!row;
}

export async function checkDateRangeAvailability(
  productId: number,
  startDate: string,
  endDate: string
): Promise<boolean> {
  const conflict = await queryOne(
    `SELECT id FROM bookings
     WHERE product_id = $1
       AND status NOT IN ('cancelled')
       AND (status != 'pending_payment' OR created_at > NOW() - INTERVAL '${PENDING_PAYMENT_TTL_INTERVAL}')
       AND event_date <= $3::date AND end_date >= $2::date
     LIMIT 1`,
    [productId, startDate, endDate]
  );
  if (conflict) return false;

  const blockConflict = await queryOne(
    `SELECT id FROM product_availability_blocks
     WHERE product_id = $1 AND blocked_date BETWEEN $2::date AND $3::date
     LIMIT 1`,
    [productId, startDate, endDate]
  );
  return !blockConflict;
}

export async function getAvailableProducts(q: AvailabilityQuery): Promise<Product[]> {
  return query<Product>(
    `SELECT p.* FROM products p
     WHERE p.is_active = true
     AND NOT EXISTS (
       SELECT 1 FROM bookings b
       WHERE b.product_id = p.id
         AND b.status NOT IN ('cancelled')
         AND (b.status != 'pending_payment' OR b.created_at > NOW() - INTERVAL '${PENDING_PAYMENT_TTL_INTERVAL}')
         AND b.event_date <= $2::date AND b.end_date >= $1::date
     )
     AND NOT EXISTS (
       SELECT 1 FROM product_availability_blocks bl
       WHERE bl.product_id = p.id AND bl.blocked_date BETWEEN $1::date AND $2::date
     )
     ORDER BY p.name ASC`,
    [q.startDate, q.endDate]
  );
}
