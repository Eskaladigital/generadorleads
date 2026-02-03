import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Destinos en España para Expatriados',
  description: 'Descubre los mejores destinos en España para vivir como expatriado. Costa Blanca, Costa del Sol, Madrid, Barcelona, Islas Baleares y Canarias.',
};

// Todos los destinos con imágenes de fondo
const DESTINOS = [
  { 
    slug: 'madrid', 
    nombre: 'Madrid', 
    region: 'Centro',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    descripcion: 'Capital cosmopolita'
  },
  { 
    slug: 'barcelona', 
    nombre: 'Barcelona', 
    region: 'Cataluña',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    descripcion: 'Arte y mediterráneo'
  },
  { 
    slug: 'valencia', 
    nombre: 'Valencia', 
    region: 'Levante',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    descripcion: 'Ciudad de las artes'
  },
  { 
    slug: 'alicante', 
    nombre: 'Alicante', 
    region: 'Costa Blanca',
    image: 'https://images.unsplash.com/photo-1583789825737-f0ca3e151e4b?w=800&q=80',
    descripcion: 'Sol y playa'
  },
  { 
    slug: 'malaga', 
    nombre: 'Málaga', 
    region: 'Costa del Sol',
    image: 'https://images.unsplash.com/photo-1624709631346-3a1d7ca12dd0?w=800&q=80',
    descripcion: 'Costa andaluza'
  },
  { 
    slug: 'marbella', 
    nombre: 'Marbella', 
    region: 'Costa del Sol',
    image: 'https://images.unsplash.com/photo-1611676001453-7c0b2c498f4d?w=800&q=80',
    descripcion: 'Lujo y glamour'
  },
  { 
    slug: 'torrevieja', 
    nombre: 'Torrevieja', 
    region: 'Costa Blanca',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    descripcion: 'Paraíso costero'
  },
  { 
    slug: 'benidorm', 
    nombre: 'Benidorm', 
    region: 'Costa Blanca',
    image: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&q=80',
    descripción: 'Turismo y ocio'
  },
  { 
    slug: 'murcia', 
    nombre: 'Murcia', 
    region: 'Levante',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80',
    descripcion: 'Huerta mediterránea'
  },
  { 
    slug: 'sevilla', 
    nombre: 'Sevilla', 
    region: 'Andalucía',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80',
    descripcion: 'Flamenco y tradición'
  },
  { 
    slug: 'palma', 
    nombre: 'Palma de Mallorca', 
    region: 'Islas Baleares',
    image: 'https://images.unsplash.com/photo-1562774306-e0b935983cff?w=800&q=80',
    descripcion: 'Perla del mediterráneo'
  },
  { 
    slug: 'tenerife', 
    nombre: 'Tenerife', 
    region: 'Islas Canarias',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80',
    descripcion: 'Eterna primavera'
  },
  { 
    slug: 'las-palmas', 
    nombre: 'Las Palmas', 
    region: 'Islas Canarias',
    image: 'https://images.unsplash.com/photo-1576485375217-d6a95e34d043?w=800&q=80',
    descripcion: 'Clima tropical'
  },
  { 
    slug: 'ibiza', 
    nombre: 'Ibiza', 
    region: 'Islas Baleares',
    image: 'https://images.unsplash.com/photo-1513415032842-6728e15e9f8c?w=800&q=80',
    descripcion: 'Vida y naturaleza'
  },
  { 
    slug: 'granada', 
    nombre: 'Granada', 
    region: 'Andalucía',
    image: 'https://images.unsplash.com/photo-1589448873400-1e0f21f3a24a?w=800&q=80',
    descripcion: 'Alhambra y sierra'
  },
  { 
    slug: 'bilbao', 
    nombre: 'Bilbao', 
    region: 'País Vasco',
    image: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=800&q=80',
    descripcion: 'Cultura y gastronomía'
  },
  { 
    slug: 'zaragoza', 
    nombre: 'Zaragoza', 
    region: 'Aragón',
    image: 'https://images.unsplash.com/photo-1585665113811-16c1428f3774?w=800&q=80',
    descripcion: 'Historia milenaria'
  },
  { 
    slug: 'fuengirola', 
    nombre: 'Fuengirola', 
    region: 'Costa del Sol',
    image: 'https://images.unsplash.com/photo-1590074071552-2ba1f2d2f959?w=800&q=80',
    descripcion: 'Playas y familias'
  },
  { 
    slug: 'estepona', 
    nombre: 'Estepona', 
    region: 'Costa del Sol',
    image: 'https://images.unsplash.com/photo-1599683270550-1e15f1a406aa?w=800&q=80',
    descripcion: 'Pueblo andaluz'
  },
  { 
    slug: 'nerja', 
    nombre: 'Nerja', 
    region: 'Costa del Sol',
    image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bba7e?w=800&q=80',
    descripcion: 'Balcón de Europa'
  },
];

export default function DestinosPage() {
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
            {DESTINOS.map((destino) => (
              <Link
                key={destino.slug}
                href={`/es/destinos/${destino.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-900 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2 duration-300"
              >
                {/* Imagen de fondo */}
                <Image
                  src={destino.image}
                  alt={destino.nombre}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <span className="text-xs font-medium text-white/70 mb-1">
                    {destino.region}
                  </span>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {destino.nombre}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm hidden md:block">
                    {destino.descripcion}
                  </p>
                  
                  {/* Flecha de acción */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
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
