import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { HERO_IMAGE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Health4Spain',
  description: 'Conectamos personas que sueñan con vivir en España con profesionales verificados: abogados, seguros, inmobiliarias y gestorías. Conoce nuestra misión.',
};

export default function SobreNosotrosPage() {
  return (
    <>
      {/* Hero compacto con imagen de fondo */}
      <section className="hero-with-image hero-compact relative">
        <Image
          src={HERO_IMAGE_URL}
          alt="Sobre Health4Spain"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container-narrow text-center">
          <h1 className="text-white mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto">
            Conectamos a personas que sueñan con vivir en España con profesionales que hacen ese sueño realidad.
          </p>
        </div>
      </section>

      {/* Mission intro */}
      <section className="section-alt">
        <div className="container-narrow">
          <div className="bg-white border-t-3 border-accent p-8 mb-16">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Cada año, miles de personas deciden establecerse en España. El proceso puede ser complejo: 
              seguros de salud, visados, búsqueda de vivienda, trámites administrativos. Health4Spain existe 
              para hacer este proceso más sencillo, conectándote con profesionales verificados que hablan tu idioma 
              y entienden tus necesidades específicas.
            </p>
          </div>

          {/* Misión, Visión, Valores - Grid como profile cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Misión', desc: 'Simplificar el proceso de establecerse en España conectando personas con profesionales adecuados.' },
              { title: 'Visión', desc: 'Ser la plataforma de referencia para extranjeros que planean su vida en España.' },
              { title: 'Valores', desc: 'Transparencia, calidad, confianza y servicio excepcional en cada interacción.' },
            ].map((item, i) => (
              <div key={i} className="profile-card text-center">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Trabajamos - Beneficios como home */}
      <section className="section">
        <div className="container-narrow text-center mb-16">
          <h2 className="mb-6">Cómo Trabajamos</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Para ti y para los profesionales
          </p>
        </div>
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="profile-card">
              <h3 className="text-2xl font-bold mb-6">Para Ti (Usuario)</h3>
              <ul className="space-y-4">
                {[
                  '100% Gratis: Nunca pagas por nuestro servicio de conexión',
                  'Matching Personalizado: Te presentamos 2-3 profesionales que mejor se ajustan a tu caso',
                  'Tú Decides: Compara propuestas y elige libremente',
                  'Sin Compromiso: No estás obligado a contratar con nadie',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile-card">
              <h3 className="text-2xl font-bold mb-6">Para Profesionales (Partners)</h3>
              <ul className="space-y-4">
                {[
                  'Leads Cualificados: Solo contactos realmente interesados',
                  'Pago por Éxito: Solo pagas cuando hay conversión real',
                  'Verificación: Tu perfil verificado genera más confianza',
                  'Soporte: Te ayudamos a cerrar más clientes',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Trust grid como home */}
      <section className="section-blue-light">
        <div className="container-narrow text-center mb-16">
          <h2 className="mb-6">Health4Spain en Números</h2>
        </div>
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '150+', label: 'Profesionales Verificados' },
              { value: '19', label: 'Ciudades Cubiertas' },
              { value: '5+', label: 'Idiomas Disponibles' },
              { value: '0€', label: 'Coste para Ti' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">{item.value}</div>
                <div className="text-sm uppercase tracking-widest text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué confiar - Cards */}
      <section className="section">
        <div className="container-narrow text-center mb-16">
          <h2 className="mb-6">¿Por Qué Confiar en Nosotros?</h2>
        </div>
        <div className="container-narrow space-y-8">
          {[
            { title: 'Profesionales 100% Verificados', desc: 'Todos nuestros partners pasan un riguroso proceso de verificación: licencias profesionales activas, experiencia demostrable con clientes internacionales, referencias comprobadas y capacidad lingüística verificada.' },
            { title: 'Matching Inteligente', desc: 'No te enviamos a cualquiera. Analizamos tu perfil, ubicación, necesidades y presupuesto para conectarte solo con profesionales que realmente pueden ayudarte. Calidad sobre cantidad.' },
            { title: 'Modelo Transparente', desc: 'Para ti es gratis. Los profesionales pagan una comisión solo cuando hay conversión real (contratas el servicio). Esto alinea nuestros intereses: solo ganamos si tú estás satisfecho.' },
            { title: 'Soporte Continuo', desc: 'No desaparecemos después de la conexión. Seguimos disponibles para resolver dudas, mediar si hay problemas y asegurarnos de que estás recibiendo un servicio excepcional.' },
          ].map((item, i) => (
            <div key={i} className="bg-white border-t-3 border-accent p-8">
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-blue-dark">
        <div className="container-narrow text-center">
          <h2 className="mb-8" style={{ color: 'white' }}>¿Listo Para Tu Nueva Vida en España?</h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Únete a cientos de personas que ya han simplificado su proceso con Health4Spain.
          </p>
          <Link href="/es/contacto" className="btn-minimal-white">
            Empezar Ahora
          </Link>
        </div>
      </section>
    </>
  );
}
