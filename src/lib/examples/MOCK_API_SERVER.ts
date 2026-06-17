/**
 * MOCK API SERVER - Para Desenvolvimento e Testes
 * 
 * Este arquivo pode ser usado para simular uma API real durante desenvolvimento
 * Útil enquanto você não tem a API backend pronta
 * 
 * COMO USAR:
 * 1. Crie um arquivo em `src/app/api/blog/route.ts` com este conteúdo
 * 2. Configure NEXT_PUBLIC_API_URL=http://localhost:3000 no .env.local
 * 3. A API será servida pela própria aplicação Next.js
 */

// ============================================================
// DADOS MOCKADOS
// ============================================================

const mockPosts = [
  {
    id: '1',
    slug: 'como-reduzir-falhas-na-terceirizacao-de-servicos',
    title: 'Como reduzir falhas na terceirização de serviços e aumentar a previsibilidade operacional',
    category: 'Gestão e Operações',
    date: '12 de maio de 2026',
    readTime: '8 min de leitura',
    excerpt: 'Boas práticas, indicadores e processos que transformam a terceirização em um motor de eficiência, qualidade e segurança.',
    content: '<p>Conteúdo completo do post sobre terceirização...</p>',
    author: 'Equipe LCS',
    imageUrl: 'https://via.placeholder.com/800x600',
    tags: ['terceirização', 'operações', 'eficiência'],
  },
  {
    id: '2',
    slug: 'praticas-para-reduzir-custos-com-facilities',
    title: '5 práticas para reduzir custos operacionais com facilities',
    category: 'Facilities',
    date: '08 de maio de 2026',
    readTime: '4 min de leitura',
    excerpt: 'Dicas aplicáveis para otimizar processos, reduzir desperdícios e melhorar resultados.',
    content: '<p>Conteúdo completo sobre redução de custos...</p>',
    author: 'Equipe LCS',
    imageUrl: 'https://via.placeholder.com/800x600',
    tags: ['custos', 'facilities', 'otimização'],
  },
  {
    id: '3',
    slug: 'limpeza-profissional-pilar-do-negocio',
    title: 'Limpeza profissional: mais que higiene, um pilar do negócio',
    category: 'Limpeza Profissional',
    date: '02 de maio de 2026',
    readTime: '6 min de leitura',
    excerpt: 'Como ambientes limpos aumentam produtividade, segurança e percepção de qualidade.',
    content: '<p>Conteúdo completo sobre limpeza profissional...</p>',
    author: 'Equipe LCS',
    imageUrl: 'https://via.placeholder.com/800x600',
    tags: ['limpeza', 'higiene', 'qualidade'],
  },
  {
    id: '4',
    slug: 'terceirizacao-com-qualidade-como-escolher-parceiro',
    title: 'Terceirização com qualidade: como escolher o parceiro ideal',
    category: 'Contratação de Serviços',
    date: '28 de abril de 2026',
    readTime: '5 min de leitura',
    excerpt: 'Critérios essenciais para avaliar empresas de facilities e garantir uma parceria segura.',
    content: '<p>Conteúdo completo sobre escolha de parceiro...</p>',
    author: 'Equipe LCS',
    imageUrl: 'https://via.placeholder.com/800x600',
    tags: ['parceria', 'qualidade', 'contratação'],
  },
  {
    id: '5',
    slug: 'gestao-de-facilities-em-condominios',
    title: 'Gestão de facilities em condomínios: o que considerar',
    category: 'Condomínios',
    date: '22 de abril de 2026',
    readTime: '4 min de leitura',
    excerpt: 'Boas práticas para garantir segurança, conservação e satisfação dos moradores.',
    content: '<p>Conteúdo completo sobre gestão em condomínios...</p>',
    author: 'Equipe LCS',
    imageUrl: 'https://via.placeholder.com/800x600',
    tags: ['condomínios', 'gestão', 'moradores'],
  },
];

const mockCategories = [
  'Facilities',
  'Limpeza Profissional',
  'Condomínios',
  'Empresas',
  'Gestão Operacional',
  'Contratação de Serviços',
];

// ============================================================
// ENDPOINT: GET /api/blog/posts
// ============================================================

/**
 * Exemplo de rota Next.js 13+ que implementa a API mock
 * 
 * Arquivo: src/app/api/blog/route.ts
 * 
 * export async function GET(request: Request) {
 *   const { searchParams } = new URL(request.url);
 *   
 *   // Parâmetros de query
 *   const category = searchParams.get('category');
 *   const search = searchParams.get('search');
 *   const page = parseInt(searchParams.get('page') || '1');
 *   const limit = parseInt(searchParams.get('limit') || '10');
 *   const sortBy = searchParams.get('sortBy') || 'date';
 *   const order = searchParams.get('order') || 'desc';
 *   
 *   // Filtrar posts
 *   let filtered = [...mockPosts];
 *   
 *   if (category) {
 *     filtered = filtered.filter(p => p.category === category);
 *   }
 *   
 *   if (search) {
 *     const searchLower = search.toLowerCase();
 *     filtered = filtered.filter(p =>
 *       p.title.toLowerCase().includes(searchLower) ||
 *       p.excerpt.toLowerCase().includes(searchLower) ||
 *       p.content?.toLowerCase().includes(searchLower)
 *     );
 *   }
 *   
 *   // Ordenar
 *   filtered.sort((a, b) => {
 *     let aValue: any = a[sortBy as keyof typeof a];
 *     let bValue: any = b[sortBy as keyof typeof b];
 *     
 *     if (typeof aValue === 'string') {
 *       aValue = aValue.toLowerCase();
 *       bValue = bValue.toLowerCase();
 *     }
 *     
 *     if (order === 'asc') {
 *       return aValue > bValue ? 1 : -1;
 *     } else {
 *       return aValue < bValue ? 1 : -1;
 *     }
 *   });
 *   
 *   // Paginar
 *   const total = filtered.length;
 *   const startIndex = (page - 1) * limit;
 *   const paginatedPosts = filtered.slice(startIndex, startIndex + limit);
 *   
 *   return Response.json({
 *     success: true,
 *     data: paginatedPosts,
 *     total,
 *     page,
 *     limit,
 *   });
 * }
 */

// ============================================================
// ENDPOINT: GET /api/blog/posts/:slug
// ============================================================

/**
 * Exemplo de rota dinâmica para um post específico
 * 
 * Arquivo: src/app/api/blog/[slug]/route.ts
 * 
 * export async function GET(
 *   request: Request,
 *   { params }: { params: { slug: string } }
 * ) {
 *   const post = mockPosts.find(p => p.slug === params.slug);
 *   
 *   if (!post) {
 *     return Response.json(
 *       { success: false, error: 'Post not found', message: 'O post não foi encontrado' },
 *       { status: 404 }
 *     );
 *   }
 *   
 *   return Response.json({
 *     success: true,
 *     data: post,
 *   });
 * }
 */

// ============================================================
// ENDPOINT: GET /api/blog/categories
// ============================================================

/**
 * Exemplo de rota para categorias
 * 
 * Arquivo: src/app/api/blog/categories/route.ts
 * 
 * export async function GET(request: Request) {
 *   return Response.json({
 *     success: true,
 *     data: mockCategories,
 *   });
 * }
 */

// ============================================================
// INSTRUÇÕES DE IMPLEMENTAÇÃO
// ============================================================

/**
 * PASSO 1: Criar estrutura de pastas
 * 
 * src/app/api/
 * └── blog/
 *     ├── route.ts (lista de posts)
 *     ├── categories/
 *     │   └── route.ts (categorias)
 *     └── [slug]/
 *         └── route.ts (post individual)
 */

/**
 * PASSO 2: Criar os arquivos com os exemplos acima
 */

/**
 * PASSO 3: Configurar .env.local
 * 
 * NEXT_PUBLIC_API_URL=http://localhost:3000
 */

/**
 * PASSO 4: Testar no navegador
 * 
 * http://localhost:3000/api/blog/posts
 * http://localhost:3000/api/blog/posts?category=Facilities
 * http://localhost:3000/api/blog/posts/como-reduzir-falhas-na-terceirizacao-de-servicos
 * http://localhost:3000/api/blog/categories
 */

/**
 * QUANDO TIVER API REAL:
 * 
 * 1. Mude NEXT_PUBLIC_API_URL para sua API real
 * 2. Delete os arquivos em src/app/api/blog/
 * 3. Os hooks continuarão funcionando normalmente
 */

export { mockPosts, mockCategories };
