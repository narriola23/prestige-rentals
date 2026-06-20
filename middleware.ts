import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin')) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const cookieAuth = request.cookies.get('admin_auth');
    if (cookieAuth?.value === adminPassword && adminPassword) {
      return NextResponse.next();
    }
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
