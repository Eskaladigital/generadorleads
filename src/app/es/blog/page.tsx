import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Blog - Guías para Vivir en España | Health4Spain',
  description: 'Guías prácticas, consejos y recursos para extranjeros en España: visados, seguros, finanzas, trámites y guías de ciudades. Todo lo que necesitas saber.',
};

// Mapeo de categorías para mostrar nombres amigables
const categoryLabels: Record<string, string> = {
  'guias-ciudad': 'Guías de Ciudad',
  'procedimientos': 'Trámites y Visados',
  'salud': 'Salud y Bienestar',
  'finanzas': 'Finanzas',
  'vida-espana': 'Vivir en España',
};

// Colores por categoría
const categoryColors: Record<string, string> = {
  'guias-ciudad': 'bg-blue-500',
  'procedimientos': 'bg-purple-500',
  'salud': 'bg-green-500',
  'finanzas': 'bg-orange-500',
  'vida-espana': 'bg-pink-500',
};

// Imágenes por categoría
const categoryImages: Record<string, string> = {
  'guias-ciudad': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&q=80',
  'procedimientos': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
  'salud': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
  'finanzas': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
  'vida-espana': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  featured_image?: string;
  views?: number;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, category, published_at, featured_image, views')
      .eq('status', 'published')
      .eq('lang', 'es')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
}

async function getPopularPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, category, published_at, views, featured_image')
      .eq('status', 'published')
      .eq('lang', 'es')
      .order('views', { ascending: false })
      .limit(5);

    if (error) return [];
    return data || [];
  } catch (error) {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const popularPosts = await getPopularPosts();

  const categories = Array.from(new Set(posts.map(p => p.category)));
  const [featuredPost, ...restPosts] = posts;

  return (
    <>
      {/* HEADER */}
      <section className="section-blue-dark">
        <div className="container-base">
          <h1 className="text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Guías, consejos y recursos para vivir en España
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL CON SIDEBAR */}
      <section className="section-alt">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* POSTS PRINCIPALES */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No hay artículos publicados.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Artículo destacado */}
                  {featuredPost && (
                    <article className="group bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <Image
                          src={featuredPost.featured_image || categoryImages[featuredPost.category] || categoryImages['vida-espana']}
                          alt={featuredPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute top-3 left-3 ${categoryColors[featuredPost.category] || 'bg-accent'} text-white px-2 py-1 text-xs uppercase tracking-wider font-semibold`}>
                          {categoryLabels[featuredPost.category] || featuredPost.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <time className="text-xs text-gray-500 mb-2 block">
                          {new Date(featuredPost.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">
                          <Link href={`/es/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">{featuredPost.excerpt}</p>
                        <Link
                          href={`/es/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:gap-2 transition-all border-b-2 border-accent"
                        >
                          Leer más
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  )}

                  {/* Resto en 2 columnas */}
                  {restPosts.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {restPosts.map((post) => {
                        const imageUrl = post.featured_image || categoryImages[post.category] || categoryImages['vida-espana'];
                        const categoryLabel = categoryLabels[post.category] || post.category;
                        return (
                          <article
                            key={post.slug}
                            className="group bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <Image
                                src={imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <span className={`absolute top-3 left-3 ${categoryColors[post.category] || 'bg-accent'} text-white px-2 py-1 text-xs uppercase tracking-wider font-semibold`}>
                                {categoryLabel}
                              </span>
                            </div>
                            <div className="p-4">
                              <time className="text-xs text-gray-500 mb-1 block">
                                {new Date(post.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </time>
                              <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                <Link href={`/es/blog/${post.slug}`}>{post.title}</Link>
                              </h2>
                              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                              <Link
                                href={`/es/blog/${post.slug}`}
                                className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:gap-2 transition-all border-b-2 border-accent"
                              >
                                Leer más
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="space-y-8">
              {/* Posts Populares */}
              {popularPosts.length > 0 && (
                <div className="bg-white border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Más Leídos
                  </h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <Link 
                        key={post.slug}
                        href={`/es/blog/${post.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 group-hover:bg-accent group-hover:text-white transition-colors">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-accent transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="uppercase">{categoryLabels[post.category] || post.category}</span>
                            {post.views && post.views > 0 && (
                              <>
                                <span>•</span>
                                <span>{post.views} vistas</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categorías */}
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const count = posts.filter(p => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-accent transition-colors">
                          {categoryLabels[cat] || cat}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white border-t-3 border-accent p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">¿Necesitas ayuda?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Conectamos con profesionales verificados en España
                </p>
                <Link 
                  href="/es/contacto"
                  className="block w-full text-center btn-minimal-lg text-center py-3"
                >
                  Solicitar información
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
