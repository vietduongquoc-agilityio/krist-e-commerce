'use client';

import Link from 'next/link';

// Components
import { Button } from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { Text } from '@/components/commons/Text';
import { IconGithub, IconGoogle } from '@/components';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

export const SignInForm = () => {
  return (
    <form className="w-full mx-auto flex flex-col gap-6">
      {/* Title */}
      <h2 className="font-secondary text-[30px] mb-8">Sign In To FASCO</h2>

      {/* Social Signin Buttons */}
      <div className="w-full flex justify-between gap-16 mb-16">
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
        >
          <span className="flex items-center">
            <IconGoogle className="w-[36px] h-[36px] rounded-full" />
          </span>
          Sign in with Google
        </Button>
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
        >
          <span className="flex items-center">
            <IconGithub className="w-[42px] h-[42px] rounded-full" />
          </span>
          Sign in with GitHub
        </Button>
      </div>

      {/* OR Divider */}
      <div className="w-full flex items-center justify-center gap-4 mb-10">
        <span className="w-[30px] h-[5px] bg-gray"></span>
        <span className="text-gray font-bold text-[30px]">OR</span>
        <span className="w-[30px] h-[5px] bg-gray"></span>
      </div>

      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />

      {/* Sign In Button */}
      <div className="w-[575px] font-semibold ml-16 flex flex-col gap-5 mt-6">
        <Button variant="solid">Sign In</Button>

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
