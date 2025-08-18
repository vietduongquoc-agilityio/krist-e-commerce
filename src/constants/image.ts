import { ROUTER } from './router';

export const IMAGES = {
  AUTH: {
    [ROUTER.SIGNUP]: '/images/bg-signup.webp',
    [ROUTER.SIGNIN]: '/images/bg-signin.webp',
  },
  AVATAR: '/images/avatar.webp',
  BANNER: {
    LEFT: '/images/banner-img-left.webp',
    TOP: '/images/banner-img-top.webp',
    CENTER: '/images/banner-img-center.webp',
    BOTTOM: '/images/banner-img-bottom.webp',
    RIGHT: '/images/banner-img-right.webp',
  },
  PAYMENT_OPTIONS: '/images/payment-options-img.webp',
  MODEL_BANNER: '/images/model-banner.webp',
  FOOTER: {
    LEFT: '/images/footer-img-left.webp',
    RIGHT: '/images/footer-img-right.webp',
  },
  NOT_FOUND: '/images/not-found.webp',
} as const;
