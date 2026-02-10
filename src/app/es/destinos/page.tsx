import Link from 'next/link';
import { Metadata } from 'next';
import { getCiudades } from '@/lib/ciudades';

export const metadata: Metadata = {
  title: 'Destinos en España para Extranjeros | Health4Spain',
  description: 'Descubre los mejores destinos en España para extranjeros. 19 ciudades con profesionales verificados.',
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
      {/* Header Minimal */}
      <section className="section">
        <div className="container-narrow">
          <h1 className="mb-8">Nuestros Destinos</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl">
            {ciudades.length} ciudades españolas. Profesionales verificados en cada una.
            Elige tu destino ideal.
          </p>
          
          {/* Stats rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-300">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{ciudades.length}</div>
              <div className="text-sm uppercase tracking-widest text-gray-500">Ciudades</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{regiones.length}</div>
              <div className="text-sm uppercase tracking-widest text-gray-500">Regiones</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">150+</div>
              <div className="text-sm uppercase tracking-widest text-gray-500">Profesionales</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">4</div>
              <div className="text-sm uppercase tracking-widest text-gray-500">Servicios</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Destinos por Zona */}
      <section className="section-alt">
        <div className="container-narrow space-y-20">
          {regiones.map(([zona, ciudadesZona], regionIndex) => (
            <div key={zona}>
              <h2 className="mb-8 pb-4 border-b-3 border-red-600 inline-block">
                {zona}
              </h2>

              <div className="mt-12 space-y-0">
                {ciudadesZona.map((ciudad) => (
                  <Link
                    key={ciudad.slug}
                    href={`/es/destinos/${ciudad.slug}`}
                    className="group flex justify-between items-center py-6 border-b border-gray-300 hover:bg-white hover:pl-4 transition-all"
                  >
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">
                        {ciudad.nombre}
                      </h3>
                      {ciudad.porcentaje_extranjeros && (
                        <p className="text-sm text-gray-500">
                          {ciudad.porcentaje_extranjeros}% población extranjera
                        </p>
                      )}
                    </div>
                    <span className="text-2xl font-bold group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA después de la primera región */}
              {regionIndex === 0 && regiones.length > 1 && (
                <div className="text-center mt-16 pt-16 border-t border-gray-300">
                  <p className="text-gray-600 mb-6">¿No encuentras tu ciudad?</p>
                  <Link href="/es/contacto" className="btn-minimal">
                    Solicitar Información →
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
          <h2 className="mb-8">¿Listo para Tu Nueva Vida en España?</h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            No tienes que hacerlo solo. Te conectamos con profesionales verificados 
            que hablan tu idioma en tu ciudad de destino.
          </p>
          <Link href="/es/contacto" className="btn-minimal-lg">
            Solicitar Asesoramiento Gratuito
          </Link>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Profesionales verificados
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Atención en tu idioma
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sin compromiso
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
