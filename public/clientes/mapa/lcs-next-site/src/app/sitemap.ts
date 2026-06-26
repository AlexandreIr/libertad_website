import type { MetadataRoute } from 'next';
import { getXmlSiteMap } from '@/lib/site-map';

export default function sitemap(): MetadataRoute.Sitemap {
  return getXmlSiteMap();
}
