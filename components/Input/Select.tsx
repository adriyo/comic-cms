import { ChangeEvent, ChangeEventHandler, forwardRef } from 'react';
import { SelectProps } from './types';

const Select = (
  { id, label, options, containerClassName, errorMessage, onChange, value }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>,
) => {
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find((option) => option.value === selectedValue);

    if (selectedOption && onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label htmlFor={id} className="label text-sm">
        <span className="label-text">{label}</span>
      </label>
      <select
        className="select select-bordered w-full"
        id={id}
        key={id}
        ref={ref}
        defaultValue={value}
        onChange={handleOnChange}
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
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
