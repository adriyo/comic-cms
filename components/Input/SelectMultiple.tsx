import { useController } from 'react-hook-form';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { SelectMultipleProps, SelectOption } from './types';
import Badge from './Badge';

const SelectMultiple = (
  {
    id,
    label,
    value,
    placeholder,
    errorMessage,
    containerClassName,
    onSelectedOptionsChange,
    ...props
  }: SelectMultipleProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ name: id || '', control: props.control });

  const handleOptionClick = (option: SelectOption) => {
    setSearchTerm('');
    setSelectedOptions((prevOptions) => [...prevOptions, option]);
    onChange();
    inputRef.current?.focus();
  };

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    onSelectedOptionsChange?.(selectedOptions);
  }, [selectedOptions]);

  const handleOnFocusIn = (event: any) => {
    setVisible(true);
  };
  const handleOnFocusOut = (event: any) => {
    if (visible) return;
    setVisible(false);
  };

  const handleKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = e.currentTarget.value;
      if (!text) return;
      handleOptionClick({
        id: 0,
        value: '',
        label: e.currentTarget.value,
      });

      setSearchTerm('');
    } else if (e.key === 'Backspace') {
      if (e.currentTarget.value === '') {
        handleBadgeDelete(selectedOptions[selectedOptions.length - 1]);
      }
    }
  };

  const handleBadgeDelete = (option: SelectOption) => {
    setSelectedOptions((prevOptions) => prevOptions.filter((item) => item !== option));
  };

  return (
    <div
      className={`${containerClassName} mb-4 flex flex-col`}
      onFocus={handleOnFocusIn}
      onBlur={handleOnFocusOut}
    >
      {label ? (
        <label htmlFor={id} className="label text-sm">
          <span className="label-text">{label}</span>
        </label>
      ) : null}
      <div className="relative flex flex-wrap textarea textarea-bordered">
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((item, index) => {
            return (
              <Badge
                key={index + '' + item.id}
                option={item}
                onDelete={() => handleBadgeDelete(item)}
              />
            );
          })}
          <input
            ref={inputRef}
            type="text"
            placeholder="Type the authors..."
            className="grow focus:outline-none"
            value={searchTerm}
            onKeyDown={handleKeyDownInput}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setVisible(true)}
            onBlur={() => setTimeout(() => setVisible(false), 200)}
          />
        </div>
      </div>
      {visible ? (
        <div className={`join-item ${visible ?? 'hidden'} relative z-10`}>
          <div className="absolute top-full left-0 bg-white border w-full max-h-[12rem] overflow-y-auto">
            <ul className="menu">
              {options
                .filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter((option) => !selectedOptions.includes(option))
                .map((option) => (
                  <li key={option.value} onClick={() => handleOptionClick(option)}>
                    <a>{option.label}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : null}

      {errorMessage ? (
        <label className="label">
          <span className="label-text-alt text-red-500">{errorMessage}</span>
        </label>
      ) : null}
    </div>
  );
};

export default forwardRef(SelectMultiple);
