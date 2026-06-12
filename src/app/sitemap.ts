import type { MetadataRoute } from 'next';
import { services, segments, posts, siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ['', '/servicos', '/segmentos', '/quem-somos', '/blog', '/orcamento'].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${base}/servicos/${service.slug}`,
    lastModified: new Date(),
  }));

  const segmentRoutes = segments.map((segment) => ({
    url: `${base}/segmentos/${segment.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...segmentRoutes, ...postRoutes];
}
