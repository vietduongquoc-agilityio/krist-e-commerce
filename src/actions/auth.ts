'use server';

// Config
import { signIn } from '@/config/auth';

// Interfaces
import { TSignInFormData } from '@/interfaces';

export const authenticateUser = async (formData: TSignInFormData) => {
  return await signIn('credentials', {
    redirect: false,
    ...formData,
  });
};
