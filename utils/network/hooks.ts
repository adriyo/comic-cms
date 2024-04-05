import { LocalStorageKeys } from '../constants';
import { ErrorResponse } from './types';

const getErrorMessage = async (res: Response): Promise<string> => {
  let errorMessage: string;
  try {
    const response = (await res.json()) as ErrorResponse;
    errorMessage = response.message;
  } catch (error) {
    errorMessage = 'An error occurred';
  }
  return errorMessage;
};

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string>;
  includeAuthorization?: boolean;
}

interface FetchOptions<T> {
  url: string;
  requestOptions?: RequestOptions;
  onSuccess?: (data: T) => void;
}

const useFetch = <T>({ url, requestOptions, onSuccess }: FetchOptions<T>) => {
  const defaultRequestOptions: RequestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    includeAuthorization: true,
  };

  const mergedOptions: RequestOptions = {
    ...defaultRequestOptions,
    ...requestOptions,
  };

  const { method, headers, includeAuthorization, body } = mergedOptions;
  if (includeAuthorization) {
    const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    if (accessToken) {
      headers.Authorization = `Basic ${accessToken}`;
    }
  }

  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  }).then(async (res) => {
    if (!res.ok) {
      throw Error(await getErrorMessage(res));
    }
    const result = res.json() as Promise<T>;
    if (onSuccess) onSuccess(await result);
    return result;
  });
};

export { getErrorMessage, useFetch };
