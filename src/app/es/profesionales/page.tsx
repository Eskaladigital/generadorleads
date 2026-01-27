import Link from 'next/link';

export default function ProfesionalesPage() {
  return (
    <>
      {/* HERO */}
      <section className="py-24 px-[5%] bg-gray-50 border-b border-gray-200">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
            Hazte Partner
          </div>
          <h1 className="font-lora text-[4rem] font-bold mb-6 text-[#1a1a1a]">
            Expande Tu Negocio Con Clientes Internacionales
          </h1>
          <p className="text-[1.2rem] text-gray-600 leading-relaxed">
            Únete a nuestra red de profesionales verificados y recibe clientes cualificados que necesitan tus servicios.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[1.3rem] text-gray-700 leading-relaxed border-l-4 border-accent pl-8">
            Si eres abogado de extranjería, corredor de seguros, agente inmobiliario o gestor administrativo, Health4Spain puede ser tu mejor fuente de clientes cualificados. Solo pagas por resultados reales, sin cuotas mensuales ni compromisos de permanencia.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Beneficios Para Ti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border-l-4 border-accent">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-lora text-xl font-semibold mb-3">Leads Cualificados</h3>
              <p className="text-gray-600 leading-relaxed">
                Solo contactos que realmente necesitan tus servicios y están listos para contratar. Pre-cualificados por perfil, ubicación y necesidad específica.
              </p>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-lora text-xl font-semibold mb-3">Pago por Conversión</h3>
              <p className="text-gray-600 leading-relaxed">
                Sin cuotas mensuales. Solo pagas cuando hay conversión real: el cliente contrata tu servicio. Riesgo cero, resultados garantizados.
              </p>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-lora text-xl font-semibold mb-3">Perfil Verificado</h3>
              <p className="text-gray-600 leading-relaxed">
                Destacamos tu experiencia con clientes internacionales, idiomas y especialidades. Tu badge verificado genera confianza inmediata.
              </p>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-lora text-xl font-semibold mb-3">Crecimiento Predecible</h3>
              <p className="text-gray-600 leading-relaxed">
                Flujo constante de clientes potenciales. Tú decides cuántos leads quieres recibir por mes según tu capacidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO CAN JOIN */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Profesionales Que Buscamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '⚖️',
                title: 'Abogados',
                description: 'Especialistas en extranjería, visados, NIE, arraigo, nacionalidad'
              },
              {
                icon: '🏥',
                title: 'Seguros',
                description: 'Corredores de seguros de salud privados válidos para visados'
              },
              {
                icon: '🏠',
                title: 'Inmobiliarias',
                description: 'Agencias con experiencia en clientes internacionales'
              },
              {
                icon: '📋',
                title: 'Gestorías',
                description: 'Gestión administrativa, fiscal y laboral para extranjeros'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 text-center border border-gray-200">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Requisitos Para Ser Partner
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 border-l-4 border-accent flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-2">Licencias y Colegiación Activa</h3>
                <p className="text-gray-600">Debes estar dado de alta legalmente en España con todas las licencias profesionales requeridas.</p>
              </div>
            </div>
            <div className="bg-white p-6 border-l-4 border-accent flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-2">Experiencia Con Expatriados</h3>
                <p className="text-gray-600">Mínimo 2 años trabajando con clientes internacionales. Referencias verificables.</p>
              </div>
            </div>
            <div className="bg-white p-6 border-l-4 border-accent flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-2">Idiomas</h3>
                <p className="text-gray-600">Además de español, dominio de al menos inglés (B2+). Alemán o francés es un plus.</p>
              </div>
            </div>
            <div className="bg-white p-6 border-l-4 border-accent flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-2">Capacidad de Respuesta</h3>
                <p className="text-gray-600">Compromiso de responder leads en menos de 24 horas. Seguimiento profesional.</p>
              </div>
            </div>
            <div className="bg-white p-6 border-l-4 border-accent flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-2">Seguro de Responsabilidad Civil</h3>
                <p className="text-gray-600">Póliza de RC profesional activa y vigente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Cómo Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Solicitud</h3>
              <p className="text-sm text-gray-600">Completa el formulario con tu info profesional y especialidades</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Verificación</h3>
              <p className="text-sm text-gray-600">Revisamos licencias, referencias y experiencia (2-5 días)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Activación</h3>
              <p className="text-sm text-gray-600">Configuras tu perfil y empiezas a recibir leads cualificados</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Conversión</h3>
              <p className="text-sm text-gray-600">Solo pagas cuando el cliente contrata tu servicio</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Modelo de Comisiones
          </h2>
          <div className="bg-white p-10 border-l-4 border-accent">
            <div className="mb-8">
              <h3 className="font-lora text-2xl font-semibold mb-4">Pago Por Conversión</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Solo pagas cuando hay conversión real. Las comisiones varían según el servicio:
              </p>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between p-3 bg-gray-50">
                  <span><strong>Seguros de Salud:</strong></span>
                  <span className="font-semibold">15-20% del primer año</span>
                </div>
                <div className="flex justify-between p-3">
                  <span><strong>Servicios Legales:</strong></span>
                  <span className="font-semibold">20-25% del servicio</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50">
                  <span><strong>Servicios Inmobiliarios:</strong></span>
                  <span className="font-semibold">15-20% de comisión</span>
                </div>
                <div className="flex justify-between p-3">
                  <span><strong>Servicios Administrativos:</strong></span>
                  <span className="font-semibold">25-30% del servicio</span>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t">
              <p className="text-sm text-gray-600">
                <strong>Sin cuotas mensuales.</strong> Sin permanencia mínima. Sin costes ocultos. 
                Pagas solo cuando ganamos ambos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1000px] mx-auto text-center bg-[#1a1a1a] text-white p-16">
          <h2 className="font-lora text-[2.5rem] font-bold mb-6">
            ¿Listo Para Crecer Tu Negocio?
          </h2>
          <p className="text-[1.2rem] mb-8 opacity-90">
            Únete a más de 150 profesionales que ya confían en Health4Spain para expandir su cartera de clientes internacionales.
          </p>
          <Link
            href="/es/contacto"
            className="inline-block bg-white text-[#1a1a1a] py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent hover:text-white"
          >
            Solicitar Información Partner
          </Link>
        </div>
      </section>
    </>
  );
}
