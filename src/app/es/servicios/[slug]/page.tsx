import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';
import { LandingPage } from '@/lib/types';
import Breadcrumbs from '@/components/Breadcrumbs';

// Pre-renderizar en build para SEO. Revalidar cada 24h por si se actualizan landings.
export const revalidate = 86400;

// Función para obtener landing page desde la BD
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
      return null;
    }
    return data as LandingPage;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

// Datos de servicios
const SERVICIOS_DATA: Record<string, {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  beneficios: { titulo: string; descripcion: string }[];
  faqs: { pregunta: string; respuesta: string }[];
  ciudadesPopulares: string[];
}> = {
  'seguros': {
    titulo: 'Seguros de Salud',
    subtitulo: 'Cobertura médica completa para extranjeros en España',
    descripcion: 'El sistema sanitario español es de los mejores del mundo, pero como extranjero necesitas un seguro privado para acceder a él sin esperas. Te conectamos con las mejores aseguradoras que ofrecen pólizas adaptadas a residentes internacionales.',
    beneficios: [
      {
        titulo: 'Cobertura inmediata',
        descripcion: 'Sin períodos de carencia. Acceso a consultas y urgencias desde el primer día.',
      },
      {
        titulo: 'Cuadro médico amplio',
        descripcion: 'Miles de profesionales y centros médicos en toda España a tu disposición.',
      },
      {
        titulo: 'Atención multilingüe',
        descripcion: 'Médicos y personal sanitario que hablan inglés, alemán, francés y más.',
      },
      {
        titulo: 'Repatriación incluida',
        descripcion: 'Cobertura de traslado a tu país de origen en caso de necesidad.',
      },
    ],
    faqs: [
      {
        pregunta: '¿Necesito seguro privado si tengo tarjeta sanitaria europea?',
        respuesta: 'La TSE solo cubre urgencias y situaciones temporales. Para residentes es imprescindible un seguro privado o el convenio especial con la Seguridad Social.',
      },
      {
        pregunta: '¿Puedo contratar seguro sin NIE?',
        respuesta: 'Sí, algunas aseguradoras permiten contratar con pasaporte mientras tramitas tu NIE.',
      },
      {
        pregunta: '¿Cubren preexistencias?',
        respuesta: 'Depende de la aseguradora y el tipo de póliza. Te asesoramos para encontrar la mejor opción según tu historial médico.',
      },
    ],
    ciudadesPopulares: ['madrid', 'barcelona', 'valencia', 'malaga', 'alicante'],
  },
  'abogados': {
    titulo: 'Abogados',
    subtitulo: 'Expertos en todas las materias: familia, civil, laboral, extranjería',
    descripcion: 'Necesitas un abogado para divorcio, herencias, contratos laborales, visados o cualquier asunto legal. Te conectamos con profesionales verificados que hablan tu idioma y conocen la legislación española.',
    beneficios: [
      {
        titulo: 'Todas las especialidades',
        descripcion: 'Abogados en familia, civil, laboral, extranjería, penal y más. Encuentra el profesional adecuado para tu caso.',
      },
      {
        titulo: 'Gestión completa',
        descripcion: 'Nos encargamos de toda la documentación y trámites ante las autoridades.',
      },
      {
        titulo: 'Seguimiento personalizado',
        descripcion: 'Te mantenemos informado del estado de tu expediente en todo momento.',
      },
      {
        titulo: 'Recursos y apelaciones',
        descripcion: 'Si hay problemas con tu solicitud, preparamos recursos administrativos y judiciales.',
      },
    ],
    faqs: [
      {
        pregunta: '¿Cuánto tarda obtener el NIE?',
        respuesta: 'El NIE se puede obtener en 1-2 semanas si se tiene cita. Lo más difícil es conseguir cita previa, donde un abogado puede ayudarte.',
      },
      {
        pregunta: '¿Qué visado necesito para vivir en España?',
        respuesta: 'Depende de tu nacionalidad y situación. Los más comunes son: visa no lucrativa, visa de trabajo, visa de estudiante y Golden Visa.',
      },
      {
        pregunta: '¿Cuándo puedo solicitar la nacionalidad?',
        respuesta: 'Generalmente tras 10 años de residencia legal, aunque hay excepciones (2 años para iberoamericanos, 1 año si estás casado con español/a).',
      },
    ],
    ciudadesPopulares: ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga'],
  },
  'inmobiliarias': {
    titulo: 'Inmobiliarias',
    subtitulo: 'Encuentra tu hogar ideal en España',
    descripcion: 'Comprar o alquilar en España siendo extranjero tiene sus particularidades. Trabajamos con inmobiliarias que entienden las necesidades de los extranjeros y te acompañan en todo el proceso.',
    beneficios: [
      {
        titulo: 'Búsqueda personalizada',
        descripcion: 'Definimos tus criterios y buscamos propiedades que realmente se ajusten a lo que necesitas.',
      },
      {
        titulo: 'Conocimiento local',
        descripcion: 'Te asesoramos sobre las mejores zonas según tu perfil: familias, jubilados, profesionales.',
      },
      {
        titulo: 'Gestión documental',
        descripcion: 'Ayuda con contratos, NIE, apertura de cuenta bancaria y todo lo necesario para la compra.',
      },
      {
        titulo: 'Postventa',
        descripcion: 'Te ayudamos con reformas, suministros, comunidad de vecinos y más.',
      },
    ],
    faqs: [
      {
        pregunta: '¿Puedo comprar una casa en España sin ser residente?',
        respuesta: 'Sí, cualquier extranjero puede comprar propiedad en España. Solo necesitas un NIE y una cuenta bancaria española.',
      },
      {
        pregunta: '¿Cuánto cuesta comprar una casa en España?',
        respuesta: 'Además del precio de la vivienda, calcula un 10-15% adicional para impuestos (ITP o IVA), notaría, registro e hipoteca.',
      },
      {
        pregunta: '¿Es fácil obtener una hipoteca siendo extranjero?',
        respuesta: 'Es posible, aunque los bancos suelen financiar un máximo del 60-70% para no residentes, frente al 80% para residentes.',
      },
    ],
    ciudadesPopulares: ['marbella', 'alicante', 'torrevieja', 'palma', 'tenerife'],
  },
  'gestorias': {
    titulo: 'Gestorías',
    subtitulo: 'Trámites administrativos sin complicaciones',
    descripcion: 'La burocracia española puede ser frustrante si no conoces el sistema. Una gestoría te ahorra tiempo y quebraderos de cabeza con todos los trámites administrativos.',
    beneficios: [
      {
        titulo: 'Experiencia con extranjeros',
        descripcion: 'Conocen los trámites específicos que necesitan los no españoles.',
      },
      {
        titulo: 'Ahorro de tiempo',
        descripcion: 'Evita colas interminables y citas imposibles de conseguir.',
      },
      {
        titulo: 'Todo en uno',
        descripcion: 'NIE, empadronamiento, impuestos, vehículos, Seguridad Social... un solo interlocutor.',
      },
      {
        titulo: 'Precios cerrados',
        descripcion: 'Sabes exactamente cuánto vas a pagar antes de empezar.',
      },
    ],
    faqs: [
      {
        pregunta: '¿Qué trámites puede hacer una gestoría?',
        respuesta: 'Prácticamente todo: NIE, empadronamiento, declaración de la renta, alta en autónomos, matriculación de vehículos, homologación de títulos...',
      },
      {
        pregunta: '¿Es caro contratar una gestoría?',
        respuesta: 'Los precios varían según el trámite. El NIE puede costar 50-100€, la declaración de la renta 50-150€. El ahorro de tiempo suele compensar.',
      },
      {
        pregunta: '¿Necesito estar presente para los trámites?',
        respuesta: 'Para algunos trámites sí (como el NIE), pero muchos se pueden hacer con un poder notarial.',
      },
    ],
    ciudadesPopulares: ['madrid', 'barcelona', 'valencia', 'alicante', 'malaga'],
  },
};

const CIUDADES_NOMBRES: Record<string, string> = {
  'madrid': 'Madrid',
  'barcelona': 'Barcelona',
  'valencia': 'Valencia',
  'malaga': 'Málaga',
  'alicante': 'Alicante',
  'sevilla': 'Sevilla',
  'marbella': 'Marbella',
  'torrevieja': 'Torrevieja',
  'palma': 'Palma de Mallorca',
  'tenerife': 'Tenerife',
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Primero verificar si es una landing page (servicio-ciudad)
  if (slug.includes('-')) {
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
  }
  
  // Si no es landing, es página de servicio estático
  const servicio = SERVICIOS_DATA[slug];
  
  if (!servicio) {
    return { title: 'Servicio no encontrado' };
  }
  
  return {
    title: `${servicio.titulo} para Extranjeros en España | Health4Spain`,
    description: servicio.descripcion.slice(0, 155) + '...',
  };
}

export async function generateStaticParams() {
  const supabase = createServerSupabaseClient();
  const staticServices = Object.keys(SERVICIOS_DATA).map((slug) => ({ slug }));

  const { data: landings } = await supabase
    .from('landing_pages')
    .select('slug')
    .eq('activo', true)
    .eq('idioma', 'es');

  const landingSlugs = (landings || [])
    .map((l) => l.slug)
    .filter((s): s is string => !!s && s.includes('-'));

  return [...staticServices, ...landingSlugs.map((slug) => ({ slug }))];
}

export default async function ServicioPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Primero verificar si es una landing page (servicio-ciudad)
  if (slug.includes('-')) {
    const landing = await getLanding(slug);
    if (landing) {
      return <LandingPageView landing={landing} />;
    }
  }
  
  // Si no es landing, mostrar página de servicio estático
  const servicio = SERVICIOS_DATA[slug];
  
  if (!servicio) {
    notFound();
  }

  return (
    <>
      {/* Header - Diseño minimalista */}
      <section className="section">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/es' },
            { label: 'Servicios', href: '/es/servicios' },
            { label: servicio.titulo }
          ]} />
          <h1 className="mb-8">
            {servicio.titulo}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            {servicio.subtitulo}
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="section-alt">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-16">
              {/* Descripción */}
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {servicio.descripcion}
                </p>
              </div>

              {/* Beneficios */}
              <div>
                <h2 className="mb-8">
                  ¿Por qué elegirnos?
                </h2>
                <ul className="service-list-minimal">
                  {servicio.beneficios.map((beneficio, index) => (
                    <li key={index} className="service-item-minimal">
                      <div className="service-number">0{index + 1}</div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {beneficio.titulo}
                        </h3>
                        <p className="text-base md:text-lg text-gray-600">
                          {beneficio.descripcion}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="mb-8">
                  Preguntas frecuentes
                </h2>
                <div className="space-y-6">
                  {servicio.faqs.map((faq, index) => (
                    <div key={index} className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3">
                        {faq.pregunta}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.respuesta}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* CTA Card */}
              <div className="bg-white border-t-3 border-accent p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">
                  Solicita información
                </h3>
                <p className="text-gray-600 mb-6">
                  Te conectamos con profesionales verificados en menos de 24 horas.
                </p>
                <Link 
                  href={`/es/contacto?servicio=${slug}`}
                  className="btn-minimal-lg w-full text-center block mb-4"
                >
                  Comenzar ahora
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  Sin compromiso · 100% gratuito
                </p>
              </div>

              {/* Ciudades populares */}
              {servicio.ciudadesPopulares.length > 0 && (
                <div className="bg-white border-t-3 border-gray-300 p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Ciudades populares
                  </h3>
                  <div className="space-y-3">
                    {servicio.ciudadesPopulares.map((ciudadSlug) => (
                      <Link
                        key={ciudadSlug}
                        href={`/es/contacto?servicio=${slug}&ciudad=${ciudadSlug}`}
                        className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0 hover:pl-2 transition-all group"
                      >
                        <span className="text-gray-700 font-medium group-hover:text-accent">
                          {CIUDADES_NOMBRES[ciudadSlug]}
                        </span>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section text-center">
        <div className="container-narrow">
          <h2 className="mb-8">
            ¿Listo para encontrar tu {servicio.titulo.toLowerCase().replace('abogados', 'abogado').replace('seguros de ', 'seguro de ')}?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Te conectamos con profesionales verificados que hablan tu idioma. Sin compromiso.
          </p>
          <Link 
            href={`/es/contacto?servicio=${slug}`} 
            className="btn-minimal-lg"
          >
            Solicitar información gratuita
          </Link>
        </div>
      </section>
    </>
  );
}

// Componente para renderizar landing pages dinámicas (diseño minimalista)
function LandingPageView({ landing }: { landing: LandingPage }) {
  return (
    <>
      {/* Hero Section */}
      <section className="section">
        <div className="container-base">
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/es' },
            { label: 'Servicios', href: '/es/servicios' },
            ...(landing.servicio_nombre ? [{ label: landing.servicio_nombre, href: `/es/servicios/${landing.servicio_slug}` }] : []),
            { label: landing.hero_title }
          ]} />
          <h1 className="mb-8">
            {landing.hero_title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
            {landing.hero_subtitle}
          </p>
          {landing.hero_bullets && landing.hero_bullets.length > 0 && (
            <div className="flex flex-wrap gap-8 mb-12 pt-8 border-t border-gray-300">
              {landing.hero_bullets.slice(0, 3).map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-medium">{bullet}</span>
                </div>
              ))}
            </div>
          )}
          <Link 
            href={`/es/contacto?slug=${landing.slug}`}
            className="btn-minimal-lg"
          >
            Solicitar información gratuita
          </Link>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="section-alt">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-16">
            
            {/* Columna Principal */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Problema */}
              {landing.problem_title && landing.problems && landing.problems.length > 0 && (
                <div>
                  <h2 className="mb-8">
                    {landing.problem_title}
                  </h2>
                  <div className="space-y-4">
                    {landing.problems.map((problem, idx) => (
                      <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                        <svg className="w-6 h-6 text-accent mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
                    href={`/es/contacto?slug=${landing.slug}`}
                    className="btn-minimal inline-flex items-center gap-2"
                  >
                    Solicitar contacto →
                  </Link>
                </div>
              )}

              {/* Servicios Específicos */}
              {landing.services_title && landing.services && landing.services.length > 0 && (
                <div>
                  <h2 className="mb-8">
                    {landing.services_title}
                  </h2>
                  <ul className="service-list-minimal">
                    {landing.services.map((service, idx) => (
                      <li key={idx} className="service-item-minimal">
                        <div className="text-3xl">{service.icon || `0${idx + 1}`}</div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-2">
                            {service.title}
                          </h3>
                          <p className="text-base md:text-lg text-gray-600">{service.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-12 pt-12 border-t border-gray-300">
                    <p className="text-gray-600 mb-6">¿Necesitas ayuda con alguno de estos servicios?</p>
                    <Link 
                      href={`/es/contacto?slug=${landing.slug}`}
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
                  <h2 className="mb-8">
                    {landing.why_city_title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-line">
                    {landing.why_city_text}
                  </p>
                  {landing.why_city_stats && landing.why_city_stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {landing.why_city_stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-5xl md:text-6xl font-bold text-accent mb-2">
                            {stat.value}
                          </div>
                          <div className="text-sm uppercase tracking-widest text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-center mt-12">
                    <Link 
                      href={`/es/contacto?slug=${landing.slug}`}
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
                  <h2 className="mb-8">
                    Preguntas frecuentes
                  </h2>
                  <div className="space-y-6">
                    {landing.faqs.map((faq, idx) => (
                      <div key={idx} className="border-t-3 border-gray-300 pt-6">
                        <h3 className="text-xl font-bold mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
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
                  href={`/es/contacto?slug=${landing.slug}`}
                  className="btn-minimal-lg w-full text-center block mb-4"
                >
                  Comenzar ahora
                </Link>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sin compromiso
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    100% gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
            href={`/es/contacto?slug=${landing.slug}`}
            className="btn-minimal-lg"
          >
            Solicitar información gratuita
          </Link>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Respuesta en 24h
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Atención en tu idioma
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sin compromiso
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
