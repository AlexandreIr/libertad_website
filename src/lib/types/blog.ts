/**
 * Interface para um post do blog
 * Estrutura que será retornada pela API real
 */
export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content?: string; // Para página individual do post
  author?: string;
  imageUrl?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Resposta da API para listagem de posts
 */
export interface BlogPostsResponse {
  success: boolean;
  data: BlogPost[];
  total: number;
  page?: number;
  limit?: number;
  message?: string;
}

/**
 * Resposta da API para um post individual
 */
export interface BlogPostResponse {
  success: boolean;
  data: BlogPost;
  message?: string;
}

/**
 * Parâmetros para filtrar posts
 */
export interface BlogPostsFilter {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'title' | 'readTime';
  order?: 'asc' | 'desc';
}

/**
 * Resposta de erro da API
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  status?: number;
}