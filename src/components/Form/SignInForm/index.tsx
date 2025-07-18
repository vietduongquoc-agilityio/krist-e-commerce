'use client';

import { Button } from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { Text } from '@/components/commons/Text';
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';

export const SignInForm = () => {
  return (
    <div className="w-full mx-auto flex flex-col gap-6">
      {/* Title */}
      <h2 className="font-secondary text-[30px] mb-8">Sign In To FASCO</h2>

      {/* Social Signin Buttons */}
      <div className="w-full flex justify-between gap-16 mb-16">
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
        >
          <Image
            src="/images/signin-google-image.svg.webp"
            alt="google"
            width={42}
            height={42}
            sizes="(max-width: 20px) 100vw, 42px"
          />
          Sign up with Google
        </Button>
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
        >
          <Image
            src="/images/icon-github.webp"
            alt="github"
            width={42}
            height={42}
            sizes="(max-width: 20px) 100vw, 42px"
          />
          Sign up with GitHub
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

        {/* Register Now + Forgot Password */}

        <Link href="/register">
          <Button
            variant="ghost"
            className="text-skyBlue  border-skyBlue hover:bg-skyBlue"
          >
            Register Now
          </Button>
        </Link>

        <Text
          size={TEXT_SIZE.BASE}
          variant={TEXT_VARIANT.DESCRIPTION}
          className="hover:underline font-semibold text-skyBlue cursor-not-allowed flex justify-end"
        >
          Forget Password?
        </Text>
      </div>
    </div>
  );
};
