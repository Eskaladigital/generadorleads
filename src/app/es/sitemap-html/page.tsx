import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mapa del Sitio - Health4Spain',
  description: 'Mapa completo del sitio web de Health4Spain. Encuentra todas las páginas, destinos, servicios y artículos del blog.',
  robots: {
    index: true,
    follow: true,
  },
};

// Datos de destinos (mismo que en destinos/page.tsx)
const REGIONES = [
  {
    id: 'costa-blanca',
    nombre: 'Costa Blanca',
    ciudades: [
      { slug: 'alicante', nombre: 'Alicante' },
      { slug: 'torrevieja', nombre: 'Torrevieja' },
      { slug: 'benidorm', nombre: 'Benidorm' },
      { slug: 'denia', nombre: 'Dénia' },
      { slug: 'javea', nombre: 'Jávea' },
    ],
  },
  {
    id: 'costa-del-sol',
    nombre: 'Costa del Sol',
    ciudades: [
      { slug: 'malaga', nombre: 'Málaga' },
      { slug: 'marbella', nombre: 'Marbella' },
      { slug: 'fuengirola', nombre: 'Fuengirola' },
      { slug: 'estepona', nombre: 'Estepona' },
      { slug: 'nerja', nombre: 'Nerja' },
    ],
  },
  {
    id: 'grandes-ciudades',
    nombre: 'Grandes Ciudades',
    ciudades: [
      { slug: 'madrid', nombre: 'Madrid' },
      { slug: 'barcelona', nombre: 'Barcelona' },
      { slug: 'valencia', nombre: 'Valencia' },
      { slug: 'sevilla', nombre: 'Sevilla' },
      { slug: 'bilbao', nombre: 'Bilbao' },
    ],
  },
  {
    id: 'islas',
    nombre: 'Islas',
    ciudades: [
      { slug: 'palma', nombre: 'Palma de Mallorca' },
      { slug: 'ibiza', nombre: 'Ibiza' },
      { slug: 'tenerife', nombre: 'Tenerife' },
      { slug: 'las-palmas', nombre: 'Las Palmas' },
      { slug: 'lanzarote', nombre: 'Lanzarote' },
    ],
  },
  {
    id: 'levante',
    nombre: 'Levante y Murcia',
    ciudades: [
      { slug: 'murcia', nombre: 'Murcia' },
      { slug: 'cartagena', nombre: 'Cartagena' },
      { slug: 'orihuela', nombre: 'Orihuela Costa' },
      { slug: 'almeria', nombre: 'Almería' },
    ],
  },
];

// Datos de servicios (mismo que en servicios/page.tsx)
const SERVICIOS = [
  { id: 'seguros', titulo: 'Seguros de Salud' },
  { id: 'abogados', titulo: 'Abogados de Extranjería' },
  { id: 'inmobiliarias', titulo: 'Inmobiliarias' },
  { id: 'dentistas', titulo: 'Clínicas Dentales' },
  { id: 'gestorias', titulo: 'Gestorías' },
  { id: 'clinicas', titulo: 'Clínicas Médicas' },
];

// Rutas estáticas principales
const RUTAS_ESTATICAS = [
  { url: '/es', titulo: 'Inicio', descripcion: 'Página principal' },
  { url: '/es/destinos', titulo: 'Destinos', descripcion: 'Guía de destinos en España' },
  { url: '/es/servicios', titulo: 'Servicios', descripcion: 'Servicios para expatriados' },
  { url: '/es/blog', titulo: 'Blog', descripcion: 'Artículos y guías' },
  { url: '/es/profesionales', titulo: 'Profesionales', descripcion: 'Directorio de profesionales' },
  { url: '/es/sobre-nosotros', titulo: 'Sobre Nosotros', descripcion: 'Quiénes somos' },
  { url: '/es/contacto', titulo: 'Contacto', descripcion: 'Formulario de contacto' },
  { url: '/es/presupuesto', titulo: 'Presupuesto', descripcion: 'Solicitar presupuesto' },
  { url: '/es/privacidad', titulo: 'Política de Privacidad', descripcion: 'Protección de datos' },
  { url: '/es/terminos', titulo: 'Términos y Condiciones', descripcion: 'Términos de uso' },
  { url: '/es/cookies', titulo: 'Política de Cookies', descripcion: 'Uso de cookies' },
];

// Función para obtener posts del blog
async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 3600 }, // Revalidar cada hora
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function SitemapHtmlPage() {
  const blogPosts = await getBlogPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://health4spain.com';

  // Obtener todos los destinos
  const allDestinos = REGIONES.flatMap(region => 
    region.ciudades.map(ciudad => ({
      url: `/es/destinos/${ciudad.slug}`,
      titulo: ciudad.nombre,
      categoria: region.nombre,
    }))
  );

  // Obtener todos los servicios
  const allServicios = SERVICIOS.map(servicio => ({
    url: `/es/servicios/${servicio.id}`,
    titulo: servicio.titulo,
  }));

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-secondary text-white py-12 md:py-16">
        <div className="container-base">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Mapa del Sitio
            </h1>
            <p className="text-lg text-white/90">
              Navega por todas las páginas disponibles en Health4Spain. 
              Encuentra destinos, servicios, artículos del blog y más.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido del Sitemap */}
      <section className="py-10 md:py-14">
        <div className="container-base">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Páginas Principales */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Páginas Principales
              </h2>
              <ul className="space-y-2">
                {RUTAS_ESTATICAS.map((ruta) => (
                  <li key={ruta.url} className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <div className="flex-1">
                      <Link 
                        href={ruta.url}
                        className="text-primary hover:text-primary-dark font-medium hover:underline"
                      >
                        {ruta.titulo}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">{ruta.descripcion}</p>
                      <code className="text-xs text-gray-400 block mt-1">{baseUrl}{ruta.url}</code>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinos */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Destinos ({allDestinos.length} ciudades)
              </h2>
              <div className="space-y-6">
                {REGIONES.map((region) => (
                  <div key={region.id}>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">
                      {region.nombre}
                    </h3>
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {region.ciudades.map((ciudad) => (
                        <li key={ciudad.slug}>
                          <Link 
                            href={`/es/destinos/${ciudad.slug}`}
                            className="text-primary hover:text-primary-dark hover:underline text-sm"
                          >
                            {ciudad.nombre}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Servicios */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Servicios ({allServicios.length} servicios)
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allServicios.map((servicio) => (
                  <li key={servicio.url} className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <Link 
                      href={servicio.url}
                      className="text-primary hover:text-primary-dark hover:underline"
                    >
                      {servicio.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog Posts */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Artículos del Blog ({blogPosts.length} artículos)
              </h2>
              {blogPosts.length > 0 ? (
                <ul className="space-y-3">
                  {blogPosts.map((post: any) => (
                    <li key={post.slug} className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <div className="flex-1">
                        <Link 
                          href={`/es/blog/${post.slug}`}
                          className="text-primary hover:text-primary-dark font-medium hover:underline block"
                        >
                          {post.title}
                        </Link>
                        {post.excerpt && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        {post.published_at && (
                          <time className="text-xs text-gray-400 block mt-1">
                            {new Date(post.published_at).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-sm">
                  No hay artículos publicados aún.
                </p>
              )}
            </div>

            {/* Información adicional */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-gray-900 mb-2">
                Información del Sitemap
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Total de páginas: {RUTAS_ESTATICAS.length + allDestinos.length + allServicios.length + blogPosts.length}</li>
                <li>• Última actualización: {new Date().toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</li>
                <li>• Los artículos del blog se actualizan automáticamente</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
