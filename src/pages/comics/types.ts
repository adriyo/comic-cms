export type Comic = {
  id: number;
  slugId: string;
  title: string;
  author: string;
  updatedAt: string;
  thumbnail?: string;
  publicationYear: number;
  rating: number;
  tags?: Tag[];
  status?: string;
  artist?: Artist[];
  description?: string;
  genres?: Genre[];
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
