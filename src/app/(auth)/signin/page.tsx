import { SignInForm } from '@/components/Form/SignInForm';
import { Suspense } from 'react';

const SignInPage = () => {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
};

export default SignInPage;
