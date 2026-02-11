import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.health4spain.com';

// Páginas estáticas
const STATIC_PAGES = [
  '/es',
  '/es/servicios',
  '/es/destinos',
  '/es/blog',
  '/es/contacto',
  '/es/sobre-nosotros',
  '/es/privacidad',
  '/es/cookies',
  '/es/terminos',
  '/es/profesionales',
  '/es/presupuesto',
  '/es/sitemap-html',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let landings: { slug: string; updated_at?: string }[] = [];
  let posts: { slug: string; updated_at?: string }[] = [];

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const [landingsRes, postsRes] = await Promise.all([
      supabase.from('landing_pages').select('slug, updated_at').eq('activo', true).eq('idioma', 'es'),
      supabase.from('blog_posts').select('slug, updated_at').eq('status', 'published').eq('lang', 'es'),
    ]);
    landings = landingsRes.data || [];
    posts = postsRes.data || [];
  }

  const base = `${BASE_URL}/es`;
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...STATIC_PAGES.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/es' ? 1 : 0.8,
    })),
    ...landings.map((l) => ({
      url: `${base}/servicios/${l.slug}`,
      lastModified: (l.updated_at as string) || now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...landings.map((l) => ({
      url: `${base}/destinos/${l.slug}`,
      lastModified: (l.updated_at as string) || now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: (p.updated_at as string) || now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return entries;
}
