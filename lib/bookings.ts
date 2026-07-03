import { query, queryOne } from './db';

// Legacy single-date check, superseded by checkDateRangeAvailability in
// lib/availability.ts. Left in place — only the retired app/book flow uses it.
export async function checkAvailability(productId: number, date: string): Promise<boolean> {
  const bookingConflict = await queryOne(
    "SELECT id FROM bookings WHERE product_id = $1 AND event_date = $2 AND status NOT IN ('cancelled') LIMIT 1",
    [productId, date]
  );
  if (bookingConflict) return false;
  const blockConflict = await queryOne(
    'SELECT id FROM product_availability_blocks WHERE product_id = $1 AND blocked_date = $2 LIMIT 1',
    [productId, date]
  );
  if (blockConflict) return false;
  return true;
}

function numberOfDays(startDate: string, endDate: string): number {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  return Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
}

export async function createBooking(data: {
  fullName: string; phone: string; email: string; productId: string;
  startDate: string; endDate: string; startTime: string; endTime: string;
  deliveryAddress: string; city: string; state: string; zipCode: string; notes: string;
  paymentType: 'deposit' | 'full';
}): Promise<{ bookingId: number; bookingNumber: string }> {
  let customer = await queryOne<{ id: number }>('SELECT id FROM customers WHERE email = $1', [data.email]);
  if (!customer) {
    const rows = await query<{ id: number }>(
      'INSERT INTO customers (full_name, phone, email) VALUES ($1, $2, $3) RETURNING id',
      [data.fullName, data.phone, data.email]
    );
    customer = rows[0];
  }
  const product = await queryOne<{ base_price: number; deposit_amount: number }>(
    'SELECT base_price, deposit_amount FROM products WHERE id = $1', [data.productId]
  );
  if (!product) throw new Error('Product not found');
  const numDays = numberOfDays(data.startDate, data.endDate);
  const subtotal = product.base_price * numDays;
  const depositDue = product.deposit_amount;
  const balanceDue = data.paymentType === 'full' ? 0 : subtotal - depositDue;
  const bookingNumber = 'PR-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
  const rows = await query<{ id: number }>(
    `INSERT INTO bookings (
      booking_number, customer_id, product_id, event_date, end_date, start_time, end_time,
      delivery_address, city, state, zip_code, status, subtotal, deposit_due, balance_due, notes, payment_type
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
    RETURNING id`,
    [
      bookingNumber, customer!.id, data.productId, data.startDate, data.endDate, data.startTime, data.endTime,
      data.deliveryAddress, data.city, data.state, data.zipCode, 'pending_payment', subtotal, depositDue, balanceDue,
      data.notes || '', data.paymentType,
    ]
  );
  return { bookingId: rows[0].id, bookingNumber };
}

export async function getBookingByNumber(bookingNumber: string) {
  return queryOne(`
    SELECT b.*, c.full_name AS customer_name, c.email AS customer_email, c.phone AS customer_phone, p.name AS product_name
    FROM bookings b
    JOIN customers c ON b.customer_id = c.id
    JOIN products p ON b.product_id = p.id
    WHERE b.booking_number = $1
  `, [bookingNumber]);
}

export async function getAllBookingsWithDetails() {
  return query(`
    SELECT b.*, c.full_name AS customer_name, c.email AS customer_email, c.phone AS customer_phone, p.name AS product_name
    FROM bookings b
    JOIN customers c ON b.customer_id = c.id
    JOIN products p ON b.product_id = p.id
    ORDER BY b.created_at DESC
  `);
}
