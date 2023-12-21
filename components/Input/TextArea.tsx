import { ForwardedRef, forwardRef } from 'react';
import { InputProps, TextAreaProps } from './types';

const TextAreaComponent = (
  {
    id,
    label,
    containerClassName,
    errorMessage,
    isFullWidth,
    placeholder,
    enabled,
    required,
    onChange,
  }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => {
  const maxRows = 5;
  return (
    <div className={`${containerClassName}`}>
      <label htmlFor={id} className="label text-sm">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        ref={ref}
        name={id}
        id={id}
        key={id}
        className={`textarea textarea-bordered ${isFullWidth ? 'w-full' : ''} ${
          errorMessage ? 'input-error' : ''
        }
        h-auto max-h-${maxRows * 1.25} overflow-y-auto
        `}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        disabled={enabled}
      />
      {errorMessage ? (
        <label className="label">
          <span className="label-text-alt text-red-500">{errorMessage}</span>
        </label>
      ) : null}
    </div>
  );
};

export const TextArea = forwardRef(TextAreaComponent);
