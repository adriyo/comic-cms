import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useDarkMode = (): [string, Dispatch<SetStateAction<string>>] => {
  const localStorageTheme = typeof window !== 'undefined' ? localStorage.theme : 'light';
  const [theme, setTheme] = useState<string>(localStorageTheme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';
  useEffect(() => {
    if (document === null) {
      return;
    }
    const htmlTag = document.querySelector('html');
    if (htmlTag === null) {
      return;
    }

    if (
      localStorageTheme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    htmlTag.setAttribute('data-theme', colorTheme);
    localStorage.setItem('theme', colorTheme);
  }, [theme, colorTheme, localStorageTheme]);

  return [colorTheme, setTheme];
};

export default useDarkMode;
