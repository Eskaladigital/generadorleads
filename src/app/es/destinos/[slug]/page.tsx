import { notFound } from 'next/navigation';
import Link from 'next/link';

const destinationsData: Record<string, any> = {
  torrevieja: {
    name: 'Torrevieja',
    region: 'Costa Blanca, Alicante',
    expats: '28%',
    population: '82.000 habitantes',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200',
    hero: 'La ciudad más internacional de España',
    stats: {
      sunshine: '320 días/año',
      temperature: '18°C promedio',
      beaches: '20km de playas',
      airport: '40 min a Alicante'
    },
    overview: 'Torrevieja se ha consolidado como el destino favorito para extranjeros en España, con más del 28% de su población compuesta por residentes internacionales. Esta ciudad costera ofrece un equilibrio perfecto entre clima mediterráneo, infraestructura adaptada y coste de vida asequible.',
    livingCosts: {
      rentStudio: '500-700€',
      rent2bed: '700-900€',
      rent3bed: '900-1.200€',
      buyPrice: '1.500-2.000€/m²',
      utilities: '100-150€',
      groceries: '300-400€',
      healthcare: '150-250€'
    },
    pros: [
      'Mayor comunidad de expatriados en España',
      'Servicios en múltiples idiomas ampliamente disponibles',
      'Coste de vida 30% más bajo que Madrid o Barcelona',
      'Clima excepcional: 320 días de sol al año',
      'Playas de bandera azul y lagunas saladas terapéuticas',
      'Excelente conectividad: 2 aeropuertos cercanos',
      'Supermercados internacionales y productos de todo el mundo',
      'Asociaciones y clubes sociales para todas las nacionalidades'
    ],
    cons: [
      'Muy turística en temporada alta (julio-agosto)',
      'Menos auténtica culturalmente que otras ciudades',
      'Tráfico intenso en verano',
      'Puede sentirse algo aislado del "verdadero" estilo de vida español'
    ],
    neighborhoods: [
      {
        name: 'Centro/Playa del Cura',
        description: 'Zona más céntrica y animada. Cerca de todo pero puede ser ruidosa. Ideal para quienes buscan vida social activa.',
        price: 'Medio-Alto'
      },
      {
        name: 'La Mata',
        description: 'Zona residencial tranquila al norte. Popular entre familias. Playa menos concurrida.',
        price: 'Medio'
      },
      {
        name: 'Los Altos',
        description: 'Urbanizaciones en altura con vistas al mar. Más exclusivo y tranquilo.',
        price: 'Alto'
      },
      {
        name: 'Los Balcones/Punta Prima',
        description: 'Urbanizaciones residenciales. Muy popular entre británicos y escandinavos.',
        price: 'Medio'
      }
    ],
    services: [
      'Hospital Universitario de Torrevieja (atención multiidioma)',
      'Múltiples centros médicos privados especializados en expatriados',
      'Supermercados internacionales: Iceland, Lidl, Aldi, Mercadona',
      'Oficinas de extranjería con atención en inglés',
      'Numerosas gestorías y abogados especializados en no residentes',
      'Clubes sociales: British Legion, Scandinavian Club, German Club',
      'Transporte público: autobuses urbanos e interurbanos'
    ]
  },
  alicante: {
    name: 'Alicante',
    region: 'Capital de Provincia, Costa Blanca',
    expats: '15%',
    population: '340.000 habitantes',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    hero: 'Capital cosmopolita con autenticidad española',
    stats: {
      sunshine: '300 días/año',
      temperature: '18°C promedio',
      beaches: '15km de playas',
      airport: '15 min al centro'
    },
    overview: 'Alicante combina lo mejor de ambos mundos: una capital de provincia moderna y cosmopolita que mantiene su autenticidad española. Con menos turistas que Torrevieja pero con servicios excelentes y conexiones internacionales.',
    livingCosts: {
      rentStudio: '600-800€',
      rent2bed: '800-1.200€',
      rent3bed: '1.000-1.500€',
      buyPrice: '2.000-3.000€/m²',
      utilities: '120-170€',
      groceries: '350-450€',
      healthcare: '150-250€'
    },
    pros: [
      'Ciudad capital con todos los servicios',
      'Mejor equilibrio entre vida internacional y auténtica española',
      'Excelentes conexiones: AVE a Madrid (2h 30min)',
      'Universidad y ambiente estudiantil',
      'Vida cultural activa: museos, teatros, festivales',
      'Aeropuerto internacional muy cercano',
      'Paseo marítimo y puerto deportivo',
      'Barrios históricos con encanto'
    ],
    cons: [
      'Más caro que Torrevieja o Murcia',
      'Tráfico urbano en horas punta',
      'Menos centrado en extranjeros (puede ser pro o contra)',
      'Veranos muy calurosos en el centro'
    ],
    neighborhoods: [
      {
        name: 'Playa San Juan',
        description: 'Zona de playa residencial. Popular entre familias. Buenas conexiones con el centro.',
        price: 'Medio-Alto'
      },
      {
        name: 'Centro Histórico',
        description: 'Casco antiguo con encanto. Vida nocturna y cultural. Pisos más antiguos pero con carácter.',
        price: 'Medio'
      },
      {
        name: 'Cabo de las Huertas',
        description: 'Zona residencial exclusiva junto al mar. Calas naturales. Muy tranquilo.',
        price: 'Alto'
      },
      {
        name: 'Vistahermosa',
        description: 'Barrio moderno y residencial. Cerca de universidad. Buenas comunicaciones.',
        price: 'Medio-Alto'
      }
    ],
    services: [
      'Hospital General Universitario de Alicante',
      'Múltiples hospitales y clínicas privadas (Vithas, Vistahermosa)',
      'Estación de AVE con conexión directa a Madrid',
      'Aeropuerto internacional (12 millones de pasajeros/año)',
      'Universidad de Alicante (35.000 estudiantes)',
      'Red de tranvía (TRAM) eficiente',
      'Oficinas consulares de múltiples países'
    ]
  },
  murcia: {
    name: 'Murcia',
    region: 'Capital de Región, Costa Cálida',
    expats: '12%',
    population: '460.000 habitantes',
    image: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=1200',
    hero: 'Auténtica vida española con clima excepcional',
    stats: {
      sunshine: '315 días/año',
      temperature: '19°C promedio',
      beaches: '30 min a costa',
      airport: '30 min Corvera'
    },
    overview: 'Murcia ofrece una experiencia más auténticamente española que las zonas costeras. Es la tercera ciudad más soleada de Europa, con costes de vida muy asequibles y una calidad de vida excelente. Perfecta para quienes quieren inmersión cultural real.',
    livingCosts: {
      rentStudio: '400-600€',
      rent2bed: '600-900€',
      rent3bed: '800-1.100€',
      buyPrice: '1.300-1.800€/m²',
      utilities: '90-130€',
      groceries: '280-380€',
      healthcare: '120-200€'
    },
    pros: [
      'Auténtica vida española (inmersión cultural)',
      'Coste de vida muy bajo',
      'Ciudad universitaria joven y dinámica',
      'Gastronomía excepcional (huerta de Europa)',
      'Menos turística, más tranquila',
      'Centro histórico hermoso y bien conservado',
      'A 30 minutos de playas vírgenes',
      'Clima excepcional: el más seco de Europa'
    ],
    cons: [
      'Menos servicios específicos para extranjeros',
      'Necesario hablar español para el día a día',
      'Interior (30 min a la playa más cercana)',
      'Veranos muy calurosos (puede superar 40°C)',
      'Menos vuelos internacionales directos'
    ],
    neighborhoods: [
      {
        name: 'Centro Histórico',
        description: 'Casco antiguo peatonal. Catedral, plazas, vida comercial. Pisos con encanto.',
        price: 'Medio'
      },
      {
        name: 'El Carmen',
        description: 'Barrio residencial tranquilo. Popular entre familias. Parques y colegios.',
        price: 'Medio'
      },
      {
        name: 'Nueva Condomina',
        description: 'Zona moderna con centro comercial. Bien comunicada. Edificios nuevos.',
        price: 'Medio'
      },
      {
        name: 'Espinardo',
        description: 'Zona universitaria. Más económico. Ambiente joven.',
        price: 'Bajo-Medio'
      }
    ],
    services: [
      'Hospital Clínico Universitario Virgen de la Arrixaca',
      'Hospital Morales Meseguer',
      'Universidad de Murcia (38.000 estudiantes)',
      'Aeropuerto Internacional Región de Murcia (Corvera)',
      'Red de tranvía moderna',
      'Mercados de abastos tradicionales',
      'Teatro Romea, Auditorio El Batel'
    ]
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'torrevieja' },
    { slug: 'alicante' },
    { slug: 'murcia' },
    { slug: 'benidorm' },
    { slug: 'cartagena' },
    { slug: 'elche' },
  ];
}

export default async function DestinoPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const destination = destinationsData[params.slug];

  if (!destination) {
    notFound();
  }

  return (
    <>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${destination.image}')`
          }}
        />
        <div className="relative z-10 h-full flex items-end px-[5%] pb-16">
          <div className="max-w-[1200px] mx-auto w-full text-white">
            <div className="text-sm mb-4 opacity-90">
              {destination.region} • {destination.expats} población extranjera
            </div>
            <h1 className="font-lora text-[5rem] font-bold mb-4">
              {destination.name}
            </h1>
            <p className="text-[1.5rem] opacity-95">
              {destination.hero}
            </p>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-12 px-[5%] bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(destination.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-3xl mb-2">
                {key === 'sunshine' ? '☀️' : key === 'temperature' ? '🌡️' : key === 'beaches' ? '🏖️' : '✈️'}
              </div>
              <div className="font-bold text-accent text-xl mb-1">{value as string}</div>
              <div className="text-sm text-gray-600 capitalize">
                {key === 'sunshine' ? 'Días de sol' : 
                 key === 'temperature' ? 'Temperatura' : 
                 key === 'beaches' ? 'Playas' : 'Aeropuerto'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[1.3rem] text-gray-700 leading-relaxed border-l-4 border-accent pl-8">
            {destination.overview}
          </p>
        </div>
      </section>

      {/* LIVING COSTS */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-[#1a1a1a]">
            Coste de Vida Mensual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 border-l-4 border-accent">
              <h3 className="font-semibold text-xl mb-6">💰 Vivienda</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estudio</span>
                  <span className="font-semibold">{destination.livingCosts.rentStudio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">2 dormitorios</span>
                  <span className="font-semibold">{destination.livingCosts.rent2bed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">3 dormitorios</span>
                  <span className="font-semibold">{destination.livingCosts.rent3bed}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-gray-600">Precio compra</span>
                  <span className="font-semibold">{destination.livingCosts.buyPrice}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <h3 className="font-semibold text-xl mb-6">📋 Gastos Mensuales</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Servicios (luz, agua, internet)</span>
                  <span className="font-semibold">{destination.livingCosts.utilities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Supermercado (pareja)</span>
                  <span className="font-semibold">{destination.livingCosts.groceries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seguro salud privado</span>
                  <span className="font-semibold">{destination.livingCosts.healthcare}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROS & CONS */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-[#1a1a1a]">
            Ventajas y Consideraciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 border-l-4 border-green-600">
              <h3 className="font-semibold text-xl mb-6 text-green-900">✓ Ventajas</h3>
              <ul className="space-y-3">
                {destination.pros.map((pro: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-50 p-8 border-l-4 border-orange-600">
              <h3 className="font-semibold text-xl mb-6 text-orange-900">⚠️ Consideraciones</h3>
              <ul className="space-y-3">
                {destination.cons.map((con: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-600 mt-1">•</span>
                    <span className="text-gray-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEIGHBORHOODS */}
      {destination.neighborhoods && (
        <section className="py-16 px-[5%] bg-gray-50">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-lora text-[3rem] font-bold mb-12 text-[#1a1a1a]">
              Mejores Zonas Para Vivir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destination.neighborhoods.map((neighborhood: any, index: number) => (
                <div key={index} className="bg-white p-8 border-l-4 border-accent">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-xl">{neighborhood.name}</h3>
                    <span className="text-sm font-semibold text-accent">{neighborhood.price}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{neighborhood.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-[#1a1a1a]">
            Servicios y Equipamientos
          </h2>
          <ul className="space-y-4">
            {destination.services.map((service: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="text-accent mt-1">✓</span>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5%] bg-[#1a1a1a] text-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-lora text-[2.5rem] font-bold mb-6">
            ¿Quieres Establecerte en {destination.name}?
          </h2>
          <p className="text-[1.2rem] mb-8 opacity-90">
            Te conectamos con profesionales locales que te ayudarán con vivienda, trámites legales y todo lo necesario.
          </p>
          <Link
            href="/es/contacto"
            className="inline-block bg-white text-[#1a1a1a] py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent hover:text-white"
          >
            Solicitar Información
          </Link>
        </div>
      </section>
    </>
  );
}
