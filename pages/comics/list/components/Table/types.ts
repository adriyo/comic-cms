import { Comic } from '@/pages/comics/types';

export type TableProps = {
  comics: Comic[];
  currentPage: number;
  totalPage: number;
  isLoading?: boolean;
  onChangePage: (currentPage: number) => void;
  onRowComicClicked: (item: Comic) => void;
  onEditComicClicked: (item: Comic) => void;
};
