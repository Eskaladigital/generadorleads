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

// Datos extendidos por ciudad para contenido SEO
const CONTENIDO_EXTENDIDO: Record<string, {
  intro: string;
  barrios: Array<{ nombre: string; descripcion: string }>;
  costeVidaDetallado: { alquiler: string; compra: string; alimentacion: string; transporte: string };
  tramites: string[];
  faqs: Array<{ pregunta: string; respuesta: string }>;
}> = {
  'marbella': {
    intro: 'Marbella es uno de los destinos más codiciados del Mediterráneo europeo. Esta ciudad de la Costa del Sol ha sabido mantener su prestigio como capital del lujo en España, atrayendo a residentes internacionales de alto poder adquisitivo desde hace décadas. Con más de 320 días de sol al año, excelentes infraestructuras, campos de golf de categoría mundial y una oferta gastronómica excepcional, Marbella ofrece un estilo de vida mediterráneo de primera clase.',
    barrios: [
      { nombre: 'Puerto Banús', descripcion: 'El epicentro del lujo en Marbella, con su famoso puerto deportivo, boutiques de diseño y restaurantes de alta cocina. Ideal para quien busca exclusividad y vida social intensa.' },
      { nombre: 'Marbella Golden Mile', descripcion: 'La Milla de Oro concentra algunas de las propiedades más exclusivas de Europa. Entre Marbella centro y Puerto Banús, es la zona preferida por celebrities y millonarios.' },
      { nombre: 'Casco Antiguo', descripcion: 'El corazón histórico de Marbella ofrece encanto andaluz con sus calles empedradas, plazas con naranjos y arquitectura tradicional. Perfecto para vivir con autenticidad mediterránea.' },
      { nombre: 'Nueva Andalucía', descripcion: 'Conocida como el "Valle del Golf", esta zona residencial ofrece excelente relación calidad-precio, cercanía a colegios internacionales y ambiente familiar.' },
      { nombre: 'San Pedro de Alcántara', descripcion: 'Pueblo costero anexo a Marbella con ambiente más relajado y precios más accesibles. Ideal para familias que buscan tranquilidad sin renunciar a servicios.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 1.500-2.500€/mes (centro), 1.200-1.800€/mes (zonas residenciales). Villas desde 3.000€/mes',
      compra: 'Apartamento 2 dorm: 300.000-600.000€. Villas: desde 800.000€. Propiedades de lujo: 2-20+ millones €',
      alimentacion: 'Compra mensual pareja: 400-600€. Comida restaurante medio: 15-25€. Restaurante alto nivel: 50-100€/persona',
      transporte: 'No es necesario coche en el centro. Gasolina: 1,50€/litro. Taxi aeropuerto Málaga: 60-80€. Autobús: 1,35€'
    },
    tramites: [
      'Empadronamiento en el Ayuntamiento de Marbella (Plaza de los Naranjos)',
      'Número de Identificación de Extranjero (NIE) - imprescindible para cualquier gestión',
      'Apertura de cuenta bancaria española (necesario NIE y empadronamiento)',
      'Tarjeta sanitaria europea o seguro médico privado',
      'Alta en la Seguridad Social si trabajas por cuenta ajena',
      'Alta como autónomo si eres emprendedor',
      'Homologación del carné de conducir (no UE)',
      'Inscripción consular en tu embajada'
    ],
    faqs: [
      {
        pregunta: '¿Es caro vivir en Marbella?',
        respuesta: 'Marbella es una de las ciudades más caras de España, especialmente en zonas premium como Puerto Banús o la Milla de Oro. Sin embargo, zonas como San Pedro de Alcántara o Nueva Andalucía ofrecen precios más razonables. El coste de vida es entre 30-50% superior a la media española, pero inferior a ciudades como Londres o Ginebra.'
      },
      {
        pregunta: '¿Necesito hablar español para vivir en Marbella?',
        respuesta: 'No es imprescindible. Marbella tiene una enorme comunidad internacional y muchos servicios funcionan en inglés, alemán o francés. Sin embargo, aprender español mejorará significativamente tu experiencia y facilitará trámites administrativos.'
      },
      {
        pregunta: '¿Qué tipo de visado necesito?',
        respuesta: 'Depende de tu nacionalidad y situación. Ciudadanos UE/EEE solo necesitan registrarse. Ciudadanos no UE necesitan visado: Golden Visa (inversión 500.000€), visado de residencia no lucrativa, visado de trabajo o visado de estudiante. Te recomendamos consultar con un abogado de extranjería.'
      },
      {
        pregunta: '¿Hay buenos colegios internacionales?',
        respuesta: 'Sí, Marbella cuenta con excelentes colegios internacionales: Aloha College (británico), Swans International School (británico), Colegio Alemán de Málaga, The English International College, entre otros. Muchos ofrecen curriculum británico, americano o internacional (IB).'
      },
      {
        pregunta: '¿Cómo es la sanidad en Marbella?',
        respuesta: 'Marbella cuenta con hospitales públicos (Hospital Costa del Sol) y varios centros privados de alto nivel como HC Marbella International Hospital. Muchos expatriados optan por seguro privado que ofrece atención en inglés y sin listas de espera.'
      },
      {
        pregunta: '¿Es segura Marbella?',
        respuesta: 'Sí, Marbella es una ciudad muy segura. La tasa de criminalidad es baja y hay fuerte presencia policial, especialmente en zonas turísticas y residenciales de lujo. Como en cualquier destino turístico, conviene tomar precauciones básicas.'
      },
      {
        pregunta: '¿Cuánto se tarda del aeropuerto de Málaga a Marbella?',
        respuesta: 'El aeropuerto de Málaga-Costa del Sol está a 50 km, aproximadamente 45-60 minutos en coche por autopista (peaje). Hay autobuses directos (línea M-220) por unos 8-10€ que tardan 1 hora.'
      },
      {
        pregunta: '¿Qué actividades hay para expatriados?',
        respuesta: 'Marbella tiene una vida social muy activa: más de 70 campos de golf, deportes náuticos, clubes sociales internacionales, eventos culturales, restaurantes de cocina internacional, playas beach clubs, rutas de senderismo en Sierra Blanca y vida nocturna en Puerto Banús.'
      }
    ]
  },
  'malaga': {
    intro: 'Málaga ha experimentado una transformación espectacular en los últimos años, convirtiéndose en una de las ciudades más dinámicas de España. Capital de la Costa del Sol, combina su rico patrimonio histórico con una vibrante escena tecnológica y cultural. Con más de 30 museos (incluyendo el Museo Picasso), excelentes conexiones aéreas, un clima privilegiado y costes más asequibles que otras capitales europeas, Málaga atrae cada vez más nómadas digitales, emprendedores y familias internacionales.',
    barrios: [
      { nombre: 'Centro Histórico', descripcion: 'El corazón de Málaga con la Catedral, Alcazaba y vida cultural intensa. Perfecto para quienes buscan vivir en pleno centro con arquitectura histórica y ambiente cosmopolita.' },
      { nombre: 'Málaga Este (Pedregalejo/El Palo)', descripcion: 'Antiguos barrios pesqueros con playas urbanas y espeto de sardinas. Ambiente local auténtico con excelente comunicación al centro.' },
      { nombre: 'Teatinos', descripcion: 'Zona moderna y residencial cerca de la Universidad. Ideal para familias, con buenos colegios, comercios y precios más accesibles.' },
      { nombre: 'La Malagueta', descripcion: 'Zona de playa frente al puerto. Edificios señoriales, paseo marítimo y cercanía al centro. Zona premium con ambiente turístico.' },
      { nombre: 'Limonar', descripcion: 'Barrio residencial alto-standing con villas y apartamentos modernos. Tranquilo, con colegios internacionales cercanos.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 900-1.400€/mes (centro), 700-1.000€/mes (zonas residenciales)',
      compra: 'Apartamento 2 dorm: 200.000-350.000€. Propiedades premium: 400.000€+',
      alimentacion: 'Compra mensual pareja: 350-500€. Menú del día: 12-15€. Restaurante medio: 20-35€/persona',
      transporte: 'Abono mensual transporte público: 42€. Taxi medio: 8-12€. Bicicleta eléctrica compartida disponible'
    },
    tramites: [
      'Empadronamiento en el Ayuntamiento de Málaga',
      'NIE en la Oficina de Extranjería (Calle Tomás Heredia)',
      'Apertura de cuenta bancaria española',
      'Tarjeta sanitaria - Centro de Salud correspondiente a tu domicilio',
      'Certificado digital para gestiones online',
      'Alta como autónomo en la Seguridad Social (muchos nómadas digitales)',
      'Homologación del carné de conducir si no es de la UE'
    ],
    faqs: [
      {
        pregunta: '¿Es Málaga una buena ciudad para nómadas digitales?',
        respuesta: 'Sí, Málaga se ha convertido en un hub para nómadas digitales y emprendedores. Cuenta con numerosos espacios de coworking (TheCirc, La Noria, Málaga Valley), fibra óptica de alta velocidad, comunidad tech activa y coste de vida razonable. Además, el clima permite disfrutar de la playa después del trabajo.'
      },
      {
        pregunta: '¿Cómo es el transporte público en Málaga?',
        respuesta: 'Málaga tiene una red de autobuses urbanos (EMT) muy completa, dos líneas de metro, tren de cercanías a pueblos costeros, y está muy adaptada para bicicletas. El centro es muy caminable. El aeropuerto está conectado por tren (12 min al centro).'
      },
      {
        pregunta: '¿Hay trabajo en Málaga para extranjeros?',
        respuesta: 'Málaga tiene un ecosistema tecnológico en crecimiento (Málaga Valley) con demanda de desarrolladores, marketing digital y profesionales IT. También hay oportunidades en turismo, enseñanza de idiomas y sector servicios. El nivel de inglés requerido varía según el sector.'
      },
      {
        pregunta: '¿Qué hacer en Málaga además de la playa?',
        respuesta: 'Málaga ofrece más de 30 museos (Picasso, Thyssen, Pompidou, Ruso), teatros (Cervantes, Soho), festivales culturales, rutas de tapas, Caminito del Rey, pueblos blancos cercanos, deportes acuáticos y una activa vida nocturna.'
      }
    ]
  },
  'alicante': {
    intro: 'Alicante, capital de la Costa Blanca, se ha convertido en uno de los destinos favoritos para expatriados europeos. Esta ciudad mediterránea combina perfectamente playas urbanas con un casco histórico encantador, modernas infraestructuras y una vibrante comunidad internacional. Su aeropuerto conecta con más de 100 destinos europeos, facilitando visitas a tu país de origen. Alicante ofrece todo lo que necesitas: excelente clima, coste de vida razonable, sanidad de calidad y una cultura acogedora.',
    barrios: [
      { nombre: 'San Juan Playa', descripcion: 'Zona residencial con playa de arena dorada de 7km. Ideal para familias, con colegios internacionales, centros comerciales y ambiente tranquilo. Bien conectado al centro por tranvía.' },
      { nombre: 'Centro Histórico', descripcion: 'El corazón de Alicante con calles peatonales, Explanada de España, puerto y vida cultural. Perfecto para quien quiere vivir sin coche en plena actividad urbana.' },
      { nombre: 'Cabo de las Huertas', descripcion: 'Zona residencial de alto standing con calas rocosas y vistas al mar. Tranquilidad y naturaleza a 10 minutos del centro. Popular entre profesionales y jubilados.' },
      { nombre: 'Playa de San Juan - Urbanova', descripcion: 'Entre la playa y el aeropuerto, zona moderna con nuevas promociones. Ideal para profesionales que viajan frecuentemente. Cerca de parques comerciales y ocio.' },
      { nombre: 'Vistahermosa', descripcion: 'Barrio residencial elevado con vistas panorámicas. Zona tranquila con villas y apartamentos, cerca del hospital y centro médico privado.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 800-1.200€/mes (centro), 700-1.000€/mes (San Juan). Estudios: 550-750€/mes',
      compra: 'Apartamento 2 dorm: 150.000-280.000€ (según zona). Primera línea playa: 300.000-500.000€',
      alimentacion: 'Compra mensual pareja: 300-450€. Menú del día: 12-14€. Mercado Central muy económico. Cena restaurante: 20-30€/persona',
      transporte: 'Abono mensual TRAM: 43€. Bono 10 viajes: 9,45€. Taxi aeropuerto-centro: 25-30€. Alquiler bicicleta pública disponible'
    },
    tramites: [
      'Empadronamiento en el Ayuntamiento (Plaza del Ayuntamiento)',
      'NIE en Oficina de Extranjería (Calle Pintor Lorenzo Casanova, 6)',
      'Cuenta bancaria - principales bancos en centro ciudad',
      'Tarjeta sanitaria - Centro de Salud según tu zona de residencia',
      'Certificado digital para trámites online',
      'Alta en Hacienda si trabajas como autónomo',
      'Homologación carné de conducir (solo no-UE) en Jefatura de Tráfico'
    ],
    faqs: [
      {
        pregunta: '¿Es Alicante una buena ciudad para vivir como expatriado?',
        respuesta: 'Sí, Alicante es excelente para expatriados. Tiene una gran comunidad internacional (más del 20% de población extranjera), muchos servicios en inglés, coste de vida razonable, clima fantástico y excelentes conexiones aéreas. Es más pequeña y manejable que Barcelona o Madrid, pero con todos los servicios necesarios.'
      },
      {
        pregunta: '¿Cómo es el transporte en Alicante?',
        respuesta: 'Alicante tiene un excelente sistema de tranvía (TRAM) que conecta el centro con San Juan, El Campello y pueblos cercanos. Red de autobuses urbanos completa. El centro es muy caminable. Aeropuerto a 15 minutos del centro. Tren de alta velocidad AVE a Madrid (2h20min).'
      },
      {
        pregunta: '¿Hay trabajo en Alicante para extranjeros?',
        respuesta: 'Alicante tiene oportunidades principalmente en turismo, enseñanza de idiomas, sector servicios y cada vez más en tecnología. Muchos trabajadores remotos y nómadas digitales eligen Alicante por su calidad de vida. El nivel de vida es más bajo que Madrid/Barcelona, por lo que salarios remotos europeos rinden mucho.'
      },
      {
        pregunta: '¿Cuánto cuesta el seguro médico privado?',
        respuesta: 'Los seguros privados en Alicante son muy asequibles. Desde 50-80€/mes para adultos jóvenes hasta 150-200€/mes para mayores de 60. Compañías como Sanitas, Adeslas o DKV tienen hospitales y clínicas en Alicante con atención en varios idiomas.'
      },
      {
        pregunta: '¿Qué hacer en Alicante además de playa?',
        respuesta: 'Alicante ofrece: Castillo de Santa Bárbara, Explanada de España, Isla de Tabarca (excursión), rutas de senderismo en Sierra de Aitana, visitas a pueblos como Guadalest o Altea, golf, deportes náuticos, mercados tradicionales, festivales como Hogueras de San Juan, y vida nocturna en El Barrio.'
      }
    ]
  },
  'torrevieja': {
    intro: 'Torrevieja es el paraíso de los expatriados en España, con más del 50% de población extranjera. Esta ciudad costera de la Costa Blanca se ha especializado en ofrecer calidad de vida a precios asequibles para residentes europeos, especialmente británicos, escandinavos y alemanes. Su microclima único (gracias a las lagunas saladas), playas de bandera azul, infraestructura adaptada a expatriados y coste de vida competitivo la convierten en una opción ideal para jubilados, trabajadores remotos y familias.',
    barrios: [
      { nombre: 'Playa del Cura', descripcion: 'Centro turístico con paseo marítimo, restaurantes y comercios. Muy animado, cerca de todo. Ideal para vida social activa.' },
      { nombre: 'La Mata', descripcion: 'Zona más tranquila al norte, con playa larga y dunas naturales. Popular entre escandinavos. Ambiente relajado y familiar.' },
      { nombre: 'Punta Prima', descripcion: 'Zona residencial premium al sur, cerca de Orihuela Costa. Urbanizaciones con piscina, campo de golf cercano. Público británico.' },
      { nombre: 'Los Balcones', descripcion: 'Zona interior con villas y bungalows. Más económico que primera línea. Gran comunidad británica, supermercados internacionales.' },
      { nombre: 'Lago Jardín', descripcion: 'Urbanización tranquila con lagos artificiales. Seguridad, zonas verdes. Ideal para familias y jubilados que buscan paz.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 500-800€/mes. Villas con piscina: 800-1.500€/mes. Primera línea: desde 900€/mes',
      compra: 'Apartamento 2 dorm: 80.000-150.000€. Villas: 150.000-350.000€. Propiedades nuevas desde 120.000€',
      alimentacion: 'Compra mensual: 250-400€. Menú del día: 10-12€. Supermercados británicos (Iceland, Farm Foods) disponibles',
      transporte: 'Coche recomendado. Gasolina: 1,45€/litro. Bus a Alicante: 3-4€. Aeropuerto Alicante: 40 min en coche'
    },
    tramites: [
      'Empadronamiento - Ayuntamiento Torrevieja (muy acostumbrados a extranjeros)',
      'NIE - Oficina de Extranjería en Torrevieja o Alicante',
      'Cuenta bancaria - todos los bancos tienen personal bilingüe',
      'Certificado de residencia UE (si eres europeo)',
      'Seguro médico privado (muchos expatriados lo prefieren)',
      'Cambio de permiso de conducir (no-UE) - asesoría disponible en inglés',
      'Inscripción consular en tu embajada más cercana (Alicante)',
      'Testamento español (recomendado si compras propiedad)'
    ],
    faqs: [
      {
        pregunta: '¿Necesito hablar español en Torrevieja?',
        respuesta: 'No es imprescindible. Torrevieja está muy adaptada a expatriados: encontrarás médicos, abogados, gestores, bancos y comercios que operan en inglés, alemán o escandinavo. Sin embargo, aprender español básico mejorará tu experiencia y facilitará trámites oficiales.'
      },
      {
        pregunta: '¿Es Torrevieja solo para jubilados?',
        respuesta: 'No, aunque es popular entre jubilados europeos, cada vez más trabajadores remotos, familias jóvenes y emprendedores eligen Torrevieja por su bajo coste de vida, clima y conectividad. Hay comunidad activa de todas las edades.'
      },
      {
        pregunta: '¿Cómo es la sanidad para expatriados?',
        respuesta: 'Torrevieja tiene el Hospital Universitario Torrevieja con servicio público. También clínicas privadas con atención en varios idiomas. Muchos expatriados UE usan la Tarjeta Sanitaria Europea inicialmente y luego contratan seguro privado (40-150€/mes) para evitar esperas.'
      },
      {
        pregunta: '¿Es seguro comprar propiedad en Torrevieja?',
        respuesta: 'Sí, pero usa siempre un abogado independiente especializado en derecho inmobiliario. Verifica que la propiedad no tiene cargas, tiene cédula de habitabilidad y licencia de primera ocupación. Nunca pagues sin escrituras. Te conectamos con abogados de confianza.'
      }
    ]
  },
  'valencia': {
    intro: 'Valencia es la tercera ciudad de España y ofrece el equilibrio perfecto entre metrópoli y calidad de vida mediterránea. Ciudad de contrastes donde conviven casco histórico medieval, arquitectura futurista (Ciudad de las Artes y Ciencias) y kilómetros de playas urbanas. Con su clima envidiable, gastronomía excepcional (cuna de la paella), eventos internacionales (Fórmula 1, Americas Cup) y coste de vida razonable, Valencia atrae cada vez más profesionales y familias internacionales.',
    barrios: [
      { nombre: 'Ruzafa', descripcion: 'El barrio de moda, multicultural y bohemio. Mercado tradicional, cafés hipster, vida nocturna. Ideal para jóvenes profesionales y creativos.' },
      { nombre: 'Malvarrosa-Cabanyal', descripcion: 'Zona de playa con paseo marítimo renovado. Ambiente marinero auténtico, pescado fresco. Perfecto para amantes del mar.' },
      { nombre: 'Ensanche', descripcion: 'Centro expandido, elegante y comercial. Edificios modernistas, grandes avenidas. Ideal para familias, muy bien comunicado.' },
      { nombre: 'Benimaclet', descripcion: 'Antiguo pueblo anexionado, conserva identidad propia. Universitario, precios asequibles, buen ambiente. Popular entre estudiantes y jóvenes profesionales.' },
      { nombre: 'Campanar', descripcion: 'Zona residencial tranquila con parques. Bien conectada por metro. Ideal para familias, con colegios y servicios cercanos.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 800-1.200€/mes (centro), 650-950€/mes (zonas residenciales). Compartir habitación: 300-450€/mes',
      compra: 'Apartamento 2 dorm: 180.000-300.000€. Zonas premium (Ensanche, playa): 2.500-3.500€/m²',
      alimentacion: 'Compra mensual pareja: 350-500€. Menú del día: 12-15€. Mercado Central (productos frescos muy económicos)',
      transporte: 'Abono mensual metro+bus: 43€. Valenbisi (bicicleta pública): 30€/año. Taxi medio: 8-15€'
    },
    tramites: [
      'Empadronamiento en cualquier oficina municipal de distrito',
      'NIE - Oficina de Extranjería Valencia (Avenida de la Plata)',
      'Cuenta bancaria en cualquier sucursal',
      'Tarjeta sanitaria - Centro de Salud de tu zona',
      'Certificado digital (Cl@ve) para trámites online - muy útil',
      'Alta autónomos si trabajas por cuenta propia',
      'Abono transporte público con descuento residente',
      'Inscripción consular en tu embajada'
    ],
    faqs: [
      {
        pregunta: '¿Es Valencia una ciudad cara?',
        respuesta: 'No, Valencia tiene un coste de vida significativamente más bajo que Madrid o Barcelona (30-40% menos). Es posible vivir bien con 1.500-2.000€/mes por persona. El alquiler es razonable, la comida fresca muy económica en mercados, y transporte público eficiente y barato.'
      },
      {
        pregunta: '¿Hay oportunidades laborales en Valencia?',
        respuesta: 'Sí, Valencia tiene un ecosistema empresarial diverso: puerto comercial (segundo de España), industria cerámica, turismo, tecnología emergente (startups), educación y sector servicios. Hay demanda de profesionales IT, marketing digital, ingeniería y turismo. Nivel de inglés cada vez más valorado.'
      },
      {
        pregunta: '¿Cómo es el transporte público?',
        respuesta: 'Valencia tiene excelente transporte: metro (9 líneas), autobuses EMT, tranvía, sistema de bicicletas públicas Valenbisi. La ciudad es muy plana y ciclable. Centro muy caminable. Aeropuerto conectado por metro (20 min al centro). Tren AVE a Madrid (1h40min).'
      },
      {
        pregunta: '¿Qué hacer en Valencia?',
        respuesta: 'Muchísimo: Ciudad de las Artes y Ciencias, Oceanogràfic (acuario más grande de Europa), playas urbanas, Bioparc, casco histórico (Lonja, Catedral), Albufera (parque natural), Fallas (marzo), eventos deportivos, circuito F1, ruta del Santo Grial, gastronomía excepcional.'
      }
    ]
  },
  'madrid': {
    intro: 'Madrid, capital de España, es una metrópolis vibrante de más de 3 millones de habitantes que ofrece infinitas oportunidades profesionales y culturales. Centro neurálgico económico y político del país, atrae a profesionales de todo el mundo con su mercado laboral dinámico, vida cultural inigualable, excelentes conexiones internacionales y ambiente cosmopolita. Aunque el coste de vida es alto, los salarios también son superiores a la media española.',
    barrios: [
      { nombre: 'Chamberí', descripcion: 'Barrio residencial con encanto castizo. Excelentes restaurantes, comercio local. Popular entre profesionales y familias. Bien comunicado, ambiente auténtico madrileño.' },
      { nombre: 'Salamanca', descripcion: 'Zona premium y elegante. Boutiques de lujo, arquitectura señorial. Ideal para ejecutivos y diplomáticos. Coste de vida alto.' },
      { nombre: 'Malasaña', descripcion: 'Bohemio y alternativo. Vida nocturna, arte urbano, tiendas vintage. Perfecto para jóvenes profesionales creativos.' },
      { nombre: 'Retiro', descripcion: 'Junto al parque del Retiro. Tranquilo, residencial, muy bien conectado. Ideal para familias que buscan espacios verdes.' },
      { nombre: 'Las Rozas/Pozuelo', descripcion: 'Municipios del extrarradio con zonas residenciales de lujo, colegios internacionales. Perfecto para familias que trabajan en el centro pero prefieren vivir en zonas más tranquilas.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 1.200-1.800€/mes (centro), 900-1.400€/mes (zonas residenciales). Compartir habitación: 400-650€/mes',
      compra: 'Apartamento 2 dorm: 300.000-500.000€ (centro), 250.000-400.000€ (zonas residenciales). Salamanca/Chamberí: hasta 6.000€/m²',
      alimentacion: 'Compra mensual pareja: 400-600€. Menú del día: 12-18€. Cena restaurante: 25-45€/persona',
      transporte: 'Abono mensual metro+bus: 54€ (Zona A). Excelente red de transporte. Taxi medio: 10-15€. No necesitas coche en el centro'
    },
    tramites: [
      'Empadronamiento en Junta Municipal de tu distrito',
      'NIE - Oficinas de Extranjería (varias localizaciones, cita previa obligatoria)',
      'Cuenta bancaria - todas las entidades tienen oficinas en Madrid',
      'Tarjeta sanitaria - Centro de Salud de tu zona de residencia',
      'Alta en Hacienda y Seguridad Social si trabajas',
      'Certificado digital para gestiones telemáticas',
      'Abono transporte con tarjeta personalizada',
      'Homologación títulos universitarios (si necesario para trabajo)'
    ],
    faqs: [
      {
        pregunta: '¿Es difícil encontrar trabajo en Madrid como expatriado?',
        respuesta: 'Madrid tiene el mercado laboral más dinámico de España, especialmente en finanzas, tecnología, consultoría, marketing y sector servicios. Empresas multinacionales buscan perfiles con idiomas. El inglés es muy valorado, pero español es importante para la mayoría de posiciones. Networking es clave.'
      },
      {
        pregunta: '¿Es caro vivir en Madrid?',
        respuesta: 'Madrid es una de las ciudades más caras de España junto con Barcelona. Sin embargo, comparado con Londres, París o Dublín, es significativamente más económico (40-50% menos). Un profesional necesita al menos 2.000-2.500€/mes para vivir cómodamente solo.'
      },
      {
        pregunta: '¿Hay buenos colegios internacionales en Madrid?',
        respuesta: 'Sí, Madrid concentra los mejores colegios internacionales de España: American School, British Council, King\'s College, Lycée Français, Deutsche Schule, entre muchos otros. Ofrecen curriculum británico, americano, francés, alemán o IB. Precios: 5.000-15.000€/año.'
      },
      {
        pregunta: '¿Qué ofrece Madrid culturalmente?',
        respuesta: 'Madrid es una potencia cultural: Museo del Prado, Reina Sofía, Thyssen, Palacio Real, teatros (más de 40), musicales de Broadway, conciertos, ópera, flamenco auténtico, gastronomía de todas las regiones españolas, vida nocturna legendaria, eventos deportivos (Real Madrid, Atlético).'
      }
    ]
  },
  'barcelona': {
    intro: 'Barcelona es una ciudad cosmopolita única que combina arquitectura modernista icónica (Gaudí), playas urbanas, montaña (Tibidabo, Montjuïc), cultura mediterránea y un potente ecosistema emprendedor. Segunda ciudad de España, capital de Cataluña, atrae a profesionales y nómadas digitales de todo el mundo con su vibrante escena tecnológica (Mobile World Congress), universidades de prestigio, clima agradable y estilo de vida equilibrado. El coste de vida es alto pero la calidad de vida compensa.',
    barrios: [
      { nombre: 'Eixample', descripcion: 'El barrio modernista por excelencia con la Sagrada Familia. Calles en cuadrícula, ambiente cosmopolita. Ideal para profesionales. Bien comunicado.' },
      { nombre: 'Gràcia', descripcion: 'Antiguo pueblo con identidad propia. Bohemio, multicultural, plazas con terrazas. Perfecto para creativos y familias jóvenes.' },
      { nombre: 'Barceloneta/Poblenou', descripcion: 'Zona de playa. Poblenou es el "22@" distrito tecnológico. Startups, coworkings, vida junto al mar. Popular entre nómadas digitales.' },
      { nombre: 'Sant Gervasi', descripcion: 'Residencial y elegante, en la zona alta. Tranquilo, familiar, cerca de colegios internacionales. Coste de vida elevado.' },
      { nombre: 'Raval', descripcion: 'Multicultural y alternativo. Arte urbano, galerías, vida nocturna. Precios más económicos. Ideal para jóvenes.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 1.300-2.000€/mes (centro), 1.000-1.500€/mes (zonas residenciales). Compartir: 450-750€/mes',
      compra: 'Apartamento 2 dorm: 350.000-600.000€ (centro). Primera línea playa/Eixample premium: 4.000-7.000€/m²',
      alimentacion: 'Compra mensual pareja: 450-650€. Menú del día: 13-18€. Cena restaurante: 30-50€/persona',
      transporte: 'Abono mensual metro+bus: 40€ (T-usual). Red muy completa. Bicing (bicicleta pública): 50€/año. Taxi medio: 10-18€'
    },
    tramites: [
      'Empadronamiento en Oficina de Atención Ciudadana (OAC)',
      'NIE - Oficina de Extranjería Barcelona (cita previa online muy anticipada)',
      'Cuenta bancaria - todas las entidades operan en Barcelona',
      'Tarjeta sanitaria (CatSalut) - Centro de Atención Primaria (CAP)',
      'Alta en Hacienda y Seguridad Social',
      'Certificado digital idCAT para gestiones online en Cataluña',
      'Abono transporte TMB',
      'Aprender catalán (cursos gratuitos Consorci per a la Normalització Lingüística)'
    ],
    faqs: [
      {
        pregunta: '¿Necesito hablar catalán en Barcelona?',
        respuesta: 'No es imprescindible. Todo el mundo habla español (castellano) y muchos servicios funcionan en inglés. Sin embargo, el catalán es la lengua cooficial y se usa en administración pública y colegios públicos. En el día a día, el bilingüismo es común y la gente cambia fácilmente de idioma.'
      },
      {
        pregunta: '¿Es Barcelona una buena ciudad para emprendedores?',
        respuesta: 'Sí, Barcelona tiene un ecosistema emprendedor potente: Mobile World Congress, 22@ distrito de innovación, numerosas incubadoras y aceleradoras, inversores activos, comunidad internacional. Sectores fuertes: tecnología, turismo tech, e-commerce, diseño, biotecnología.'
      },
      {
        pregunta: '¿Cómo es la calidad de vida en Barcelona?',
        respuesta: 'Excelente. Barcelona ofrece: clima mediterráneo, 4km de playas urbanas, montañas cercanas (esquí a 2h), gastronomía excepcional, arquitectura única, vida cultural intensa, transporte público eficiente. El equilibrio vida-trabajo es mejor que en muchas capitales europeas.'
      },
      {
        pregunta: '¿Es segura Barcelona?',
        respuesta: 'Barcelona es generalmente segura, pero tiene problemas de carteristas en zonas turísticas (Ramblas, metro). Delitos violentos son raros. Precauciones básicas: vigilar pertenencias en transporte público y zonas concurridas. Barrios residenciales son muy seguros.'
      }
    ]
  },
  'palma': {
    intro: 'Palma de Mallorca combina el encanto mediterráneo de una isla paradisíaca con la sofisticación de una capital europea. Ciudad cosmopolita con casco histórico medieval, puerto deportivo de lujo, playas de ensueño y más de 300 días de sol al año. Palma atrae cada vez más a profesionales internacionales, nómadas digitales y familias que buscan calidad de vida en un entorno privilegiado. Las infraestructuras son de primer nivel y la comunidad internacional es muy activa.',
    barrios: [
      { nombre: 'Casco Antiguo', descripcion: 'Centro histórico con Catedral, calles estrechas y edificios señoriales. Encanto, cultura, gastronomía. Perfecto para vivir sin coche en pleno corazón de Palma.' },
      { nombre: 'Santa Catalina', descripcion: 'Antiguo barrio pesquero reconvertido en zona trendy. Mercado, restaurantes modernos, galerías. Popular entre expatriados jóvenes.' },
      { nombre: 'Portixol', descripcion: 'Zona de playa con paseo marítimo. Ambiente marinero chic, cafés, náutico. Ideal para amantes del mar y deportes acuáticos.' },
      { nombre: 'Son Vida', descripcion: 'Zona residencial de lujo con campo de golf. Villas exclusivas, vistas panorámicas. Para alto poder adquisitivo.' },
      { nombre: 'Génova', descripcion: 'Pueblo anexionado en las colinas con vistas a la bahía. Tranquilo, familiar, a 10 min del centro. Buen equilibrio precio-calidad.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 1.100-1.800€/mes (centro), 900-1.400€/mes (zonas residenciales). Primera línea: desde 1.500€/mes',
      compra: 'Apartamento 2 dorm: 300.000-500.000€. Propiedades de lujo con vistas: 600.000€-3M€+',
      alimentacion: 'Compra mensual pareja: 400-600€. Menú del día: 14-18€. Mercado Olivar (productos frescos). Cena restaurante: 30-50€/persona',
      transporte: 'Bus urbano (EMT): 1,50€. Abono mensual: 40€. Taxi medio: 10-15€. Aeropuerto a 15 min centro. Alquiler bicicletas/motos disponible'
    },
    tramites: [
      'Empadronamiento en Ayuntamiento de Palma',
      'NIE - Oficina de Extranjería Palma (calle Aragó)',
      'Cuenta bancaria en cualquier entidad',
      'Tarjeta sanitaria balear (IbSalut)',
      'Alta autónomos (muchos nómadas digitales)',
      'Certificado digital para gestiones online',
      'Registro de embarcaciones (si tienes barco)',
      'Inscripción consular'
    ],
    faqs: [
      {
        pregunta: '¿Es caro vivir en Palma?',
        respuesta: 'Palma tiene un coste de vida alto, similar a Barcelona y superior a otras ciudades españolas. Sin embargo, para estándares del norte de Europa (Alemania, UK, Escandinavia) resulta razonable. La calidad de vida, clima y entorno compensan para muchos expatriados.'
      },
      {
        pregunta: '¿Hay trabajo en Palma o es solo turístico?',
        respuesta: 'Además del turismo, Palma tiene economía diversificada: sector náutico (puertos deportivos, astilleros), servicios profesionales (abogados, asesores), comercio de lujo, cada vez más tecnología y teletrabajo. Muchos profesionales trabajan remotamente para empresas europeas desde Palma.'
      },
      {
        pregunta: '¿Es Palma solo para verano?',
        respuesta: 'No, Palma es una ciudad viva todo el año con 450.000 habitantes. El invierno es suave (15-18°C) y es temporada cultural: teatro, ópera, conciertos, gastronomía. Muchos residentes prefieren Palma en invierno cuando hay menos turistas.'
      },
      {
        pregunta: '¿Hay buenos colegios internacionales?',
        respuesta: 'Sí, Mallorca tiene excelentes colegios internacionales: Bellver International College (británico), Queen\'s College, Agora Portals International School, Academia Palma, colegios alemanes y franceses. Ofrecen currículum internacional (IB), británico, alemán o francés.'
      },
      {
        pregunta: '¿Qué hacer en Palma?',
        respuesta: 'Muchísimo: Catedral y casco histórico, Serra de Tramuntana (Patrimonio UNESCO), calas paradisíacas, deportes náuticos (vela, paddle, buceo), ciclismo (ruta ciclista famosa), golf (20+ campos en la isla), gastronomía mallorquina, mercados tradicionales, vida nocturna, excursiones a pueblos de montaña.'
      }
    ]
  },
  'tenerife': {
    intro: 'Tenerife, la mayor de las Islas Canarias, es conocida como la "isla de la eterna primavera" por su clima excepcional durante todo el año. Con temperaturas entre 18-28°C, playas de arena negra volcánica y dorada, el majestuoso Teide (volcán más alto de España), y ventajas fiscales únicas, Tenerife atrae cada vez más a nómadas digitales, emprendedores y familias que buscan calidad de vida. Santa Cruz y La Laguna (norte) son más urbanas, mientras que el sur es más turístico y soleado.',
    barrios: [
      { nombre: 'Santa Cruz', descripcion: 'Capital de la isla. Urbana, comercial, vida local auténtica. Centro administrativo con todos los servicios. Ideal para trabajar y vivir la cultura canaria.' },
      { nombre: 'La Laguna', descripcion: 'Ciudad universitaria Patrimonio UNESCO. Ambiente joven, cultural, histórico. Clima más fresco. Perfecta para familias y estudiantes.' },
      { nombre: 'Puerto de la Cruz', descripcion: 'Norte turístico con encanto tradicional. Clima subtropical, vegetación exuberante. Popular entre alemanes y británicos. Menos masificado que el sur.' },
      { nombre: 'Costa Adeje', descripcion: 'Sur turístico con playas, sol garantizado, resort lifestyle. Infraestructuras modernas, comercios internacionales. Ideal para amantes del sol.' },
      { nombre: 'Los Realejos', descripcion: 'Pueblo tradicional cerca de Puerto de la Cruz. Más económico, auténtico, con vistas al Teide. Perfecto para quienes buscan tranquilidad.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 700-1.100€/mes (zonas urbanas), 600-900€/mes (pueblos). Sur turístico: 800-1.400€/mes',
      compra: 'Apartamento 2 dorm: 150.000-280.000€. Propiedades con vistas: 250.000-600.000€',
      alimentacion: 'Compra mensual: 300-450€. Productos locales muy económicos (plátanos, papas, pescado). Menú del día: 10-14€',
      transporte: 'Coche casi imprescindible. Gasolina más barata que península. Bus (TITSA): 1,45€. Bono mensual: 50€. Sin metro/tren'
    },
    tramites: [
      'Empadronamiento en ayuntamiento correspondiente',
      'NIE - Oficina de Extranjería Santa Cruz',
      'Cuenta bancaria en cualquier entidad',
      'Tarjeta sanitaria canaria',
      'Alta en Hacienda como residente canario (régimen fiscal especial)',
      'Matriculación vehículo con matrícula canaria (si procede)',
      'Certificado ZEC (Zona Especial Canaria) si eres emprendedor',
      'Inscripción consular'
    ],
    faqs: [
      {
        pregunta: '¿Qué ventajas fiscales tiene Tenerife?',
        respuesta: 'Canarias tiene régimen fiscal especial: IGIC (impuesto similar al IVA) del 7% vs 21% península, deducciones fiscales por residencia, Zona Especial Canaria (ZEC) con impuesto de sociedades del 4% para empresas que cumplan requisitos. También es zona franca para importaciones.'
      },
      {
        pregunta: '¿Es Tenerife buena para nómadas digitales?',
        respuesta: 'Sí, cada vez más nómadas eligen Tenerife: clima todo el año, coste de vida razonable, fibra óptica de calidad, espacios de coworking (Santa Cruz, Puerto de la Cruz), comunidad internacional activa, vuelos directos a Europa. El visado de nómada digital español facilita estancias largas.'
      },
      {
        pregunta: '¿Norte o Sur de Tenerife?',
        respuesta: 'Depende de preferencias: Sur (Costa Adeje, Los Cristianos) tiene más sol, playas turísticas, ambiente resort. Norte (Santa Cruz, La Laguna, Puerto de la Cruz) es más verde, lluvioso, auténtico, cultural y residencial. Muchos locales prefieren el norte por ser más "real".'
      },
      {
        pregunta: '¿Hay vuelos directos desde Tenerife?',
        respuesta: 'Sí, Tenerife tiene dos aeropuertos: Sur (TFS, más turístico) y Norte (TFN, más peninsular). Conexiones directas con principales ciudades europeas: Londres, Berlín, Ámsterdam, París, Madrid, Barcelona. Vuelos frecuentes a península española (2h30 aprox).'
      },
      {
        pregunta: '¿Qué hacer en Tenerife?',
        respuesta: 'Infinitas actividades: subir al Teide (3.718m), observación de estrellas (cielos limpios), avistamiento de ballenas, buceo, surf, senderismo (bosques de laurisilva), Carnaval de Santa Cruz (segundo más importante del mundo), pueblos tradicionales, gastronomía canaria, playas variadas.'
      }
    ]
  },
  'default': {
    intro: 'Una ciudad con encanto que atrae cada vez más a residentes internacionales por su calidad de vida, clima mediterráneo y excelentes servicios.',
    barrios: [
      { nombre: 'Centro', descripcion: 'El corazón de la ciudad con todos los servicios, comercios y vida cultural a mano.' },
      { nombre: 'Zona residencial', descripcion: 'Áreas más tranquilas ideales para familias, con colegios y parques cercanos.' }
    ],
    costeVidaDetallado: {
      alquiler: 'Apartamento 2 dorm: 700-1.200€/mes',
      compra: 'Apartamento 2 dorm: 150.000-300.000€',
      alimentacion: 'Compra mensual: 300-450€. Restaurante: 12-20€/persona',
      transporte: 'Transporte público: 30-40€/mes. Taxi medio: 8-15€'
    },
    tramites: [
      'Empadronamiento en el Ayuntamiento',
      'Obtención del NIE (Número de Identificación de Extranjero)',
      'Apertura de cuenta bancaria',
      'Tarjeta sanitaria o seguro médico privado'
    ],
    faqs: [
      {
        pregunta: '¿Necesito hablar español?',
        respuesta: 'Aunque no es imprescindible, hablar español facilitará mucho tu vida diaria y los trámites administrativos. Muchos servicios cuentan con atención en otros idiomas.'
      },
      {
        pregunta: '¿Cómo es el sistema sanitario?',
        respuesta: 'España cuenta con un sistema sanitario público de calidad. Como residente, tendrás acceso a la sanidad pública. También existe una amplia oferta de seguros privados con atención rápida.'
      }
    ]
  }
};

// Componente para vista de ciudad
function CityView({ 
  slug, 
  ciudad 
}: { 
  slug: string; 
  ciudad: typeof CIUDADES_DATA[string];
}) {
  // Obtener contenido extendido (usar default si no existe)
  const contenido = CONTENIDO_EXTENDIDO[slug] || CONTENIDO_EXTENDIDO['default'];
  
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
                <p className="text-gray-700 leading-relaxed">{contenido.intro}</p>
              </div>

              {/* Ventajas */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  Principales ventajas de vivir en {ciudad.nombre}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ciudad.puntos.map((punto, idx) => (
                    <div key={idx} className="flex items-start gap-3 card p-4">
                      <svg className="w-6 h-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 font-medium">{punto}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mejores Barrios */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  Mejores zonas y barrios para expatriados en {ciudad.nombre}
                </h2>
                <p className="text-gray-700 mb-6">
                  Elegir el barrio adecuado es fundamental para tu experiencia en {ciudad.nombre}. 
                  Aquí te presentamos las zonas más populares entre residentes internacionales:
                </p>
                <div className="space-y-4">
                  {contenido.barrios.map((barrio, idx) => (
                    <div key={idx} className="card p-5">
                      <h3 className="font-heading font-bold text-gray-900 mb-2">{barrio.nombre}</h3>
                      <p className="text-gray-600 text-sm">{barrio.descripcion}</p>
                    </div>
                  ))}
                </div>
              </div>

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
                  <div className="card p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Alquiler y compra de vivienda
                    </h3>
                    <p className="text-gray-600 text-sm">{contenido.costeVidaDetallado.alquiler}</p>
                    <p className="text-gray-600 text-sm mt-2">{contenido.costeVidaDetallado.compra}</p>
                  </div>
                  <div className="card p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Alimentación y supermercado
                    </h3>
                    <p className="text-gray-600 text-sm">{contenido.costeVidaDetallado.alimentacion}</p>
                  </div>
                  <div className="card p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Transporte
                    </h3>
                    <p className="text-gray-600 text-sm">{contenido.costeVidaDetallado.transporte}</p>
                  </div>
                </div>
              </div>

              {/* Trámites */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  Trámites esenciales al mudarte a {ciudad.nombre}
                </h2>
                <p className="text-gray-700 mb-6">
                  Establecerte legalmente en España requiere completar varios trámites. Te ayudamos a entender 
                  los pasos necesarios y podemos conectarte con gestores y abogados especializados:
                </p>
                <div className="space-y-3">
                  {contenido.tramites.map((tramite, idx) => (
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

              {/* FAQs */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  Preguntas frecuentes sobre vivir en {ciudad.nombre}
                </h2>
                <div className="space-y-4">
                  {contenido.faqs.map((faq, idx) => (
                    <div key={idx} className="card p-5">
                      <h3 className="font-heading font-semibold text-gray-900 mb-3 flex items-start gap-2">
                        <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {faq.pregunta}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.respuesta}</p>
                    </div>
                  ))}
                </div>
              </div>

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
                    <dd className="font-semibold text-gray-900 text-lg">{ciudad.clima}</dd>
                  </div>
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
