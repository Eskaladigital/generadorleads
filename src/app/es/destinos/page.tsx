import Link from 'next/link';

const destinations = [
  {
    slug: 'torrevieja',
    name: 'Torrevieja',
    region: 'Costa Blanca',
    expats: '28%',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800',
    highlight: 'Ciudad más popular',
    description: 'La ciudad con mayor porcentaje de residentes extranjeros en España'
  },
  {
    slug: 'alicante',
    name: 'Alicante',
    region: 'Costa Blanca',
    expats: '15%',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    highlight: 'Capital de provincia',
    description: 'Ciudad cosmopolita con excelentes conexiones y servicios'
  },
  {
    slug: 'murcia',
    name: 'Murcia',
    region: 'Costa Cálida',
    expats: '12%',
    image: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800',
    highlight: 'Menos turística',
    description: 'Auténtica vida española con clima excelente'
  },
  {
    slug: 'benidorm',
    name: 'Benidorm',
    region: 'Costa Blanca',
    expats: '24%',
    image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=800',
    highlight: 'Infraestructura completa',
    description: 'Resort mediterráneo con todos los servicios'
  },
  {
    slug: 'cartagena',
    name: 'Cartagena',
    region: 'Costa Cálida',
    expats: '10%',
    image: 'https://images.unsplash.com/photo-1555881603-1f2169d36904?w=800',
    highlight: 'Historia y playas',
    description: 'Puerto milenario con playas vírgenes cercanas'
  },
  {
    slug: 'elche',
    name: 'Elche',
    region: 'Costa Blanca',
    expats: '14%',
    image: 'https://images.unsplash.com/photo-1601654742265-6f7e72a06d5b?w=800',
    highlight: 'Ciudad patrimonio',
    description: 'Palmeral histórico y calidad de vida excepcional'
  }
];

export default function DestinosPage() {
  return (
    <>
      {/* HEADER */}
      <section className="py-24 px-[5%] bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
            Costa Mediterránea
          </div>
          <h1 className="font-lora text-[4rem] font-bold mb-6 text-[#1a1a1a]">
            Explora Tu Futuro Hogar
          </h1>
          <p className="text-[1.2rem] text-gray-600 leading-relaxed max-w-[700px]">
            Descubre las ciudades más populares entre extranjeros en la Costa Blanca y Costa Cálida. Clima excepcional, playas, y comunidades internacionales establecidas.
          </p>
        </div>
      </section>

      {/* DESTINATIONS GRID */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/es/destinos/${destination.slug}`}
                className="group relative overflow-hidden no-underline"
              >
                <div 
                  className="h-[400px] bg-cover bg-center relative transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('${destination.image}')`
                  }}
                >
                  {destination.highlight && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                      {destination.highlight}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="text-sm mb-2 opacity-90">
                      {destination.region} • {destination.expats} extranjeros
                    </div>
                    <h2 className="font-lora text-[2.5rem] font-bold mb-2">
                      {destination.name}
                    </h2>
                    <p className="text-sm opacity-90">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="py-24 px-[5%] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Comparativa Rápida
          </h2>
          <div className="bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-6 font-semibold uppercase text-xs tracking-wider">Ciudad</th>
                  <th className="text-left p-6 font-semibold uppercase text-xs tracking-wider">% Extranjeros</th>
                  <th className="text-left p-6 font-semibold uppercase text-xs tracking-wider">Alquiler 2BR</th>
                  <th className="text-left p-6 font-semibold uppercase text-xs tracking-wider">Compra €/m²</th>
                  <th className="text-left p-6 font-semibold uppercase text-xs tracking-wider">Aeropuerto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-6 font-semibold">Torrevieja</td>
                  <td className="p-6">28%</td>
                  <td className="p-6">700-900€</td>
                  <td className="p-6">1.500-2.000€</td>
                  <td className="p-6">40 min</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-6 font-semibold">Alicante</td>
                  <td className="p-6">15%</td>
                  <td className="p-6">800-1.200€</td>
                  <td className="p-6">2.000-3.000€</td>
                  <td className="p-6">15 min</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-6 font-semibold">Murcia</td>
                  <td className="p-6">12%</td>
                  <td className="p-6">600-900€</td>
                  <td className="p-6">1.300-1.800€</td>
                  <td className="p-6">30 min</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-6 font-semibold">Benidorm</td>
                  <td className="p-6">24%</td>
                  <td className="p-6">900-1.300€</td>
                  <td className="p-6">2.200-3.500€</td>
                  <td className="p-6">50 min</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold">Cartagena</td>
                  <td className="p-6">10%</td>
                  <td className="p-6">550-800€</td>
                  <td className="p-6">1.200-1.700€</td>
                  <td className="p-6">25 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1000px] mx-auto text-center bg-gray-50 p-16 border-l-4 border-accent">
          <h2 className="font-lora text-[2.5rem] font-bold mb-6">
            ¿No Sabes Qué Ciudad Elegir?
          </h2>
          <p className="text-[1.2rem] text-gray-600 mb-8">
            Te ayudamos a encontrar el destino perfecto según tu perfil, presupuesto y prioridades.
          </p>
          <Link
            href="/es/contacto"
            className="inline-block bg-[#1a1a1a] text-white py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent"
          >
            Asesoría Personalizada
          </Link>
        </div>
      </section>
    </>
  );
}
