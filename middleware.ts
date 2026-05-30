import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Basic Auth for Admin Routes
  const url = req.nextUrl;
  if (url.pathname.includes('/admin')) {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      if (pwd === process.env.ADMIN_PASSWORD) {
        return intlMiddleware(req);
      }
    }
    
    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
      },
    });
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
