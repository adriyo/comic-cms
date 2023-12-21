import { useEffect, useState } from 'react';
import { generateDummyChapters, generateDummyComicList } from './mocks';
import { Chapter, Comic } from './types';

export type ComicsResponse = {
  data: Comic[];
  totalPage: number;
  totalCount: number;
};

export interface ChapterResponse {
  data: Chapter[];
  totalPage: number;
  totalCount: number;
}

export const comicsResponse: ComicsResponse = {
  data: generateDummyComicList,
  totalPage: 10,
  totalCount: 100,
};

const useFetchComics = ({ page = 1 }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<ComicsResponse>({
    data: [],
    totalPage: 0,
    totalCount: 0,
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      setTimeout(() => {
        setResponse({
          data: generateDummyComicList,
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

const useFetchDetail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<Comic | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      setTimeout(() => {
        setResponse(generateDummyComicList[0]);
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

export { useFetchComics, useFetchDetail, useFetchChapters };
