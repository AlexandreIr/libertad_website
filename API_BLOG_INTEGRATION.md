# Integração de API de Blog - Instruções de Implementação

## 📋 Visão Geral

Este projeto possui uma estrutura preparada para integração com uma API real de blog. Atualmente, os dados são mockados no arquivo `src/data/site.ts`. As instruções abaixo mostram como fazer a transição para uma API real sem problemas.

## 📁 Arquivos Criados

### 1. **`src/lib/types/blog.ts`**
   - Define as interfaces TypeScript para dados do blog
   - Exporta: `BlogPost`, `BlogPostsResponse`, `BlogPostResponse`, `BlogPostsFilter`, `ApiErrorResponse`

### 2. **`src/lib/api/blog.ts`**
   - Camada de abstração para chamadas à API
   - Funções exportadas:
     - `getBlogPosts(filters?)` - Obtém posts com filtros
     - `getBlogPostBySlug(slug)` - Obtém um post específico
     - `getBlogPostsByCategory(category, limit)` - Posts de uma categoria
     - `searchBlogPosts(term, limit)` - Busca por termo
     - `getFeaturedBlogPosts(limit)` - Posts em destaque
     - `getLatestBlogPosts(limit)` - Posts mais recentes
     - `getBlogCategories()` - Lista de categorias

### 3. **`src/lib/hooks/useBlog.ts`**
   - Hooks React customizados para usar a API
   - Hooks disponíveis:
     - `useBlogPosts(filters)` - Busca posts com filtros
     - `useBlogPostBySlug(slug)` - Obtém post pelo slug
     - `useBlogPostsByCategory(category, limit)` - Posts da categoria
     - `useFeaturedBlogPosts(limit)` - Posts em destaque
     - `useLatestBlogPosts(limit)` - Posts recentes
     - `useSearchBlogPosts(term, limit)` - Busca
     - `useBlogCategories()` - Categorias

## 🔧 Passo a Passo para Implementação

### Passo 1: Configurar a API Base URL

No arquivo `.env.local` (ou `.env.production`), adicione:

```env
NEXT_PUBLIC_API_URL=https://sua-api.com
```

### Passo 2: Atualizar Endpoints (se necessário)

No arquivo `src/lib/api/blog.ts`, linha ~18:

```typescript
const API_BLOG_ENDPOINT = '/api/blog'; // Ajuste conforme sua API
```

### Passo 3: Implementar Autenticação

Se sua API requer autenticação, atualize a função `fetchFromApi` (~70):

```typescript
async function fetchFromApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('auth_token'); // ou seu método
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      ...options,
      signal: controller.signal,
    });
    // ... resto do código
  }
}
```

### Passo 4: Substituir Dados Mockados na Página de Blog

**Arquivo:** `src/app/blog/page.tsx`

**Antes (dados mockados):**
```typescript
import { posts } from '@/data/site';

export default function BlogPage() {
  const featured = posts[0];
  // ... resto do código usa `posts`
}
```

**Depois (API real):**
```typescript
'use client';

import { useLatestBlogPosts, useBlogCategories } from '@/lib/hooks/useBlog';

export default function BlogPage() {
  const { data: postsResponse, loading, error } = useLatestBlogPosts(10);
  const { data: categories, loading: categoriesLoading } = useBlogCategories();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent error={error} />;
  
  const posts = postsResponse?.data || [];
  const featured = posts[0];
  
  // ... resto do código
}
```

### Passo 5: Substituir Posts Individuais

**Arquivo:** `src/app/blog/[slug]/page.tsx`

**Antes:**
```typescript
import { posts } from '@/data/site';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);
}
```

**Depois:**
```typescript
'use client';

import { useBlogPostBySlug } from '@/lib/hooks/useBlog';

export default function PostPage({ params }: { params: { slug: string } }) {
  const { data: post, loading, error } = useBlogPostBySlug(params.slug);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent error={error} />;
  
  // ... resto do código
}
```

## 📊 Formato Esperado de Resposta da API

Sua API deve retornar dados no seguinte formato:

### GET `/api/blog/posts`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-ou-id",
      "slug": "titulo-do-post",
      "title": "Título do Post",
      "category": "Facilities",
      "date": "15 de junho de 2026",
      "readTime": "5 min de leitura",
      "excerpt": "Descrição breve do post...",
      "content": "Conteúdo completo do post (opcional)",
      "author": "Nome do Autor",
      "imageUrl": "https://...",
      "tags": ["tag1", "tag2"]
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

### GET `/api/blog/posts/:slug`
```json
{
  "success": true,
  "data": {
    "id": "uuid-ou-id",
    "slug": "titulo-do-post",
    "title": "Título do Post",
    "category": "Facilities",
    "date": "15 de junho de 2026",
    "readTime": "5 min de leitura",
    "excerpt": "Descrição breve...",
    "content": "Conteúdo completo do post",
    "author": "Nome do Autor",
    "imageUrl": "https://...",
    "tags": ["tag1", "tag2"]
  }
}
```

### GET `/api/blog/categories`
```json
{
  "success": true,
  "data": [
    "Facilities",
    "Limpeza Profissional",
    "Condomínios",
    "Empresas",
    "Gestão Operacional"
  ]
}
```

## 🎨 Exemplo de Uso em Componente

```typescript
'use client';

import { useBlogPosts } from '@/lib/hooks/useBlog';
import { PostCard } from '@/components/Cards';

export function BlogList() {
  const { data, loading, error, refetch } = useBlogPosts({
    page: 1,
    limit: 10,
    sortBy: 'date',
    order: 'desc'
  });

  if (loading) return <div>Carregando posts...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  if (!data?.data.length) return <div>Nenhum post encontrado</div>;

  return (
    <div className="grid gap-5">
      {data.data.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  );
}
```

## 🚨 Tratamento de Erros

Todas as funções da API retornam um objeto com a seguinte estrutura:

```typescript
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  status?: number;
}
```

**Exemplo de tratamento:**
```typescript
const response = await getBlogPosts();

if ('success' in response && response.success) {
  // Sucesso
  console.log(response.data);
} else {
  // Erro
  console.error(response.error, response.message);
}
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API
NEXT_PUBLIC_API_URL=https://api.seu-dominio.com

# Opcional: Autenticação
NEXT_PUBLIC_API_TOKEN=seu-token-aqui
```

## ✅ Checklist de Implementação

- [ ] Arquivo `.env.local` configurado com `NEXT_PUBLIC_API_URL`
- [ ] API retorna dados no formato especificado
- [ ] Autenticação implementada (se necessária)
- [ ] `src/app/blog/page.tsx` atualizado para usar hooks
- [ ] `src/app/blog/[slug]/page.tsx` atualizado para usar hooks
- [ ] Página testada em desenvolvimento
- [ ] Testar filtros, busca e paginação
- [ ] Verificar tratamento de erros
- [ ] Deploy com variáveis de ambiente corretas

## 🔄 Voltar para Dados Mockados

Se precisar voltar temporariamente para dados mockados, você pode:

1. Criar uma função wrapper que retorna dados mockados
2. Ou comentar os imports de hooks e voltar a usar `import { posts } from '@/data/site'`

## 📞 Suporte

Para dúvidas sobre a implementação:
- Verifique o arquivo `src/lib/api/blog.ts` para documentação detalhada
- Consulte os types em `src/lib/types/blog.ts`
- Use o Intellisense do seu editor para explorar as funções disponíveis

---

**Status:** ✅ Estrutura pronta para integração
**Última atualização:** 16 de junho de 2026
