import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { HERO_IMAGE_URL } from '@/lib/constants';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCiudades } from '@/lib/ciudades';
import ContactFormClient from './ContactFormClient';

export const metadata: Metadata = {
  title: 'Contacto | Health4Spain',
  description: 'Contacta con Health4Spain. Te ayudamos a conectar con abogados, seguros, inmobiliarias y gestorías verificados. Respuesta en 24h. Sin coste para ti.',
  keywords: 'contacto health4spain, servicios extranjeros españa, abogados españa, seguros salud españa, inmobiliarias españa',
};

// 📧 DATOS DE CONTACTO - TEMPORALES (cambiar después)
const CONTACT_INFO = {
  email: 'contacto@health4spain.com',
  phone: '+34 912 345 678',
  phoneDisplay: '912 345 678',
  whatsapp: '34912345678',
  schedule: 'Lunes a Viernes, 09:00-18:00',
};

export default async function ContactoPage() {
  const ciudades = await getCiudades();
  const ciudadesOpciones = [
    ...ciudades.map((c) => ({ id: c.slug, label: c.nombre })),
    { id: 'otra', label: 'Otra ciudad' },
  ];
  return (
    <>
      {/* Hero - Estilo minimalista como las demás páginas */}
      <section className="hero-with-image hero-compact">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE_URL}
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
            Contacto
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
            Estamos aquí para ayudarte. Cuéntanos qué necesitas y te conectamos 
            con los profesionales adecuados.
          </p>
          <div className="flex gap-6 md:gap-8 mb-6 pt-4 border-t border-gray-300">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">24h</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Respuesta</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">0€</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Coste</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">100%</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Verificados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Métodos de Contacto - Estilo minimalista */}
      <section className="section-alt">
        <div className="container-narrow">
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/es' },
            { label: 'Contacto' }
          ]} />

          <div className="bg-white border-t-3 border-accent p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Cómo Prefieres Contactarnos?</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Elige el método que mejor se adapte a tus necesidades. Te responderemos en menos de 24 horas.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">👥</span>
                <span><strong>Clientes:</strong> Dudas sobre servicios, trámites, profesionales</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">💼</span>
                <span><strong>Partners:</strong> Únete a nuestro directorio de profesionales</span>
              </div>
            </div>
          </div>

          {/* Grid de contacto - 2 columnas en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="profile-card group hover:border-accent transition-all"
            >
              <div className="mb-4">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-accent text-lg mb-3">{CONTACT_INFO.email}</p>
              <p className="text-sm text-gray-600">
                Escríbenos directamente. Perfecto si quieres adjuntar documentos o explicar tu caso con detalle.
              </p>
              <div className="mt-4 text-sm text-accent group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                Enviar email →
              </div>
            </a>

            {/* Teléfono */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="profile-card group hover:border-accent transition-all"
            >
              <div className="mb-4">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Teléfono</h3>
              <p className="text-accent text-lg mb-3">{CONTACT_INFO.phoneDisplay}</p>
              <p className="text-sm text-gray-600">
                Llámanos si prefieres hablar directamente. Horario: {CONTACT_INFO.schedule}.
              </p>
              <div className="mt-4 text-sm text-accent group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                Llamar ahora →
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-card group hover:border-accent transition-all"
            >
              <div className="mb-4">
                <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-accent text-lg mb-3">{CONTACT_INFO.phoneDisplay}</p>
              <p className="text-sm text-gray-600">
                Chatea con nosotros. Respuestas rápidas y conversación fluida en tu idioma.
              </p>
              <div className="mt-4 text-sm text-accent group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                Abrir chat →
              </div>
            </a>

            {/* Formulario */}
            <a
              href="#formulario"
              className="profile-card group hover:border-accent transition-all"
            >
              <div className="mb-4">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Formulario Online</h3>
              <p className="text-accent text-lg mb-3">Solicitud estructurada</p>
              <p className="text-sm text-gray-600">
                Completa el formulario con tus necesidades y te conectamos con 2-3 profesionales adecuados.
              </p>
              <div className="mt-4 text-sm text-accent group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                Ir al formulario →
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Formulario Integrado */}
      <section id="formulario" className="section-alt scroll-mt-20">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="mb-4">Formulario de Contacto</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Completa el formulario y te conectamos con los profesionales adecuados
            </p>
          </div>
          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Cargando formulario...</p>
              </div>
            </div>
          }>
            <ContactFormClient ciudades={ciudadesOpciones} />
          </Suspense>
        </div>
      </section>

      {/* Qué esperar - Dividido por tipo de usuario */}
      <section className="section">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="mb-4">¿Qué Ocurre Después de Contactar?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proceso adaptado según tus necesidades
            </p>
          </div>

          {/* Grid 2 columnas: Clientes y Partners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Para Clientes */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">👥</span>
                <h3 className="text-2xl font-bold">Si Eres Cliente</h3>
              </div>
              <div className="space-y-6">
                {[
                  {
                    num: '01',
                    title: 'Recibimos Tu Consulta',
                    desc: 'En menos de 24 horas revisamos tu solicitud y analizamos qué profesionales se ajustan mejor a tu caso.'
                  },
                  {
                    num: '02',
                    title: 'Te Presentamos Opciones',
                    desc: 'Te conectamos con 2-3 profesionales verificados que pueden ayudarte específicamente.'
                  },
                  {
                    num: '03',
                    title: 'Tú Decides',
                    desc: 'Compara propuestas y elige libremente. Si ninguno te convence, buscamos más opciones. Gratis.'
                  },
                  {
                    num: '04',
                    title: 'Seguimiento',
                    desc: 'Hacemos seguimiento para asegurarnos de que estás recibiendo un servicio excepcional.'
                  }
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-accent shrink-0" style={{ lineHeight: '1' }}>
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Para Partners */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">💼</span>
                <h3 className="text-2xl font-bold">Si Eres Profesional</h3>
              </div>
              <div className="space-y-6">
                {[
                  {
                    num: '01',
                    title: 'Revisamos Tu Perfil',
                    desc: 'Analizamos tu especialidad, experiencia con clientes internacionales y servicios que ofreces.'
                  },
                  {
                    num: '02',
                    title: 'Proceso de Verificación',
                    desc: 'Verificamos licencias profesionales, referencias y capacidad de trabajar con extranjeros.'
                  },
                  {
                    num: '03',
                    title: 'Alta en el Directorio',
                    desc: 'Una vez aprobado, te damos de alta y empezamos a enviarte leads cualificados de tu zona.'
                  },
                  {
                    num: '04',
                    title: 'Pago por Éxito',
                    desc: 'Solo pagas cuando hay conversión real. Sin cuotas mensuales, sin permanencia.'
                  }
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-accent shrink-0" style={{ lineHeight: '1' }}>
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garantías */}
      <section className="section-blue-light">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nuestras Garantías</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '100% Gratis',
                desc: 'Nunca pagas por nuestro servicio de conexión'
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Respuesta en 24h',
                desc: 'Te contactamos en menos de un día hábil'
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Profesionales Verificados',
                desc: 'Todos han pasado nuestro proceso de verificación'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center mb-4 text-accent">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Dual para clientes y partners */}
      <section className="section-blue-dark">
        <div className="container-narrow">
          {/* Para Clientes */}
          <div className="text-center mb-12 pb-12 border-b border-white/20">
            <h2 className="mb-6" style={{ color: 'white' }}>¿Necesitas Ayuda Para Vivir en España?</h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Da el primer paso. Te conectamos con profesionales verificados. Sin compromiso, sin coste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#formulario"
                className="btn-minimal-white"
              >
                Completar Formulario
              </a>
              <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center justify-center px-8 py-3 text-white border border-white/30 hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
              >
                Enviar Email
              </a>
            </div>
          </div>

          {/* Para Profesionales */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'white' }}>¿Eres Profesional?</h3>
            <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
              Únete a nuestro directorio verificado. Recibe leads cualificados de tu especialidad y zona.
            </p>
            <a 
              href={`mailto:${CONTACT_INFO.email}?subject=Quiero ser Partner - Health4Spain`}
              className="inline-flex items-center justify-center px-8 py-3 text-white border-2 border-white hover:bg-white hover:text-[#293f92] transition-all text-sm uppercase tracking-widest font-semibold"
            >
              Solicitar Información Partners
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
