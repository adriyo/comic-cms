import { forwardRef, KeyboardEvent } from 'react';
import { TextFieldProps } from './types';

const TextFieldComponent = (
  { ...props }: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (props.onEnterPress) {
        props.onEnterPress();
      }
    }
  };
  return (
    <div className={`mb-4 ${props.containerClassName}`}>
      {props.label ? (
        <label htmlFor={props.id} className="label text-sm">
          <span className="label-text">{props.label}</span>
        </label>
      ) : null}
      <input
        ref={ref}
        type={props.type}
        name={props.id}
        id={props.id}
        className={`${props.className} input input-bordered
        ${props.isFullWidth ? ' w-full ' : ''}
      ${props.errorMessage ? ' input-error ' : ''}
      ${props.small ? ' input-sm ' : ''}
      `}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.enabled}
        onChange={props.onChange}
        onKeyDown={handleKeyDown}
      />
      {props.errorMessage ? (
        <label className="label">
          <span className="label-text-alt text-red-500">{props.errorMessage}</span>
        </label>
      ) : null}
    </div>
  );
};

export const TextField = forwardRef(TextFieldComponent);
