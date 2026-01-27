import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="py-24 px-[5%] max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center">
          <div>
            <div className="uppercase tracking-[2px] text-[0.8rem] text-accent font-semibold mb-8">
              Edición Mediterránea
            </div>
            <h1 className="font-lora text-[5rem] font-bold leading-[1.1] mb-8 text-[#1a1a1a]">
              Tu Nuevo Capítulo en España
            </h1>
            <p className="text-[1.4rem] text-gray-600 mb-10 leading-relaxed max-w-[550px]">
              Una conexión cuidada entre residentes internacionales y profesionales españoles de confianza. Seguros, servicios legales y vivienda—todo en un solo lugar.
            </p>
            <div className="flex items-center gap-6 mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3 text-[0.9rem] text-gray-500">
                <span>📍</span>
                <span>20 Ciudades</span>
              </div>
              <div className="flex items-center gap-3 text-[0.9rem] text-gray-500">
                <span>✓</span>
                <span>150+ Partners Verificados</span>
              </div>
              <div className="flex items-center gap-3 text-[0.9rem] text-gray-500">
                <span>🌐</span>
                <span>4 Idiomas</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/es/contacto"
                className="bg-[#1a1a1a] text-white py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-transparent hover:text-[#1a1a1a] border-2 border-[#1a1a1a]"
              >
                Comienza Tu Viaje
              </Link>
              <Link
                href="/es/servicios"
                className="bg-transparent text-[#1a1a1a] py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] border-2 border-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white"
              >
                Explorar Servicios
              </Link>
            </div>
          </div>
          <div 
            className="w-full h-[600px] bg-cover bg-center border-[15px] border-gray-100 shadow-2xl"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800')"
            }}
          />
        </div>
      </section>

      {/* FEATURES BAR */}
      <div className="py-16 px-[5%] bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="text-center">
            <div className="font-lora text-[3rem] font-bold text-accent mb-2">
              5.5M
            </div>
            <div className="text-[0.95rem] text-gray-600 uppercase tracking-wider">
              Extranjeros Viviendo en España
            </div>
          </div>
          <div className="text-center">
            <div className="font-lora text-[3rem] font-bold text-accent mb-2">
              320
            </div>
            <div className="text-[0.95rem] text-gray-600 uppercase tracking-wider">
              Días de Sol al Año
            </div>
          </div>
          <div className="text-center">
            <div className="font-lora text-[3rem] font-bold text-accent mb-2">
              0%
            </div>
            <div className="text-[0.95rem] text-gray-600 uppercase tracking-wider">
              Comisión para Usuarios
            </div>
          </div>
          <div className="text-center">
            <div className="font-lora text-[3rem] font-bold text-accent mb-2">
              100%
            </div>
            <div className="text-[0.95rem] text-gray-600 uppercase tracking-wider">
              Profesionales Verificados
            </div>
          </div>
        </div>
      </div>

      {/* PROFILES */}
      <section className="py-32 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[700px] mb-20">
            <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
              A Quién Servimos
            </div>
            <h2 className="font-lora text-[3.5rem] font-bold mb-6 text-[#1a1a1a]">
              Cuatro Historias, Un Destino
            </h2>
            <p className="text-[1.2rem] text-gray-600 leading-relaxed">
              Cada viaje a España es único. Ya sea que estés comenzando una carrera, formando una familia, semi-jubilándote o disfrutando de la jubilación completa, te conectamos con los profesionales adecuados.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Los Móviles",
                age: "22-34 años • Trabajo y Estudios",
                description: "Jóvenes profesionales que buscan oportunidades laborales, experiencia internacional y nuevos comienzos en ciudades españolas.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
              },
              {
                title: "Las Familias",
                age: "35-49 años • Reubicación",
                description: "Reubicaciones familiares completas que buscan estabilidad, educación de calidad y mejor calidad de vida en España.",
                image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600"
              },
              {
                title: "Los Profesionales",
                age: "50-59 años • Semi-Retiro",
                description: "Profesionales consolidados que buscan un semi-retiro activo con estilo de vida mediterráneo y vida de calidad.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600"
              },
              {
                title: "Los Jubilados",
                age: "60-70 años • Jubilación Completa",
                description: "Disfrutando de una merecida jubilación bajo el sol español con apoyo integral y tranquilidad.",
                image: "https://images.unsplash.com/photo-1609902726285-00668009f004?w=600"
              }
            ].map((profile, index) => (
              <article 
                key={index}
                className="bg-white border border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              >
                <div 
                  className="h-[300px] bg-cover bg-center flex items-end p-8"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('${profile.image}')`
                  }}
                >
                  <h3 className="font-lora text-[2.5rem] text-white font-bold">
                    {profile.title}
                  </h3>
                </div>
                <div className="p-10">
                  <div className="uppercase text-[0.8rem] text-accent tracking-wider mb-4 font-semibold">
                    {profile.age}
                  </div>
                  <p className="text-[1.05rem] text-gray-600 leading-relaxed mb-6">
                    {profile.description}
                  </p>
                  <Link 
                    href={`/es/perfiles/${profile.title.toLowerCase().replace(' ', '-')}`}
                    className="uppercase text-[0.8rem] tracking-wider text-[#1a1a1a] no-underline font-semibold inline-flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    Leer Más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 px-[5%] bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[700px] mb-20">
            <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
              Servicios Esenciales
            </div>
            <h2 className="font-lora text-[3.5rem] font-bold mb-6 text-[#1a1a1a]">
              Todo Lo Que Necesitas
            </h2>
            <p className="text-[1.2rem] text-gray-600 leading-relaxed">
              Profesionales verificados que hablan tu idioma y comprenden tus necesidades únicas como residente internacional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                category: "Salud y Bienestar",
                title: "Seguros de Salud",
                description: "Compara opciones de seguros médicos privados adaptados para expatriados. Válidos para visados no lucrativos y cobertura completa.",
                cta: "Explorar Opciones",
                slug: "seguros"
              },
              {
                category: "Servicios Legales",
                title: "Abogados de Extranjería",
                description: "Especialistas en visados, NIE, arraigo, reagrupación familiar y todos los procedimientos migratorios.",
                cta: "Encontrar Abogado",
                slug: "abogados"
              },
              {
                category: "Bienes Raíces",
                title: "Agentes Inmobiliarios",
                description: "Agencias con amplia experiencia trabajando con clientes internacionales que entienden tus necesidades específicas.",
                cta: "Ver Propiedades",
                slug: "inmobiliarias"
              },
              {
                category: "Administración",
                title: "Servicios de Gestoría",
                description: "Profesionales administrativos para gestionar papeleo, impuestos y procedimientos burocráticos en tu nombre.",
                cta: "Obtener Ayuda",
                slug: "gestorias"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white p-12 border-l-4 border-accent"
              >
                <div className="uppercase text-[0.75rem] text-accent tracking-[2px] font-semibold mb-4">
                  {service.category}
                </div>
                <h3 className="font-lora text-[2.5rem] mb-6 text-[#1a1a1a]">
                  {service.title}
                </h3>
                <p className="text-[1.1rem] text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                <Link
                  href={`/es/servicios/${service.slug}`}
                  className="uppercase text-[0.8rem] tracking-wider text-[#1a1a1a] no-underline font-semibold border-b-2 border-[#1a1a1a] pb-1 hover:text-accent hover:border-accent transition-all"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-[5%] bg-[#1a1a1a] text-white">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="text-[6rem] text-accent leading-none mb-4">"</div>
          <p className="font-lora text-[2.5rem] font-normal leading-[1.4] mb-8 italic">
            No solo te conectamos con profesionales. Te guiamos en cada paso para hacer de España tu hogar.
          </p>
          <div className="uppercase text-[0.85rem] tracking-[2px] text-gray-500 mb-12">
            Promesa de Health4Spain
          </div>
          <Link
            href="/es/contacto"
            className="bg-[#1a1a1a] text-white py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all border-2 border-white hover:bg-white hover:text-[#1a1a1a]"
          >
            Comienza Tu Historia
          </Link>
        </div>
      </section>
    </>
  );
}
