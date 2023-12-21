import { MdArrowBackIos } from 'react-icons/md';

type HeaderContainerProps = {
  title: string;
  onBackClicked: () => void;
};

const HeaderContainer = ({ onBackClicked, title }: HeaderContainerProps) => {
  return (
    <div className="flex flex-col border-b-[1px]">
      <div
        className="flex place-items-center w-fit cursor-pointer pt-3 pb-2 pl-4 pr-4"
        onClick={onBackClicked}
      >
        <MdArrowBackIos className="w-4 h-4" />
        <span className="text-xl font-semibold">{title}</span>
      </div>
    </div>
  );
};

export default HeaderContainer;
