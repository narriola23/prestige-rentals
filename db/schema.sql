-- Prestige Rentals Database Schema

CREATE TABLE IF NOT EXISTS products (
  id                    SERIAL PRIMARY KEY,
  name                  VARCHAR(255) NOT NULL,
  slug                  VARCHAR(255) NOT NULL UNIQUE,
  description           TEXT,
  base_price            INTEGER NOT NULL,
  deposit_amount        INTEGER NOT NULL DEFAULT 5000,
  category              VARCHAR(100),
  is_active             BOOLEAN NOT NULL DEFAULT true,
  image_url             TEXT,
  setup_time_minutes    INTEGER DEFAULT 30,
  teardown_time_minutes INTEGER DEFAULT 30,
  capacity              INTEGER,
  length_ft             NUMERIC(5,1),
  width_ft              NUMERIC(5,1),
  height_ft             NUMERIC(5,1),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id         SERIAL PRIMARY KEY,
  full_name  VARCHAR(255) NOT NULL,
  phone      VARCHAR(50),
  email      VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS customers_email_idx ON customers (email);

CREATE TABLE IF NOT EXISTS bookings (
  id               SERIAL PRIMARY KEY,
  booking_number   VARCHAR(50) NOT NULL UNIQUE,
  customer_id      INTEGER NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  product_id       INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  event_date       DATE NOT NULL,
  start_time       TIME,
  end_time         TIME,
  delivery_address TEXT NOT NULL,
  city             VARCHAR(100) NOT NULL,
  state            VARCHAR(10) NOT NULL DEFAULT 'TX',
  zip_code         VARCHAR(20) NOT NULL,
  status           VARCHAR(50) NOT NULL DEFAULT 'pending',
  subtotal         INTEGER NOT NULL,
  deposit_due      INTEGER NOT NULL,
  deposit_paid     BOOLEAN NOT NULL DEFAULT false,
  balance_due      INTEGER NOT NULL,
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS bookings_event_date_idx  ON bookings (event_date);
CREATE INDEX IF NOT EXISTS bookings_product_id_idx  ON bookings (product_id);
CREATE INDEX IF NOT EXISTS bookings_customer_id_idx ON bookings (customer_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx      ON bookings (status);

CREATE TABLE IF NOT EXISTS product_availability_blocks (
  id           SERIAL PRIMARY KEY,
  product_id   INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  blocked_date DATE NOT NULL,
  reason       VARCHAR(255),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, blocked_date)
);

-- Date-range bookings (event_date is the start date; add an end date so
-- multi-day rentals can be represented as a real range instead of a single day)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS end_date DATE;
UPDATE bookings SET end_date = event_date WHERE end_date IS NULL;
ALTER TABLE bookings ALTER COLUMN end_date SET NOT NULL;
CREATE INDEX IF NOT EXISTS bookings_end_date_idx ON bookings (end_date);
CREATE INDEX IF NOT EXISTS bookings_product_daterange_idx ON bookings (product_id, event_date, end_date);

-- Business-wide ZIP delivery whitelist (applies to all products equally)
CREATE TABLE IF NOT EXISTS service_zip_codes (
  id         SERIAL PRIMARY KEY,
  zip_code   VARCHAR(10) NOT NULL UNIQUE,
  city       VARCHAR(100),
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS service_zip_codes_active_idx ON service_zip_codes (is_active);

-- Stripe payment tracking (flat columns on bookings, matching this schema's
-- existing convention of keeping money fields on the booking row itself)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_type VARCHAR(20);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR(30) NOT NULL DEFAULT 'unpaid';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS amount_charged INTEGER;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;
CREATE UNIQUE INDEX IF NOT EXISTS bookings_stripe_pi_idx ON bookings (stripe_payment_intent_id)
  WHERE stripe_payment_intent_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS bookings_status_created_idx ON bookings (status, created_at);
