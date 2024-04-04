import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const BASE_URL = publicRuntimeConfig.baseUrl;

export const LocalStorageKeys = {
  ACCESS_TOKEN: 'accessToken',
  USER_INFO: 'userInfo',
  GENRES: 'genres',
  AUTHORS: 'authors',
  TRANSLATORS: 'translators',
  TAGS: 'tags',
  ARTISTS: 'artists',
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
  COMIC_OPTIONS: BASE_URL + '/comics/options',
} as const;

Object.freeze(Routes);
Object.freeze(LocalStorageKeys);
Object.freeze(ApiRoute);
