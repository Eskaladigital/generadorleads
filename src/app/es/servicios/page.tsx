import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getServicios } from '@/lib/services';
import { HERO_IMAGES } from '@/lib/constants';
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
      {/* Hero - Image optimizada para LCP y WebP */}
      <section className="hero-with-image hero-compact">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGES.servicios}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="hero-content-box">
          <h1 className="mb-4" style={{ lineHeight: '0.95' }}>
            Servicios
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
            Cuatro servicios esenciales. Profesionales verificados.
            Todo lo que necesitas para vivir legalmente en España.
          </p>
          <div className="flex gap-6 md:gap-8 mb-6 pt-4 border-t border-gray-300">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">4</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Servicios</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">150+</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Profesionales</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">19</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Ciudades</div>
            </div>
          </div>
          <Link href="/es/solicitar" className="btn-minimal-lg">
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
                    href={`/es/solicitar?servicio=${servicio.slug}`}
                    className="service-item-minimal block w-full hover:bg-white hover:pl-4 transition-all group"
                  >
                    <div className="service-number">{numero}</div>
                    
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2">
                        {servicio.nombre_plural || servicio.nombre}
                      </h2>
                      <p className="text-sm md:text-base text-gray-600 mb-4">
                        {servicio.descripcion_corta}
                      </p>
                      
                      {beneficios.length > 0 && (
                        <ul className="space-y-1.5">
                          {beneficios.map((beneficio, idx) => (
                            <li key={idx} className="text-xs md:text-sm text-gray-700 flex items-start gap-2">
                              <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{beneficio}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    <span className="service-arrow group-hover:translate-x-2 transition-transform">Solicitar →</span>
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
          <h2 className="mb-4">¿No Sabes Qué Necesitas?</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Cuéntanos tu situación y te orientamos sin compromiso. 
            Todos los servicios en un solo punto de contacto.
          </p>
          <Link href="/es/solicitar" className="btn-minimal-lg">
            Solicitar Información Ahora
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
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
