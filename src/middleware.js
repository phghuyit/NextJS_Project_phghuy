import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Routes
  // This checks any route starting with /admin, except the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Read the admin token from the cookies
    const adminToken = request.cookies.get('adminToken')?.value;

    if (!adminToken) {
      // If no token is found, redirect them to the admin login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Continue to the requested route if all checks pass
  return NextResponse.next();
}

// Configure the matcher to specify exactly which routes the middleware should run on
// This optimizes performance by not running middleware on static files or public routes
export const config = {
  matcher: ['/admin/:path*'],
};