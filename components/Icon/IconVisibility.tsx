import { IconVisibilityOff } from './IconVisibilityOff';
import { IconVisibilityOn } from './IconVisibilityOn';

interface IconVisibilityProps {
  show: boolean;
  onClick?: () => void;
}

export const IconVisibility: React.FC<IconVisibilityProps> = ({ show, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return <div onClick={handleClick}>{show ? <IconVisibilityOn /> : <IconVisibilityOff />}</div>;
};
