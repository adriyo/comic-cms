import { useMutation } from 'react-query';
import { PostComicResponse } from '../../types';
import { ApiRoute, LocalStorageKeys } from '@/utils/constants';
import { ChapterRequest } from './types';

const postChapters = (request: ChapterRequest): Promise<PostComicResponse> => {
  const formData = new FormData();
  formData.append('title', request.title);
  request.images.forEach((file) => {
    formData.append('images', file);
  });

  return fetch(`${ApiRoute.COMICS}/${request.comicId}/chapter`, {
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

const useChapter = () => {
  const { isLoading, error, mutate } = useMutation({
    mutationFn: postChapters,
  });
  return {
    isLoading,
    error,
    mutate,
  };
};

export { useChapter };
