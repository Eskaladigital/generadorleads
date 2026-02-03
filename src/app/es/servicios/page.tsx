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
