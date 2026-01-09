import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    '',
    '/en',
    '/ar',
    '/en/projects',
    '/ar/projects',
    '/en/about',
    '/ar/about',
    '/en/contact',
    '/ar/contact',
    '/en/privacy',
    '/ar/privacy',
    '/en/terms',
    '/ar/terms',
  ];

  const projectRoutes = projects.flatMap((p) => [
    `/en/projects/${p.slug}`,
    `/ar/projects/${p.slug}`,
  ]);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '' || path === '/en' || path === '/ar' ? 1 : 0.7,
  }));
}