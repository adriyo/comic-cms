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
  const containerClassName = `${removeInnerPadding ? '' : 'p-6'} bg-white ${className || ''} w-[calc(100vw-24rem)]`;
  return <div className={containerClassName}>{children}</div>;
};

export default ContentContainer;
