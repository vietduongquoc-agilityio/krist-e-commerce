'use client';

// Libs
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

// Components
import { IconGithub, IconGoogle, Text } from '@/components';
import { Button } from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { signIn } from 'next-auth/react';

// Actions
import { signUp } from '@/actions/auth';

// Schemas
import { signUpSchema } from '@/schemas';

// Utils
import { toastManager } from '@/utils';

// Constants
import {
  ERROR_MESSAGES,
  ROUTER,
  SIGNUP_FIELDS,
  SUCCESS_MESSAGES,
  TEXT_SIZE,
} from '@/constants';

// Types
import { ISignUpFormData } from '@/types';

export const SignUpForm = () => {
  const router = useRouter();
  const param = useSearchParams();
  const callbackUrl = param.get('callbackUrl');

  const handleSignInWithGoogle = () => {
    signIn('google', { callbackUrl: callbackUrl || ROUTER.HOME });
  };

  const handleSignInWithGithub = () => {
    signIn('github', { callbackUrl: callbackUrl || ROUTER.HOME });
  };

  const {
    control,
    handleSubmit,

    formState: { isDirty, isValid, isSubmitting },
  } = useForm<ISignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });

  const onSubmit = async (data: ISignUpFormData) => {
    try {
      const response = await signUp(data);

      if (response) {
        toastManager.showToast(`${SUCCESS_MESSAGES.SIGN_UP} `, 'success');

        router.push(ROUTER.SIGNIN);
      }
    } catch (error) {
      console.error(error);
      toastManager.showToast(`${ERROR_MESSAGES.ERROR_SIGN_UP_FORM}`, 'error');
    }
  };

  return (
    <form
      className="w-full mx-auto flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-secondary text-[30px] mb-8">Create Account</h2>
      {/* Social Signin Buttons */}
      <div className="w-full flex justify-between gap-16 mb-16">
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
          onClick={handleSignInWithGoogle}
          endContent={<IconGoogle className="w-[36px] h-[36px] rounded-full" />}
        >
          Sign up with Google
        </Button>
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
          onClick={handleSignInWithGithub}
          endContent={<IconGithub className="w-[42px] h-[42px] rounded-full" />}
        >
          Sign up with GitHub
        </Button>
      </div>
      {/* OR Divider */}
      <div className="w-full flex items-center justify-center gap-4 mb-10">
        <span className="w-[30px] h-[5px] bg-gray"></span>
        <span className="text-gray font-bold text-[30px]">OR</span>
        <span className="w-[30px] h-[5px] bg-gray"></span>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {SIGNUP_FIELDS.map((field) => (
          <Controller
            key={field.name}
            name={
              field.name as
                | 'email'
                | 'firstName'
                | 'lastName'
                | 'phone'
                | 'password'
                | 'confirmPassword'
            }
            control={control}
            rules={field.required ? { required: field.required } : undefined}
            render={({ field: controllerField, fieldState: { error } }) => (
              <Input
                type={field.type}
                aria-label={field.name}
                placeholder={field.placeholder}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                {...controllerField}
              />
            )}
          />
        ))}
      </div>
      {/* Sign In Button */}
      <div className="w-[575px] font-semibold ml-16 flex flex-col gap-8 mt-6 items-center">
        <Button
          variant="solid"
          type="submit"
          isDisabled={!isDirty || !isValid}
          isLoading={isSubmitting}
        >
          Create Account
        </Button>

        <Text size={TEXT_SIZE.BASE}>
          Already have an account?
          <Link className="text-skyBlue hover:underline ml-2" href="/signin">
            SignIn
          </Link>
        </Text>
      </div>
    </form>
  );
};
