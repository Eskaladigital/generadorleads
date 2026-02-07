import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getCiudades } from '@/lib/ciudades';

export const metadata: Metadata = {
  title: 'Destinos en España para Expatriados',
  description: 'Descubre los mejores destinos en España para vivir como expatriado. Costa Blanca, Costa del Sol, Madrid, Barcelona, Islas Baleares y Canarias.',
};

// Imágenes por ciudad (se pueden mover a BD después)
const IMAGENES_CIUDADES: Record<string, string> = {
  madrid: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
  barcelona: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
  valencia: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
  alicante: 'https://images.unsplash.com/photo-1583789825737-f0ca3e151e4b?w=800&q=80',
  malaga: 'https://images.unsplash.com/photo-1624709631346-3a1d7ca12dd0?w=800&q=80',
  marbella: 'https://images.unsplash.com/photo-1611676001453-7c0b2c498f4d?w=800&q=80',
  torrevieja: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  benidorm: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&q=80',
  murcia: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80',
  sevilla: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80',
  palma: 'https://images.unsplash.com/photo-1562774306-e0b935983cff?w=800&q=80',
  tenerife: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80',
  'las-palmas': 'https://images.unsplash.com/photo-1576485375217-d6a95e34d043?w=800&q=80',
  ibiza: 'https://images.unsplash.com/photo-1513415032842-6728e15e9f8c?w=800&q=80',
  granada: 'https://images.unsplash.com/photo-1589448873400-1e0f21f3a24a?w=800&q=80',
  bilbao: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=800&q=80',
  zaragoza: 'https://images.unsplash.com/photo-1585665113811-16c1428f3774?w=800&q=80',
  fuengirola: 'https://images.unsplash.com/photo-1590074071552-2ba1f2d2f959?w=800&q=80',
  estepona: 'https://images.unsplash.com/photo-1599683270550-1e15f1a406aa?w=800&q=80',
  nerja: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bba7e?w=800&q=80',
  // Ciudades adicionales de BD
  cartagena: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
  'san-javier': 'https://images.unsplash.com/photo-1499363536502-87642509e31b?w=800&q=80',
  mazarron: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  orihuela: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80',
};

export default async function DestinosPage() {
  const ciudades = await getCiudades();
  
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-secondary text-white py-10 md:py-12">
        <div className="container-base">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Destinos en España
            </h1>
            <p className="text-lg text-white/90">
              Encuentra tu lugar ideal para vivir. Conectamos con profesionales locales en cada destino.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de destinos - diseño visual llamativo */}
      <section className="py-8 md:py-12">
        <div className="container-base">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {ciudades.map((ciudad) => {
              const imagen = IMAGENES_CIUDADES[ciudad.slug] || 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80';
              
              return (
                <Link
                  key={ciudad.slug}
                  href={`/es/destinos/${ciudad.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-900 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2 duration-300"
                >
                  {/* Imagen de fondo */}
                  <Image
                    src={imagen}
                    alt={ciudad.nombre}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Contenido */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="text-xs font-medium text-white/70 mb-1">
                      {ciudad.provincia}
                    </span>
                    <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {ciudad.nombre}
                    </h3>
                    {ciudad.porcentaje_extranjeros && (
                      <p className="text-white/80 text-xs md:text-sm hidden md:block">
                        {ciudad.porcentaje_extranjeros}% expatriados
                      </p>
                    )}
                    
                    {/* Flecha de acción */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-8 md:py-12 bg-gradient-primary">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            ¿No encuentras tu destino?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Cuéntanos dónde quieres vivir y te ayudamos a encontrar los mejores profesionales.
          </p>
          <Link href="/es/contacto" className="btn-white btn-lg">
            Contactar ahora
          </Link>
        </div>
      </section>
    </>
  );
}
