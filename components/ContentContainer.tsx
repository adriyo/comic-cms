import { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
  removeInnerPadding?: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
  removeInnerPadding,
}) => {
  const containerClassName = `${removeInnerPadding ? '' : 'p-6'} bg-white ${className || ''}`;
  return <div className={containerClassName}>{children}</div>;
};

export default ContentContainer;
