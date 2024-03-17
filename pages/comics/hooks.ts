import { useEffect, useState } from 'react';
import { generateDummyChapters, generateRandomSlugId } from './mocks';
import { Chapter, Comic, ComicRequest } from './types';

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

const useFetchComics = ({ page = 1 }) => {
  const pageSize = 10;
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
        const existingComicsJSON = localStorage.getItem('savedComics');
        const parsedComics = parseComicsData(existingComicsJSON);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedComics = parsedComics.slice(startIndex, endIndex);

        setResponse({
          data: paginatedComics,
          totalPage: Math.ceil(parsedComics.length / pageSize),
          totalCount: parsedComics.length,
        });
        setLoading(false);
      }, 1000);
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
    author: comic.author || '',
    updatedAt: comic.updatedAt || '',
    thumbnail: comic.thumbnail || '',
    publicationYear: comic.publicationYear ? new Date(comic.publicationYear) : new Date(),
    rating: comic.rating || 0,
    tags: comic.tags || [],
    status: comic.status || '',
    artist: comic.artist || [],
    description: comic.description || '',
    genres: comic.genres || [],
  }));

  return parsedComics;
};

const useComic = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const saveComic = async (request: ComicRequest) => {
    try {
      setLoading(true);
      const thumbnailBase64 = await fileToBase64(request.thumbnail);

      const comic: Comic = {
        id: generateRandomSlugId(),
        title: request.title,
        author: request.author,
        status: request.status,
        thumbnail: thumbnailBase64,
        description: request.description,
        genres: [request.genre!],
        updatedAt: Date(),
        publicationYear: request.publicationYear,
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const existingComicsJSON = localStorage.getItem('savedComics');
      const existingComics = existingComicsJSON ? JSON.parse(existingComicsJSON) : [];
      const updatedComics = [...existingComics, comic];
      localStorage.setItem('savedComics', JSON.stringify(updatedComics));
      setError(null);
    } catch (error) {
      setError('Error saving comic');
    } finally {
      setLoading(false);
    }
  };

  return { saveComic, error, loading };
};

export { useFetchComics, useFetchDetail, useFetchChapters, useComic };
