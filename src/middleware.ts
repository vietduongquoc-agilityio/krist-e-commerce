import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';

// Constants
import { ROUTER } from '@/constants';
import { authConfig } from '@/config/auth.config';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;

  const redirectIfLoggedInPages = [ROUTER.SIGNIN, ROUTER.SIGNUP];

  const freelyAccessiblePages = [
    ROUTER.HOME,
    ROUTER.SHOP,
    '/sitemap.xml',
    '/robots.txt',
  ];

  const currentPath = req.nextUrl.pathname;
  const isPublicPage = freelyAccessiblePages.includes(currentPath);
  const isRedirectPage = redirectIfLoggedInPages.includes(currentPath);

  if (!isLoggedIn && !isRedirectPage && !isPublicPage) {
    const loginUrl = new URL(ROUTER.SIGNIN, req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isRedirectPage) {
    return NextResponse.redirect(new URL(ROUTER.HOME, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|webp|svg|ico)$).*)'],
};
