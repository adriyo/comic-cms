import ContentContainer from '@/components/ContentContainer';
import HeaderContainer from '@/components/HeaderContainer';
import RootLayout from '@/components/RootLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useFetchChapters, useFetchDetail } from '../hooks';
import { Comic } from '../types';
import TableChapters from './TableChapters';
import Link from 'next/link';
import { Routes } from '@/utils/constants';
import { toast } from 'react-toastify';

const Sidebar = ({ comic }: { comic: Comic }) => {
  return (
    <div className="max-w-[20%] p-4 flex flex-col bg-slate-50">
      <div>
        <Image
          src={comic.image_cover ? comic.image_cover : ''}
          alt="Picture of the author"
          width={100}
          height={100}
          style={{ objectFit: 'cover' }}
          priority={true}
          className="h-60 w-60"
        />
      </div>
      <div className="h-1" />
      <Link
        href={{
          pathname: Routes.CREATE_COMIC,
          query: { id: comic.id },
        }}
      >
        <Button id="btnUpdateInfo" title="Ubah Info" className="btn-outline" isFullWidth small />
      </Link>
      <div className="h-1" />
      <Link href={`${Routes.CREATE_CHAPTER}/${comic.id}`}>
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
  const { isLoading, data: detailResponse, error: errorDetail, refetch } = useFetchDetail(slugId);
  const {
    isLoading: loadingChapters,
    response: chapterResponse,
    refetch: refetchChapters,
    error: errorChapters,
  } = useFetchChapters({
    page: currentPage,
    comicId: slugId,
  });

  useEffect(() => {
    if (errorDetail) {
      toast.error(errorDetail.message, { hideProgressBar: true });
    }
    if (errorChapters) {
      toast.error(errorChapters.message, { hideProgressBar: true });
    }
  }, [errorDetail, errorChapters]);

  useEffect(() => {
    if (!router.isReady) return;
    refetch();
    refetchChapters();
  }, [router.isReady]);

  const handleChangePage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <div className="border border-collapse rounded-md bg-white content-container">
      {!isLoading ? (
        <HeaderContainer title={detailResponse?.title ?? ''} onBackClicked={() => router.back()} />
      ) : null}
      <ContentContainer className="flex flex-col p-0" removeInnerPadding>
        {isLoading ? (
          <div className="flex p-40 justify-center items-center">
            <span className="loading loading-lg" />
          </div>
        ) : (
          <div className="flex flex-row">
            {detailResponse ? <Sidebar comic={detailResponse} /> : null}
            <div className="container flex flex-col p-4">
              <div>
                <article>{detailResponse?.description}</article>
                {detailResponse?.genres?.map((genre) => (
                  <div className="badge badge-ghost mr-1" key={genre.id}>
                    {genre.name}
                  </div>
                ))}
              </div>
              <TableChapters
                comicId={detailResponse?.id ?? ''}
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
