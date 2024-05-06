import Button from '@/components/Button';
import Pagination from '../Pagination';
import { Comic } from '../../../types';
import Image from 'next/image';
import { TableProps } from './types';
import { SelectOption } from '@/components/Input/types';

const Table = ({
  comics = [],
  currentPage,
  totalPage,
  isLoading,
  onChangePage,
  onRowComicClicked,
  onEditComicClicked,
}: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table border border-solid rounded-md mt-3">
        <thead className="bg-neutral dark:bg-slate-700 text-white dark:text-slate-300 rounded-md">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>Status</th>
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
            comics.map((item: Comic) => (
              <tr
                key={item.id}
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => onRowComicClicked(item)}
              >
                <td>
                  <div className="flex flex-row items-center">
                    <div className="avatar p-1">
                      <div className="mask mask-squircle w-14 h-14">
                        <Image
                          src={getThumbnailInfo(item.image_cover).src}
                          alt="comic thumbnail"
                          width={20}
                          height={20}
                          priority={false}
                        />
                      </div>
                    </div>
                    {item.title}
                  </div>
                </td>
                <td>{getAuthorNames(item.authors)}</td>
                <td>{formatDateToString(item.published_date)}</td>
                <td>
                  <div className="flex flex-row items-center">{item.status?.label}</div>
                </td>
                <td>
                  <Button
                    id="btn-edit"
                    title="Edit"
                    onClick={() => onEditComicClicked(item)}
                    className="pl-5 pr-5"
                    small
                  />
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

const formatDateToString = (dateString: string | null): string => {
  if (!dateString) return '-';
  const [day, month, year] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const getThumbnailInfo = (thumbnail?: string): { src: string; type?: string } => {
  if (!thumbnail) {
    return { src: '' };
  }

  const isBase64 = /^data:([a-zA-Z]+\/[a-zA-Z]+);base64,/.test(thumbnail);

  if (isBase64) {
    return { src: thumbnail, type: thumbnail.split(';')[0].split(':')[1] };
  } else {
    return { src: thumbnail };
  }
};

const getAuthorNames = (authors?: SelectOption[]) => {
  if (!authors) return '';
  if (authors.length == 0) return 'Unknown';
  return authors.map((author) => author.name).join(', ');
};

export default Table;
