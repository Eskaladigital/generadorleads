import Link from 'next/link';
import Image from 'next/image';
import { getServicios } from '@/lib/services';

// Datos
const AUDIENCIAS = [
  { 
    id: 'jubilados', 
    label: 'Jubilados', 
    icon: '🌴',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80',
    description: 'Disfruta de tu retiro en España'
  },
  { 
    id: 'familias', 
    label: 'Familias', 
    icon: '👨‍👩‍👧‍👦',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
    description: 'Un nuevo hogar para toda la familia'
  },
  { 
    id: 'nomadas', 
    label: 'Nómadas', 
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    description: 'Trabaja desde cualquier lugar'
  },
  { 
    id: 'inversores', 
    label: 'Inversores', 
    icon: '📈',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Oportunidades de inversión'
  },
  { 
    id: 'estudiantes', 
    label: 'Estudiantes', 
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    description: 'Estudia en España'
  },
  { 
    id: 'emprendedores', 
    label: 'Emprendedores', 
    icon: '🚀',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    description: 'Emprende tu negocio'
  },
];

const SERVICIOS = [
  {
    id: 'seguros',
    title: 'Seguros de Salud',
    description: 'Cobertura médica completa adaptada a residentes internacionales.',
  },
  {
    id: 'abogados',
    title: 'Abogados',
    description: 'Expertos en extranjería, visados y trámites legales.',
  },
  {
    id: 'inmobiliarias',
    title: 'Inmobiliarias',
    description: 'Encuentra tu hogar ideal con profesionales que hablan tu idioma.',
  },
  {
    id: 'gestorias',
    title: 'Gestorías',
    description: 'Trámites administrativos sin complicaciones.',
  },
];

export default async function HomePage() {
  const servicios = await getServicios();
  return (
    <>
      {/* Hero Section - Slider */}
      <section className="relative h-[600px] md:h-[700px] flex items-center bg-gradient-hero overflow-hidden">
        {/* Background image - profesional y que inspire confianza */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80"
            alt="España"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <div className="container-base relative z-10 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center text-white">
            {/* Logo horizontal con subtítulo */}
            <div className="mb-8">
              <Image 
                src="/images/logo-horizontal.png" 
                alt="Health4Spain" 
                width={400}
                height={100}
                className="h-20 md:h-24 w-auto mx-auto mb-4"
                priority
              />
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Seguro de salud para tu vida en España
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/es/contacto" className="btn-primary btn-lg">
                Encuentra tu profesional
              </Link>
              <Link href="#servicios" className="btn-white btn-lg">
                Ver servicios
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>+500 profesionales verificados</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Atención en tu idioma</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% gratuito</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A quién servimos */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container-base">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ¿A quién ayudamos?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sea cual sea tu situación, estamos aquí para facilitarte la vida en España
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {AUDIENCIAS.map((audiencia) => (
              <Link
                key={audiencia.id}
                href={`/es/contacto?audiencia=${audiencia.id}`}
                className="group relative overflow-hidden rounded-2xl aspect-square bg-gray-900 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
              >
                {/* Imagen de fondo */}
                <Image
                  src={audiencia.image}
                  alt={audiencia.label}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-4xl md:text-5xl mb-2 md:mb-3 transform group-hover:scale-110 transition-transform">
                    {audiencia.icon}
                  </span>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-1">
                    {audiencia.label}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm hidden md:block">
                    {audiencia.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Esenciales */}
      <section id="servicios" className="py-8 md:py-12">
        <div className="container-base">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Servicios Esenciales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para establecerte en España con tranquilidad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicios.map((servicio) => (
              <Link
                key={servicio.slug}
                href={`/es/contacto?servicio=${servicio.slug}`}
                className="group card card-hover p-6"
              >
                <div className="flex items-start gap-3 mb-2">
                  {servicio.icon && (
                    <span className="text-2xl">{servicio.icon}</span>
                  )}
                  <h3 className="font-heading text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {servicio.nombre_plural || servicio.nombre}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{servicio.descripcion_corta}</p>
                <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Solicitar información
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-8 md:py-12 bg-gradient-primary">
        <div className="container-base text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para empezar tu nueva vida en España?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Te conectamos con profesionales verificados que hablan tu idioma. 
            Sin compromiso y totalmente gratis.
          </p>
          <Link href="/es/contacto" className="btn-white btn-lg">
            Comenzar ahora
          </Link>
        </div>
      </section>
    </>
  );
}
