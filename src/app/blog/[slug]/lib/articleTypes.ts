export type Category = {
  id?: number;
  name: string;
  slug?: string;
};

export type ApiPost = {
  id?: number;
  title?: string;
  slug?: string;

  summary?: string;
  sumary?: string;
  excerpt?: string;
  content?: string;

  coverImageUrl?: string;
  coverImage?: string;
  image?: string;

  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  readTime?: string;
  readingTime?: string;

  category?: Category;
  categories?: Category[] | Category;
};

export type BlogPost = {
  id?: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  publishedAt: string;
  readTime: string;
  categories: Category[];
};

export type PagedResponse<T> = {
  content?: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  page?: number;
  size?: number;
};

export type HeadingItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  number: string;
};

export type ApiComment = {
  id?: number;
  authorName?: string;
  authorEmail?: string;
  content?: string;
  createdAt?: string;
  approved?: boolean;
  status?: string;
};

export type BlogComment = {
  id: number | string;
  authorName: string;
  content: string;
  createdAt: string;
};