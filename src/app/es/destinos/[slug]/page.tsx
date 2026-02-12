import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getServicios, getServicioBySlug } from '@/lib/services';
import { LandingPage } from '@/lib/types';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceIcon from '@/components/ServiceIcon';
import LandingFormEmbed from '@/components/LandingFormEmbed';

// Pre-renderizar en build para SEO. Revalidar cada 24h.
export const revalidate = 86400;

// Función para obtener landing de la BD
async function getLanding(slug: string): Promise<LandingPage | null> {
  try {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('slug', slug)
      .eq('activo', true)
      .eq('idioma', 'es')
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

// Función para obtener datos de ciudad desde ciudades_catalogo
async function getCiudadCatalogo(ciudadSlug: string) {
  try {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from('ciudades_catalogo')
      .select('*')
      .eq('slug', ciudadSlug)
      .single();
    
    if (error || !data) {
      console.log(`Ciudad catalogo not found for: ${ciudadSlug}`);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error fetching ciudad catalogo:', error);
    return null;
  }
}

// Detectar si es landing de servicio-ciudad o solo ciudad
function parseSlug(slug: string, serviciosSlugs: string[]): { servicio?: string; ciudad: string } | null {
  for (const servicio of serviciosSlugs) {
    if (slug.startsWith(`${servicio}-`)) {
      const ciudad = slug.replace(`${servicio}-`, '');
      return { servicio, ciudad };
    }
  }
  return { ciudad: slug };
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
  
  // Fallback a datos de BD
  const servicios = await getServicios();
  const serviciosSlugs = servicios.map((s) => s.slug);
  const parsed = parseSlug(slug, serviciosSlugs);
  if (parsed) {
    const ciudadData = await getCiudadCatalogo(parsed.ciudad);
    if (ciudadData) {
      if (parsed.servicio) {
        const servicioData = await getServicioBySlug(parsed.servicio);
        const servicioNombre = servicioData?.nombre_plural || servicioData?.nombre || parsed.servicio;
        return {
          title: `${servicioNombre} en ${ciudadData.nombre} - Health4Spain`,
          description: `Encuentra los mejores ${servicioNombre.toLowerCase()} en ${ciudadData.nombre}. Profesionales verificados que hablan tu idioma.`,
        };
      }
      
      return {
        title: `Vivir en ${ciudadData.nombre} - Guía Completa 2026 | Health4Spain`,
        description: `Todo lo que necesitas saber para vivir en ${ciudadData.nombre} como extranjero. Información actualizada sobre coste de vida, trámites, barrios y más.`,
      };
    }
  }
  
  return { title: 'Destino no encontrado' };
}

export async function generateStaticParams() {
  const supabase = createServerSupabaseClient();

  const { data: landings } = await supabase
    .from('landing_pages')
    .select('slug')
    .eq('activo', true)
    .eq('idioma', 'es');

  const { data: ciudades } = await supabase
    .from('ciudades_catalogo')
    .select('slug');

  const landingSlugs = (landings || []).map((l) => l.slug).filter((s): s is string => !!s);
  const citySlugs = (ciudades || []).map((c) => c.slug).filter((s): s is string => !!s);

  const allSlugs = [...new Set([...landingSlugs, ...citySlugs])];
  return allSlugs.map((slug) => ({ slug }));
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
  
  // Fallback a vista estática con datos de BD
  const servicios = await getServicios();
  const parsed = parseSlug(slug, servicios.map((s) => s.slug));
  if (!parsed) {
    notFound();
  }
  
  const ciudadData = await getCiudadCatalogo(parsed.ciudad);
  if (!ciudadData) {
    notFound();
  }
  
  // Si es servicio-ciudad, mostrar vista (sin landing en BD)
  if (parsed.servicio) {
    const servicioData = await getServicioBySlug(parsed.servicio);
    const servicioNombre = servicioData?.nombre_plural || servicioData?.nombre || parsed.servicio;
    return (
      <ServiceCityView 
        servicio={parsed.servicio} 
        servicioNombre={servicioNombre}
        ciudad={parsed.ciudad} 
        ciudadData={ciudadData} 
      />
    );
  }
  
  // Si es solo ciudad, mostrar vista de ciudad
  return <CityView slug={slug} ciudadData={ciudadData} />;
}

// Componente para landing pages de BD (diseño minimalista)
function LandingPageView({ landing }: { landing: LandingPage }) {
  // Extraer ciudad y servicio del slug si existen
  const slugParts = landing.slug.split('-');
  
  return (
    <>
      {/* Hero Section - Diseño minimalista */}
      <section className="section">
        <div className="container-base">
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/es' },
            { label: 'Destinos', href: '/es/destinos' },
            { label: landing.hero_title }
          ]} />
          <h1 className="mb-6 md:mb-8 text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-normal max-w-4xl">
            {landing.hero_title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl leading-relaxed">
            {landing.hero_subtitle}
          </p>
          {landing.hero_bullets && landing.hero_bullets.length > 0 && (
            <div className="flex flex-wrap gap-8 mb-12 pt-8 border-t border-gray-300">
              {landing.hero_bullets.slice(0, 3).map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-medium">{bullet}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Formulario embebido si hay servicio y ciudad */}
          {landing.servicio_slug && landing.ciudad_slug ? (
            <div className="max-w-2xl">
              <LandingFormEmbed 
                servicioSlug={landing.servicio_slug}
                ciudadSlug={landing.ciudad_slug}
                servicioNombre={landing.servicio_nombre || landing.servicio_slug}
                ciudadNombre={landing.ciudad_nombre || landing.ciudad_slug}
              />
            </div>
          ) : (
            <Link 
              href={`/es/solicitar?${landing.servicio_slug ? `servicio=${landing.servicio_slug}&` : ''}ciudad=${landing.ciudad_slug || landing.slug}`}
              className="btn-minimal-lg"
            >
              {landing.cta_subtitle || 'Solicitar información'}
            </Link>
          )}
        </div>
      </section>

      {/* Contenido principal */}
      <section className="section-alt">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Problema */}
              {landing.problem_title && landing.problems && landing.problems.length > 0 && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    {landing.problem_title}
                  </h2>
                  <div className="space-y-4">
                    {landing.problems.map((problem, idx) => (
                      <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
<svg className="w-6 h-6 text-accent mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m3-7a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-700 text-lg">{problem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solución */}
              {landing.solution_title && landing.solution_text && (
                <div className="bg-white border-t-3 border-accent p-8">
                  <h2 className="mb-6">
                    {landing.solution_title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-6">
                    {landing.solution_text}
                  </p>
                  <Link 
                    href={`/es/solicitar?${landing.servicio_slug ? `servicio=${landing.servicio_slug}&` : ''}ciudad=${landing.ciudad_slug || landing.slug}`}
                    className="btn-minimal inline-flex items-center gap-2"
                  >
                    Solicitar contacto →
                  </Link>
                </div>
              )}

              {/* Servicios */}
              {landing.services_title && landing.services && landing.services.length > 0 && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    {landing.services_title}
                  </h2>
                  <ul className="service-list-minimal">
                    {landing.services.map((service, idx) => (
                      <li key={idx} className="service-item-minimal">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          <ServiceIcon title={service.title} />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                            {service.title}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg text-gray-600">{service.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-12 pt-12 border-t border-gray-300">
                    <p className="text-gray-600 mb-6">¿Necesitas ayuda con alguno de estos servicios?</p>
                    <Link 
                      href={`/es/solicitar?${landing.servicio_slug ? `servicio=${landing.servicio_slug}&` : ''}ciudad=${landing.ciudad_slug || landing.slug}`}
                      className="btn-minimal-lg"
                    >
                      Solicitar información gratuita
                    </Link>
                  </div>
                </div>
              )}

              {/* Por qué esta ciudad */}
              {landing.why_city_title && landing.why_city_text && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    {landing.why_city_title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-line">
                    {landing.why_city_text}
                  </p>
                  {landing.why_city_stats && landing.why_city_stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {landing.why_city_stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                          <div className="text-sm uppercase tracking-widest text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-center mt-12">
                    <Link 
                      href={`/es/solicitar?${landing.servicio_slug ? `servicio=${landing.servicio_slug}&` : ''}ciudad=${landing.ciudad_slug || landing.slug}`}
                      className="btn-minimal"
                    >
                      Conectar con profesionales →
                    </Link>
                  </div>
                </div>
              )}

              {/* FAQs */}
              {landing.faqs && landing.faqs.length > 0 && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    Preguntas frecuentes
                  </h2>
                  <div className="space-y-6">
                    {landing.faqs.map((faq, idx) => (
                      <div key={idx} className="border-t-3 border-gray-300 pt-6">
                        <h3 className="text-xl font-bold mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white border-t-3 border-accent p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">
                  Solicita información
                </h3>
                <p className="text-gray-600 mb-6">
                  Te conectamos con profesionales verificados en menos de 24 horas.
                </p>
                <Link 
                  href={`/es/solicitar?${landing.servicio_slug ? `servicio=${landing.servicio_slug}&` : ''}ciudad=${landing.ciudad_slug || landing.slug}`}
                  className="block w-full text-center py-4 px-6 bg-[#293f92] text-white font-bold text-base hover:bg-[#1e2d6b] transition-colors rounded-sm"
                >
                  Comenzar ahora
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sin compromiso
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    100% gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Profesionales verificados
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section text-center">
        <div className="container-base">
          <h2 className="mb-8">
            {landing.cta_title || '¿Listo para empezar?'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {landing.cta_subtitle || 'Te conectamos con profesionales que hablan tu idioma'}
          </p>
          <Link 
            href={`/es/solicitar?${landing.servicio_slug ? `servicio=${landing.servicio_slug}&` : ''}ciudad=${landing.ciudad_slug || landing.slug}`}
            className="btn-minimal-lg"
          >
            Solicitar información gratuita
          </Link>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Respuesta en 24h
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Atención en tu idioma
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sin compromiso
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Componente para vista servicio-ciudad (fallback)
function ServiceCityView({ 
  servicio, 
  servicioNombre,
  ciudad, 
  ciudadData 
}: { 
  servicio: string; 
  servicioNombre: string;
  ciudad: string; 
  ciudadData: any;
}) {
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/es' },
            { label: 'Servicios', href: '/es/servicios' },
            { label: servicioNombre, href: `/es/servicios/${servicio}` },
            { label: ciudadData.nombre }
          ]} />
          <h1 className="mb-8">
            {servicioNombre} en {ciudadData.nombre}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            Profesionales verificados que hablan tu idioma en {ciudadData.nombre}.
          </p>
        </div>
      </section>

      <section className="section-alt text-center">
        <div className="container-narrow">
          <p className="text-gray-700 text-lg mb-12">
            Te conectamos con los mejores profesionales de {servicioNombre.toLowerCase()} en {ciudadData.nombre}. 
          </p>
          <Link 
            href={`/es/solicitar?servicio=${servicio}&ciudad=${ciudad}`} 
            className="btn-minimal-lg"
          >
            Solicitar información gratuita
          </Link>
        </div>
      </section>
    </>
  );
}

// Componente para vista de ciudad
async function CityView({ 
  slug, 
  ciudadData 
}: { 
  slug: string; 
  ciudadData: any;
}) {
  // Intentar obtener contenido rico desde la BD
  const contenidoDB = await getCiudadContenido(slug);
  
  // Si no hay contenido en BD, mostrar versión básica
  if (!contenidoDB) {
    return <CityViewBasic slug={slug} ciudadData={ciudadData} />;
  }
  
  return (
    <>
      {/* Hero Section */}
      <section className="section">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/es' },
            { label: 'Destinos', href: '/es/destinos' },
            { label: ciudadData.nombre }
          ]} />
          <h1 className="mb-8">
            Vivir en {ciudadData.nombre}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl">
            Todo lo que necesitas saber para vivir en {ciudadData.nombre} como extranjero
          </p>
          
          {/* Stats rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-300">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                {Math.round(ciudadData.poblacion / 1000)}K
              </div>
              <div className="text-sm uppercase tracking-widest text-gray-500">Habitantes</div>
            </div>
            {contenidoDB.temperatura_media && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                  {contenidoDB.temperatura_media}
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-500">Temperatura</div>
              </div>
            )}
            {ciudadData.porcentaje_extranjeros && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                  {ciudadData.porcentaje_extranjeros}%
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-500">Población extranjera</div>
              </div>
            )}
            {contenidoDB.dias_sol && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                  {contenidoDB.dias_sol}
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-500">Días de sol/año</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="section-alt">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Columna Principal */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Introducción */}
              <div>
                <h2 className="mb-8">
                  ¿Por qué mudarse a {ciudadData.nombre}?
                </h2>
                <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {contenidoDB.intro_text}
                </div>
              </div>

              {/* Ventajas */}
              {contenidoDB.ventajas && contenidoDB.ventajas.length > 0 && (
                <div>
                  <h2 className="mb-8">
                    Principales ventajas
                  </h2>
                  <ul className="service-list-minimal">
                    {contenidoDB.ventajas.map((ventaja: string, idx: number) => (
                      <li key={idx} className="py-6 border-b border-gray-300 flex items-start gap-4">
                        <svg className="w-6 h-6 text-accent mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-lg font-medium">{ventaja}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mejores Barrios */}
              {contenidoDB.barrios && contenidoDB.barrios.length > 0 && (
                <div>
                  <h2 className="mb-8">
                    Mejores zonas para extranjeros
                  </h2>
                  <p className="text-gray-700 text-lg mb-8">
                    Elegir el barrio adecuado es fundamental para tu experiencia en {ciudadData.nombre}.
                  </p>
                  <div className="space-y-6">
                    {contenidoDB.barrios.map((barrio: any, idx: number) => (
                      <div key={idx} className="border-t-3 border-gray-300 pt-6">
                        <h3 className="text-xl font-bold mb-3">{barrio.nombre}</h3>
                        <p className="text-gray-600 leading-relaxed">{barrio.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coste de Vida */}
              <div>
                <h2 className="mb-8">
                  Coste de vida: Precios reales 2026
                </h2>
                <div className="space-y-6">
                  {contenidoDB.coste_vida_alquiler && (
                    <div className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                        <svg className="w-8 h-8 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Alquiler de vivienda
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contenidoDB.coste_vida_alquiler}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_compra && (
                    <div className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                        <span className="text-2xl">🏢</span>
                        Compra de vivienda
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contenidoDB.coste_vida_compra}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_alimentacion && (
                    <div className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                        <span className="text-2xl">🛒</span>
                        Alimentación y supermercado
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contenidoDB.coste_vida_alimentacion}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_transporte && (
                    <div className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                        <span className="text-2xl">🚗</span>
                        Transporte
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contenidoDB.coste_vida_transporte}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Trámites */}
              {contenidoDB.tramites && contenidoDB.tramites.length > 0 && (
                <div>
                  <h2 className="mb-8">
                    Trámites esenciales
                  </h2>
                  <p className="text-gray-700 text-lg mb-8">
                    Establecerte legalmente en España requiere completar varios trámites.
                  </p>
                  <ul className="service-list-minimal">
                    {contenidoDB.tramites.map((tramite: string, idx: number) => (
                      <li key={idx} className="py-6 border-b border-gray-300 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shrink-0 font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 text-lg">{tramite}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 bg-white border-t-3 border-accent p-6">
                    <p className="text-gray-700 mb-4">
                      <strong>💡 Recomendación:</strong> Los trámites pueden ser complejos. 
                      Te conectamos con profesionales especializados (seguros, abogados, inmobiliarias, gestorías) que hablan tu idioma.
                    </p>
                    <Link 
                      href={`/es/solicitar?servicio=gestorias&ciudad=${slug}`}
                      className="btn-minimal"
                    >
                      Solicitar contacto →
                    </Link>
                  </div>
                </div>
              )}

              {/* FAQs */}
              {contenidoDB.faqs && contenidoDB.faqs.length > 0 && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    Preguntas frecuentes
                  </h2>
                  <div className="space-y-6">
                    {contenidoDB.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="border-t-3 border-gray-300 pt-6">
                        <h3 className="text-xl font-bold mb-3">
                          {faq.pregunta}
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{faq.respuesta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white border-t-3 border-accent p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">¿Listo para mudarte?</h3>
                <p className="text-gray-600 mb-6">
                  Te conectamos con profesionales verificados que te ayudarán en cada paso.
                </p>
                <Link href={`/es/solicitar?ciudad=${slug}`} className="btn-minimal-lg w-full text-center block mb-4">
                  Solicitar información gratuita
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  Sin compromiso • Atención en tu idioma
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section text-center">
        <div className="container-narrow">
          <h2 className="mb-8">
            Empieza tu nueva vida en {ciudadData.nombre}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            No tienes que hacerlo solo. Te conectamos con profesionales de confianza que hablan tu idioma.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href={`/es/solicitar?ciudad=${slug}`} className="btn-minimal-lg">
              Solicitar asesoramiento gratuito
            </Link>
            <Link href="/es/servicios" className="text-gray-700 hover:text-black font-medium">
              Ver todos los servicios →
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Profesionales verificados
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Atención en tu idioma
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sin compromiso
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
  ciudadData 
}: { 
  slug: string; 
  ciudadData: any;
}) {
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/es' },
            { label: 'Destinos', href: '/es/destinos' },
            { label: ciudadData.nombre }
          ]} />
          <h1 className="mb-8">
            Vivir en {ciudadData.nombre}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            Todo lo que necesitas saber para vivir en {ciudadData.nombre} como extranjero
          </p>
        </div>
      </section>

      <section className="section-alt text-center">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">{Math.round(ciudadData.poblacion / 1000)}K</div>
              <div className="text-sm uppercase tracking-widest text-gray-500">Habitantes</div>
            </div>
            {ciudadData.porcentaje_extranjeros && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">{ciudadData.porcentaje_extranjeros}%</div>
                <div className="text-sm uppercase tracking-widest text-gray-500">Población extranjera</div>
              </div>
            )}
            {ciudadData.datos_extra?.aeropuerto_cercano && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">{ciudadData.datos_extra.distancia_aeropuerto}km</div>
                <div className="text-sm uppercase tracking-widest text-gray-500">Aeropuerto</div>
              </div>
            )}
          </div>

          <div className="bg-white border-t-3 border-accent p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres información personalizada sobre {ciudadData.nombre}?
            </h3>
            <p className="text-gray-600 mb-6">
              Te conectamos con profesionales locales que te ayudarán con seguros, abogados, 
              inmobiliarias, gestorías y todo lo necesario para tu mudanza.
            </p>
            <Link href={`/es/solicitar?ciudad=${slug}`} className="btn-minimal-lg">
              Solicitar asesoramiento gratuito
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
