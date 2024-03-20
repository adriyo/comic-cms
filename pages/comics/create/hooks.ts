import { SelectOption } from '@/components/Input/types';
import { Author, ComicRequest, Genre, PostComicResponse } from '../types';
import { ApiRoute, LocalStorageKeys } from '@/utils/constants';
import { useMutation } from 'react-query';

const useOptions = () => {
  const existingGenres = localStorage.getItem(LocalStorageKeys.GENRES);
  const existingAuthors = localStorage.getItem(LocalStorageKeys.AUTHORS);
  const genreOptions = parseGenresOption(existingGenres);
  const authorOptions = parseAuthorsOption(existingAuthors);
  return { genreOptions, authorOptions, statusOptions, typeOptions };
};

const statusOptions: SelectOption[] = [
  { id: 1, value: '1', label: 'On Going' },
  { id: 2, value: '2', label: 'Hiatus' },
  { id: 3, value: '3', label: 'Completed' },
];

const typeOptions: SelectOption[] = [
  { id: 1, value: '1', label: 'Manga' },
  { id: 2, value: '2', label: 'Manhwa' },
  { id: 3, value: '3', label: 'Webtoon' },
];

const parseGenresOption = (genresJSON: string | null): SelectOption[] => {
  if (!genresJSON) {
    return [];
  }

  const parsedData = JSON.parse(genresJSON);

  if (!Array.isArray(parsedData)) {
    return [];
  }

  const result = parsedData.map((item: Genre) => ({
    id: +item.id,
    value: item.name || '',
    label: item.name || '',
  }));

  return result;
};

const parseAuthorsOption = (genresJSON: string | null): SelectOption[] => {
  if (!genresJSON) {
    return [];
  }

  const parsedData = JSON.parse(genresJSON);

  if (!Array.isArray(parsedData)) {
    return [];
  }

  const result = parsedData.map((item: Author) => ({
    id: +item.id,
    value: item.name || '',
    label: item.name || '',
  }));

  return result;
};

const postComic = (data: ComicRequest): Promise<PostComicResponse> => {
  const formData = new FormData();
  formData.append('title', data.title);
  if (data.alternativeTitle) formData.append('alternative_title', data.alternativeTitle);
  if (data.authors) {
    data.authors.forEach((author: number) => {
      formData.append('authors', `${author}`);
    });
  }

  if (data.genres) {
    data.genres.forEach((genre: number) => {
      formData.append('genres', `${genre}`);
    });
  }
  formData.append('type', `${data.type}`);
  if (data.published_date) formData.append('published_date', data.published_date);
  formData.append('status', `${data.status}`);
  if (data.thumbnail) formData.append('image_cover', data.thumbnail);
  formData.append('description', data.description);
  return fetch(ApiRoute.COMICS, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)}`,
    },
    body: formData,
  }).then(async (res) => {
    const data = (await res.json()) as PostComicResponse;
    if (!res.ok) {
      throw new Error(`${data.message}`);
    }
    return data;
  });
};

const useComic = () => {
  const { isLoading, error, mutate } = useMutation({
    mutationFn: postComic,
  });
  return { mutate, error, isLoading };
};

export { useOptions, useComic };
