import { ApiRoute, LocalStorageKeys } from '@/utils/constants';
import { useMutation } from 'react-query';
import { LoginRequest, LoginResponse } from './types';

const fetchLogin = (data: LoginRequest): Promise<LoginResponse> =>
  fetch(ApiRoute.LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  }).then((res) => res.json());

const useLogin = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (result, variables, context) => {
      if (!result.data) {
        throw Error(result.message);
      }

      localStorage.setItem(LocalStorageKeys.USER_INFO, JSON.stringify(result.data));
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, result.data.token);
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
