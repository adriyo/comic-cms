import { ChangeEventHandler } from 'react';

export interface InputProps {
  id?: string | undefined;
  type?: string | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  enabled?: boolean;
  required?: boolean;
  value?: string;
  error?: boolean;
  errorMessage?: string | null;
  isFullWidth?: boolean;
  small?: boolean;
  className?: string;
  containerClassName?: string;
}

export interface Select2Props extends InputProps {
  options: Option[];
  onOptionSelected?: (option: Option) => void;
  control: any;
}

export interface TextFieldProps extends InputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onEnterPress?: () => void;
}

export interface TextAreaProps extends InputProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps extends InputProps {
  options: SelectOption[];
  selectedOption?: SelectOption;
}

export type SelectOption = {
  id: number;
  label: string;
  value?: string;
};

export interface DropdownProps extends InputProps {
  options: DropdownOption[];
  selectedOption?: DropdownOption;
}

export type DropdownOption = {
  id: number;
  label: string;
  value?: string;
};
