import Link from 'next/link';
import { Metadata } from 'next';
import { getCiudades } from '@/lib/ciudades';

export const metadata: Metadata = {
  title: 'Destinos en España para Expatriados',
  description: 'Descubre los mejores destinos en España para vivir como expatriado. Ciudades con profesionales verificados.',
};

export default async function DestinosPage() {
  const ciudades = await getCiudades();

  // Agrupar por comunidad
  const porComunidad = ciudades.reduce<Record<string, { nombre: string; slug: string }[]>>(
    (acc, c) => {
      const zona = c.comunidad || 'Otras';
      if (!acc[zona]) acc[zona] = [];
      acc[zona].push({ nombre: c.nombre, slug: c.slug });
      return acc;
    },
    {}
  );

  const regiones = Object.entries(porComunidad);

  return (
    <>
      {/* Header Minimal */}
      <section className="section border-b border-gray-200">
        <div className="container-narrow">
          <h1 className="mb-8">Destinos en España</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            {ciudades.length} ciudades españolas. Profesionales verificados en cada una.
            Elige tu destino.
          </p>
        </div>
      </section>

      {/* Lista de Destinos por Zona */}
      <section className="section">
        <div className="container-narrow space-y-20">
          {regiones.map(([zona, ciudadesZona], regionIndex) => (
            <div key={zona}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-3 border-red-600 pb-4 inline-block">
                {zona}
              </h2>

              <ul className="mt-12 space-y-6">
                {ciudadesZona.map((ciudad) => (
                  <li key={ciudad.slug} className="border-b border-gray-200 pb-6">
                    <Link
                      href={`/es/destinos/${ciudad.slug}`}
                      className="group flex justify-between items-center"
                    >
                      <h3 className="text-xl md:text-2xl font-bold group-hover:opacity-50 transition-opacity">
                        {ciudad.nombre}
                      </h3>
                      <span className="text-2xl font-bold group-hover:translate-x-2 transition-transform">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA después de cada 2 regiones */}
              {(regionIndex === 1 || regionIndex === 3) && regiones.length > 2 && (
                <div className="text-center mt-16 pt-16 border-t border-gray-200">
                  <Link href="/es/contacto" className="btn-minimal">
                    Solicitar Información →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Simple */}
      <section className="section-alt text-center">
        <div className="container-narrow">
          <h2 className="mb-8">¿No Encuentras Tu Ciudad?</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-xl mx-auto">
            Contáctanos y te ayudamos a encontrar profesionales verificados en tu zona
          </p>
          <Link href="/es/contacto" className="btn-minimal-lg">
            Contactar Ahora
          </Link>
        </div>
      </section>
    </>
  );
}
