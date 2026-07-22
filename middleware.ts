import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, adminSessionToken } from '@/lib/admin-auth';

// Reachable without a session by necessity: the login form posts to /auth,
// and logging out has to work even when the cookie is stale or invalid.
const PUBLIC_ADMIN_ROUTES = ['/admin/login', '/api/admin/auth', '/api/admin/logout'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;

  if (adminPassword && cookie && cookie === (await adminSessionToken(adminPassword))) {
    return NextResponse.next();
  }

  // API callers get a status they can act on; browsers get the login form.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = {
  // /api/admin was previously unmatched, leaving every admin API route open
  // to anyone on the internet.
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
