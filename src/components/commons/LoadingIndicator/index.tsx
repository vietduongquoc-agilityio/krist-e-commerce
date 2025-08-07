'use client';
import { Spinner } from '@heroui/react';

export const LoadingIndicator = () => {
  return (
    <Spinner
      color="primary"
      size="lg"
      className="flex justify-center items-center min-h-[calc(100vh-147px-431px)]"
    />
  );
};
