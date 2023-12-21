import { forwardRef } from 'react';
import { SelectProps } from './types';

const Select = (
  { id, label, options, containerClassName, errorMessage }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>,
) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label htmlFor={id} className="label text-sm">
        <span className="label-text">{label}</span>
      </label>
      <select className="select select-bordered w-full" id={id} key={id} ref={ref}>
        {options.map((option) => (
          <option key={option.id}>{option.label}</option>
        ))}
      </select>
      {errorMessage ? (
        <label className="label">
          <span className="label-text-alt text-red-500">{errorMessage}</span>
        </label>
      ) : null}
    </div>
  );
};

export default forwardRef(Select);
