'use server';

// Config
import { signIn, signOut as nextAuthSignOut } from '@/config/auth';

// Constants
import { REGISTER_ENDPOINT } from '@/constants';

// Types
import { AuthResponse, ISignInFormData, ISignUpFormData } from '@/types';

// Services
import { apiClient } from '@/services';

export const authenticateUser = async (formData: ISignInFormData) => {
  return await signIn('credentials', {
    redirect: false,
    ...formData,
  });
};

export const signUp = async (payload: ISignUpFormData) => {
  const { firstName, lastName, email, password } = payload;

  const requestBody = {
    username: `${firstName} ${lastName}`,
    email,
    password,
  };

  const response = await apiClient.post<AuthResponse>(REGISTER_ENDPOINT, {
    body: requestBody,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

export const signOut = async () => await nextAuthSignOut({ redirect: false });
