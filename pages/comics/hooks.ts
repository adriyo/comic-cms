import { useState } from 'react';
import { Chapter, ChapterResponse, Comic, ComicsResponse, PagingRequest } from './types';
import { useQuery } from 'react-query';
import { ApiRoute } from '@/utils/constants';
import { useFetch } from '@/utils/network/hooks';

const fetchComics = (data: PagingRequest) =>
  useFetch<ComicsResponse>({ url: `${ApiRoute.COMICS}?page=${data.page}&limit=${data.limit}` });

const useFetchComics = (req: PagingRequest) => {
  const { isLoading, error, data } = useQuery<ComicsResponse, Error>({
    queryKey: ['comics', req.page, req.limit],
    queryFn: () => fetchComics(req),
    keepPreviousData: true,
  });
  return { data, isLoading, error };
};

const useFetchDetail = (id: string) => {
  const { isLoading, error, data, refetch } = useQuery<Comic, Error>({
    queryKey: ['comic-detail', id],
    queryFn: () => useFetch<Comic>({ url: `${ApiRoute.COMICS}/${id}` }),
    enabled: false,
    keepPreviousData: true,
  });
  return { data, isLoading, error, refetch };
};

const useFetchChapters = ({ comicId = '', page = 1 }) => {
  const [response, setResponse] = useState<ChapterResponse>({
    data: [],
    totalPage: 0,
    totalCount: 0,
  });

  const updateResponseData = (newData: Chapter[], newTotalPage: number, newTotalCount: number) => {
    setResponse({
      data: newData,
      totalPage: newTotalPage,
      totalCount: newTotalCount,
    });
  };

  const { isLoading, error, refetch } = useQuery<Chapter[], Error>({
    queryKey: ['comic-chapters', comicId, page],
    queryFn: () =>
      useFetch<Chapter[]>({
        url: `${ApiRoute.COMICS}/${comicId}/chapters`,
        onSuccess(data) {
          updateResponseData(data, 1, data.length);
        },
      }),
    enabled: false,
    keepPreviousData: true,
  });
  return { response, isLoading, error, refetch };
};

export { useFetchComics, useFetchDetail, useFetchChapters };
