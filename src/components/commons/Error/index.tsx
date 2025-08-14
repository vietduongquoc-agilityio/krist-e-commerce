'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

// Constants
import { ROUTER } from '@/constants/router';
import { ERROR_MESSAGES, TEXT_SIZE } from '@/constants';

// Components
import { Text } from '@/components/commons/Text';

const ErrorUI = ({
  message = ERROR_MESSAGES.DEFAULT,
}: {
  message?: string;
}) => (
  <div className="max-w-lg p-8 flex flex-col items-center justify-center m-auto pt-96">
    <h1 className="text-2xl font-bold text-primary mb-4">
      Oops! Something went wrong.
    </h1>

    <Text size={TEXT_SIZE['XL-22']}>{message}</Text>

    <Link
      href={ROUTER.HOME}
      className="text-lg font-lg text-white py-3 px-6 bg-primary rounded-10 hover:bg-turquoise mt-4"
      aria-label="Go to home page"
    >
      Go to home page
    </Link>
  </div>
);

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    // Log the error to a service
    console.error('An error occurred:', error);
  }, [error]);

  return <ErrorUI message={error.message} />;
}
