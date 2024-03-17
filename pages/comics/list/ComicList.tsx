import RootLayout from '@/components/RootLayout';
import Link from 'next/link';
import { Routes } from '../../../utils/constants';
import Button from '@/components/Button';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Comic } from '../types';
import { TextField } from '@/components/Input';
import Table from './components/Table';
import { useRouter } from 'next/router';
import { useFetchComics } from '../hooks';
import ContentContainer from '@/components/ContentContainer';

const TextSearch = ({
  onChange,
  onChangeSearchBySelection,
}: {
  onChange: (value: string) => void;
  onChangeSearchBySelection: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      <div className="join">
        <TextField
          placeholder="Search..."
          className="join-item"
          small
          onChange={(value) => onChange(value.target.value)}
        />
        <select
          className="select select-bordered join-item select-sm"
          onChange={onChangeSearchBySelection}
          defaultValue={'by-title'}
        >
          <option value={'by-title'}>Title</option>
          <option value={'by-author'}>Author</option>
        </select>
      </div>
    </>
  );
};

const ComicsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSearch, setSelectedSearchBy] = useState('by-title');
  const router = useRouter();
  const { response, loading } = useFetchComics({ page: currentPage });
  const [comics, setComics] = useState<Comic[]>(response.data);

  const handleSearch = (query: string, queryBy: string) => {
    if (!query) {
      setComics(response.data);
      return;
    }
    const copyComics = structuredClone(comics);
    const filteredComics = copyComics.filter((i: Comic) => {
      if (queryBy == 'by-author') {
        return i.author.label.toLowerCase().includes(query.toLowerCase());
      } else {
        return i.title.toLowerCase().includes(query.toLowerCase());
      }
    });
    setComics(filteredComics);
  };

  const handleChangePage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  function handleItemComicClicked(item: Comic): void {
    router.push(Routes.DETAIL_COMIC + '/' + item.id);
  }

  function handleEditComicClicked(item: Comic): void {
    router.push(Routes.CREATE_COMIC);
  }

  useEffect(() => {
    setComics(response.data);
  }, [response]);

  return (
    <ContentContainer>
      <div className="flex flex-row">
        <TextSearch
          onChange={(value) => handleSearch(value, selectedSearch)}
          onChangeSearchBySelection={(e) => setSelectedSearchBy(e.target.value)}
        />
        <div className="flex-1" />
        <Link href={Routes.CREATE_COMIC}>
          <Button title="+ New Comic" id="btn-create-comic" small />
        </Link>
      </div>
      <Table
        isLoading={loading}
        comics={comics}
        currentPage={currentPage}
        totalPage={response.totalPage}
        onChangePage={handleChangePage}
        onRowComicClicked={handleItemComicClicked}
        onEditComicClicked={handleEditComicClicked}
      />
    </ContentContainer>
  );
};

ComicsPage.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ComicsPage;
