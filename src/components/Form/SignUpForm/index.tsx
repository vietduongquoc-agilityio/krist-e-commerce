'use client';

import Link from 'next/link';

// Components
import { IconGithub, IconGoogle, Text } from '@/components';
import { Button } from '@/components/commons/Button';
import Input from '@/components/commons/Input';

// Interfaces
import { TEXT_SIZE } from '@/interfaces';

export const SignUpForm = () => {
  return (
    <div className="w-full mx-auto flex flex-col gap-6">
      <h2 className="font-secondary text-[30px] mb-8">Create Account</h2>

      <div className="w-full flex justify-between gap-16 mb-16">
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
        >
          <span className="flex items-center">
            <IconGoogle className="w-[36px] h-[36px] rounded-full" />
          </span>
          Sign up with Google
        </Button>
        <Button
          variant="ghost"
          className="flex gap-5 border-skyBlue hover:bg-skyBlue"
        >
          <span className="flex items-center">
            <IconGithub className="w-[42px] h-[42px] rounded-full" />
          </span>
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
        <Input type="text" placeholder="First Name" />
        <Input type="text" placeholder="Last Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="tel" placeholder="Phone Number" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </div>

      {/* Sign In Button */}
      <div className="w-[575px] font-semibold ml-16 flex flex-col gap-8 mt-6 items-center">
        <Button variant="solid" type="submit">
          Create Account
        </Button>

        <Text size={TEXT_SIZE.BASE}>
          Already have an account?
          <Link className="text-skyBlue hover:underline ml-1" href="/signin">
            SignIn
          </Link>
        </Text>
      </div>
    </div>
  );
};
