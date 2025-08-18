'use server';

// Config
import { signIn, signOut as nextAuthSignOut } from '@/config/auth';

// Constants
import { ERROR_MESSAGES, REGISTER_ENDPOINT } from '@/constants';

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
  try {
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
  } catch (error) {
    throw new Error(
      ERROR_MESSAGES.ERROR_SIGN_UP +
        (error instanceof Error ? error.message : ''),
    );
  }
};

export const signOut = async () => await nextAuthSignOut({ redirect: false });
