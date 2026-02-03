import Link from 'next/link';
import Image from 'next/image';

// Datos
const AUDIENCIAS = [
  { id: 'jubilados', label: 'Jubilados', icon: '🌴' },
  { id: 'familias', label: 'Familias', icon: '👨‍👩‍👧‍👦' },
  { id: 'nomadas', label: 'Nómadas', icon: '💻' },
  { id: 'inversores', label: 'Inversores', icon: '📈' },
  { id: 'estudiantes', label: 'Estudiantes', icon: '🎓' },
  { id: 'emprendedores', label: 'Emprendedores', icon: '🚀' },
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

export default function HomePage() {
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
            {/* Logo H4S siglas color centrado */}
            <div className="mb-8 flex justify-center">
              <Image 
                src="/images/logo-siglas-color.png" 
                alt="Health4Spain" 
                width={200}
                height={200}
                className="h-32 md:h-40 w-auto"
                priority
              />
            </div>
            
            {/* Logo horizontal con subtítulo */}
            <div className="mb-8">
              <Image 
                src="/images/logo-horizontal.png" 
                alt="Health4Spain" 
                width={400}
                height={100}
                className="h-16 md:h-20 w-auto mx-auto mb-4"
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
      <section className="py-6 md:py-10 bg-gray-50">
        <div className="container-base">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ¿A quién ayudamos?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sea cual sea tu situación, estamos aquí para facilitarte la vida en España
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {AUDIENCIAS.map((audiencia) => (
              <div 
                key={audiencia.id}
                className="bg-white rounded-xl p-4 text-center shadow-card hover:shadow-card-hover transition-all"
              >
                <span className="text-3xl mb-2 block">{audiencia.icon}</span>
                <span className="font-medium text-gray-800">{audiencia.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Esenciales */}
      <section id="servicios" className="py-6 md:py-10">
        <div className="container-base">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Servicios Esenciales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para establecerte en España con tranquilidad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICIOS.map((servicio) => (
              <Link
                key={servicio.id}
                href={`/es/contacto?servicio=${servicio.id}`}
                className="group card card-hover p-6"
              >
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {servicio.title}
                </h3>
                <p className="text-gray-600 mb-4">{servicio.description}</p>
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
      <section className="py-6 md:py-10 bg-gradient-primary">
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
