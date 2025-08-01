'use client';

import dynamic from 'next/dynamic';

const Toast = dynamic(() => import('./Toast'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export const ToastProvider = () => {
  return <Toast />;
};
