'use client';

import { usePathname } from 'next/navigation';

const trustBadges = [
  { icon: '✓', text: 'Profesionales Verificados' },
  { icon: '⚡', text: 'Respuesta en 24h' },
  { icon: '🔒', text: 'Datos Protegidos' },
  { icon: '🇪🇸', text: '100% Legal en España' },
];

export default function PreFooterCTA() {
  const pathname = usePathname();
  
  // Ocultar en:
  // - Página de contacto (ya tiene su propio formulario)
  // - Home (no necesita formulario, todo va a /contacto)
  // - Páginas de listado (/servicios, /destinos) - solo tienen CTAs a formulario
  // Solo mostrar en landings específicas como /servicios/abogados-murcia, /destinos/murcia
  const hiddenPages = [
    '/es/contacto',
    '/es',
    '/es/servicios',
    '/es/destinos',
  ];
  
  if (hiddenPages.includes(pathname)) {
    return null;
  }
  
  return (
    <section className="section-blue-dark">
      <div className="container-base">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              ¿Necesitas Ayuda Legal en España?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Conectamos con profesionales verificados en menos de 24 horas. 
              Sin coste para ti. Sin compromiso.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-6 text-black">Solicitar Información</h3>
            <form className="space-y-5" action="/es/contacto" method="GET">
              <div>
                <input 
                  type="text" 
                  name="nombre"
                  placeholder="Tu nombre" 
                  className="form-input-minimal w-full border-gray-300 focus:border-blue-600 text-black"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Tu email" 
                  className="form-input-minimal w-full border-gray-300 focus:border-blue-600 text-black"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  name="telefono"
                  placeholder="Tu teléfono" 
                  className="form-input-minimal w-full border-gray-300 focus:border-blue-600 text-black"
                />
              </div>
              <div>
                <textarea 
                  name="mensaje"
                  placeholder="Cuéntanos tu caso brevemente" 
                  rows={4}
                  className="form-input-minimal w-full border-gray-300 focus:border-blue-600 text-black resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-accent text-white py-4 px-8 font-bold text-lg hover:bg-accent-600 transition-colors"
              >
                Enviar Solicitud →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
