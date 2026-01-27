import { notFound } from 'next/navigation';
import Link from 'next/link';

// Esta función obtendría el artículo específico por slug
async function getBlogPost(slug: string) {
  // Aquí conectarías con tu CMS, base de datos, o archivos JSON/MD
  // Por ahora retornamos datos de ejemplo
  
  const posts: Record<string, any> = {
    "vivir-en-torrevieja-guia-completa": {
      title: "Vivir en Torrevieja: Guía Completa 2026",
      excerpt: "Todo lo que necesitas saber sobre establecerte en una de las ciudades más populares entre expatriados en la Costa Blanca.",
      category: "Guías de Ciudad",
      image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200",
      date: "2026-01-15",
      author: "Health4Spain Team",
      content: `
        <h2>Por Qué Torrevieja Es Tan Popular</h2>
        <p>Torrevieja se ha consolidado como uno de los destinos favoritos para extranjeros que desean establecerse en España. Con más del 28% de su población compuesta por residentes internacionales, esta ciudad de la Costa Blanca ofrece una combinación única de clima mediterráneo, infraestructura adaptada a expatriados y coste de vida razonable.</p>
        
        <h2>Clima y Estilo de Vida</h2>
        <p>Con más de 320 días de sol al año y temperaturas promedio de 18°C, Torrevieja permite disfrutar de actividades al aire libre durante todo el año. Las playas de arena fina y las lagunas saladas características de la zona ofrecen opciones tanto para el ocio como para la salud.</p>
        
        <h2>Coste de Vida</h2>
        <p>El coste de vida en Torrevieja es aproximadamente un 30% inferior al de ciudades como Barcelona o Madrid. Un apartamento de dos dormitorios puede alquilarse por entre 600-800€ mensuales, mientras que la compra de vivienda ronda los 1.500-2.000€ por metro cuadrado en zonas residenciales.</p>
        
        <h3>Gastos Mensuales Estimados (Pareja)</h3>
        <ul>
          <li>Alquiler: 600-800€</li>
          <li>Supermercado: 300-400€</li>
          <li>Servicios (luz, agua, internet): 120-150€</li>
          <li>Seguro de salud privado: 150-250€</li>
          <li>Transporte: 80-120€</li>
        </ul>
        
        <h2>Servicios para Expatriados</h2>
        <p>Torrevieja cuenta con infraestructura adaptada a la comunidad internacional:</p>
        <ul>
          <li>Hospital Universitario de Torrevieja con atención en múltiples idiomas</li>
          <li>Numerosos centros médicos privados especializados en pacientes extranjeros</li>
          <li>Supermercados internacionales (Carrefour, Mercadona, Lidl, Iceland)</li>
          <li>Asociaciones y clubes sociales para diferentes nacionalidades</li>
          <li>Servicios de gestoría y asesoría en inglés, alemán y otros idiomas</li>
        </ul>
        
        <h2>Trámites y Documentación</h2>
        <p>Para establecerte en Torrevieja necesitarás:</p>
        <ol>
          <li><strong>NIE (Número de Identidad de Extranjero):</strong> Obligatorio para cualquier gestión administrativa</li>
          <li><strong>Empadronamiento:</strong> Registro en el padrón municipal</li>
          <li><strong>Seguro de salud:</strong> Privado o acreditación de cobertura europea</li>
          <li><strong>Cuenta bancaria española:</strong> Para gestiones y pagos locales</li>
        </ol>
        
        <h2>Conectividad</h2>
        <p>Torrevieja está bien conectada con:</p>
        <ul>
          <li>Aeropuerto de Alicante-Elche: 40 minutos en coche</li>
          <li>Aeropuerto de Murcia-Corvera: 35 minutos en coche</li>
          <li>Estación de AVE en Alicante: conexión con Madrid en 2h 30min</li>
          <li>Red de autobuses urbanos e interurbanos bien desarrollada</li>
        </ul>
        
        <h2>Recomendación Final</h2>
        <p>Torrevieja es ideal para quienes buscan un estilo de vida mediterráneo relajado, comunidad internacional establecida y coste de vida asequible. Es especialmente popular entre jubilados, pero también atrae a familias jóvenes y profesionales que trabajan remotamente.</p>
        
        <div class="bg-gray-50 border-l-4 border-accent p-6 my-8">
          <p class="font-semibold mb-2">💡 Consejo de Health4Spain</p>
          <p>Te recomendamos visitar Torrevieja al menos dos veces en diferentes épocas del año antes de tomar la decisión final. Agosto puede ser muy concurrido, mientras que enero-febrero te dará una perspectiva más realista del día a día.</p>
        </div>
      `
    },
    // Puedes agregar más artículos aquí
  };

  return posts[slug] || null;
}

// Genera los paths estáticos para SEO
export async function generateStaticParams() {
  return [
    { slug: 'vivir-en-torrevieja-guia-completa' },
    { slug: 'seguro-salud-visa-no-lucrativa' },
    { slug: 'costo-vida-alicante-vs-murcia' },
    { slug: 'arraigo-social-espana-2026' },
  ];
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* ARTICLE HEADER */}
      <article className="py-16 px-[5%]">
        <div className="max-w-[900px] mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/es" className="hover:text-accent">Inicio</Link>
            <span>/</span>
            <Link href="/es/blog" className="hover:text-accent">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">{post.category}</span>
          </nav>

          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-6">
            <span className="uppercase text-[0.8rem] text-accent tracking-wider font-semibold">
              {post.category}
            </span>
            <span className="text-gray-400">•</span>
            <time className="text-[0.9rem] text-gray-500">
              {new Date(post.date).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </div>

          {/* Title */}
          <h1 className="font-lora text-[3.5rem] font-bold leading-[1.2] mb-6 text-[#1a1a1a]">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[1.3rem] text-gray-600 leading-relaxed mb-8 border-l-4 border-accent pl-6">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold">
              H4S
            </div>
            <div>
              <div className="font-semibold text-[#1a1a1a]">{post.author}</div>
              <div className="text-sm text-gray-500">Equipo Editorial</div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-[1200px] mx-auto mb-16">
          <div 
            className="w-full h-[500px] bg-cover bg-center border-[15px] border-gray-100"
            style={{
              backgroundImage: `url('${post.image}')`
            }}
          />
        </div>

        {/* Article Content */}
        <div className="max-w-[800px] mx-auto">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-lora prose-headings:text-[#1a1a1a]
              prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-accent prose-a:no-underline prose-a:font-medium hover:prose-a:underline
              prose-strong:text-[#1a1a1a] prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:mb-2 prose-li:text-gray-700
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Box */}
          <div className="mt-16 p-10 bg-gray-50 border-l-4 border-accent">
            <h3 className="font-lora text-2xl font-bold mb-4">
              ¿Necesitas ayuda para establecerte en España?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Te conectamos con profesionales verificados que hablan tu idioma y conocen tus necesidades específicas.
            </p>
            <Link
              href="/es/contacto"
              className="inline-block bg-[#1a1a1a] text-white py-4 px-8 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent"
            >
              Hablar con un Experto
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h3 className="font-lora text-2xl font-bold mb-8">Artículos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/es/blog/seguro-salud-visa-no-lucrativa" className="group">
                <div className="h-48 bg-gray-200 mb-4 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600')"
                    }}
                  />
                </div>
                <div className="text-xs uppercase text-accent font-semibold mb-2">Procedimientos</div>
                <h4 className="font-lora text-lg font-semibold text-[#1a1a1a] group-hover:text-accent transition-colors">
                  Seguro de Salud para Visa No Lucrativa
                </h4>
              </Link>
              <Link href="/es/blog/costo-vida-alicante-vs-murcia" className="group">
                <div className="h-48 bg-gray-200 mb-4 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600')"
                    }}
                  />
                </div>
                <div className="text-xs uppercase text-accent font-semibold mb-2">Vida en España</div>
                <h4 className="font-lora text-lg font-semibold text-[#1a1a1a] group-hover:text-accent transition-colors">
                  Costo de Vida: Alicante vs Murcia
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
