import { Chapter, Comic, Genre } from './types';

export const generateRandomSlugId = (): string => {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}${randomPart}`;
};

export const generateDummyChapters = () => {
  let list: Chapter[] = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      id: i + 1,
      title: 'Chapter ' + (i + 1),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    });
  }
  return list;
};
