import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match root
    '/',
    // Match all locale-prefixed paths
    '/(ar|en)/:path*',
    // Match all paths except API, static files, and Next.js internals
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
