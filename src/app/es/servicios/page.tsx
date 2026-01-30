import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios para Expatriados en España',
  description: 'Seguros de salud, abogados de extranjería, inmobiliarias, dentistas y más. Profesionales que hablan tu idioma.',
};

const SERVICIOS = [
  {
    id: 'seguros',
    titulo: 'Seguros de Salud',
    descripcion: 'Cobertura médica completa adaptada a residentes internacionales. Acceso a la mejor sanidad privada de España.',
    beneficios: [
      'Cobertura inmediata sin esperas',
      'Cuadro médico amplio',
      'Atención en tu idioma',
      'Sin copagos ocultos',
    ],
  },
  {
    id: 'abogados',
    titulo: 'Abogados de Extranjería',
    descripcion: 'Expertos en visados, NIE, residencia y nacionalidad. Te acompañamos en todos los trámites legales.',
    beneficios: [
      'Especialistas en extranjería',
      'Gestión completa de visados',
      'Asesoramiento personalizado',
      'Seguimiento de tu expediente',
    ],
  },
  {
    id: 'inmobiliarias',
    titulo: 'Inmobiliarias',
    descripcion: 'Encuentra tu hogar ideal en España con profesionales que entienden tus necesidades.',
    beneficios: [
      'Búsqueda personalizada',
      'Asesoramiento en compra y alquiler',
      'Conocimiento del mercado local',
      'Gestión de documentación',
    ],
  },
  {
    id: 'dentistas',
    titulo: 'Clínicas Dentales',
    descripcion: 'Odontología de calidad a precios competitivos. Tratamientos con tecnología avanzada.',
    beneficios: [
      'Presupuestos sin compromiso',
      'Tecnología de última generación',
      'Facilidades de pago',
      'Garantía en tratamientos',
    ],
  },
  {
    id: 'gestorias',
    titulo: 'Gestorías',
    descripcion: 'Trámites administrativos sin complicaciones. NIE, empadronamiento, impuestos y más.',
    beneficios: [
      'Gestión integral de trámites',
      'Ahorro de tiempo y estrés',
      'Experiencia con extranjeros',
      'Precios cerrados',
    ],
  },
  {
    id: 'clinicas',
    titulo: 'Clínicas Médicas',
    descripcion: 'Atención sanitaria privada de primer nivel. Especialistas en todas las áreas médicas.',
    beneficios: [
      'Sin listas de espera',
      'Médicos especialistas',
      'Diagnóstico rápido',
      'Segunda opinión médica',
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-secondary text-white py-12 md:py-16">
        <div className="container-base">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Servicios para Expatriados
            </h1>
            <p className="text-lg text-white/90">
              Profesionales verificados que hablan tu idioma y entienden tus necesidades. 
              Todo lo que necesitas para establecerte en España.
            </p>
          </div>
        </div>
      </section>

      {/* CTA visible */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container-base py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-center sm:text-left">
            <strong>¿Necesitas ayuda?</strong> Te conectamos con el profesional adecuado en 24h.
          </p>
          <Link href="/es/contacto" className="btn-primary btn-sm whitespace-nowrap">
            Solicitar información
          </Link>
        </div>
      </div>

      {/* Servicios Grid */}
      <section className="py-10 md:py-14">
        <div className="container-base">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICIOS.map((servicio) => (
              <div key={servicio.id} className="card p-6">
                {/* Icono monocromático */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {servicio.id === 'seguros' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    )}
                    {servicio.id === 'abogados' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    )}
                    {servicio.id === 'inmobiliarias' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    )}
                    {servicio.id === 'dentistas' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                    {servicio.id === 'gestorias' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                    {servicio.id === 'clinicas' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    )}
                  </svg>
                </div>
                
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  {servicio.titulo}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {servicio.descripcion}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {servicio.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {beneficio}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/es/contacto?servicio=${servicio.id}`}
                  className="btn-primary w-full text-center text-sm"
                >
                  Solicitar información
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 md:py-14 bg-gray-50">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
            ¿No sabes qué servicio necesitas?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Cuéntanos tu situación y te orientamos sin compromiso.
          </p>
          <Link href="/es/contacto" className="btn-primary">
            Contactar ahora
          </Link>
        </div>
      </section>
    </>
  );
}
