'use client';
import { Button, useDisclosure } from '@heroui/react';

// Components
import { EyeIcon, EyeSlashIcon } from '@/components';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  className?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  errorMessage,
  isInvalid = false,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasError = isInvalid || !!errorMessage;

  return (
    <div>
      <label
        htmlFor="password"
        className={`block mb-2.5 ${hasError ? 'text-red' : 'text-customColor-label'}`}
      >
        {label}
      </label>

      <div
        className={`flex border rounded-full py-4 px-7 ${hasError ? 'border-red' : 'border-border-input-100'}`}
      >
        <input
          id="password"
          type={isOpen ? 'text' : 'password'}
          {...props}
          className={`flex-1 placeholder:text-sm-15 outline-none bg-transparent ${hasError ? 'text-red' : 'text-black'}`}
        />

        <Button
          isIconOnly
          type="button"
          onPress={isOpen ? onClose : onOpen}
          className="ml-2 text-black"
        >
          {isOpen ? <EyeSlashIcon /> : <EyeIcon />}
        </Button>
      </div>

      {errorMessage && <p className="mt-2 text-sm text-red">{errorMessage}</p>}
    </div>
  );
};
