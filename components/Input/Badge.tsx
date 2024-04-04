import { MdClose } from 'react-icons/md';
import { BadgeProps } from './types';

const Badge = (props: BadgeProps) => {
  return (
    <div className="inline-flex items-center bg-gray-800 gap-2 text-white rounded-md px-2 py-1 mr-2 text-sm">
      <span className="truncate">{props.option.label}</span>
      <MdClose onClick={props.onDelete} />
    </div>
  );
};

export default Badge;
