import { ApiRoute, LocalStorageKeys } from '@/utils/constants';
import { useMutation, useQuery } from 'react-query';
import { LoginRequest, LoginResponse } from './types';
import { Author, Genre } from '../comics/types';

const fetchLogin = (data: LoginRequest): Promise<LoginResponse> =>
  fetch(ApiRoute.LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  }).then((res) => res.json());

const fetchGenres = (): Promise<Genre[]> =>
  fetch(ApiRoute.GENRES, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const fetchAuthors = (): Promise<Author[]> =>
  fetch(ApiRoute.AUTHORS, {
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

      const genres = await fetchGenres();
      const authors = await fetchAuthors();
      localStorage.setItem(LocalStorageKeys.GENRES, JSON.stringify(genres));
      localStorage.setItem(LocalStorageKeys.AUTHORS, JSON.stringify(authors));
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
