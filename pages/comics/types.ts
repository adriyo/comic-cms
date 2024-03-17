import { SelectOption } from '@/components/Input/types';

export type Comic = {
  id: string;
  title: string;
  author: SelectOption;
  updatedAt: string;
  thumbnail?: string;
  image_cover: string | null;
  published_date: string | null;
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

export type ComicsResponse = {
  data: Comic[];
  total_pages: number;
  totalCount: number;
  message: string;
};

export interface ChapterResponse {
  data: Chapter[];
  totalPage: number;
  totalCount: number;
}

export interface PagingRequest {
  page: number;
  limit: number;
}
