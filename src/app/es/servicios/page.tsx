import Link from 'next/link';

const services = [
  {
    slug: 'seguros',
    category: "Salud y Bienestar",
    title: "Seguros de Salud",
    icon: "🏥",
    description: "Compara opciones de seguros médicos privados adaptados para expatriados. Válidos para visados no lucrativos y cobertura completa.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
  },
  {
    slug: 'abogados',
    category: "Servicios Legales",
    title: "Abogados de Extranjería",
    icon: "⚖️",
    description: "Especialistas en visados, NIE, arraigo, reagrupación familiar y todos los procedimientos migratorios.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
  },
  {
    slug: 'inmobiliarias',
    category: "Bienes Raíces",
    title: "Agentes Inmobiliarios",
    icon: "🏠",
    description: "Agencias con amplia experiencia trabajando con clientes internacionales que entienden tus necesidades específicas.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
  },
  {
    slug: 'gestorias',
    category: "Administración",
    title: "Servicios de Gestoría",
    icon: "📋",
    description: "Profesionales administrativos para gestionar papeleo, impuestos y procedimientos burocráticos en tu nombre.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800"
  }
];

export default function ServiciosPage() {
  return (
    <>
      {/* HEADER */}
      <section className="py-24 px-[5%] bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
            Servicios Profesionales
          </div>
          <h1 className="font-lora text-[4rem] font-bold mb-6 text-[#1a1a1a]">
            Conectamos con Expertos Verificados
          </h1>
          <p className="text-[1.2rem] text-gray-600 leading-relaxed max-w-[700px]">
            Profesionales que hablan tu idioma y comprenden las necesidades específicas de residentes internacionales en España.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service) => (
              <Link 
                key={service.slug}
                href={`/es/servicios/${service.slug}`}
                className="group bg-white border border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-2 no-underline"
              >
                <div 
                  className="h-[350px] bg-cover bg-center relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${service.image}')`
                  }}
                >
                  <div className="absolute top-8 left-8 text-6xl">
                    {service.icon}
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="uppercase text-[0.75rem] text-white/80 tracking-wider mb-2 font-semibold">
                      {service.category}
                    </div>
                    <h2 className="font-lora text-[2.5rem] text-white font-bold">
                      {service.title}
                    </h2>
                  </div>
                </div>
                <div className="p-10">
                  <p className="text-[1.1rem] text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="uppercase text-[0.8rem] tracking-wider text-[#1a1a1a] font-semibold inline-flex items-center gap-2 group-hover:text-accent transition-colors">
                    Explorar Servicio →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-[5%] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-lora text-[3rem] font-bold mb-6 text-[#1a1a1a]">
              Cómo Funciona
            </h2>
            <p className="text-[1.2rem] text-gray-600">
              Proceso simple y transparente en 3 pasos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 border-l-4 border-accent">
              <div className="text-5xl mb-6">1️⃣</div>
              <h3 className="font-lora text-[1.8rem] font-semibold mb-4">
                Cuéntanos Tu Caso
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Completa un breve formulario con tus necesidades específicas. No te preocupes si no conoces todos los detalles, te ayudaremos.
              </p>
            </div>
            
            <div className="bg-white p-10 border-l-4 border-accent">
              <div className="text-5xl mb-6">2️⃣</div>
              <h3 className="font-lora text-[1.8rem] font-semibold mb-4">
                Te Conectamos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                En 24-48 horas te ponemos en contacto con 2-3 profesionales verificados que mejor se ajustan a tu perfil y ubicación.
              </p>
            </div>
            
            <div className="bg-white p-10 border-l-4 border-accent">
              <div className="text-5xl mb-6">3️⃣</div>
              <h3 className="font-lora text-[1.8rem] font-semibold mb-4">
                Tú Decides
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Compara propuestas, haz preguntas directamente y elige al profesional con quien te sientas más cómodo. Sin presión, sin comisiones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1000px] mx-auto text-center bg-gray-50 p-16 border-l-4 border-accent">
          <h2 className="font-lora text-[2.5rem] font-bold mb-6">
            ¿Listo Para Empezar?
          </h2>
          <p className="text-[1.2rem] text-gray-600 mb-8">
            Sin comisiones. Sin compromiso. Solo profesionales verificados que hablan tu idioma.
          </p>
          <Link
            href="/es/contacto"
            className="inline-block bg-[#1a1a1a] text-white py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent"
          >
            Solicitar Información
          </Link>
        </div>
      </section>
    </>
  );
}
