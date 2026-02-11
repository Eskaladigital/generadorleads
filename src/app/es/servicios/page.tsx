import Link from 'next/link';
import { Metadata } from 'next';
import { getServicios } from '@/lib/services';
import { HERO_IMAGE_URL } from '@/lib/constants';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Servicios para Extranjeros en España | Health4Spain',
  description: '4 servicios esenciales: seguros de salud, abogados, inmobiliarias y gestorías. Profesionales verificados en 19 ciudades. 150+ partners. Sin coste para ti.',
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
    'Familia: divorcio, custodia, herencias',
    'Civil: contratos, reclamaciones',
    'Laboral: despido, conflictos',
    'Extranjería: visados, NIE, nacionalidad',
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
      {/* Hero - mismo estilo que Home, mitad de altura */}
      <section
        className="hero-with-image hero-compact"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      >
        <div className="hero-content-box">
          <h1 className="mb-6" style={{ lineHeight: '0.95' }}>
            Servicios
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
            Cuatro servicios esenciales. Profesionales verificados.
            Todo lo que necesitas para vivir legalmente en España.
          </p>
          <div className="flex gap-8 md:gap-12 mb-8 pt-6 border-t border-gray-300">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">4</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Servicios</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">150+</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Profesionales</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">19</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Ciudades</div>
            </div>
          </div>
          <Link href="/es/contacto" className="btn-minimal-lg">
            Solicitar Información
          </Link>
        </div>
      </section>

      {/* Lista de Servicios - Minimal Style */}
      <section className="section-alt">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/es' },
            { label: 'Servicios' }
          ]} />
          <ul className="service-list-minimal">
            {servicios.map((servicio, index) => {
              const beneficios = BENEFICIOS_POR_SERVICIO[servicio.slug] || [];
              const numero = String(index + 1).padStart(2, '0');
              
              return (
                <li key={servicio.slug}>
                  <Link
                    href={`/es/contacto?servicio=${servicio.slug}`}
                    className="service-item-minimal block w-full hover:bg-white hover:pl-4 transition-all group"
                  >
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
                            <li key={idx} className="text-sm md:text-base text-gray-700 flex items-start gap-3">
                              <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{beneficio}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    <span className="service-arrow group-hover:translate-x-2 transition-transform pt-[10px]">Solicitar →</span>
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
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Cuéntanos tu situación y te orientamos sin compromiso. 
            Todos los servicios en un solo punto de contacto.
          </p>
          <Link href="/es/contacto" className="btn-minimal-lg">
            Solicitar Información Ahora
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
              Sin compromiso
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Profesionales verificados
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
