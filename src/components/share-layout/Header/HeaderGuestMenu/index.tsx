'use client';

import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/commons/Button';

// Constants
import { ROUTER } from '@/constants';

export const HeaderGuestMenu = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push(ROUTER.SIGNIN);
  };

  const handleSignUp = () => {
    router.push(ROUTER.SIGNUP);
  };

  return (
    <>
      <Button variant="solid" type="button" onClick={handleSignIn}>
        Sign in
      </Button>
      <Button variant="solid" type="button" onClick={handleSignUp}>
        Sign Up
      </Button>
    </>
  );
};
