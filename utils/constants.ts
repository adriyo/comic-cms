export const LocalStorageKeys = {
  ACCESS_TOKEN: 'accessToken',
  USER_INFO: 'userInfo',
} as const;

export const Routes = {
  MAIN: '/',
  LOGIN: '/login',
  COMICS: '/comics',
  SETTINGS: '/settings',
  PROPERTIES: '/properties',
  CREATE_COMIC: '/comics/create',
  DETAIL_COMIC: '/comics/detail',
  CREATE_CHAPTER: '/comics/chapter/create',
  EDIT_CHAPTER: '/comics/chapter/create',
} as const;
