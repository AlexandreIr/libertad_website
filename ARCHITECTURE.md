# Arquitetura de Integração - API de Blog

## 📐 Diagrama da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     PÁGINA DE BLOG                           │
│  (src/app/blog/page.tsx, src/app/blog/[slug]/page.tsx)      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ usa
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    HOOKS REACT                              │
│         (src/lib/hooks/useBlog.ts)                          │
│                                                              │
│  • useBlogPosts(filters)                                     │
│  • useBlogPostBySlug(slug)                                   │
│  • useBlogPostsByCategory(category)                          │
│  • useFeaturedBlogPosts(limit)                               │
│  • useLatestBlogPosts(limit)                                 │
│  • useSearchBlogPosts(term)                                  │
│  • useBlogCategories()                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ chama
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  SERVIÇO DE API                             │
│         (src/lib/api/blog.ts)                               │
│                                                              │
│  • getBlogPosts(filters)                                     │
│  • getBlogPostBySlug(slug)                                   │
│  • getBlogPostsByCategory(category)                          │
│  • getFeaturedBlogPosts()                                    │
│  • getLatestBlogPosts()                                      │
│  • searchBlogPosts(term)                                     │
│  • getBlogCategories()                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ faz requisições HTTP
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  API REAL OU MOCK                           │
│                                                              │
│  GET /api/blog/posts                                         │
│  GET /api/blog/posts/:slug                                   │
│  GET /api/blog/categories                                    │
│  etc...                                                      │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Estrutura de Arquivos

```
src/
├── app/
│   └── blog/
│       ├── page.tsx                 ← Usar useBlogPosts()
│       └── [slug]/
│           └── page.tsx             ← Usar useBlogPostBySlug()
│
├── lib/
│   ├── types/
│   │   └── blog.ts                  ← Interfaces TypeScript
│   │
│   ├── api/
│   │   └── blog.ts                  ← Serviço de API
│   │
│   ├── hooks/
│   │   └── useBlog.ts               ← Hooks React
│   │
│   └── examples/
│       ├── BlogComponentExamples.tsx ← Exemplos de uso
│       └── MOCK_API_SERVER.ts        ← Implementação mock
│
└── API_BLOG_INTEGRATION.md          ← Documentação
```

## 🔄 Fluxo de Dados

### Cenário 1: Carregar lista de posts

```
1. Componente monta
2. useLatestBlogPosts() é chamado
3. useEffect() executa
4. getLatestBlogPosts() é chamada
5. fetchFromApi() faz GET /api/blog/posts
6. API retorna { success: true, data: [...] }
7. Hook atualiza state
8. Componente renderiza com os dados
```

### Cenário 2: Buscar post por slug

```
1. URL muda para /blog/meu-post
2. useBlogPostBySlug('meu-post') é chamado
3. useEffect() executa
4. getBlogPostBySlug('meu-post') é chamada
5. fetchFromApi() faz GET /api/blog/posts/meu-post
6. API retorna { success: true, data: {...} }
7. Hook atualiza state
8. Componente renderiza com dados do post
```

### Cenário 3: Filtrar por categoria

```
1. Usuário clica em categoria
2. setFilters({ category: 'Facilities' })
3. useEffect() detecta mudança em filters.category
4. getBlogPosts(filters) é chamada
5. fetchFromApi() com query: ?category=Facilities
6. API retorna posts filtrados
7. Hook atualiza state
8. Componente renderiza novos posts
```

## 🔌 Como Estender

### Criar um novo hook customizado

```typescript
// src/lib/hooks/useBlog.ts

export function usePopularBlogPosts(days: number = 30) {
  const [data, setData] = useState<BlogPostsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiErrorResponse | null>(null);

  useEffect(() => {
    // Sua lógica customizada
    // Pode combinar múltiplos hooks
    // Ou fazer requisições customizadas
  }, [days]);

  return { data, loading, error };
}
```

### Criar um novo endpoint de API

```typescript
// src/lib/api/blog.ts

export async function getRelatedPosts(
  postId: string
): Promise<ApiResponse<BlogPostsResponse>> {
  try {
    const url = `${API_BASE_URL}${API_BLOG_ENDPOINT}/posts/${postId}/related`;
    return await fetchFromApi<BlogPostsResponse>(url);
  } catch (error) {
    return {
      success: false,
      error: 'Falha ao buscar posts relacionados',
      message: 'Não foi possível carregar posts relacionados',
    };
  }
}
```

## ✅ Checklist de Migração

### Pré-requisitos
- [ ] Sua API backend está pronta
- [ ] Você tem a URL base da API
- [ ] Você sabe o formato de resposta

### Implementação
- [ ] Arquivos criados conforme especificado
- [ ] `NEXT_PUBLIC_API_URL` configurado
- [ ] Autenticação implementada (se necessário)
- [ ] Tratamento de erros ajustado

### Testes
- [ ] Testar listagem de posts
- [ ] Testar filtro por categoria
- [ ] Testar busca
- [ ] Testar paginação
- [ ] Testar post individual
- [ ] Testar tratamento de erros
- [ ] Testar loading states

### Deploy
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado na API (se necessário)
- [ ] Testes em produção

## 🐛 Troubleshooting

### Posts não aparecem
- [ ] Verificar `NEXT_PUBLIC_API_URL` em `.env.local`
- [ ] Testar URL da API no navegador
- [ ] Verificar CORS headers da API
- [ ] Ver console para mensagens de erro

### Erro de tipo TypeScript
- [ ] Verificar se resposta da API segue o formato esperado
- [ ] Ajustar tipos em `src/lib/types/blog.ts`
- [ ] Usar `as any` temporariamente para debug

### Performance lenta
- [ ] Aumentar limite de cache
- [ ] Implementar SSR/SSG se possível
- [ ] Otimizar tamanho das respostas da API
- [ ] Implementar paginação

### Erros de autenticação
- [ ] Verificar token no header
- [ ] Validar expiração de token
- [ ] Implementar refresh token se necessário

## 📝 Notas de Desenvolvimento

- Os hooks possuem debounce na busca (300ms)
- Timeouts de requisição: 10 segundos
- Todos os erros são capturados e retornados estruturados
- TypeScript fornece type safety completo
- Componentes podem usar múltiplos hooks simultaneamente

## 🚀 Próximas Etapas

1. **Caching**: Implementar SWR ou React Query
2. **SSR/SSG**: Gerar páginas estáticas com `getStaticProps`
3. **Pré-fetch**: Carregar dados antes de navegar
4. **Offline**: Implementar service worker para cache
5. **Analytics**: Rastrear visualizações de posts
6. **Comentários**: Integrar sistema de comentários
7. **Tags**: Sistema avançado de tags e categorias

---

**Última atualização:** 16 de junho de 2026
**Status:** ✅ Pronto para integração
