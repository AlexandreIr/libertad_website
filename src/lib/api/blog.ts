import {
  BlogPost,
  BlogPostsResponse,
  BlogPostResponse,
  BlogPostsFilter,
  ApiErrorResponse,
} from '@/lib/types/blog';

// ============================================================
// CONFIGURAÇÃO DA API
// ============================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.seu-dominio.com';
const API_BLOG_ENDPOINT = '/api/blog';
const API_TIMEOUT = 10000; // 10 segundos

// ============================================================
// TIPOS INTERNOS
// ============================================================

type ApiResponse<T> = T | ApiErrorResponse;

// ============================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================

/**
 * Verifica se a resposta é um erro
 */
function isApiError(response: any): response is ApiErrorResponse {
  return response && response.success === false;
}

/**
 * Constrói a URL com query parameters
 */
function buildUrl(endpoint: string, params?: Record<string, any>): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Realiza uma requisição genérica com tratamento de erros
 */
export async function fetchFromApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Falha ao conectar à API',
      status: 500,
    };
  }
}

// ============================================================
// SERVIÇOS DE BLOG
// ============================================================

/**
 * Obtém todos os posts do blog com filtros opcionais
 * 
 * @param filters - Filtros opcionais (categoria, busca, paginação, etc.)
 * @returns Promise com lista de posts ou erro
 */
export async function getBlogPosts(
  filters?: BlogPostsFilter
): Promise<ApiResponse<BlogPostsResponse>> {
  try {
    const url = buildUrl(`${API_BLOG_ENDPOINT}/posts`, {
      category: filters?.category,
      search: filters?.search,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      sortBy: filters?.sortBy || 'date',
      order: filters?.order || 'desc',
    });

    return await fetchFromApi<BlogPostsResponse>(url);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      success: false,
      error: 'Falha ao buscar posts',
      message: 'Não foi possível carregar os posts do blog',
    };
  }
}

/**
 * Obtém um post específico pelo slug
 * 
 * @param slug - O slug/identificador único do post
 * @returns Promise com os dados completos do post ou erro
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<ApiResponse<BlogPostResponse>> {
  try {
    const url = `${API_BASE_URL}${API_BLOG_ENDPOINT}/posts/${slug}`;
    return await fetchFromApi<BlogPostResponse>(url);
  } catch (error) {
    console.error(`Error fetching blog post (${slug}):`, error);
    return {
      success: false,
      error: 'Post não encontrado',
      message: `Não foi possível carregar o post: ${slug}`,
    };
  }
}

/**
 * Obtém posts por categoria
 * 
 * @param category - Nome da categoria
 * @param limit - Limite de posts a retornar
 * @returns Promise com lista de posts da categoria
 */
export async function getBlogPostsByCategory(
  category: string,
  limit: number = 10
): Promise<ApiResponse<BlogPostsResponse>> {
  return getBlogPosts({
    category,
    limit,
    page: 1,
  });
}

/**
 * Busca posts por termo de busca
 * 
 * @param searchTerm - Termo de busca
 * @param limit - Limite de resultados
 * @returns Promise com lista de posts encontrados
 */
export async function searchBlogPosts(
  searchTerm: string,
  limit: number = 10
): Promise<ApiResponse<BlogPostsResponse>> {
  return getBlogPosts({
    search: searchTerm,
    limit,
    page: 1,
  });
}

/**
 * Obtém posts em destaque/featured
 * 
 * @param limit - Quantidade de posts featured
 * @returns Promise com lista de posts em destaque
 */
export async function getFeaturedBlogPosts(
  limit: number = 3
): Promise<ApiResponse<BlogPostsResponse>> {
  try {
    const url = buildUrl(`${API_BLOG_ENDPOINT}/posts/featured`, {
      limit,
    });

    return await fetchFromApi<BlogPostsResponse>(url);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return {
      success: false,
      error: 'Falha ao buscar posts em destaque',
      message: 'Não foi possível carregar os posts em destaque',
    };
  }
}

/**
 * Obtém os posts mais recentes
 * 
 * @param limit - Quantidade de posts recentes
 * @returns Promise com lista dos posts mais recentes
 */
export async function getLatestBlogPosts(
  limit: number = 10
): Promise<ApiResponse<BlogPostsResponse>> {
  return getBlogPosts({
    limit,
    sortBy: 'date',
    order: 'desc',
    page: 1,
  });
}

/**
 * Obtém todas as categorias disponíveis
 * 
 * @returns Promise com lista de categorias
 */
export async function getBlogCategories(): Promise<
  ApiResponse<{ success: boolean; data: string[] }>
> {
  try {
    const url = `${API_BASE_URL}${API_BLOG_ENDPOINT}/categories`;
    return await fetchFromApi(url);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return {
      success: false,
      error: 'Falha ao buscar categorias',
      message: 'Não foi possível carregar as categorias',
    };
  }
}
