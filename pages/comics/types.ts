import { SelectOption } from '@/components/Input/types';

export interface Comic {
  id: string;
  title: string;
  authors: Author[];
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
}

export interface Author {
  id: number;
  name: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Chapter {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  label: string;
}

export interface ComicRequest {
  title: string;
  alternativeTitle?: string;
  authors?: number[];
  thumbnail?: File;
  published_date?: string;
  status: number;
  type: number;
  description: string;
  genres?: number[];
}

export interface ComicsResponse {
  data: Comic[];
  total_pages: number;
  totalCount: number;
  message: string;
}

export interface ChapterResponse {
  data: Chapter[];
  totalPage: number;
  totalCount: number;
}

export interface PagingRequest {
  page: number;
  limit: number;
}

export interface PostComicResponse {
  errors: {
    [key: string]: string;
  };
  message?: string;
}
