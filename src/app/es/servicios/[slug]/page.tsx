import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
    subtitulo: 'Cobertura médica completa para expatriados en España',
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
    titulo: 'Abogados de Extranjería',
    subtitulo: 'Expertos en visados, residencia y nacionalidad española',
    descripcion: 'La burocracia española puede ser compleja para extranjeros. Nuestros abogados especializados en extranjería te guían en cada paso: desde la obtención del NIE hasta la nacionalidad española.',
    beneficios: [
      {
        titulo: 'Especialización en extranjería',
        descripcion: 'Abogados que se dedican exclusivamente a derecho de extranjería e inmigración.',
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
    descripcion: 'Comprar o alquilar en España siendo extranjero tiene sus particularidades. Trabajamos con inmobiliarias que entienden las necesidades de los expatriados y te acompañan en todo el proceso.',
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
  'dentistas': {
    titulo: 'Clínicas Dentales',
    subtitulo: 'Odontología de calidad a precios competitivos',
    descripcion: 'España es conocida por su excelente relación calidad-precio en tratamientos dentales. Muchos europeos viajan específicamente para hacerse tratamientos aquí. Te conectamos con las mejores clínicas.',
    beneficios: [
      {
        titulo: 'Precios competitivos',
        descripcion: 'Tratamientos hasta un 50-70% más baratos que en otros países europeos.',
      },
      {
        titulo: 'Tecnología avanzada',
        descripcion: 'Clínicas equipadas con la última tecnología: escáneres 3D, implantes guiados por ordenador.',
      },
      {
        titulo: 'Profesionales cualificados',
        descripcion: 'Dentistas con formación en las mejores universidades españolas y europeas.',
      },
      {
        titulo: 'Facilidades de pago',
        descripcion: 'Financiación sin intereses y presupuestos cerrados sin sorpresas.',
      },
    ],
    faqs: [
      {
        pregunta: '¿Son buenos los dentistas en España?',
        respuesta: 'España tiene excelentes facultades de odontología y los profesionales están muy bien formados. La calidad es comparable a cualquier país europeo.',
      },
      {
        pregunta: '¿Cuánto cuesta un implante dental?',
        respuesta: 'Un implante completo (incluida corona) cuesta entre 800€ y 1.500€ dependiendo de la clínica y materiales.',
      },
      {
        pregunta: '¿Hablan inglés en las clínicas?',
        respuesta: 'Muchas clínicas en zonas con expatriados tienen personal que habla inglés, alemán y otros idiomas.',
      },
    ],
    ciudadesPopulares: ['barcelona', 'madrid', 'valencia', 'malaga', 'alicante'],
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
  'bilbao': 'Bilbao',
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const servicio = SERVICIOS_DATA[slug];
  
  if (!servicio) {
    return { title: 'Servicio no encontrado' };
  }
  
  return {
    title: `${servicio.titulo} para Expatriados en España`,
    description: servicio.descripcion.slice(0, 155) + '...',
  };
}

export async function generateStaticParams() {
  return Object.keys(SERVICIOS_DATA).map((slug) => ({ slug }));
}

export default async function ServicioPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const servicio = SERVICIOS_DATA[slug];
  
  if (!servicio) {
    notFound();
  }

  return (
    <>
      {/* Header reducido - misma estructura que destinos */}
      <section className="bg-gradient-secondary text-white py-10 md:py-12">
        <div className="container-base">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
            <Link href="/es/servicios" className="hover:text-white transition-colors">
              Servicios
            </Link>
            <span>/</span>
            <span>{servicio.titulo}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            {servicio.titulo}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            {servicio.subtitulo}
          </p>
        </div>
      </section>

      {/* CTA fijo visible */}
      <div className="bg-primary/10 border-b border-primary/20 sticky top-16 z-30">
        <div className="container-base py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-sm text-center sm:text-left">
            <strong>¿Necesitas {servicio.titulo.toLowerCase()}?</strong> Te conectamos con profesionales verificados.
          </p>
          <Link 
            href={`/es/contacto?servicio=${slug}`} 
            className="btn-primary btn-sm whitespace-nowrap"
          >
            Solicitar información
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <section className="py-10 md:py-12">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-10">
              {/* Descripción */}
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {servicio.descripcion}
                </p>
              </div>

              {/* Beneficios */}
              <div>
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">
                  ¿Por qué elegirnos?
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {servicio.beneficios.map((beneficio, index) => (
                    <div key={index} className="card p-5">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {beneficio.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {beneficio.descripcion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">
                  Preguntas frecuentes
                </h2>
                <div className="space-y-4">
                  {servicio.faqs.map((faq, index) => (
                    <div key={index} className="card p-5">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {faq.pregunta}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {faq.respuesta}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="card p-5 bg-primary/5 border-primary/20">
                <h3 className="font-heading font-bold text-gray-900 mb-2">
                  Solicita información
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Te conectamos con profesionales verificados en menos de 24 horas.
                </p>
                <Link 
                  href={`/es/contacto?servicio=${slug}`}
                  className="btn-primary w-full text-center"
                >
                  Comenzar ahora
                </Link>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Sin compromiso · 100% gratuito
                </p>
              </div>

              {/* Ciudades populares */}
              <div className="card p-5">
                <h3 className="font-heading font-bold text-gray-900 mb-4">
                  Ciudades populares
                </h3>
                <div className="space-y-2">
                  {servicio.ciudadesPopulares.map((ciudadSlug) => (
                    <Link
                      key={ciudadSlug}
                      href={`/es/contacto?servicio=${slug}&ciudad=${ciudadSlug}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-gray-700 group-hover:text-primary transition-colors">
                        {CIUDADES_NOMBRES[ciudadSlug]}
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 md:py-12 bg-gray-50">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
            ¿Listo para encontrar tu {servicio.titulo.toLowerCase().replace('seguros de ', '').replace('clínicas ', '').replace('abogados de ', '')}?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Te conectamos con profesionales verificados que hablan tu idioma. Sin compromiso.
          </p>
          <Link 
            href={`/es/contacto?servicio=${slug}`} 
            className="btn-primary btn-lg"
          >
            Solicitar información gratuita
          </Link>
        </div>
      </section>
    </>
  );
}
