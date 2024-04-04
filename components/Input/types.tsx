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
  options: SelectOption[];
  onOptionSelected?: (option: SelectOption) => void;
  control?: any;
}

export interface SelectMultipleProps extends InputProps {
  options: SelectOption[];
  control?: any;
  onSelectedOptionsChange?: (options: SelectOption[]) => void;
}

export interface TextFieldProps extends InputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onEnterPress?: () => void;
  pattern?: string;
}

export interface TextAreaProps extends InputProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export interface SelectProps extends InputProps {
  options: SelectOption[];
  selectedOption?: SelectOption;
  onChange?: (val: SelectOption) => void;
}

export type SelectOption = {
  id: number;
  label: string;
  value?: string;
  name?: string;
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

export interface BadgeProps {
  option: SelectOption;
  showActionButton?: boolean;
  onDelete: () => void;
}
