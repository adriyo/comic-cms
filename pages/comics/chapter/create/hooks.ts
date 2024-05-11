import { useMutation, useQuery } from 'react-query';
import { PostComicResponse } from '../../types';
import { ApiRoute, LocalStorageKeys } from '@/utils/constants';
import { ChapterImageResponse, ChapterRequest } from './types';
import { useFetch } from '@/utils/network/hooks';

const postChapters = (request: ChapterRequest): Promise<PostComicResponse> => {
  const formData = new FormData();
  formData.append('title', request.title);
  request.images.forEach((file) => {
    formData.append('images', file);
  });

  if (request.deletedImages) {
    request.deletedImages.forEach((id) => {
      formData.append('deleted_image_ids', `${id}`);
    });
  }
  const idPrefixUrl: string = request.chapterId ? `/${request.chapterId}` : '';
  return fetch(`${ApiRoute.COMICS}/${request.comicId}/chapter${idPrefixUrl}`, {
    method: request.chapterId ? 'PUT' : 'POST',
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

const useFetchDetail = (comicId?: string, chapterId?: string) => {
  const { isLoading, error, data, refetch } = useQuery<ChapterImageResponse, Error>({
    queryKey: ['chapter-detail', comicId],
    queryFn: () =>
      useFetch<ChapterImageResponse>({ url: `${ApiRoute.COMICS}/${comicId}/chapter/${chapterId}` }),
    enabled: false,
    keepPreviousData: true,
  });
  return { data, isLoading, error, refetch };
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

export { useChapter, useFetchDetail };
