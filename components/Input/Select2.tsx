import { useController } from 'react-hook-form';
import { ChangeEvent, ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { Select2Props, SelectOption } from './types';
import { MdArrowDropDown } from 'react-icons/md';

const Select2 = (
  {
    id,
    label,
    value,
    placeholder,
    errorMessage,
    containerClassName,
    onOptionSelected,
    ...props
  }: Select2Props,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>();
  const shouldShowOptionsRef = useRef<boolean>(false);
  const {
    field: { onChange, ...fields },
    fieldState: { error },
  } = useController({ name: id || '', control: props.control });

  const filterOptions = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const filteredOptions = props.options.filter((option) =>
      option.label.toLowerCase().includes(newValue.toLowerCase()),
    );
    setOptions(filteredOptions);
  };

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    setVisible(false);
    onOptionSelected && onOptionSelected(option);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (!shouldShowOptionsRef.current) {
      setVisible(false);
    }
  };

  useEffect(() => {
    setOptions(props.options);

    var resultIndex = -1;
    for (let i = 0; i < props.options.length; i++) {
      if (props.options[i].value === value) {
        resultIndex = i;
        break;
      }
    }
    if (resultIndex == -1) {
      return;
    }

    setSelectedOption(props.options[resultIndex]);
  }, [props.options, value, selectedOption]);

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      setOptions(props.options);
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [props.options]);

  return (
    <div
      className={`mb-4 ${containerClassName} join flex flex-col`}
      onMouseLeave={() => {
        if (shouldShowOptionsRef.current) {
          return;
        }
        setVisible(false);
      }}
    >
      {label ? (
        <label htmlFor={id} className="label text-sm">
          <span className="label-text">{label}</span>
        </label>
      ) : null}
      <input id={id} key={id} ref={ref} value={value} onChange={onChange} className={`hidden`} />
      <div
        tabIndex={0}
        className="input input-bordered flex flex-row items-center cursor-pointer"
        onClick={() => {
          shouldShowOptionsRef.current = true;
          setVisible(true);
        }}
      >
        <span className="w-full">{selectedOption ? selectedOption.label : `Choose ${label}`}</span>
        <MdArrowDropDown className="w-8 h-8" />
      </div>
      {visible ? (
        <div
          className={`join-item ${visible ?? 'hidden'} relative`}
          onMouseEnter={() => (shouldShowOptionsRef.current = true)}
          onMouseLeave={() => (shouldShowOptionsRef.current = false)}
        >
          <div className="absolute top-full left-0 bg-white border w-full max-h-[12rem] overflow-y-auto">
            <ul className="menu">
              <li className="mb-2">
                <input type="text" className="input input-bordered" onChange={filterOptions} />
              </li>
              {options.map((option) => (
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

export default forwardRef(Select2);
