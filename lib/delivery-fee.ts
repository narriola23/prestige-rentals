import { ORIGIN_COORDS, ZIP_COORDINATES } from "./zip-coordinates";

const FREE_RADIUS_MILES = 20;
const RATE_PER_MILE_CENTS = 200;
const EARTH_RADIUS_MILES = 3958.8;

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

// Straight-line (haversine) distance between two [lat, lon] points, in miles.
function haversineMiles(a: [number, number], b: [number, number]): number {
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h =
    sinLat * sinLat +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * sinLon * sinLon;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h));
}

export interface DeliveryFeeResult {
  distanceMiles: number;
  feeCents: number;
}

// Free within 20mi of the business origin; $2/mile for the full distance beyond that
// (matches the client's stated policy). Returns null if the ZIP has no known
// coordinates — callers should treat that as "needs a manual quote", not $0.
export function calculateDeliveryFee(zip: string): DeliveryFeeResult | null {
  const coords = ZIP_COORDINATES[zip];
  if (!coords) return null;

  const distanceMiles = haversineMiles(ORIGIN_COORDS, coords);
  const feeCents = distanceMiles <= FREE_RADIUS_MILES
    ? 0
    : Math.round(distanceMiles * RATE_PER_MILE_CENTS);

  return { distanceMiles, feeCents };
}
