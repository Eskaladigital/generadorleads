import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getServicios, getServicioBySlug } from '@/lib/services';
import { LandingPage } from '@/lib/types';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceIcon from '@/components/ServiceIcon';
import LandingFormEmbed from '@/components/LandingFormEmbed';

export const revalidate = 86400;

import { getLandingBySlug, getCiudadContenido as getCiudadContenidoData, getCiudadCatalogo as getCiudadCatalogoData, getActiveLandingSlugs } from '@/lib/data';
import type { Locale } from '@/lib/routes';
import { getDictionary } from '@/lib/dictionaries';
import { ROUTES } from '@/lib/routes';

const LOCALE: Locale = 'fr';
const t = getDictionary(LOCALE);
const r = ROUTES[LOCALE];

async function getLanding(slug: string): Promise<LandingPage | null> {
  return getLandingBySlug(slug, LOCALE);
}

async function getCiudadContenido(ciudadSlug: string) {
  return getCiudadContenidoData(ciudadSlug, LOCALE);
}

async function getCiudadCatalogo(ciudadSlug: string) {
  return getCiudadCatalogoData(ciudadSlug);
}

function parseSlug(slug: string, serviciosSlugs: string[]): { servicio?: string; ciudad: string } | null {
  for (const servicio of serviciosSlugs) {
    if (slug.startsWith(`${servicio}-`)) {
      const ciudad = slug.replace(`${servicio}-`, '');
      return { servicio, ciudad };
    }
  }
  return { ciudad: slug };
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
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
  
  const servicios = await getServicios(LOCALE);
  const serviciosSlugs = servicios.map((s) => s.slug);
  const parsed = parseSlug(slug, serviciosSlugs);
  if (parsed) {
    const ciudadData = await getCiudadCatalogo(parsed.ciudad);
    if (ciudadData) {
      if (parsed.servicio) {
        const servicioData = await getServicioBySlug(parsed.servicio, LOCALE);
        const servicioNombre = servicioData?.nombre_plural || servicioData?.nombre || parsed.servicio;
        return {
          title: `${servicioNombre} ${t.landingUI.in} ${ciudadData.nombre} - Health4Spain`,
          description: `${t.landingUI.connectBestProf} ${servicioNombre.toLowerCase()} ${t.landingUI.in} ${ciudadData.nombre}. ${t.landingUI.verifiedProf}.`,
        };
      }
      
      return {
        title: `${t.landingUI.livIn} ${ciudadData.nombre} - Health4Spain`,
        description: `${t.landingUI.allYouNeed} ${ciudadData.nombre} ${t.landingUI.asExpat}.`,
      };
    }
  }
  
  return { title: t.landingUI.destinationNotFound };
}

export async function generateStaticParams() {
  const landingSlugs = await getActiveLandingSlugs(LOCALE);

  const supabase = createServerSupabaseClient();
  const { data: ciudades } = await supabase
    .from('ciudades_catalogo')
    .select('slug');

  const citySlugs = (ciudades || []).map((c) => c.slug).filter((s): s is string => !!s);

  const allSlugs = [...new Set([...landingSlugs, ...citySlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export default async function DestinationPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  const landing = await getLanding(slug);
  
  if (landing) {
    return <LandingPageView landing={landing} />;
  }
  
  const servicios = await getServicios(LOCALE);
  const parsed = parseSlug(slug, servicios.map((s) => s.slug));
  if (!parsed) {
    notFound();
  }
  
  const ciudadData = await getCiudadCatalogo(parsed.ciudad);
  if (!ciudadData) {
    notFound();
  }
  
  if (parsed.servicio) {
    const servicioData = await getServicioBySlug(parsed.servicio, LOCALE);
    const servicioNombre = servicioData?.nombre_plural || servicioData?.nombre || parsed.servicio;
    return (
      <ServiceCityView 
        servicio={parsed.servicio} 
        servicioNombre={servicioNombre}
        ciudad={parsed.ciudad} 
        ciudadData={ciudadData} 
      />
    );
  }
  
  return <CityView slug={slug} ciudadData={ciudadData} />;
}

function LandingPageView({ landing }: { landing: LandingPage }) {
  const requestUrl = `/${LOCALE}/${r.request}?${landing.servicio_slug ? `servicio=${landing.servicio_slug}&` : ''}ciudad=${landing.ciudad_slug || landing.slug}`;
  
  return (
    <>
      <section className="section">
        <div className="container-base">
          <Breadcrumbs items={[
            { label: t.common.breadcrumbHome, href: `/${LOCALE}` },
            { label: t.destinations.title, href: `/${LOCALE}/${r.destinations}` },
            { label: landing.hero_title }
          ]} />
          <h1 className="mb-6 md:mb-8 text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] !leading-[1.5] max-w-4xl">
            {landing.hero_title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl leading-relaxed">
            {landing.hero_subtitle}
          </p>
          {landing.hero_bullets && landing.hero_bullets.length > 0 && (
            <div className="flex flex-wrap gap-8 mb-12 pt-8 border-t border-gray-300">
              {landing.hero_bullets.slice(0, 3).map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 font-medium">{bullet}</span>
                </div>
              ))}
            </div>
          )}
          
          {landing.servicio_slug && landing.ciudad_slug ? (
            <div className="max-w-2xl mx-auto">
              <LandingFormEmbed 
                servicioSlug={landing.servicio_slug}
                ciudadSlug={landing.ciudad_slug}
                servicioNombre={landing.servicio_nombre || landing.servicio_slug}
                ciudadNombre={landing.ciudad_nombre || landing.ciudad_slug}
              />
            </div>
          ) : (
            <Link 
              href={requestUrl}
              className="btn-minimal-lg"
            >
              {landing.cta_subtitle || t.landingUI.requestInfo}
            </Link>
          )}
        </div>
      </section>

      <section className="section-alt">
        <div className="container-base">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {landing.problem_title && landing.problems && landing.problems.length > 0 && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    {landing.problem_title}
                  </h2>
                  <div className="space-y-4">
                    {landing.problems.map((problem, idx) => (
                      <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
<svg className="w-6 h-6 text-accent mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-gray-700 text-lg">{problem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {landing.solution_title && landing.solution_text && (
                <div className="bg-white border-t-3 border-accent p-8">
                  <h2 className="mb-6">
                    {landing.solution_title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-6">
                    {landing.solution_text}
                  </p>
                  <Link 
                    href={requestUrl}
                    className="btn-minimal inline-flex items-center gap-2"
                  >
                    {t.landingUI.requestContact} →
                  </Link>
                </div>
              )}

              {landing.services_title && landing.services && landing.services.length > 0 && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    {landing.services_title}
                  </h2>
                  <ul className="service-list-minimal">
                    {landing.services.map((service, idx) => (
                      <li key={idx} className="service-item-minimal">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          <ServiceIcon title={service.title} />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                            {service.title}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg text-gray-600">{service.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-12 pt-12 border-t border-gray-300">
                    <p className="text-gray-600 mb-6">{t.landingUI.needHelp}</p>
                    <Link 
                      href={requestUrl}
                      className="btn-minimal-lg"
                    >
                      {t.landingUI.requestFreeInfo}
                    </Link>
                  </div>
                </div>
              )}

              {landing.why_city_title && landing.why_city_text && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    {landing.why_city_title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-line">
                    {landing.why_city_text}
                  </p>
                  {landing.why_city_stats && landing.why_city_stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {landing.why_city_stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                          <div className="text-sm uppercase tracking-widest text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-center mt-12">
                    <Link 
                      href={requestUrl}
                      className="btn-minimal"
                    >
                      {t.landingUI.connectProf} →
                    </Link>
                  </div>
                </div>
              )}

              {landing.faqs && landing.faqs.length > 0 && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    {t.landingUI.faqs}
                  </h2>
                  <div className="space-y-6">
                    {landing.faqs.map((faq, idx) => (
                      <div key={idx} className="border-t-3 border-gray-300 pt-6">
                        <h3 className="text-xl font-bold mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-white border-t-3 border-accent p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">
                  {t.landingUI.sidebarTitle}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t.landingUI.sidebarDesc}
                </p>
                <Link 
                  href={requestUrl}
                  className="block w-full text-center py-4 px-6 bg-[#293f92] text-white font-bold text-base hover:bg-[#1e2d6b] transition-colors rounded-sm"
                >
                  {t.landingUI.startNow}
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t.landingUI.noCommitment}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t.landingUI.free100}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t.landingUI.verifiedProf}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container-base">
          <h2 className="mb-8">
            {landing.cta_title || t.landingUI.readyToStart}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {landing.cta_subtitle || t.landingUI.connectMsg}
          </p>
          <Link 
            href={requestUrl}
            className="btn-minimal-lg"
          >
            {t.landingUI.requestFreeInfo}
          </Link>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.landingUI.response24h}
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

function ServiceCityView({ 
  servicio, 
  servicioNombre,
  ciudad, 
  ciudadData 
}: { 
  servicio: string; 
  servicioNombre: string;
  ciudad: string; 
  ciudadData: any;
}) {
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: t.common.breadcrumbHome, href: `/${LOCALE}` },
            { label: t.nav.services, href: `/${LOCALE}/${r.services}` },
            { label: servicioNombre, href: `/${LOCALE}/${r.services}/${servicio}` },
            { label: ciudadData.nombre }
          ]} />
          <h1 className="mb-8">
            {servicioNombre} {t.landingUI.in} {ciudadData.nombre}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            {t.landingUI.profVerifiedIn} {ciudadData.nombre}.
          </p>
        </div>
      </section>

      <section className="section-alt text-center">
        <div className="container-narrow">
          <p className="text-gray-700 text-lg mb-12">
            {t.landingUI.connectBestProf} {servicioNombre.toLowerCase()} {t.landingUI.in} {ciudadData.nombre}. 
          </p>
          <Link 
            href={`/${LOCALE}/${r.request}?servicio=${servicio}&ciudad=${ciudad}`} 
            className="btn-minimal-lg"
          >
            {t.landingUI.requestFreeInfo}
          </Link>
        </div>
      </section>
    </>
  );
}

async function CityView({ 
  slug, 
  ciudadData 
}: { 
  slug: string; 
  ciudadData: any;
}) {
  const contenidoDB = await getCiudadContenido(slug);
  
  if (!contenidoDB) {
    return <CityViewBasic slug={slug} ciudadData={ciudadData} />;
  }
  
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: t.common.breadcrumbHome, href: `/${LOCALE}` },
            { label: t.destinations.title, href: `/${LOCALE}/${r.destinations}` },
            { label: ciudadData.nombre }
          ]} />
          <h1 className="mb-8">
            {t.landingUI.livIn} {ciudadData.nombre}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl">
            {t.landingUI.allYouNeed} {ciudadData.nombre} {t.landingUI.asExpat}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-300">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                {Math.round(ciudadData.poblacion / 1000)}K
              </div>
              <div className="text-sm uppercase tracking-widest text-gray-500">{t.landingUI.inhabitants}</div>
            </div>
            {contenidoDB.temperatura_media && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                  {contenidoDB.temperatura_media}
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-500">{t.landingUI.temperature}</div>
              </div>
            )}
            {ciudadData.porcentaje_extranjeros && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                  {ciudadData.porcentaje_extranjeros}%
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-500">{t.landingUI.foreignPopulation}</div>
              </div>
            )}
            {contenidoDB.dias_sol && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                  {contenidoDB.dias_sol}
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-500">{t.landingUI.sunDays}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              
              <div>
                <h2 className="mb-8">
                  {t.landingUI.whyMoveTo} {ciudadData.nombre}?
                </h2>
                <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {contenidoDB.intro_text}
                </div>
              </div>

              {contenidoDB.ventajas && contenidoDB.ventajas.length > 0 && (
                <div>
                  <h2 className="mb-8">
                    {t.landingUI.mainAdvantages}
                  </h2>
                  <ul className="service-list-minimal">
                    {contenidoDB.ventajas.map((ventaja: string, idx: number) => (
                      <li key={idx} className="py-6 border-b border-gray-300 flex items-start gap-4">
                        <svg className="w-6 h-6 text-accent mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-lg font-medium">{ventaja}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {contenidoDB.barrios && contenidoDB.barrios.length > 0 && (
                <div>
                  <h2 className="mb-8">
                    {t.landingUI.bestZones}
                  </h2>
                  <p className="text-gray-700 text-lg mb-8">
                    {t.landingUI.chooseNeighborhood} {ciudadData.nombre}.
                  </p>
                  <div className="space-y-6">
                    {contenidoDB.barrios.map((barrio: any, idx: number) => (
                      <div key={idx} className="border-t-3 border-gray-300 pt-6">
                        <h3 className="text-xl font-bold mb-3">{barrio.nombre}</h3>
                        <p className="text-gray-600 leading-relaxed">{barrio.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="mb-8">
                  {t.landingUI.costOfLiving}
                </h2>
                <div className="space-y-6">
                  {contenidoDB.coste_vida_alquiler && (
                    <div className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                        <svg className="w-8 h-8 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        {t.landingUI.housingRent}
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contenidoDB.coste_vida_alquiler}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_compra && (
                    <div className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                        <span className="text-2xl">🏢</span>
                        {t.landingUI.housingBuy}
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contenidoDB.coste_vida_compra}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_alimentacion && (
                    <div className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                        <span className="text-2xl">🛒</span>
                        {t.landingUI.foodGrocery}
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contenidoDB.coste_vida_alimentacion}</p>
                    </div>
                  )}
                  {contenidoDB.coste_vida_transporte && (
                    <div className="border-t-3 border-gray-300 pt-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                        <span className="text-2xl">🚗</span>
                        {t.landingUI.transport}
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{contenidoDB.coste_vida_transporte}</p>
                    </div>
                  )}
                </div>
              </div>

              {contenidoDB.tramites && contenidoDB.tramites.length > 0 && (
                <div>
                  <h2 className="mb-8">
                    {t.landingUI.essentialProcedures}
                  </h2>
                  <p className="text-gray-700 text-lg mb-8">
                    {t.landingUI.proceduresDesc}
                  </p>
                  <ul className="service-list-minimal">
                    {contenidoDB.tramites.map((tramite: string, idx: number) => (
                      <li key={idx} className="py-6 border-b border-gray-300 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shrink-0 font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 text-lg">{tramite}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 bg-white border-t-3 border-accent p-6">
                    <p className="text-gray-700 mb-4">
                      <strong>💡 {t.landingUI.recommendation}:</strong> {t.landingUI.proceduresTip}
                    </p>
                    <Link 
                      href={`/${LOCALE}/${r.request}?servicio=gestorias&ciudad=${slug}`}
                      className="btn-minimal"
                    >
                      {t.landingUI.requestContact} →
                    </Link>
                  </div>
                </div>
              )}

              {contenidoDB.faqs && contenidoDB.faqs.length > 0 && (
                <div>
                  <h2 className="mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">
                    {t.landingUI.faqs}
                  </h2>
                  <div className="space-y-6">
                    {contenidoDB.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="border-t-3 border-gray-300 pt-6">
                        <h3 className="text-xl font-bold mb-3">
                          {faq.pregunta}
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{faq.respuesta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="space-y-8">
              <div className="bg-white border-t-3 border-accent p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">{t.landingUI.readyToMove}</h3>
                <p className="text-gray-600 mb-6">
                  {t.landingUI.readyToMoveDesc}
                </p>
                <Link href={`/${LOCALE}/${r.request}?ciudad=${slug}`} className="btn-minimal-lg w-full text-center block mb-4">
                  {t.landingUI.requestFreeInfo}
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  {t.landingUI.noCommitment} • {t.landingUI.inYourLang}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container-narrow">
          <h2 className="mb-8">
            {t.landingUI.startNewLife} {ciudadData.nombre}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            {t.landingUI.dontDoAlone}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href={`/${LOCALE}/${r.request}?ciudad=${slug}`} className="btn-minimal-lg">
              {t.landingUI.requestFreeAdvice}
            </Link>
            <Link href={`/${LOCALE}/${r.services}`} className="text-gray-700 hover:text-black font-medium">
              {t.landingUI.viewAllServices} →
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
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

function CityViewBasic({ 
  slug, 
  ciudadData 
}: { 
  slug: string; 
  ciudadData: any;
}) {
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: t.common.breadcrumbHome, href: `/${LOCALE}` },
            { label: t.destinations.title, href: `/${LOCALE}/${r.destinations}` },
            { label: ciudadData.nombre }
          ]} />
          <h1 className="mb-8">
            {t.landingUI.livIn} {ciudadData.nombre}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            {t.landingUI.allYouNeed} {ciudadData.nombre} {t.landingUI.asExpat}
          </p>
        </div>
      </section>

      <section className="section-alt text-center">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">{Math.round(ciudadData.poblacion / 1000)}K</div>
              <div className="text-sm uppercase tracking-widest text-gray-500">{t.landingUI.inhabitants}</div>
            </div>
            {ciudadData.porcentaje_extranjeros && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">{ciudadData.porcentaje_extranjeros}%</div>
                <div className="text-sm uppercase tracking-widest text-gray-500">{t.landingUI.foreignPopulation}</div>
              </div>
            )}
            {ciudadData.datos_extra?.aeropuerto_cercano && (
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">{ciudadData.datos_extra.distancia_aeropuerto}km</div>
                <div className="text-sm uppercase tracking-widest text-gray-500">{t.landingUI.airport}</div>
              </div>
            )}
          </div>

          <div className="bg-white border-t-3 border-accent p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              {t.landingUI.personalizedInfo} {ciudadData.nombre}?
            </h3>
            <p className="text-gray-600 mb-6">
              {t.landingUI.personalizedInfoDesc}
            </p>
            <Link href={`/${LOCALE}/${r.request}?ciudad=${slug}`} className="btn-minimal-lg">
              {t.landingUI.requestFreeAdvice}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
