import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const BASE_URL = publicRuntimeConfig.baseUrl;

export const LocalStorageKeys = {
  ACCESS_TOKEN: 'accessToken',
  USER_INFO: 'userInfo',
  GENRES: 'genres',
  AUTHORS: 'authors',
} as const;

export const Routes = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  COMICS: '/comics',
  SETTINGS: '/settings',
  PROPERTIES: '/properties',
  CREATE_COMIC: '/comics/create',
  DETAIL_COMIC: '/comics/detail',
  CREATE_CHAPTER: '/comics/chapter/create',
  EDIT_CHAPTER: '/comics/chapter/create',
} as const;

export const ApiRoute = {
  LOGIN: BASE_URL + '/user/login',
  REGISTER: BASE_URL + '/user/register',
  COMICS: BASE_URL + '/comics',
  GENRES: BASE_URL + '/genres',
  AUTHORS: BASE_URL + '/authors',
} as const;

Object.freeze(Routes);
Object.freeze(LocalStorageKeys);
Object.freeze(ApiRoute);
