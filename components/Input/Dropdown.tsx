import { MdArrowDropDown } from 'react-icons/md';
import { DropdownProps } from './types';
import { ForwardedRef, forwardRef } from 'react';

const Dropdown = (
  {
    id,
    label,
    isFullWidth,
    enabled,
    required,
    options,
    selectedOption,
    containerClassName,
    errorMessage,
    ...inputProps
  }: DropdownProps,
  ref: ForwardedRef<HTMLUListElement>,
) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label htmlFor={id} className="label text-sm">
        <span className="label-text">{label}</span>
      </label>
      <div className="dropdown w-full">
        <div id={id} tabIndex={0} className="input input-bordered flex flex-row items-center">
          {selectedOption ? selectedOption.label : label}
          <div className="w-full" />
          <MdArrowDropDown className="w-8 h-8" />
        </div>
        <ul
          ref={ref}
          tabIndex={0}
          className="p-2 w-full shadow menu dropdown-content bg-base-100 rounded-box"
        >
          {options.map((option) => (
            <li key={option.id} onClick={() => {}}>
              <a>{option.label}</a>
            </li>
          ))}
        </ul>
      </div>
      {errorMessage ? (
        <label className="label">
          <span className="label-text-alt text-red-500">{errorMessage}</span>
        </label>
      ) : null}
    </div>
  );
};

export default forwardRef(Dropdown);
