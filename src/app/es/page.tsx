import Link from 'next/link';

// Datos - 4 PERFILES CORRECTOS
const AUDIENCIAS = [
  { 
    id: 'jubilados', 
    label: 'Jubilados', 
    desc: 'Retiro en Costa Blanca/Sol. Visado no lucrativo, seguro médico.'
  },
  { 
    id: 'trabajadores', 
    label: 'Trabajadores', 
    desc: 'Empleo en agro/industria. Arraigo laboral y reagrupación.'
  },
  { 
    id: 'inversores', 
    label: 'Inversores', 
    desc: 'Golden Visa. Inversión inmobiliaria en zonas premium.'
  },
  { 
    id: 'estudiantes', 
    label: 'Estudiantes', 
    desc: 'Visado estudiante. Homologación de títulos.'
  },
];

// 4 SERVICIOS ESENCIALES
const SERVICIOS = [
  {
    id: 'seguros',
    number: '01',
    title: 'Seguros de Salud',
    description: 'Pólizas obligatorias para visados y permisos de residencia',
  },
  {
    id: 'abogados',
    number: '02',
    title: 'Abogados',
    description: 'Familia, civil, laboral, extranjería y más',
  },
  {
    id: 'inmobiliarias',
    number: '03',
    title: 'Inmobiliarias',
    description: 'Agentes especializados en extranjeros',
  },
  {
    id: 'gestorias',
    number: '04',
    title: 'Gestorías',
    description: 'Empadronamiento y gestión administrativa',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Minimal */}
      <section className="section">
        <div className="container-narrow">
          <h1 className="mb-8">
            España.<br />Simplificado.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl">
            Conexiones directas con profesionales verificados para extranjeros. 
            Seguros, abogados, inmobiliarias, gestorías. Sin complicaciones.
          </p>
          <Link href="/es/contacto" className="btn-minimal-lg">
            Empezar Ahora
          </Link>
        </div>
      </section>

      {/* Servicios - Lista Minimal */}
      <section className="section-alt">
        <div className="container-narrow">
          <h2 className="mb-16">Servicios</h2>
          <ul className="service-list-minimal">
            {SERVICIOS.map((servicio) => (
              <li key={servicio.id} className="service-item-minimal">
                <div className="service-number">{servicio.number}</div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {servicio.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600">
                    {servicio.description}
                  </p>
                </div>
                <Link 
                  href={`/es/contacto?servicio=${servicio.id}`}
                  className="service-arrow"
                >
                  →
                </Link>
              </li>
            ))}
          </ul>
          
          {/* CTA Intermedio */}
          <div className="text-center mt-20">
            <Link href="/es/contacto" className="btn-minimal-lg">
              Solicitar Información
            </Link>
          </div>
        </div>
      </section>

      {/* Stats - Fondo Negro */}
      <section className="stats-minimal">
        <div className="container-base">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
            <div>
              <div className="stat-number">150+</div>
              <div className="stat-label">Profesionales</div>
            </div>
            <div>
              <div className="stat-number">19</div>
              <div className="stat-label">Ciudades</div>
            </div>
            <div>
              <div className="stat-number">0€</div>
              <div className="stat-label">Coste</div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfiles - Cards Minimal */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="mb-16">¿Quién Eres?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {AUDIENCIAS.map((audiencia) => (
              <div key={audiencia.id} className="card-minimal">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {audiencia.label}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {audiencia.desc}
                </p>
              </div>
            ))}
          </div>
          
          {/* CTA Intermedio */}
          <div className="text-center mt-20">
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              ¿Te identificas con algún perfil?
            </p>
            <Link href="/es/contacto" className="btn-minimal-lg">
              Recibir Asesoramiento
            </Link>
          </div>
        </div>
      </section>

      {/* Destinos Preview */}
      <section className="section-alt">
        <div className="container-narrow">
          <h2 className="mb-8">19 Ciudades. Una Red.</h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl">
            Costa Blanca, Murcia, Costa del Sol, Valencia, Barcelona, Madrid...
          </p>
          <Link href="/es/destinos" className="btn-minimal">
            Ver Todos los Destinos →
          </Link>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section text-center">
        <div className="container-narrow">
          <h2 className="mb-8">¿Listo para Empezar?</h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Sin coste. Sin compromiso. Respuesta en 24 horas.
          </p>
          <Link href="/es/contacto" className="btn-minimal-lg">
            Empezar Ahora
          </Link>
        </div>
      </section>
    </>
  );
}
