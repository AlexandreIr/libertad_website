/**
 * Hooks customizados para chamadas à API de Blog
 * Facilita o uso de dados da API em componentes React
 */

'use client';

import { useState, useEffect } from 'react';
import {
  BlogPost,
  BlogPostsResponse,
  BlogPostsFilter,
  ApiErrorResponse,
} from '@/lib/types/blog';
import {
  getBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  searchBlogPosts,
  getFeaturedBlogPosts,
  getLatestBlogPosts,
  getBlogCategories,
} from '@/lib/api/blog';

// ============================================================
// TIPOS DO HOOK
// ============================================================

interface UseQueryState<T> {
  data: T | null;
  loading: boolean;
  error: ApiErrorResponse | null;
}

interface UseBlogPostsReturn extends UseQueryState<BlogPostsResponse> {
  refetch: (filters?: BlogPostsFilter) => Promise<void>;
}

interface UseBlogPostReturn extends UseQueryState<BlogPost> {
  refetch: () => Promise<void>;
}

interface UseCategoriesReturn extends UseQueryState<string[]> {
  refetch: () => Promise<void>;
}

// ============================================================
// HOOKS
// ============================================================

/**
 * Hook para buscar posts com filtros
 * 
 * @param filters - Filtros iniciais
 * @returns { data, loading, error, refetch }
 */
export function useBlogPosts(filters?: BlogPostsFilter): UseBlogPostsReturn {
  const [data, setData] = useState<BlogPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const fetchPosts = async (currentFilters?: BlogPostsFilter) => {
    setLoading(true);
    setError(null);

    const response = await getBlogPosts(currentFilters || filters);

    if ('success' in response && response.success) {
      setData(response as BlogPostsResponse);
    } else {
      setError(response as ApiErrorResponse);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [filters?.category, filters?.page, filters?.search]);

  return {
    data,
    loading,
    error,
    refetch: fetchPosts,
  };
}

/**
 * Hook para buscar um post específico pelo slug
 * 
 * @param slug - Slug do post
 * @returns { data, loading, error, refetch }
 */
export function useBlogPostBySlug(slug: string): UseBlogPostReturn {
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);

    const response = await getBlogPostBySlug(slug);

    if ('success' in response && response.success) {
      setData((response as any).data);
    } else {
      setError(response as ApiErrorResponse);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return {
    data,
    loading,
    error,
    refetch: fetchPost,
  };
}

/**
 * Hook para buscar posts por categoria
 * 
 * @param category - Nome da categoria
 * @param limit - Limite de posts
 * @returns { data, loading, error, refetch }
 */
export function useBlogPostsByCategory(
  category: string,
  limit: number = 10
): UseBlogPostsReturn {
  const [data, setData] = useState<BlogPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    const response = await getBlogPostsByCategory(category, limit);

    if ('success' in response && response.success) {
      setData(response as BlogPostsResponse);
    } else {
      setError(response as ApiErrorResponse);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (category) {
      fetchPosts();
    }
  }, [category, limit]);

  return {
    data,
    loading,
    error,
    refetch: fetchPosts,
  };
}

/**
 * Hook para buscar posts em destaque
 * 
 * @param limit - Quantidade de posts
 * @returns { data, loading, error, refetch }
 */
export function useFeaturedBlogPosts(limit: number = 3): UseBlogPostsReturn {
  const [data, setData] = useState<BlogPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    const response = await getFeaturedBlogPosts(limit);

    if ('success' in response && response.success) {
      setData(response as BlogPostsResponse);
    } else {
      setError(response as ApiErrorResponse);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [limit]);

  return {
    data,
    loading,
    error,
    refetch: fetchPosts,
  };
}

/**
 * Hook para buscar posts mais recentes
 * 
 * @param limit - Quantidade de posts
 * @returns { data, loading, error, refetch }
 */
export function useLatestBlogPosts(limit: number = 10): UseBlogPostsReturn {
  const [data, setData] = useState<BlogPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    const response = await getLatestBlogPosts(limit);

    if ('success' in response && response.success) {
      setData(response as BlogPostsResponse);
    } else {
      setError(response as ApiErrorResponse);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [limit]);

  return {
    data,
    loading,
    error,
    refetch: fetchPosts,
  };
}

/**
 * Hook para buscar posts por termo de busca
 * 
 * @param searchTerm - Termo de busca
 * @param limit - Limite de resultados
 * @returns { data, loading, error, refetch }
 */
export function useSearchBlogPosts(
  searchTerm: string,
  limit: number = 10
): UseBlogPostsReturn {
  const [data, setData] = useState<BlogPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    const response = await searchBlogPosts(searchTerm, limit);

    if ('success' in response && response.success) {
      setData(response as BlogPostsResponse);
    } else {
      setError(response as ApiErrorResponse);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      const timer = setTimeout(() => fetchPosts(), 300); // Debounce
      return () => clearTimeout(timer);
    }
  }, [searchTerm, limit]);

  return {
    data,
    loading,
    error,
    refetch: fetchPosts,
  };
}

/**
 * Hook para buscar categorias de posts
 * 
 * @returns { data, loading, error, refetch }
 */
export function useBlogCategories(): UseCategoriesReturn {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    const response = await getBlogCategories();

    if ('success' in response && response.success) {
      setData((response as any).data);
    } else {
      setError(response as ApiErrorResponse);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchCategories,
  };
}
