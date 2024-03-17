import { ApiRoute } from '@/utils/constants';
import { useMutation } from 'react-query';
import { RegisterRequest } from './types';

const fetchRegister = (data: RegisterRequest) =>
  fetch(ApiRoute.REGISTER, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const useRegister = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationFn: fetchRegister,
    onSuccess: (result, variables, context) => {
      if (!result.data) {
        throw Error(result.message);
      }
    },
  });
  return {
    isLoading,
    error,
    data,
    mutate,
  };
};

export { useRegister };
