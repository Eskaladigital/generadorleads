import Link from 'next/link';
import { Metadata } from 'next';
import { getServicios } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Servicios para Expatriados en España',
  description: 'Seguros de salud, abogados de extranjería, inmobiliarias y gestorías. Profesionales que hablan tu idioma.',
};

// 4 SERVICIOS PRINCIPALES con detalles
const BENEFICIOS_POR_SERVICIO: Record<string, string[]> = {
  seguros: [
    'Pólizas obligatorias para visados',
    'Cobertura completa sin copagos',
    'Atención en tu idioma',
    'Aprobación en 24-48 horas',
  ],
  abogados: [
    'Arraigo laboral y social',
    'Visados: trabajo, estudios, no lucrativo',
    'NIE y reagrupación familiar',
    'Seguimiento completo del expediente',
  ],
  inmobiliarias: [
    'Agentes especializados en extranjeros',
    'Alquiler y compra',
    'Apoyo en trámites legales',
    'Conocimiento del mercado local',
  ],
  gestorias: [
    'Empadronamiento',
    'Trámites administrativos',
    'Gestión de documentación',
    'Experiencia con extranjeros',
  ],
};

export default async function ServiciosPage() {
  const servicios = await getServicios();
  
  return (
    <>
      {/* Header Minimal */}
      <section className="section border-b border-gray-200">
        <div className="container-narrow">
          <h1 className="mb-8">Servicios</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            Cuatro servicios esenciales. Profesionales verificados. 
            Todo lo que necesitas para vivir legalmente en España.
          </p>
        </div>
      </section>

      {/* Lista de Servicios - Minimal Style */}
      <section className="section">
        <div className="container-narrow">
          <ul className="service-list-minimal">
            {servicios.map((servicio, index) => {
              const beneficios = BENEFICIOS_POR_SERVICIO[servicio.slug] || [];
              const numero = String(index + 1).padStart(2, '0');
              
              return (
                <li key={servicio.slug} className="service-item-minimal">
                  <div className="service-number">{numero}</div>
                  
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      {servicio.nombre_plural || servicio.nombre}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mb-6">
                      {servicio.descripcion_corta}
                    </p>
                    
                    {beneficios.length > 0 && (
                      <ul className="space-y-2">
                        {beneficios.map((beneficio, idx) => (
                          <li key={idx} className="text-sm md:text-base text-gray-700 flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{beneficio}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <Link 
                    href={`/es/contacto?servicio=${servicio.slug}`}
                    className="service-arrow"
                  >
                    →
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section text-center">
        <div className="container-narrow">
          <h2 className="mb-8">¿No Sabes Qué Necesitas?</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-xl mx-auto">
            Cuéntanos tu situación y te orientamos sin compromiso
          </p>
          <Link href="/es/contacto" className="btn-minimal-lg">
            Contactar Ahora
          </Link>
        </div>
      </section>
    </>
  );
}
