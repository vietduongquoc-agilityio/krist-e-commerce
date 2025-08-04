'use server';

// Config
import { signIn, signOut as nextAuthSignOut } from '@/config/auth';
import { ERROR_MESSAGES } from '@/constants';

// Interfaces
import { AuthResponse, ISignUpFormData, TSignInFormData } from '@/interfaces';

// Services
import { apiClient } from '@/services';

export const authenticateUser = async (formData: TSignInFormData) => {
  return await signIn('credentials', {
    redirect: false,
    ...formData,
  });
};

export const signUp = async (payload: ISignUpFormData) => {
  try {
    const response = await apiClient.post<AuthResponse>('auth/local/register', {
      body: {
        username: `${payload.firstName} ${payload.lastName}`,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  } catch (error) {
    throw new Error(
      ERROR_MESSAGES.ERROR_SIGN_UP +
        (error instanceof Error ? error.message : ''),
    );
  }
};

export const signOut = async () => await nextAuthSignOut({ redirect: false });
