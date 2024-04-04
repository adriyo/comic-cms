import { ApiRoute, LocalStorageKeys } from '@/utils/constants';
import { useMutation } from 'react-query';
import { LoginRequest, LoginResponse } from './types';
import { ComicOptions } from '../comics/types';

const fetchLogin = (data: LoginRequest): Promise<LoginResponse> =>
  fetch(ApiRoute.LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  }).then((res) => res.json());

const fetchComicOptions = (): Promise<ComicOptions> =>
  fetch(ApiRoute.COMIC_OPTIONS, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const useLogin = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: async (result, variables, context) => {
      if (!result.data) {
        throw Error(result.message);
      }

      localStorage.setItem(LocalStorageKeys.USER_INFO, JSON.stringify(result.data));
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, result.data.token);

      const comicOptionsResult = await fetchComicOptions();
      const genres = comicOptionsResult.genres;
      const authors = comicOptionsResult.authors;
      const tags = comicOptionsResult.tags;
      const artists = comicOptionsResult.artists;
      const translators = comicOptionsResult.translators;

      localStorage.setItem(LocalStorageKeys.GENRES, JSON.stringify(genres));
      localStorage.setItem(LocalStorageKeys.AUTHORS, JSON.stringify(authors));
      localStorage.setItem(LocalStorageKeys.TAGS, JSON.stringify(tags));
      localStorage.setItem(LocalStorageKeys.ARTISTS, JSON.stringify(artists));
      localStorage.setItem(LocalStorageKeys.TRANSLATORS, JSON.stringify(translators));
    },
  });
  return {
    isLoading,
    error,
    data,
    mutate,
  };
};

export { useLogin };
