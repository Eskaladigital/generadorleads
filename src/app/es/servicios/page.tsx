import Link from 'next/link';
import { Metadata } from 'next';
import { getServicios } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Servicios para Expatriados en España',
  description: 'Seguros de salud, abogados de extranjería, inmobiliarias y gestorías. Profesionales que hablan tu idioma.',
};

// Beneficios por tipo de servicio (se pueden mover a BD después)
const BENEFICIOS_POR_SERVICIO: Record<string, string[]> = {
  seguros: [
    'Cobertura inmediata sin esperas',
    'Cuadro médico amplio',
    'Atención en tu idioma',
    'Sin copagos ocultos',
  ],
  abogados: [
    'Especialistas en extranjería',
    'Gestión completa de visados',
    'Asesoramiento personalizado',
    'Seguimiento de tu expediente',
  ],
  inmobiliarias: [
    'Búsqueda personalizada',
    'Asesoramiento en compra y alquiler',
    'Conocimiento del mercado local',
    'Gestión de documentación',
  ],
  gestorias: [
    'Gestión integral de trámites',
    'Ahorro de tiempo y estrés',
    'Experiencia con extranjeros',
    'Precios cerrados',
  ],
};

export default async function ServiciosPage() {
  const servicios = await getServicios();
  
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-secondary text-white py-10 md:py-12">
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
      <section className="py-8 md:py-12">
        <div className="container-base">
          <div className="grid md:grid-cols-2 gap-6">
            {servicios.map((servicio) => {
              const beneficios = BENEFICIOS_POR_SERVICIO[servicio.slug] || [];
              
              return (
                <div key={servicio.slug} className="card p-6">
                  <div className="flex items-start gap-3 mb-3">
                    {servicio.icon && (
                      <span className="text-3xl">{servicio.icon}</span>
                    )}
                    <h2 className="font-heading text-xl font-bold text-gray-900">
                      {servicio.nombre_plural || servicio.nombre}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {servicio.descripcion_corta}
                  </p>
                  
                  {beneficios.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {beneficios.map((beneficio, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <svg className="w-4 h-4 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {beneficio}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <Link 
                    href={`/es/contacto?servicio=${servicio.slug}`}
                    className="btn-primary w-full text-center text-sm"
                  >
                    Solicitar información
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-8 md:py-12 bg-gradient-primary">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            ¿No sabes qué servicio necesitas?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Cuéntanos tu situación y te orientamos sin compromiso.
          </p>
          <Link href="/es/contacto" className="btn-white btn-lg">
            Contactar ahora
          </Link>
        </div>
      </section>
    </>
  );
}
