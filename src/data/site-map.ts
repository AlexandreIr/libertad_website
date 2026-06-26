import type { MetadataRoute } from 'next';
import { navItems, posts, segments, services, siteConfig } from '@/data/site';

export type SiteMapFrequency = NonNullable<
  MetadataRoute.Sitemap[number]['changeFrequency']
>;

export type SiteMapLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  priority?: number;
  changeFrequency?: SiteMapFrequency;

  /**
   * Use false quando o link deve aparecer apenas na página visual,
   * mas não no sitemap XML.
   *
   * Exemplo: /blog?categoria=facilities
   */
  includeInXml?: boolean;
};

export type SiteMapGroup = {
  title: string;
  description: string;
  links: SiteMapLink[];
};

const normalizePath = (path: string) => {
  if (path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
};

const buildUrl = (path: string) => {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const normalizedPath = normalizePath(path);

  return normalizedPath === '/' ? baseUrl : `${baseUrl}${normalizedPath}`;
};

const toSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const uniquePostCategories = Array.from(
  new Set(posts.map((post) => post.category)),
).sort((a, b) => a.localeCompare(b, 'pt-BR'));

export const staticSitePages: SiteMapLink[] = [
  {
    label: 'Home',
    href: '/',
    description:
      'Página inicial com visão geral da LCS, serviços, segmentos, diferenciais e chamada para orçamento.',
    priority: 1,
    changeFrequency: 'weekly',
  },

  ...navItems.map((item) => ({
    label: item.label,
    href: item.href,
    description: getStaticPageDescription(item.href),
    priority: getStaticPagePriority(item.href),
    changeFrequency: getStaticPageFrequency(item.href),
  })),

  {
    label: 'Mapa do Site',
    href: '/mapa-do-site',
    description:
      'Índice navegável com as principais páginas, serviços, segmentos e artigos do site.',
    priority: 0.4,
    changeFrequency: 'weekly',
  },

  {
    label: 'Política de Privacidade',
    href: '/politica-de-privacidade',
    description:
      'Informações sobre privacidade, tratamento de dados e canais de contato.',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
];

export function getSiteMapGroups(): SiteMapGroup[] {
  return [
    {
      title: 'Páginas',
      description:
        'Principais áreas institucionais, comerciais e de relacionamento da LCS.',
      links: staticSitePages,
    },

    {
      title: 'Serviços',
      description:
        'Soluções operacionais e comerciais apresentadas no site.',
      links: services.map((service) => ({
        label: service.title,
        href: `/servicos/${service.slug}`,
        description: service.short,
        badge: 'Serviço',
        priority: 0.85,
        changeFrequency: 'monthly',
      })),
    },

    {
      title: 'Segmentos',
      description:
        'Páginas por tipo de operação atendida pela LCS.',
      links: segments.map((segment) => ({
        label: segment.title,
        href: `/segmentos/${segment.slug}`,
        description: segment.description,
        badge: 'Segmento',
        priority: 0.8,
        changeFrequency: 'monthly',
      })),
    },

    {
      title: 'Artigos do Blog',
      description:
        'Conteúdos editoriais sobre facilities, terceirização, limpeza profissional e gestão operacional.',
      links: posts.map((post) => ({
        label: post.title,
        href: `/blog/${post.slug}`,
        description: post.excerpt,
        badge: post.category,
        priority: 0.7,
        changeFrequency: 'weekly',
      })),
    },

    {
      title: 'Categorias do Blog',
      description:
        'Agrupamentos editoriais para facilitar a navegação pelos temas do blog.',
      links: uniquePostCategories.map((category) => ({
        label: category,
        href: `/blog?categoria=${toSlug(category)}`,
        description: `Artigos publicados na categoria ${category}.`,
        badge: 'Categoria',
        includeInXml: false,
      })),
    },
  ];
}

export function getFlatSiteMapLinks({
  includeVisualOnly = false,
}: { includeVisualOnly?: boolean } = {}) {
  const links = getSiteMapGroups().flatMap((group) => group.links);

  return links.filter((link, index, allLinks) => {
    const isFirstOccurrence =
      allLinks.findIndex((item) => item.href === link.href) === index;

    const shouldInclude =
      includeVisualOnly || link.includeInXml !== false;

    return isFirstOccurrence && shouldInclude;
  });
}

export function getXmlSiteMap(): MetadataRoute.Sitemap {
  return getFlatSiteMapLinks().map((link) => ({
    url: buildUrl(link.href),
    lastModified: new Date(),
    changeFrequency: link.changeFrequency ?? 'monthly',
    priority: link.priority ?? 0.6,
  }));
}

function getStaticPageDescription(href: string) {
  const descriptions: Record<string, string> = {
    '/servicos': 'Lista completa de serviços integrados oferecidos pela LCS.',
    '/segmentos': 'Soluções organizadas por segmentos de atendimento.',
    '/quem-somos':
      'História, missão, valores, diferenciais e posicionamento institucional da LCS.',
    '/blog':
      'Conteúdos sobre facilities, terceirização, gestão operacional e contratação de serviços.',
    '/trabalhe-conosco':
      'Área para candidatos conhecerem oportunidades e enviarem interesse.',
    '/orcamento':
      'Formulário para solicitação de proposta personalizada.',
  };

  return descriptions[href] ?? 'Página institucional da LCS.';
}

function getStaticPagePriority(href: string) {
  const priorities: Record<string, number> = {
    '/servicos': 0.9,
    '/segmentos': 0.85,
    '/orcamento': 0.9,
    '/blog': 0.8,
    '/quem-somos': 0.75,
    '/trabalhe-conosco': 0.55,
  };

  return priorities[href] ?? 0.6;
}

function getStaticPageFrequency(href: string): SiteMapFrequency {
  const frequencies: Record<string, SiteMapFrequency> = {
    '/servicos': 'monthly',
    '/segmentos': 'monthly',
    '/orcamento': 'monthly',
    '/blog': 'weekly',
    '/quem-somos': 'monthly',
    '/trabalhe-conosco': 'monthly',
  };

  return frequencies[href] ?? 'monthly';
}