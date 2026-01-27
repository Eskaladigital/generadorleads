import Link from 'next/link';

export default function SobreNosotrosPage() {
  return (
    <>
      {/* HERO */}
      <section className="py-24 px-[5%] bg-gray-50 border-b border-gray-200">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
            Nuestra Historia
          </div>
          <h1 className="font-lora text-[4rem] font-bold mb-6 text-[#1a1a1a]">
            Facilitando Nuevos Comienzos en España
          </h1>
          <p className="text-[1.2rem] text-gray-600 leading-relaxed">
            Conectamos a personas que sueñan con vivir en España con profesionales que hacen ese sueño realidad.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[1.3rem] text-gray-700 leading-relaxed border-l-4 border-accent pl-8 mb-12">
            Cada año, miles de personas deciden establecerse en España. El proceso puede ser complejo: seguros de salud, visados, búsqueda de vivienda, trámites administrativos. Health4Spain existe para hacer este proceso más sencillo, conectándote con profesionales verificados que hablan tu idioma y entienden tus necesidades específicas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-lora text-xl font-semibold mb-2">Misión</h3>
              <p className="text-gray-600">Simplificar el proceso de establecerse en España conectando personas con profesionales adecuados.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="font-lora text-xl font-semibold mb-2">Visión</h3>
              <p className="text-gray-600">Ser la plataforma de referencia para extranjeros que planean su vida en España.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="font-lora text-xl font-semibold mb-2">Valores</h3>
              <p className="text-gray-600">Transparencia, calidad, confianza y servicio excepcional en cada interacción.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Cómo Trabajamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border-l-4 border-accent">
              <h3 className="font-lora text-xl font-semibold mb-4">Para Ti (Usuario)</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>100% Gratis:</strong> Nunca pagas por nuestro servicio de conexión</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>Matching Personalizado:</strong> Te presentamos 2-3 profesionales que mejor se ajustan a tu caso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>Tú Decides:</strong> Compara propuestas y elige libremente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>Sin Compromiso:</strong> No estás obligado a contratar con nadie</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <h3 className="font-lora text-xl font-semibold mb-4">Para Profesionales (Partners)</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>Leads Cualificados:</strong> Solo contactos realmente interesados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>Pago por Éxito:</strong> Solo pagas cuando hay conversión real</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>Verificación:</strong> Tu perfil verificado genera más confianza</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span><strong>Soporte:</strong> Te ayudamos a cerrar más clientes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Health4Spain en Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">150+</div>
              <div className="text-gray-600">Profesionales Verificados</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">20+</div>
              <div className="text-gray-600">Ciudades Cubiertas</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">4</div>
              <div className="text-gray-600">Idiomas Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">98%</div>
              <div className="text-gray-600">Satisfacción Cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            ¿Por Qué Confiar en Nosotros?
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-8 border-l-4 border-accent">
              <h3 className="font-semibold text-xl mb-3">🔒 Profesionales 100% Verificados</h3>
              <p className="text-gray-600 leading-relaxed">
                Todos nuestros partners pasan un riguroso proceso de verificación: licencias profesionales activas, experiencia demostrable con clientes internacionales, referencias comprobadas y capacidad lingüística verificada.
              </p>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <h3 className="font-semibold text-xl mb-3">🎯 Matching Inteligente</h3>
              <p className="text-gray-600 leading-relaxed">
                No te enviamos a cualquiera. Analizamos tu perfil, ubicación, necesidades y presupuesto para conectarte solo con profesionales que realmente pueden ayudarte. Calidad sobre cantidad.
              </p>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <h3 className="font-semibold text-xl mb-3">💰 Modelo Transparente</h3>
              <p className="text-gray-600 leading-relaxed">
                Para ti es gratis. Los profesionales pagan una comisión solo cuando hay conversión real (contratas el servicio). Esto alinea nuestros intereses: solo ganamos si tú estás satisfecho.
              </p>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <h3 className="font-semibold text-xl mb-3">🤝 Soporte Continuo</h3>
              <p className="text-gray-600 leading-relaxed">
                No desaparecemos después de la conexión. Seguimos disponibles para resolver dudas, mediar si hay problemas y asegurarnos de que estás recibiendo un servicio excepcional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1000px] mx-auto text-center bg-[#1a1a1a] text-white p-16">
          <h2 className="font-lora text-[2.5rem] font-bold mb-6">
            ¿Listo Para Tu Nueva Vida en España?
          </h2>
          <p className="text-[1.2rem] mb-8 opacity-90">
            Únete a cientos de personas que ya han simplificado su proceso con Health4Spain.
          </p>
          <Link
            href="/es/contacto"
            className="inline-block bg-white text-[#1a1a1a] py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent hover:text-white"
          >
            Empezar Ahora
          </Link>
        </div>
      </section>
    </>
  );
}
