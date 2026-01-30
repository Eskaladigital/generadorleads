import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';
import { LandingPage } from '@/lib/types';

// Función para obtener landing de la BD
async function getLanding(slug: string): Promise<LandingPage | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', slug)
    .eq('activo', true)
    .single();
  
  if (error || !data) return null;
  return data as LandingPage;
}

// Datos de ciudades estáticas (fallback)
const CIUDADES_DATA: Record<string, {
  nombre: string;
  region: string;
  descripcion: string;
  poblacion: string;
  clima: string;
  costeVida: string;
  puntos: string[];
  serviciosDestacados: string[];
}> = {
  'alicante': {
    nombre: 'Alicante',
    region: 'Costa Blanca',
    descripcion: 'Capital de la Costa Blanca, Alicante combina playas urbanas, un casco histórico encantador y una vibrante comunidad internacional.',
    poblacion: '337.000 habitantes',
    clima: '18°C media anual',
    costeVida: 'Medio',
    puntos: ['Aeropuerto internacional', 'Puerto deportivo', 'Sanidad de calidad', 'Colegios internacionales'],
    serviciosDestacados: ['seguros', 'abogados', 'inmobiliarias'],
  },
  'torrevieja': {
    nombre: 'Torrevieja',
    region: 'Costa Blanca',
    descripcion: 'Torrevieja es conocida por sus lagunas saladas y su enorme comunidad de expatriados.',
    poblacion: '84.000 habitantes',
    clima: '19°C media anual',
    costeVida: 'Bajo-Medio',
    puntos: ['Gran comunidad internacional', 'Precios competitivos', 'Microclima saludable', 'Comercios adaptados'],
    serviciosDestacados: ['seguros', 'inmobiliarias', 'gestorias'],
  },
  'malaga': {
    nombre: 'Málaga',
    region: 'Costa del Sol',
    descripcion: 'Málaga ha experimentado una transformación espectacular como destino cultural de primer nivel.',
    poblacion: '578.000 habitantes',
    clima: '19°C media anual',
    costeVida: 'Medio-Alto',
    puntos: ['Hub tecnológico', 'Oferta cultural', 'Conexiones aéreas', 'Gastronomía mediterránea'],
    serviciosDestacados: ['abogados', 'inmobiliarias', 'gestorias'],
  },
  'marbella': {
    nombre: 'Marbella',
    region: 'Costa del Sol',
    descripcion: 'Sinónimo de lujo y exclusividad, Marbella atrae a una clientela internacional de alto poder adquisitivo.',
    poblacion: '147.000 habitantes',
    clima: '18°C media anual',
    costeVida: 'Alto',
    puntos: ['Destino de lujo', 'Campos de golf', 'Colegios internacionales', 'Seguridad premium'],
    serviciosDestacados: ['inmobiliarias', 'abogados', 'dentistas'],
  },
  'madrid': {
    nombre: 'Madrid',
    region: 'Centro',
    descripcion: 'La capital de España ofrece infinitas oportunidades profesionales y vida cultural inigualable.',
    poblacion: '3.300.000 habitantes',
    clima: '15°C media anual',
    costeVida: 'Alto',
    puntos: ['Centro empresarial', 'Oferta cultural', 'Transporte público', 'Comunidad internacional'],
    serviciosDestacados: ['abogados', 'gestorias', 'clinicas'],
  },
  'barcelona': {
    nombre: 'Barcelona',
    region: 'Cataluña',
    descripcion: 'Barcelona combina playa y montaña, arquitectura modernista y vida cosmopolita.',
    poblacion: '1.600.000 habitantes',
    clima: '16°C media anual',
    costeVida: 'Alto',
    puntos: ['Arquitectura Gaudí', 'Ecosistema emprendedor', 'Playa urbana', 'Gastronomía vanguardia'],
    serviciosDestacados: ['abogados', 'inmobiliarias', 'dentistas'],
  },
  'valencia': {
    nombre: 'Valencia',
    region: 'Comunidad Valenciana',
    descripcion: 'Valencia ofrece el equilibrio perfecto entre ciudad grande y calidad de vida.',
    poblacion: '800.000 habitantes',
    clima: '18°C media anual',
    costeVida: 'Medio',
    puntos: ['Ciudad de las Artes', 'Cuna de la paella', 'Playas urbanas', 'Ambiente joven'],
    serviciosDestacados: ['seguros', 'inmobiliarias', 'gestorias'],
  },
  'palma': {
    nombre: 'Palma de Mallorca',
    region: 'Islas Baleares',
    descripcion: 'La capital balear combina el encanto del Mediterráneo con sofisticación europea.',
    poblacion: '416.000 habitantes',
    clima: '17°C media anual',
    costeVida: 'Alto',
    puntos: ['Infraestructuras premium', 'Comunidad internacional', 'Deportes náuticos', 'Gastronomía local'],
    serviciosDestacados: ['inmobiliarias', 'abogados', 'seguros'],
  },
  'tenerife': {
    nombre: 'Tenerife',
    region: 'Islas Canarias',
    descripcion: 'La isla de la eterna primavera con clima privilegiado todo el año.',
    poblacion: '928.000 habitantes',
    clima: '22°C media anual',
    costeVida: 'Medio',
    puntos: ['Clima primaveral', 'Parque Nacional Teide', 'Ventajas fiscales', 'Vuelos directos'],
    serviciosDestacados: ['seguros', 'gestorias', 'clinicas'],
  },
};

const SERVICIOS_INFO: Record<string, { nombre: string }> = {
  seguros: { nombre: 'Seguros de Salud' },
  abogados: { nombre: 'Abogados' },
  inmobiliarias: { nombre: 'Inmobiliarias' },
  dentistas: { nombre: 'Dentistas' },
  gestorias: { nombre: 'Gestorías' },
  clinicas: { nombre: 'Clínicas' },
};

// Detectar si es landing de servicio-ciudad o solo ciudad
function parseSlug(slug: string): { servicio?: string; ciudad: string } | null {
  // Primero verificar si es ciudad directa
  if (CIUDADES_DATA[slug]) {
    return { ciudad: slug };
  }
  
  // Intentar parsear como servicio-ciudad
  const servicios = Object.keys(SERVICIOS_INFO);
  for (const servicio of servicios) {
    if (slug.startsWith(`${servicio}-`)) {
      const ciudad = slug.replace(`${servicio}-`, '');
      return { servicio, ciudad };
    }
  }
  
  return null;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Intentar obtener de BD primero (landing generada por IA)
  const landing = await getLanding(slug);
  if (landing) {
    return {
      title: landing.meta_title,
      description: landing.meta_description,
      keywords: landing.meta_keywords?.join(', '),
    };
  }
  
  // Fallback a datos estáticos
  const parsed = parseSlug(slug);
  if (!parsed) {
    return { title: 'Destino no encontrado' };
  }
  
  const ciudadData = CIUDADES_DATA[parsed.ciudad];
  if (!ciudadData) {
    return { title: 'Destino no encontrado' };
  }
  
  if (parsed.servicio) {
    const servicioInfo = SERVICIOS_INFO[parsed.servicio];
    return {
      title: `${servicioInfo.nombre} en ${ciudadData.nombre} - Expatriados España`,
      description: `Encuentra los mejores ${servicioInfo.nombre.toLowerCase()} en ${ciudadData.nombre}. Profesionales verificados que hablan tu idioma.`,
    };
  }
  
  return {
    title: `Vivir en ${ciudadData.nombre} - Guía para Expatriados`,
    description: ciudadData.descripcion,
  };
}

export default async function DestinoPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Intentar obtener de BD (landing generada por IA)
  const landing = await getLanding(slug);
  
  if (landing) {
    return <LandingPageView landing={landing} />;
  }
  
  // Fallback a vista estática
  const parsed = parseSlug(slug);
  if (!parsed) {
    notFound();
  }
  
  const ciudadData = CIUDADES_DATA[parsed.ciudad];
  if (!ciudadData) {
    notFound();
  }
  
  // Si es servicio-ciudad, mostrar vista de landing
  if (parsed.servicio) {
    return (
      <ServiceCityView 
        servicio={parsed.servicio} 
        ciudad={parsed.ciudad} 
        ciudadData={ciudadData} 
      />
    );
  }
  
  // Si es solo ciudad, mostrar vista de ciudad
  return <CityView slug={slug} ciudad={ciudadData} />;
}

// Componente para landing pages de BD
function LandingPageView({ landing }: { landing: LandingPage }) {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-secondary text-white py-10 md:py-12">
        <div className="container-base">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            {landing.hero_title}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mb-6">
            {landing.hero_subtitle}
          </p>
          {landing.hero_bullets && landing.hero_bullets.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {landing.hero_bullets.slice(0, 3).map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* CTA fijo */}
      <div className="bg-primary/10 border-b border-primary/20 sticky top-16 z-30">
        <div className="container-base py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-sm text-center sm:text-left">
            <strong>{landing.cta_title || 'Te conectamos con profesionales verificados'}</strong>
          </p>
          <Link 
            href={`/es/contacto?servicio=${landing.servicio_slug}&ciudad=${landing.ciudad_slug}`} 
            className="btn-primary btn-sm whitespace-nowrap"
          >
            Solicitar información
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <section className="py-10 md:py-12">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {/* Problema */}
              {landing.problems && landing.problems.length > 0 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
                    {landing.problem_title || '¿Te identificas con esto?'}
                  </h2>
                  <div className="space-y-3">
                    {landing.problems.map((problem, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-gray-500 text-sm">{idx + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{problem.title}</p>
                          <p className="text-gray-600 text-sm">{problem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solución */}
              {landing.solution_text && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
                    {landing.solution_title || 'Nuestra solución'}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {landing.solution_text}
                  </p>
                </div>
              )}

              {/* Servicios */}
              {landing.services && landing.services.length > 0 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
                    {landing.services_title || 'Qué ofrecemos'}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {landing.services.map((service, idx) => (
                      <div key={idx} className="card p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {landing.faqs && landing.faqs.length > 0 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
                    Preguntas frecuentes
                  </h2>
                  <div className="space-y-4">
                    {landing.faqs.map((faq, idx) => (
                      <div key={idx} className="card p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              {landing.why_city_stats && landing.why_city_stats.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-heading font-bold text-gray-900 mb-4">
                    {landing.why_city_title || 'Datos de interés'}
                  </h3>
                  <div className="space-y-3">
                    {landing.why_city_stats.map((stat, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-gray-500 text-sm">{stat.label}</span>
                        <span className="font-semibold text-gray-900 text-sm">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="card p-5 bg-primary/5 border-primary/20">
                <h3 className="font-heading font-bold text-gray-900 mb-2">
                  {landing.cta_title || 'Solicita información'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {landing.cta_subtitle || 'Te conectamos con profesionales verificados.'}
                </p>
                <Link 
                  href={`/es/contacto?servicio=${landing.servicio_slug}&ciudad=${landing.ciudad_slug}`}
                  className="btn-primary w-full text-center"
                >
                  Comenzar ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 md:py-12 bg-gray-50">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
            {landing.cta_title || 'Da el primer paso'}
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            {landing.cta_subtitle || 'Sin compromiso. Te conectamos con los mejores profesionales.'}
          </p>
          <Link 
            href={`/es/contacto?servicio=${landing.servicio_slug}&ciudad=${landing.ciudad_slug}`} 
            className="btn-primary btn-lg"
          >
            Solicitar información gratuita
          </Link>
        </div>
      </section>
    </>
  );
}

// Componente para vista servicio-ciudad (fallback)
function ServiceCityView({ 
  servicio, 
  ciudad, 
  ciudadData 
}: { 
  servicio: string; 
  ciudad: string; 
  ciudadData: typeof CIUDADES_DATA[string];
}) {
  const servicioInfo = SERVICIOS_INFO[servicio];
  
  return (
    <>
      <section className="bg-gradient-secondary text-white py-10 md:py-12">
        <div className="container-base">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
            <Link href="/es/servicios" className="hover:text-white">Servicios</Link>
            <span>/</span>
            <Link href={`/es/servicios/${servicio}`} className="hover:text-white">{servicioInfo.nombre}</Link>
            <span>/</span>
            <span>{ciudadData.nombre}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            {servicioInfo.nombre} en {ciudadData.nombre}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Profesionales verificados que hablan tu idioma en {ciudadData.nombre}.
          </p>
        </div>
      </section>

      <div className="bg-primary/10 border-b border-primary/20 sticky top-16 z-30">
        <div className="container-base py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-sm">
            <strong>¿Necesitas {servicioInfo.nombre.toLowerCase()} en {ciudadData.nombre}?</strong>
          </p>
          <Link 
            href={`/es/contacto?servicio=${servicio}&ciudad=${ciudad}`} 
            className="btn-primary btn-sm"
          >
            Solicitar información
          </Link>
        </div>
      </div>

      <section className="py-10 md:py-12">
        <div className="container-base">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-700 text-lg mb-8">
              Te conectamos con los mejores profesionales de {servicioInfo.nombre.toLowerCase()} en {ciudadData.nombre}. 
              {ciudadData.descripcion}
            </p>
            <Link 
              href={`/es/contacto?servicio=${servicio}&ciudad=${ciudad}`} 
              className="btn-primary btn-lg"
            >
              Solicitar información gratuita
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Componente para vista de ciudad
function CityView({ 
  slug, 
  ciudad 
}: { 
  slug: string; 
  ciudad: typeof CIUDADES_DATA[string];
}) {
  return (
    <>
      <section className="bg-gradient-secondary text-white py-10 md:py-12">
        <div className="container-base">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
            <Link href="/es/destinos" className="hover:text-white">Destinos</Link>
            <span>/</span>
            <span>{ciudad.region}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Vivir en {ciudad.nombre}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Tu guía completa para establecerte en {ciudad.nombre}
          </p>
        </div>
      </section>

      <div className="bg-primary/10 border-b border-primary/20 sticky top-16 z-30">
        <div className="container-base py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-sm">
            <strong>¿Quieres vivir en {ciudad.nombre}?</strong> Te conectamos con profesionales.
          </p>
          <Link href={`/es/contacto?ciudad=${slug}`} className="btn-primary btn-sm">
            Solicitar información
          </Link>
        </div>
      </div>

      <section className="py-10 md:py-12">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
                  Sobre {ciudad.nombre}
                </h2>
                <p className="text-gray-700 leading-relaxed">{ciudad.descripcion}</p>
              </div>

              <div>
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
                  ¿Por qué {ciudad.nombre}?
                </h2>
                <ul className="space-y-3">
                  {ciudad.puntos.map((punto, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{punto}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
                  Servicios más solicitados
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {ciudad.serviciosDestacados.map((servicioId) => (
                    <Link
                      key={servicioId}
                      href={`/es/contacto?servicio=${servicioId}&ciudad=${slug}`}
                      className="card card-hover p-4 text-center"
                    >
                      <span className="font-medium text-gray-900 text-sm">
                        {SERVICIOS_INFO[servicioId]?.nombre}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-5">
                <h3 className="font-heading font-bold text-gray-900 mb-4">Datos</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Población</dt>
                    <dd className="font-medium text-gray-900">{ciudad.poblacion}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Clima</dt>
                    <dd className="font-medium text-gray-900">{ciudad.clima}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Coste de vida</dt>
                    <dd className="font-medium text-gray-900">{ciudad.costeVida}</dd>
                  </div>
                </dl>
              </div>

              <div className="card p-5 bg-primary/5 border-primary/20">
                <h3 className="font-heading font-bold text-gray-900 mb-2">¿Listo?</h3>
                <p className="text-gray-600 text-sm mb-4">Te conectamos con profesionales verificados.</p>
                <Link href={`/es/contacto?ciudad=${slug}`} className="btn-primary w-full text-center">
                  Solicitar información
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
            Empieza tu nueva vida en {ciudad.nombre}
          </h2>
          <p className="text-gray-600 mb-6">Sin compromiso. Profesionales que hablan tu idioma.</p>
          <Link href={`/es/contacto?ciudad=${slug}`} className="btn-primary btn-lg">
            Solicitar información gratuita
          </Link>
        </div>
      </section>
    </>
  );
}
