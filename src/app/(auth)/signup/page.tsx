import { Suspense } from 'react';

// Components
import { SignUpForm } from '@/components';

const SignUpPage = () => {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
