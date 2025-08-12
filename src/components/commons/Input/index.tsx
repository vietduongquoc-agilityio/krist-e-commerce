import { memo, useId } from 'react';

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

  const reactId = useId();
  const inputId = label
    ? `${reactId}-${label.replace(/\s+/g, '_')}`
    : `${reactId}-input`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={`block mb-2 text-customColor-placeholder text-customColor font-medium ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <input
        id={reactId}
        type={type}
        {...props}
        className={`
          ${inputClassName}
          w-full
          border-b-[1.5px]
          border-gray
          bg-transparent
          focus:outline-none
          focus:border-black
          placeholder:text-gray
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
