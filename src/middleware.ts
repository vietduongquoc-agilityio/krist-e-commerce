export { authMiddleware as default } from '@/middlewares';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|webp|svg|ico)$).*)'],
};
