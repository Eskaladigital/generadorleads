import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getCiudades } from '@/lib/ciudades';
import { HERO_IMAGES } from '@/lib/constants';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getDictionary } from '@/lib/dictionaries';
import { ROUTES, type Locale } from '@/lib/routes';

const LOCALE: Locale = 'es';
const t = getDictionary(LOCALE);
const r = ROUTES[LOCALE];

export const metadata: Metadata = {
  title: t.destinations.metaTitle,
  description: t.destinations.metaDesc,
};

export default async function DestinosPage() {
  const ciudades = await getCiudades();

  // Agrupar por comunidad
  const porComunidad = ciudades.reduce<Record<string, { nombre: string; slug: string; provincia: string; porcentaje_extranjeros?: number }[]>>(
    (acc, c) => {
      const zona = c.comunidad || 'Otras';
      if (!acc[zona]) acc[zona] = [];
      acc[zona].push({ 
        nombre: c.nombre, 
        slug: c.slug, 
        provincia: c.provincia || '',
        porcentaje_extranjeros: c.porcentaje_extranjeros 
      });
      return acc;
    },
    {}
  );

  const regiones = Object.entries(porComunidad);

  return (
    <>
      {/* Hero - Image optimizada para LCP y WebP */}
      <section className="hero-with-image hero-compact">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGES.destinos}
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
            {t.destinations.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
            {ciudades.length} ciudades españolas. Profesionales verificados en cada una.
            Elige tu destino ideal.
          </p>
          <div className="flex gap-6 md:gap-8 mb-6 pt-4 border-t border-gray-300">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{ciudades.length}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">{t.destinations.cityCount}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">150+</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">{t.destinations.professionals}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">4</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">{t.destinations.servicesCount}</div>
            </div>
          </div>
          <Link href={`/${LOCALE}/${r.request}`} className="btn-minimal-lg">
            {t.home.requestInfo}
          </Link>
        </div>
      </section>

      {/* Lista de Destinos por Zona */}
      <section className="section-alt">
        <div className="container-narrow space-y-12">
          <Breadcrumbs items={[
            { label: t.common.breadcrumbHome, href: `/${LOCALE}` },
            { label: t.destinations.title }
          ]} />
          {regiones.map(([zona, ciudadesZona], regionIndex) => (
            <div key={zona}>
              <h2 className="mb-4 pb-3 border-b-2 border-accent inline-block">
                {zona}
              </h2>

              <div className="mt-6 space-y-0">
                {ciudadesZona.map((ciudad) => (
                  <Link
                    key={ciudad.slug}
                    href={`/${LOCALE}/${r.request}?ciudad=${ciudad.slug}`}
                    className="group flex justify-between items-center py-4 border-b border-gray-300 hover:bg-white hover:pl-3 transition-all"
                  >
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-0.5">
                        {ciudad.nombre}
                      </h3>
                      {ciudad.porcentaje_extranjeros && (
                        <p className="text-xs md:text-sm text-gray-500">
                          {ciudad.porcentaje_extranjeros}% {t.destinations.foreignPop}
                        </p>
                      )}
                    </div>
                    <span className="service-arrow group-hover:translate-x-2 transition-transform text-sm">
                      {t.home.request} →
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA después de la primera región */}
              {regionIndex === 0 && regiones.length > 1 && (
                <div className="text-center mt-10 pt-10 border-t border-gray-300">
                  <p className="text-gray-600 mb-4 text-sm">{t.destinations.cantFindCity}</p>
                  <Link href={`/${LOCALE}/${r.request}`} className="btn-minimal">
                    {t.home.requestInfo} →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="section text-center">
        <div className="container-narrow">
          <h2 className="mb-4">{t.about.readyCta}</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.landingUI.dontDoAlone}
          </p>
          <Link href={`/${LOCALE}/${r.request}`} className="btn-minimal-lg">
            {t.home.requestInfoNow}
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs md:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.landingUI.verifiedProf}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.landingUI.inYourLang}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.landingUI.noCommitment}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
