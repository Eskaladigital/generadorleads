import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getCiudades } from '@/lib/ciudades';
import { HERO_IMAGES } from '@/lib/constants';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/routes';
import { buildAlternates } from '@/lib/seo';

const locale: Locale = 'en';
const t = getDictionary(locale);

export const metadata: Metadata = {
  title: t.destinations.metaTitle,
  description: t.destinations.metaDesc,
  alternates: buildAlternates(locale, '/destinations'),
};

export default async function DestinationsPage() {
  const ciudades = await getCiudades();
  const porComunidad = ciudades.reduce<Record<string, { nombre: string; slug: string; provincia: string; porcentaje_extranjeros?: number }[]>>((acc, c) => {
    const zona = c.comunidad || 'Otras';
    if (!acc[zona]) acc[zona] = [];
    acc[zona].push({ nombre: c.nombre, slug: c.slug, provincia: c.provincia || '', porcentaje_extranjeros: c.porcentaje_extranjeros });
    return acc;
  }, {});
  const regiones = Object.entries(porComunidad);

  return (
    <>
      <section className="hero-with-image hero-compact">
        <div className="absolute inset-0 z-0"><Image src={HERO_IMAGES.destinos} alt="Destinations in Spain for foreigners" fill priority fetchPriority="high" sizes="100vw" className="object-cover object-center" /></div>
        <div className="hero-content-box">
          <h1 className="mb-4" style={{ lineHeight: '0.95' }}>{t.destinations.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">{ciudades.length} cities</p>
          <Link href="/en/request" className="btn-minimal-lg">{t.home.requestInfo}</Link>
        </div>
      </section>

      <section className="section-alt">
        <div className="container-narrow space-y-12">
          <Breadcrumbs items={[{ label: t.common.breadcrumbHome, href: '/en' }, { label: t.destinations.title }]} />
          {regiones.map(([zona, ciudadesZona], regionIndex) => (
            <div key={zona}>
              <h2 className="mb-4 pb-3 border-b-2 border-accent inline-block">{zona}</h2>
              <div className="mt-6 space-y-0">
                {ciudadesZona.map((ciudad) => (
                  <Link key={ciudad.slug} href={`/en/request?ciudad=${ciudad.slug}`} className="group flex justify-between items-center py-4 border-b border-gray-300 hover:bg-white hover:pl-3 transition-all">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-0.5">{ciudad.nombre}</h3>
                      {ciudad.porcentaje_extranjeros && <p className="text-xs md:text-sm text-gray-500">{ciudad.porcentaje_extranjeros}%</p>}
                    </div>
                    <span className="service-arrow group-hover:translate-x-2 transition-transform text-sm">{t.home.request} →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section text-center">
        <div className="container-narrow">
          <h2 className="mb-4">{t.home.readyToStart}</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t.home.readyToStartDesc}</p>
          <Link href="/en/request" className="btn-minimal-lg">{t.home.requestInfoNow}</Link>
        </div>
      </section>
    </>
  );
}
