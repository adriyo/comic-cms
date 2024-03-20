import { useEffect, useState } from 'react';
import { generateDummyChapters } from './mocks';
import { ChapterResponse, Comic, ComicsResponse, PagingRequest } from './types';
import { useQuery } from 'react-query';
import { ApiRoute, LocalStorageKeys } from '@/utils/constants';

const fetchComics = (data: PagingRequest) =>
  fetch(`${ApiRoute.COMICS}?page=${data.page}&limit=${data.limit}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)}`,
    },
  }).then(async (res) => {
    const data = (await res.json()) as ComicsResponse;
    if (!res.ok) {
      throw Error(data.message);
    }
    return data;
  });

const useFetchComics = (req: PagingRequest) => {
  const { isLoading, error, data } = useQuery<ComicsResponse, Error>({
    queryKey: ['comics', req.page, req.limit],
    queryFn: () => fetchComics(req),
    keepPreviousData: true,
  });
  return { data, isLoading, error };
};

const useFetchDetail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<Comic | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      setTimeout(() => {
        const existingComicsJSON = localStorage.getItem('savedComics');
        const parsedComics = parseComicsData(existingComicsJSON);

        setResponse(parsedComics[0]);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, [id]);
  return { response, loading };
};

const useFetchChapters = ({ page = 1 }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<ChapterResponse>({
    data: [],
    totalPage: 0,
    totalCount: 0,
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      setTimeout(() => {
        setResponse({
          data: generateDummyChapters(),
          totalPage: 10,
          totalCount: 100,
        });
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, [page]);
  return { response, loading };
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
