import { memo } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  labelClassName?: string;
  inputClassName?: string;
}

const Input = ({
  type = 'text',
  label,
  errorMessage,
  isInvalid = false,
  labelClassName = '',
  inputClassName = '',
  ...props
}: InputProps) => {
  const hasError = isInvalid || !!errorMessage;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={label}
          className={`block mb-2 text-customColor-placeholder text-customColor font-medium ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <input
        id={label}
        type={type}
        {...props}
        className={`
          ${inputClassName}
          w-full
          border-b-[1.5px]
          border-grey
          bg-transparent
          focus:outline-none
          focus:border-black
          placeholder:text-grey
          text-black
          py-2
          ${hasError ? 'border-red text-red placeholder:text-red' : ''}
        `}
      />

      {errorMessage && <p className="mt-1 text-sm text-red">{errorMessage}</p>}
    </div>
  );
};

export default memo(Input);
