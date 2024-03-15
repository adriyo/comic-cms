import React, { ForwardedRef, forwardRef, KeyboardEvent, useState } from 'react';
import { TextFieldProps } from './types';
import { IconVisibility } from '../Icon/IconVisibility';

const TextFieldComponent = ({ ...props }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  const showPasswordIcon = props.type === 'password';
  const [type, setType] = useState(props.type);
  const [showPassword, setShowPassword] = useState(showPasswordIcon);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (props.onEnterPress) {
        props.onEnterPress();
      }
    }
  };

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      setType('text');
    } else {
      setType('password');
    }
  };

  const fileTypePrefixStyle = props.type === 'file' ? 'file-' : '';
  const className = props.className ?? '';
  return (
    <div className={`mb-4 ${props.containerClassName}`}>
      {props.label ? (
        <label htmlFor={props.id} className="label text-sm">
          <span className="label-text">{props.label}</span>
        </label>
      ) : null}
      <label
        className={`${fileTypePrefixStyle}input ${fileTypePrefixStyle}input-bordered ${
          props.isFullWidth ? ' w-full ' : ''
        }
      ${props.errorMessage ? ' input-error ' : ''}
      ${props.small ? ' input-sm ' : ''}
      flex items-center
      `}
      >
        <input
          className={`${className} grow`}
          ref={ref}
          type={type}
          name={props.id}
          id={props.id}
          placeholder={props.placeholder}
          required={props.required}
          disabled={props.enabled}
          onChange={props.onChange}
          onKeyDown={handleKeyDown}
        />
        {showPasswordIcon ? (
          <IconVisibility show={showPassword} onClick={handleToggleVisibility} />
        ) : null}
      </label>

      {props.errorMessage ? (
        <label className="label">
          <span className="label-text-alt text-red-500">{props.errorMessage}</span>
        </label>
      ) : null}
    </div>
  );
};

export const TextField = forwardRef(TextFieldComponent);
