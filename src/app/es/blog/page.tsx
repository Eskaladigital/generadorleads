import Link from 'next/link';

// Esta función obtendría los artículos de tu fuente de datos
async function getBlogPosts() {
  // Por ahora retornamos datos de ejemplo
  // Aquí conectarías con tu CMS, base de datos, o archivos JSON/MD
  return [
    {
      slug: "vivir-en-torrevieja-guia-completa",
      title: "Vivir en Torrevieja: Guía Completa 2026",
      excerpt: "Todo lo que necesitas saber sobre establecerte en una de las ciudades más populares entre expatriados en la Costa Blanca.",
      category: "Guías de Ciudad",
      image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600",
      date: "2026-01-15"
    },
    {
      slug: "seguro-salud-visa-no-lucrativa",
      title: "Seguro de Salud para Visa No Lucrativa: Requisitos 2026",
      excerpt: "Guía actualizada sobre los requisitos de seguro médico para obtener y renovar tu visa no lucrativa en España.",
      category: "Procedimientos",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
      date: "2026-01-12"
    },
    {
      slug: "costo-vida-alicante-vs-murcia",
      title: "Costo de Vida: Alicante vs Murcia",
      excerpt: "Comparativa detallada de gastos mensuales, vivienda, alimentación y servicios entre dos destinos mediterráneos populares.",
      category: "Vida en España",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      date: "2026-01-10"
    },
    {
      slug: "arraigo-social-espana-2026",
      title: "Arraigo Social en España: Guía Paso a Paso",
      excerpt: "Proceso completo, documentación necesaria y plazos para solicitar el arraigo social en 2026.",
      category: "Procedimientos",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600",
      date: "2026-01-08"
    }
  ];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      {/* HEADER */}
      <section className="py-24 px-[5%] bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
            Blog & Historias
          </div>
          <h1 className="font-lora text-[4rem] font-bold mb-6 text-[#1a1a1a]">
            Guías, Historias y Consejos
          </h1>
          <p className="text-[1.2rem] text-gray-600 leading-relaxed max-w-[700px]">
            Información práctica y experiencias reales de personas que han hecho de España su hogar.
          </p>
        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className="bg-white border border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                <div 
                  className="h-[300px] bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('${post.image}')`
                  }}
                />
                <div className="p-10">
                  <div className="uppercase text-[0.8rem] text-accent tracking-wider mb-4 font-semibold">
                    {post.category}
                  </div>
                  <h2 className="font-lora text-[2rem] mb-4 text-[#1a1a1a]">
                    <Link 
                      href={`/es/blog/${post.slug}`}
                      className="no-underline text-[#1a1a1a] hover:text-accent transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-[1.05rem] text-gray-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/es/blog/${post.slug}`}
                      className="uppercase text-[0.8rem] tracking-wider text-[#1a1a1a] no-underline font-semibold inline-flex items-center gap-2 hover:text-accent transition-colors"
                    >
                      Leer Artículo →
                    </Link>
                    <time className="text-[0.85rem] text-gray-500">
                      {new Date(post.date).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
