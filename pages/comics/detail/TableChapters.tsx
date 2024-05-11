import Button from '@/components/Button';
import { Chapter } from '../types';
import Pagination from '../list/components/Pagination';
import { Routes } from '@/utils/constants';
import Link from 'next/link';

type TableProps = {
  comicId: string;
  chapters: Chapter[];
  currentPage: number;
  totalPage: number;
  isLoading?: boolean;
  onChangePage: (currentPage: number) => void;
  onRowChapterClicked: (item: Chapter) => void;
};

const TableChapters = ({
  comicId = '',
  chapters = [],
  currentPage = 1,
  totalPage = 0,
  isLoading = false,
  onChangePage = () => {},
  onRowChapterClicked = () => {},
}: TableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table border border-solid rounded-md mt-3">
        <thead className="bg-neutral dark:bg-slate-700 text-white dark:text-slate-300 rounded-md">
          <tr>
            <th>Title</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg content-center bg-cyan-300" />
                </div>
              </td>
            </tr>
          ) : (
            chapters.map((item: Chapter) => (
              <tr
                key={item.id}
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => onRowChapterClicked(item)}
              >
                <td>{item.title}</td>
                <td>{item.updated_at}</td>
                <td>
                  <Link href={`${Routes.CREATE_CHAPTER}/${comicId}/chapter/${item.id}`}>
                    <Button id="btn-edit" title="Edit" className="pl-5 pr-5" small />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex flex-row pt-2 pb-2">
        <div>
          <span className="text-sm">
            Page {currentPage}/{totalPage}
          </span>
        </div>
        <div className="flex-1" />
        <Pagination totalPage={totalPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default TableChapters;
