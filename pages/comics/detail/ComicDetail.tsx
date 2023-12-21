import ContentContainer from '@/components/ContentContainer';
import HeaderContainer from '@/components/HeaderContainer';
import RootLayout from '@/components/RootLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@/components/Button';
import { useFetchChapters, useFetchDetail } from '../../../src/pages/comics/hooks';
import { Comic } from '../../../src/pages/comics/types';
import TableChapters from './TableChapters';
import Link from 'next/link';
import { Routes } from '@/utils/constants';

const Sidebar = ({ comic }: { comic?: Comic | null }) => {
  return (
    <div className="max-w-[20%] p-4 flex flex-col bg-slate-50">
      <div>
        <Image
          src={comic?.thumbnail ?? ''}
          alt="Picture of the author"
          width={100}
          height={100}
          objectFit="cover"
          className="h-60 w-60"
        />
      </div>
      <div className="h-1" />
      <Link href={Routes.CREATE_COMIC}>
        <Button id="btnUpdateInfo" title="Ubah Info" className="btn-outline" isFullWidth small />
      </Link>
      <div className="h-1" />
      <Link href={Routes.CREATE_CHAPTER}>
        <Button id="btnAddChapters" title="+ Tambah Chapters" isFullWidth small />
      </Link>
      <br />
    </div>
  );
};

const ComicDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const slugId = router.query.slug as string;
  const { loading, response: detailResponse } = useFetchDetail(slugId);
  const { loading: loadingChapters, response: chapterResponse } = useFetchChapters({
    page: currentPage,
  });

  const handleChangePage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <div className="border border-collapse rounded-md bg-white content-container">
      {!loading ? (
        <HeaderContainer title={detailResponse?.title ?? ''} onBackClicked={() => router.back()} />
      ) : null}
      <ContentContainer className="flex flex-col p-0" removeInnerPadding>
        {loading ? (
          <div className="flex p-40 justify-center items-center">
            <span className="loading loading-lg" />
          </div>
        ) : (
          <div className="flex flex-row">
            <Sidebar comic={detailResponse} />
            <div className="container flex flex-col p-4">
              <div>
                <article>{detailResponse?.description}</article>
                {detailResponse?.genres?.map((genre) => (
                  <div className="badge badge-ghost mr-1" key={genre.id}>
                    {genre.title}
                  </div>
                ))}
              </div>
              <TableChapters
                chapters={chapterResponse.data}
                currentPage={currentPage}
                totalPage={chapterResponse.totalPage}
                isLoading={loadingChapters}
                onChangePage={handleChangePage}
                onRowChapterClicked={() => {}}
              />
            </div>
          </div>
        )}
      </ContentContainer>
    </div>
  );
};

ComicDetail.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ComicDetail;
