import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';
import { LandingPage } from '@/lib/types';

// Función para obtener landing de la BD
async function getLanding(slug: string): Promise<LandingPage | null> {
  try {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('slug', slug)
      .eq('activo', true)
      .single();
    
    if (error || !data) {
      console.log(`Landing page not found for slug: ${slug}`);
      return null;
    }
    return data as LandingPage;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

// Función para obtener contenido de ciudad desde BD
async function getCiudadContenido(ciudadSlug: string) {
  try {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('ciudades_contenido')
      .select('*')
      .eq('ciudad_slug', ciudadSlug)
      .eq('activo', true)
      .single();
    
    if (error || !data) {
      console.log(`Ciudad contenido not found for: ${ciudadSlug}`);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error fetching ciudad contenido:', error);
    return null;
  }
}

// Datos de ciudades estáticas (fallback)
const CIUDADES_DATA: Record<string, {
  nombre: string;
  region: string;
  descripcion: string;
  poblacion: string;
  clima: string;
  costeVida: string;
  expatriados: string;
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
    expatriados: '15% de la población',
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
    expatriados: '50% de la población',
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
    expatriados: '8% de la población',
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
    expatriados: '40% de la población',
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
    expatriados: '13% de la población',
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
    expatriados: '18% de la población',
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
    expatriados: '12% de la población',
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
    expatriados: '20% de la población',
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
    expatriados: '16% de la población',
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
      keywords: Array.isArray(landing.meta_keywords) 
        ? landing.meta_keywords.join(', ') 
        : landing.meta_keywords || undefined,
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
            href={`/es/contacto?slug=${landing.slug}`}
            className="btn-primary btn-sm"
          >
            {landing.cta_subtitle || 'Solicitar información'}
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <section className="py-10 md:py-12">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {/* Problema */}
              {landing.problem_title && landing.problems && landing.problems.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    {landing.problem_title}
                  </h2>
                  <div className="space-y-3">
                    {landing.problems.map((problem, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {problem}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solución */}
              {landing.solution_title && landing.solution_text && (
                <div className="card p-6 bg-green-50 border-green-200">
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    {landing.solution_title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {landing.solution_text}
                  </p>
                </div>
              )}

              {/* Servicios */}
              {landing.services_title && landing.services && landing.services.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    {landing.services_title}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {landing.services.map((service, idx) => (
                      <div key={idx} className="card p-5">
                        <div className="text-3xl mb-3">{service.icon}</div>
                        <h3 className="font-heading font-bold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Por qué esta ciudad */}
              {landing.why_city_title && landing.why_city_text && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    {landing.why_city_title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                    {landing.why_city_text}
                  </p>
                  {landing.why_city_stats && landing.why_city_stats.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {landing.why_city_stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-3xl font-bold text-primary">{stat.value}</div>
                          <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* FAQs */}
              {landing.faqs && landing.faqs.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    Preguntas frecuentes
                  </h2>
                  <div className="space-y-4">
                    {landing.faqs.map((faq, idx) => (
                      <div key={idx} className="card p-5">
                        <h3 className="font-heading font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card p-5 bg-primary/5 border-primary/20 sticky top-24">
                <h3 className="font-heading font-bold text-gray-900 mb-2">
                  Solicita información
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Te conectamos con profesionales verificados en menos de 24 horas.
                </p>
                <Link 
                  href={`/es/contacto?slug=${landing.slug}`}
                  className="btn-primary w-full text-center"
                >
                  Comenzar ahora
                </Link>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Sin compromiso · 100% gratuito
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 md:py-12 bg-gray-50">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
            {landing.cta_title || '¿Listo para empezar?'}
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            {landing.cta_subtitle || 'Te conectamos con profesionales que hablan tu idioma'}
          </p>
          <Link 
            href={`/es/contacto?slug=${landing.slug}`}
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
async function CityView({ 
  slug, 
  ciudad 
}: { 
  slug: string; 
  ciudad: typeof CIUDADES_DATA[string];
}) {
  // Intentar obtener contenido rico desde la BD
  const contenidoDB = await getCiudadContenido(slug);
  
  // Si no hay contenido en BD, mostrar versión básica
  if (!contenidoDB) {
    return <CityViewBasic slug={slug} ciudad={ciudad} />;
  }
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-secondary text-white py-10 md:py-12">
        <div className="container-base">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
            <Link href="/es/destinos" className="hover:text-white">Destinos</Link>
            <span>/</span>
            <span>{ciudad.region}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Vivir en {ciudad.nombre}: Guía Completa 2026
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Todo lo que necesitas saber para mudarte y establecerte en {ciudad.nombre} como expatriado
          </p>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="bg-primary/10 border-b border-primary/20 sticky top-16 z-30">
        <div className="container-base py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-sm">
            <strong>¿Quieres mudarte a {ciudad.nombre}?</strong> Te conectamos con profesionales verificados
          </p>
          <Link href={`/es/contacto?ciudad=${slug}`} className="btn-primary btn-sm">
            Solicitar asesoramiento gratuito
          </Link>
        </div>
      </div>

      {/* Contenido Principal */}
      <section className="py-10 md:py-16">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Columna Principal */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Introducción */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  ¿Por qué mudarse a {ciudad.nombre}?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">{ciudad.descripcion}</p>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {contenidoDB.intro_text}
                </div>
              </div>

              {/* Ventajas */}
              {contenidoDB.ventajas && contenidoDB.ventajas.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    Principales ventajas de vivir en {ciudad.nombre}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {contenidoDB.ventajas.map((ventaja: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 card p-4">
                        <svg className="w-6 h-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 font-medium">{ventaja}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mejores Barrios */}
              {contenidoDB.barrios && contenidoDB.barrios.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    Mejores zonas y barrios para expatriados en {ciudad.nombre}
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Elegir el barrio adecuado es fundamental para tu experiencia en {ciudad.nombre}. 
                    Aquí te presentamos las zonas más populares entre residentes internacionales:
                  </p>
                  <div className="space-y-4">
                    {contenidoDB.barrios.map((barrio: any, idx: number) => (
                      <div key={idx} className="card p-5">
                        <h3 className="font-heading font-bold text-gray-900 mb-2">{barrio.nombre}</h3>
                        <p className="text-gray-600 text-sm">{barrio.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coste de Vida Detallado */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  Coste de vida en {ciudad.nombre}: Precios reales 2026
                </h2>
                <p className="text-gray-700 mb-6">
                  Uno de los aspectos más importantes al planificar tu mudanza es entender cuánto cuesta 
                  vivir en {ciudad.nombre}. Aquí tienes un desglose actualizado de los principales gastos:
                </p>
                <div className="space-y-4">
                  {contenidoDB.coste_vida_alquiler && (
                    <div className="card p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Alquiler de vivienda
                      </h3>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{contenidoDB.coste_vida_alquiler}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_compra && (
                    <div className="card p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Compra de vivienda
                      </h3>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{contenidoDB.coste_vida_compra}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_alimentacion && (
                    <div className="card p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Alimentación y supermercado
                      </h3>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{contenidoDB.coste_vida_alimentacion}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_transporte && (
                    <div className="card p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        Transporte
                      </h3>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{contenidoDB.coste_vida_transporte}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_utilidades && (
                    <div className="card p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Servicios y utilidades
                      </h3>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{contenidoDB.coste_vida_utilidades}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Trámites */}
              {contenidoDB.tramites && contenidoDB.tramites.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    Trámites esenciales al mudarte a {ciudad.nombre}
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Establecerte legalmente en España requiere completar varios trámites. Te ayudamos a entender 
                    los pasos necesarios y podemos conectarte con gestores y abogados especializados:
                  </p>
                  <div className="space-y-3">
                    {contenidoDB.tramites.map((tramite: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-primary text-xs font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{tramite}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 card p-5 bg-blue-50 border-blue-200">
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>💡 Recomendación:</strong> Los trámites de extranjería pueden ser complejos. 
                      Te conectamos con abogados y gestores especializados que hablan tu idioma y te guiarán 
                      en todo el proceso.
                    </p>
                    <Link 
                      href={`/es/contacto?servicio=gestorias&ciudad=${slug}`}
                      className="text-primary font-medium hover:underline text-sm"
                    >
                      Solicitar ayuda con trámites →
                    </Link>
                  </div>
                </div>
              )}

              {/* FAQs */}
              {contenidoDB.faqs && contenidoDB.faqs.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                    Preguntas frecuentes sobre vivir en {ciudad.nombre}
                  </h2>
                  <div className="space-y-4">
                    {contenidoDB.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="card p-5">
                        <h3 className="font-heading font-semibold text-gray-900 mb-3 flex items-start gap-2">
                          <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          {faq.pregunta}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{faq.respuesta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Servicios para expatriados */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  Servicios profesionales para expatriados en {ciudad.nombre}
                </h2>
                <p className="text-gray-700 mb-6">
                  Te conectamos con profesionales verificados que hablan tu idioma y entienden 
                  las necesidades específicas de los residentes internacionales:
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {ciudad.serviciosDestacados.map((servicioId) => (
                    <Link
                      key={servicioId}
                      href={`/es/contacto?servicio=${servicioId}&ciudad=${slug}`}
                      className="card card-hover p-5 text-center group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-3 transition-colors">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900 block">
                        {SERVICIOS_INFO[servicioId]?.nombre}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">Ver profesionales</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Datos Rápidos */}
              <div className="card p-5 sticky top-24">
                <h3 className="font-heading font-bold text-gray-900 mb-4">Datos de {ciudad.nombre}</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Población</dt>
                    <dd className="font-semibold text-gray-900 text-lg">{ciudad.poblacion}</dd>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Temperatura media</dt>
                    <dd className="font-semibold text-gray-900 text-lg">
                      {contenidoDB.temperatura_media || ciudad.clima}
                    </dd>
                  </div>
                  {contenidoDB.dias_sol && (
                    <div className="border-t border-gray-100 pt-3">
                      <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Días de sol</dt>
                      <dd className="font-semibold text-gray-900 text-lg">{contenidoDB.dias_sol} días/año</dd>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-3">
                    <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Coste de vida</dt>
                    <dd className="font-semibold text-gray-900 text-lg">{ciudad.costeVida}</dd>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Región</dt>
                    <dd className="font-semibold text-gray-900">{ciudad.region}</dd>
                  </div>
                </dl>
              </div>

              {/* CTA Card */}
              <div className="card p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <h3 className="font-heading font-bold text-gray-900 mb-2">¿Listo para mudarte?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Te conectamos con profesionales verificados que te ayudarán en cada paso: 
                  abogados, gestores, inmobiliarias y más.
                </p>
                <Link href={`/es/contacto?ciudad=${slug}`} className="btn-primary w-full text-center">
                  Solicitar información gratuita
                </Link>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Sin compromiso • Atención en tu idioma
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Grande */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-base">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empieza tu nueva vida en {ciudad.nombre}
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              No tienes que hacerlo solo. Te conectamos con profesionales de confianza que hablan tu idioma 
              y conocen las necesidades de los expatriados en {ciudad.nombre}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={`/es/contacto?ciudad=${slug}`} className="btn-primary btn-lg">
                Solicitar asesoramiento gratuito
              </Link>
              <Link href="/es/servicios" className="btn-secondary btn-lg">
                Ver todos los servicios
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Profesionales verificados
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Atención en tu idioma
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sin compromiso
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Componente para vista básica (fallback cuando no hay contenido en BD)
function CityViewBasic({ 
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
            Vivir en {ciudad.nombre}: Guía Completa 2026
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Todo lo que necesitas saber para mudarte y establecerte en {ciudad.nombre} como expatriado
          </p>
        </div>
      </section>

      {/* CTA fijo visible */}
      <div className="bg-primary/10 border-b border-primary/20 sticky top-16 z-30">
        <div className="container-base py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-sm text-center sm:text-left">
            <strong>¿Quieres mudarte a {ciudad.nombre}?</strong> Te conectamos con profesionales verificados
          </p>
          <Link href={`/es/contacto?ciudad=${slug}`} className="btn-primary btn-sm">
            Solicitar asesoramiento gratuito
          </Link>
        </div>
      </div>

      {/* Contenido principal - versión básica */}
      <section className="py-10 md:py-12">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  Descripción general
                </h2>
                <p className="text-gray-700 leading-relaxed">{ciudad.descripcion}</p>
              </div>

              {/* Información básica */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5">
                  <div className="text-gray-500 text-sm mb-1">Población</div>
                  <div className="text-gray-900 font-semibold text-lg">{ciudad.poblacion}</div>
                </div>
                <div className="card p-5">
                  <div className="text-gray-500 text-sm mb-1">Clima</div>
                  <div className="text-gray-900 font-semibold text-lg">{ciudad.clima}</div>
                </div>
                <div className="card p-5">
                  <div className="text-gray-500 text-sm mb-1">Coste de vida</div>
                  <div className="text-gray-900 font-semibold text-lg">{ciudad.costeVida}</div>
                </div>
                <div className="card p-5">
                  <div className="text-gray-500 text-sm mb-1">Expatriados</div>
                  <div className="text-gray-900 font-semibold text-lg">{ciudad.expatriados}</div>
                </div>
              </div>

              {/* CTA para solicitar información detallada */}
              <div className="card p-6 bg-blue-50 border-blue-200">
                <h3 className="font-heading font-bold text-gray-900 mb-2">
                  ¿Quieres información personalizada sobre {ciudad.nombre}?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Te conectamos con profesionales locales que te ayudarán con abogados, inmobiliarias, 
                  gestorías y todo lo necesario para tu mudanza.
                </p>
                <Link href={`/es/contacto?ciudad=${slug}`} className="btn-primary">
                  Solicitar asesoramiento gratuito
                </Link>
              </div>
            </div>

            {/* Sidebar */}
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
