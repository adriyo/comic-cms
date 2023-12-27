import { SelectOption } from '@/components/Input/types';

export type Comic = {
  id: string;
  title: string;
  author: SelectOption;
  updatedAt: string;
  thumbnail?: string;
  publicationYear: Date;
  rating?: number;
  tags?: Tag[];
  status?: string;
  artist?: SelectOption[];
  description?: string;
  genres?: SelectOption[];
};

export type Genre = {
  id: string;
  title: string;
};

export type Chapter = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type Artist = {
  id: number;
  name: string;
};

export type Tag = {
  id: number;
  label: string;
};

export type ComicRequest = {
  title: string;
  author: SelectOption;
  thumbnail: File;
  publicationYear: Date;
  status: string;
  description?: string;
  genre: SelectOption;
};
