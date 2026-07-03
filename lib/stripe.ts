import Stripe from 'stripe';

declare global { var _stripeClient: Stripe | undefined; }

export function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  if (!global._stripeClient) {
    global._stripeClient = new Stripe(secretKey, { apiVersion: '2026-06-24.dahlia' });
  }
  return global._stripeClient;
}
