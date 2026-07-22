export const ADMIN_COOKIE = 'admin_auth';

/**
 * The value stored in the admin session cookie: a SHA-256 hash of
 * ADMIN_PASSWORD rather than the password itself. The cookie is still a
 * bearer token — anyone holding it is logged in — but a leaked cookie no
 * longer hands over the password, which matters because the same password
 * is shared between everyone with admin access.
 *
 * Uses Web Crypto so the same helper works in both the Edge runtime
 * (middleware) and the Node runtime (route handlers).
 */
export async function adminSessionToken(password: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
