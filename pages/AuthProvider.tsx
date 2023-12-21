import { LocalStorageKeys, Routes } from '@/utils/constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (router.pathname === '/login' || router.pathname === '/') {
        setIsAuthenticated(true);
      } else if (!localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)) {
        router.push(Routes.LOGIN);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }
  return children;
};

export default AuthProvider;
