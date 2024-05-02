import { SelectOption } from '@/components/Input/types';
import { ComicRequest, PostComicResponse } from '../types';
import { ApiRoute, LocalStorageKeys } from '@/utils/constants';
import { useMutation } from 'react-query';

const useOptions = () => {
  const existingGenres = localStorage.getItem(LocalStorageKeys.GENRES);
  const existingAuthors = localStorage.getItem(LocalStorageKeys.AUTHORS);
  const existingTags = localStorage.getItem(LocalStorageKeys.TAGS);
  const existingArtists = localStorage.getItem(LocalStorageKeys.ARTISTS);
  const existingTranslators = localStorage.getItem(LocalStorageKeys.TRANSLATORS);
  const genreOptions = parseOptions(existingGenres);
  const authorOptions = parseOptions(existingAuthors);
  const tagOptions = parseOptions(existingTags);
  const artistOptions = parseOptions(existingArtists);
  const translatorOptions = parseOptions(existingTranslators);
  return {
    genreOptions,
    authorOptions,
    statusOptions,
    typeOptions,
    tagOptions,
    artistOptions,
    translatorOptions,
  };
};

const statusOptions: SelectOption[] = [
  { id: 0, value: '0', label: 'On Going' },
  { id: 1, value: '1', label: 'Completed' },
  { id: 2, value: '2', label: 'Hiatus' },
];

const typeOptions: SelectOption[] = [
  { id: 0, value: '0', label: 'Manga' },
  { id: 1, value: '1', label: 'Manhwa' },
  { id: 2, value: '2', label: 'Manhua' },
  { id: 3, value: '3', label: 'Webtoon' },
];

const parseOptions = (optionsJSON: string | null): SelectOption[] => {
  if (!optionsJSON) {
    return [];
  }

  const parsedData = JSON.parse(optionsJSON);

  if (!Array.isArray(parsedData)) {
    return [];
  }

  const result = parsedData.map((item: SelectOption) => ({
    id: +item.id,
    value: `${item.id}` || '',
    label: item.name || '',
  }));

  return result;
};

const postComic = (data: ComicRequest): Promise<PostComicResponse> => {
  const formData = new FormData();
  formData.append('title', data.title);
  if (data.alternativeTitle) formData.append('alternative_title', data.alternativeTitle);
  if (data.authors) {
    data.authors.forEach((id: number) => {
      formData.append('authors', `${id}`);
    });
  }
  if (data.newAuthors) {
    data.newAuthors.forEach((name: string) => {
      formData.append('new_authors', `${name}`);
    });
  }

  if (data.genres) {
    data.genres.forEach((id: number) => {
      formData.append('genres', `${id}`);
    });
  }

  if (data.newGenres) {
    data.newGenres.forEach((name: string) => {
      formData.append('new_genres', `${name}`);
    });
  }

  if (data.tags) {
    data.tags.forEach((id: number) => {
      formData.append('tags', `${id}`);
    });
  }

  if (data.newTags) {
    data.newTags.forEach((name: string) => {
      formData.append('new_tags', `${name}`);
    });
  }

  if (data.artists) {
    data.artists.forEach((id: number) => {
      formData.append('artists', `${id}`);
    });
  }

  if (data.newArtists) {
    data.newArtists.forEach((name: string) => {
      formData.append('new_artists', `${name}`);
    });
  }

  if (data.translators) {
    data.translators.forEach((id: number) => {
      formData.append('translators', `${id}`);
    });
  }

  if (data.newTranslators) {
    data.newTranslators.forEach((name: string) => {
      formData.append('new_translators', `${name}`);
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
