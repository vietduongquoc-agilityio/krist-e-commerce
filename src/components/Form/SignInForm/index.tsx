'use client';

import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import { Button } from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { Text } from '@/components/commons/Text';
import { IconGithub, IconGoogle } from '@/components';

// Actions
import { authenticateUser } from '@/actions/auth';

// Models
import { ISignInFormData } from '@/models';

// Schemas
import { signInSchema } from '@/schemas';

// Constants
import {
  ERROR_MESSAGES,
  BASE_URL,
  ROUTER,
  SUCCESS_MESSAGES,
  TEXT_SIZE,
  TEXT_VARIANT,
} from '@/constants';

// Utils
import { toastManager } from '@/utils';
import { signIn } from 'next-auth/react';

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const param = useSearchParams();
  const callbackUrl = param.get('callbackUrl');

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<ISignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'all',
  });

  const handleSignInWithGoogle = () => {
    signIn('google', { callbackUrl: callbackUrl || ROUTER.HOME });
  };

  const handleSignInWithGithub = () => {
    signIn('github', { callbackUrl: callbackUrl || ROUTER.HOME });
  };

  const onSubmit = async (data: ISignInFormData) => {
    try {
      await authenticateUser(data);

      toastManager.showToast(SUCCESS_MESSAGES.LOGIN, 'success');

      if (callbackUrl) {
        return router.push(callbackUrl.replace(BASE_URL!, ''));
      }

      router.push(ROUTER.HOME);
    } catch (error) {
      setErrorMessage(ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID);
      toastManager.showToast(
        ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID,
        'error',
      );
    }
  };

  return (
    <form
      className="w-full mx-auto flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Title */}
      <h2 className="font-secondary text-[30px] mb-8">Sign In To FASCO</h2>

      {/* Social Signin Buttons */}
      <div className="w-full flex justify-between gap-16 mb-16">
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
          onClick={handleSignInWithGoogle}
          endContent={<IconGoogle className="w-[36px] h-[36px] rounded-full" />}
        >
          Sign in with Google
        </Button>
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
          onClick={handleSignInWithGithub}
          endContent={<IconGithub className="w-[42px] h-[42px] rounded-full" />}
        >
          Sign in with GitHub
        </Button>
      </div>

      {/* OR Divider */}
      <div className="w-full flex items-center justify-center gap-4 mb-10">
        <span className="w-[30px] h-[5px] bg-gray"></span>
        <span className="text-gray font-bold text-[30px]">OR</span>
        <span className="w-[30px] h-[5px] bg-gray"></span>
      </div>

      {/* Email Input */}
      <Controller
        control={control}
        name="identifier"
        render={({ field, fieldState: { error } }) => (
          <Input
            type="email"
            placeholder="Email"
            {...field}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
            onChange={(e) => {
              field.onChange(e);
              setErrorMessage(null);
            }}
          />
        )}
      />

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <Input
            type="password"
            placeholder="Password"
            {...field}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
            onChange={(e) => {
              field.onChange(e);
              setErrorMessage(null);
            }}
          />
        )}
      />

      {/* Custom error (e.g. backend invalid account) */}
      {errorMessage && (
        <Text size={TEXT_SIZE.BASE} variant={TEXT_VARIANT.ERROR}>
          {errorMessage}
        </Text>
      )}

      {/* Sign In Button */}
      <div className="w-[575px] font-semibold ml-16 flex flex-col gap-5 mt-6">
        <Button
          variant="solid"
          type="submit"
          isDisabled={!isDirty || !isValid}
          isLoading={isSubmitting}
        >
          Sign In
        </Button>

        <Link
          href="/signup"
          className="w-full text-center py-3 rounded-[10px] border border-skyBlue text-skyBlue font-semibold hover:bg-skyBlue hover:text-white transition-colors"
        >
          Register Now
        </Link>

        <Text
          size={TEXT_SIZE.BASE}
          variant={TEXT_VARIANT.DESCRIPTION}
          className="hover:underline font-semibold text-skyBlue cursor-not-allowed flex justify-end"
        >
          Forget Password?
        </Text>
      </div>
    </form>
  );
};
