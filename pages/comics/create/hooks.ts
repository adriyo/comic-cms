import { SelectOption } from '@/components/Input/types';
import { Author, Genre } from '../types';
import { LocalStorageKeys } from '@/utils/constants';

const useOptions = () => {
  const existingGenres = localStorage.getItem(LocalStorageKeys.GENRES);
  const existingAuthors = localStorage.getItem(LocalStorageKeys.AUTHORS);
  const genreOptions = parseGenresOption(existingGenres);
  const authorOptions = parseAuthorsOption(existingAuthors);
  return { genreOptions, authorOptions, statusOptions };
};

const statusOptions: SelectOption[] = [
  { id: 1, value: 'ongoing', label: 'On Going' },
  { id: 2, value: 'hiatus', label: 'Hiatus' },
  { id: 3, value: 'ongoing', label: 'Completed' },
];

const parseGenresOption = (genresJSON: string | null): SelectOption[] => {
  if (!genresJSON) {
    return [];
  }

  const parsedData = JSON.parse(genresJSON);

  if (!Array.isArray(parsedData)) {
    return [];
  }

  const result = parsedData.map((item: Genre) => ({
    id: +item.id,
    value: item.name || '',
    label: item.name || '',
  }));

  return result;
};

const parseAuthorsOption = (genresJSON: string | null): SelectOption[] => {
  if (!genresJSON) {
    return [];
  }

  const parsedData = JSON.parse(genresJSON);

  if (!Array.isArray(parsedData)) {
    return [];
  }

  const result = parsedData.map((item: Author) => ({
    id: +item.id,
    value: item.name || '',
    label: item.name || '',
  }));

  return result;
};

export { useOptions };
