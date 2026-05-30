import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Custom Cookie Auth for Admin Routes
  const url = req.nextUrl;
  if (url.pathname.includes('/admin')) {
    const isLoginPage = url.pathname.endsWith('/admin/login');
    const sessionCookie = req.cookies.get('admin_session');

    if (!sessionCookie && !isLoginPage) {
      // Redirect to login
      const locale = url.pathname.split('/')[1] || 'en';
      const loginUrl = new URL(`/${locale}/admin/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }
    
    if (sessionCookie && isLoginPage) {
      // Already logged in, redirect to dashboard
      const locale = url.pathname.split('/')[1] || 'en';
      const dashUrl = new URL(`/${locale}/admin`, req.url);
      return NextResponse.redirect(dashUrl);
    }
  }
  
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
