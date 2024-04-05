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

type FileToBase64 = (file: File) => Promise<string>;

const fileToBase64: FileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      const result = reader.result?.toString();
      if (result) {
        const [data, base64String] = result.split(',');
        const mimetypeMatch = data && data.match(/:(.*?);/);

        if (base64String && mimetypeMatch) {
          const mimetype = mimetypeMatch[1];
          resolve(`data:${mimetype};base64,${base64String}`);
        } else {
          reject(new Error('Failed to extract mimetype or base64 string'));
        }
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.readAsDataURL(file);
  });
};

const parseComicsData = (comicsDataJSON: string | null) => {
  if (!comicsDataJSON) {
    return [];
  }

  const parsedData = JSON.parse(comicsDataJSON);

  if (!Array.isArray(parsedData)) {
    return [];
  }

  const parsedComics = parsedData.map((comic: Comic) => ({
    id: comic.id || '',
    title: comic.title || '',
    authors: comic.authors || '',
    updatedAt: comic.updatedAt || '',
    thumbnail: comic.thumbnail || '',
    image_cover: null,
    published_date: null,
    rating: comic.rating || 0,
    tags: comic.tags || [],
    status: comic.status || '',
    artist: comic.artist || [],
    description: comic.description || '',
    genres: comic.genres || [],
  }));

  return parsedComics;
};

export { useFetchComics, useFetchDetail, useFetchChapters };
