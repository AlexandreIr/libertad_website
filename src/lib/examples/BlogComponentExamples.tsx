/**
 * EXEMPLO DE USO - Componente de Blog com API Real
 * 
 * Este arquivo é apenas para referência
 * Pode ser deletado ou mantido como documentação
 * 
 * Mostra como usar os hooks da API em componentes reais
 */

'use client';

import { useBlogPosts, useBlogCategories, useBlogPostBySlug } from '@/lib/hooks/useBlog';
import { BlogPostsFilter } from '@/lib/types/blog';
import { useState } from 'react';

/**
 * Exemplo 1: Componente simples que lista posts
 */
export function SimpleBlogList() {
  const { data: response, loading, error } = useBlogPosts();

  if (loading) {
    return <div className="text-center py-8">Carregando posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Erro ao carregar posts</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (!response?.data || response.data.length === 0) {
    return <div className="text-center py-8">Nenhum post encontrado</div>;
  }

  return (
    <div className="grid gap-5">
      {response.data.map((post) => (
        <div key={post.slug} className="p-4 border rounded-lg">
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-500">{post.date}</span>
            <span className="text-xs bg-blue-100 px-2 py-1 rounded">
              {post.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Exemplo 2: Componente com filtros e paginação
 */
export function AdvancedBlogList() {
  const [filters, setFilters] = useState<BlogPostsFilter>({
    page: 1,
    limit: 10,
    sortBy: 'date',
    order: 'desc',
  });

  const { data: response, loading, error, refetch } = useBlogPosts(filters);
  const { data: categories } = useBlogCategories();

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category: category === 'Todos' ? undefined : category,
      page: 1,
    });
  };

  const handleSearch = (searchTerm: string) => {
    setFilters({
      ...filters,
      search: searchTerm,
      page: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  if (loading) {
    return <div className="text-center py-8">Carregando posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Erro ao carregar posts</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="space-y-4">
        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar posts..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Categorias */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('Todos')}
            className={`px-3 py-1 rounded text-sm ${
              !filters.category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Todos
          </button>
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded text-sm ${
                filters.category === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="grid gap-5">
        {response?.data && response.data.length > 0 ? (
          response.data.map((post) => (
            <div key={post.slug} className="p-4 border rounded-lg">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">
                  {post.date} • {post.readTime}
                </span>
                <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">Nenhum post encontrado</div>
        )}
      </div>

      {/* Paginação */}
      {response && response.total && response.total > 0 && (
        <div className="flex justify-center gap-2">
          {Array.from({
            length: Math.ceil(response.total / (filters.limit || 10)),
          }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                filters.page === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Exemplo 3: Componente de Featured Posts (3 posts em destaque)
 */
export function FeaturedBlogPosts() {
  const { data: response, loading, error } = useBlogPosts({ limit: 3 });

  if (loading) {
    return <div className="text-center py-8">Carregando posts destacados...</div>;
  }

  if (error || !response?.data || response.data.length === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {response.data.map((post) => (
        <div
          key={post.slug}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600" />
          <div className="p-6">
            <span className="text-xs font-bold text-blue-600 uppercase">
              {post.category}
            </span>
            <h3 className="font-bold text-lg mt-2 line-clamp-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className="text-xs text-gray-500">{post.date}</span>
              <span className="text-xs text-gray-500">{post.readTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Exemplo 4: Componente para exibir um post individual
 */
interface BlogPostDetailProps {
  slug: string;
}

export function BlogPostDetail({ slug }: BlogPostDetailProps) {
  const { data: post, loading, error } = useBlogPostBySlug(slug);

  if (loading) {
    return <div className="text-center py-8">Carregando post...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Post não encontrado</p>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <span className="text-sm font-bold text-blue-600 uppercase">
          {post.category}
        </span>
        <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
        <div className="flex gap-4 mt-4 text-gray-600 text-sm">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          {post.author && (
            <>
              <span>•</span>
              <span>Por {post.author}</span>
            </>
          )}
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p>{post.excerpt}</p>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <footer className="mt-8 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 px-3 py-1 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}

/**
 * Exemplo 5: Hook customizado para usecase específico
 * 
 * Você pode criar seus próprios hooks combinando os hooks base
 */
export function useBlogPostsByTag(tag: string) {
  // Este é apenas um exemplo. Você pode criar hooks mais específicos
  // Se sua API suportar filtro por tags
  return useBlogPosts({
    // Aqui você pode adicionar filtros específicos
    limit: 10,
  });
}
