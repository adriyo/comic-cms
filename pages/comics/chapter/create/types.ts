export interface ChapterRequest {
  comicId: string;
  chapterId?: string;
  title: string;
  images: File[];
  deletedImages?: number[];
}

export interface ChapterImage {
  id?: number;
  index?: number;
  url?: string;
  file?: File;
}

export interface ChapterImageResponse {
  title: string;
  images: ChapterImage[];
}
