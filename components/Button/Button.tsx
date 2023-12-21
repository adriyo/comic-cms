import { ButtonProps } from './types';

const Button = ({
  type,
  title,
  disabled,
  isFullWidth,
  loading,
  small,
  onClick,
  className,
  ...btnProps
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${isFullWidth ? 'w-full' : null} btn btn-neutral ${
        small ? 'btn-sm text-xs' : null
      } ${className ?? className}`}
      disabled={loading}
      onClick={(e) => {
        e.stopPropagation();
        onClick ? onClick() : null;
      }}
    >
      {loading ? 'Please wait...' : title}
      {loading ? <span className="loading loading-spinner loading-md" /> : null}
    </button>
  );
};

export default Button;
