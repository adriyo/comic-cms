import { CSSProperties } from 'react';

export type ButtonProps = {
  type?: 'submit' | 'button';
  id: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void | undefined;
  style?: CSSProperties;
  title: string;
  small?: boolean;
  className?: string;
};
