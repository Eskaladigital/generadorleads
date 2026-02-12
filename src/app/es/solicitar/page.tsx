import { Suspense } from 'react';
import { Metadata } from 'next';
import { getCiudades } from '@/lib/ciudades';
import ContactFormClient from '../contacto/ContactFormClient';

export const metadata: Metadata = {
  title: 'Solicitar Información | Health4Spain',
  description: 'Completa el formulario y te conectamos con profesionales verificados: abogados, seguros, inmobiliarias y gestorías en España. Respuesta en 24h.',
  keywords: 'solicitar información españa, formulario contacto health4spain, servicios extranjeros españa',
};

export default async function SolicitarPage() {
  const ciudades = await getCiudades();
  const ciudadesOpciones = [
    ...ciudades.map((c) => ({ id: c.slug, label: c.nombre })),
    { id: 'otra', label: 'Otra ciudad' },
  ];

  return (
    <>
      {/* Header Simple */}
      <section className="section-alt pt-12 pb-8">
        <div className="container-narrow text-center">
          <h1 className="mb-4">Solicitar Información</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Completa el formulario y te conectamos con 2-3 profesionales verificados 
            que se ajustan a tus necesidades. Sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-accent text-xl">⚡</span>
              <span>Respuesta en 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent text-xl">💯</span>
              <span>100% Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent text-xl">✓</span>
              <span>Profesionales Verificados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="section">
        <div className="container-narrow">
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

      {/* Trust Signals */}
      <section className="section-blue-light">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="mb-4">¿Por Qué Confiar en Nosotros?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                title: 'Datos Protegidos',
                desc: 'Tu información está segura y solo la compartimos con profesionales verificados'
              },
              {
                icon: '🎯',
                title: 'Matching Personalizado',
                desc: 'Te conectamos solo con profesionales que se ajustan a tu caso específico'
              },
              {
                icon: '🆓',
                title: 'Sin Compromiso',
                desc: 'No estás obligado a contratar. Compara propuestas y decide libremente'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
