'use client';
import { useEffect } from 'react';

// utils
import { toastManager } from '@/utils';

export const useSessionToast = (key: string, message: string) => {
  useEffect(() => {
    const flag = sessionStorage.getItem(key);
    if (flag === 'true') {
      toastManager.showToast(message, 'success');
      sessionStorage.removeItem(key);
    }
  }, [key, message]);
};
