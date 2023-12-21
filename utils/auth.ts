import { LocalStorageKeys } from './constants';

export interface User {
  id: number;
  name: string;
  role: number;
}

export const getUserInfo = (): User | null => {
  const userInfoString = localStorage.getItem(LocalStorageKeys.USER_INFO);
  if (userInfoString) {
    try {
      let userInfo = JSON.parse(userInfoString) as User;
      return userInfo;
    } catch (error) {
      return null;
    }
  }

  return null;
};
