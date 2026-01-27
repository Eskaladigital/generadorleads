export default function PrivacidadPage() {
  return (
    <div className="py-16 px-[5%]">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-lora text-[3.5rem] font-bold mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-8">
            <strong>Última actualización:</strong> Enero 2026
          </p>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">1. Responsable del Tratamiento</h2>
            <p className="text-gray-700 leading-relaxed">
              Health4Spain es el responsable del tratamiento de tus datos personales. 
              Nos comprometemos a proteger tu privacidad y garantizar el uso seguro de tu información personal.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">2. Datos Que Recopilamos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cuando utilizas nuestro formulario de contacto, recopilamos:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>País de origen</li>
              <li>Información sobre tu situación y necesidades</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">3. Uso de Tus Datos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos tu información personal para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Conectarte con profesionales verificados que pueden ayudarte</li>
              <li>Responder a tus consultas</li>
              <li>Enviarte información relevante sobre nuestros servicios</li>
              <li>Mejorar nuestros servicios</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">4. Compartir Información</h2>
            <p className="text-gray-700 leading-relaxed">
              Compartimos tu información únicamente con los profesionales que seleccionamos específicamente 
              para tu caso (2-3 profesionales máximo). Nunca vendemos tus datos a terceros para fines de marketing.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">5. Tus Derechos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos incorrectos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Solicitar la portabilidad de tus datos</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">6. Seguridad</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos 
              contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">7. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Para ejercer tus derechos o hacer consultas sobre nuestra política de privacidad, 
              contáctanos en: <a href="mailto:privacidad@health4spain.com" className="text-accent hover:underline">privacidad@health4spain.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
