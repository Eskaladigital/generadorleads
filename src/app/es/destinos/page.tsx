import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Destinos en España para Expatriados',
  description: 'Descubre los mejores destinos en España para vivir como expatriado. Costa Blanca, Costa del Sol, Madrid, Barcelona, Islas Baleares y Canarias.',
};

// Destinos organizados por región
const REGIONES = [
  {
    id: 'costa-blanca',
    nombre: 'Costa Blanca',
    descripcion: 'Sol, playas y la mejor calidad de vida del Mediterráneo.',
    ciudades: [
      { slug: 'alicante', nombre: 'Alicante' },
      { slug: 'torrevieja', nombre: 'Torrevieja' },
      { slug: 'benidorm', nombre: 'Benidorm' },
      { slug: 'denia', nombre: 'Dénia' },
      { slug: 'javea', nombre: 'Jávea' },
    ],
  },
  {
    id: 'costa-del-sol',
    nombre: 'Costa del Sol',
    descripcion: 'El destino favorito de los europeos en el sur de España.',
    ciudades: [
      { slug: 'malaga', nombre: 'Málaga' },
      { slug: 'marbella', nombre: 'Marbella' },
      { slug: 'fuengirola', nombre: 'Fuengirola' },
      { slug: 'estepona', nombre: 'Estepona' },
      { slug: 'nerja', nombre: 'Nerja' },
    ],
  },
  {
    id: 'grandes-ciudades',
    nombre: 'Grandes Ciudades',
    descripcion: 'Oportunidades profesionales y vida cosmopolita.',
    ciudades: [
      { slug: 'madrid', nombre: 'Madrid' },
      { slug: 'barcelona', nombre: 'Barcelona' },
      { slug: 'valencia', nombre: 'Valencia' },
      { slug: 'sevilla', nombre: 'Sevilla' },
      { slug: 'bilbao', nombre: 'Bilbao' },
    ],
  },
  {
    id: 'islas',
    nombre: 'Islas',
    descripcion: 'Paraísos insulares con clima privilegiado todo el año.',
    ciudades: [
      { slug: 'palma', nombre: 'Palma de Mallorca' },
      { slug: 'ibiza', nombre: 'Ibiza' },
      { slug: 'tenerife', nombre: 'Tenerife' },
      { slug: 'las-palmas', nombre: 'Las Palmas' },
      { slug: 'lanzarote', nombre: 'Lanzarote' },
    ],
  },
  {
    id: 'levante',
    nombre: 'Levante y Murcia',
    descripcion: 'Costa cálida, precios accesibles y comunidad internacional.',
    ciudades: [
      { slug: 'murcia', nombre: 'Murcia' },
      { slug: 'cartagena', nombre: 'Cartagena' },
      { slug: 'orihuela', nombre: 'Orihuela Costa' },
      { slug: 'almeria', nombre: 'Almería' },
    ],
  },
];

export default function DestinosPage() {
  return (
    <>
      {/* Header - altura reducida */}
      <section className="bg-gradient-secondary text-white py-12 md:py-16">
        <div className="container-base">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Destinos en España
            </h1>
            <p className="text-lg text-white/90">
              Encuentra tu lugar ideal para vivir. Cada destino tiene su encanto único 
              y una comunidad internacional que te espera.
            </p>
          </div>
        </div>
      </section>

      {/* CTA flotante - visible desde el inicio */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container-base py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-center sm:text-left">
            <strong>¿Ya sabes dónde quieres vivir?</strong> Te conectamos con profesionales locales.
          </p>
          <Link href="/es/contacto" className="btn-primary btn-sm whitespace-nowrap">
            Solicitar información
          </Link>
        </div>
      </div>

      {/* Regiones */}
      <section className="py-10 md:py-14">
        <div className="container-base">
          <div className="space-y-12">
            {REGIONES.map((region) => (
              <div key={region.id}>
                <div className="mb-6">
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                    {region.nombre}
                  </h2>
                  <p className="text-gray-600">{region.descripcion}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {region.ciudades.map((ciudad) => (
                    <Link
                      key={ciudad.slug}
                      href={`/es/destinos/${ciudad.slug}`}
                      className="group card card-hover p-4 text-center"
                    >
                      {/* Icono monocromático */}
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {ciudad.nombre}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 md:py-14 bg-gray-50">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
            ¿No encuentras tu destino?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Cuéntanos dónde quieres vivir y te ayudamos a encontrar los mejores profesionales en esa zona.
          </p>
          <Link href="/es/contacto" className="btn-primary">
            Contactar ahora
          </Link>
        </div>
      </section>
    </>
  );
}
