export default function TerminosPage() {
  return (
    <div className="py-16 px-[5%]">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-lora text-[3.5rem] font-bold mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-8">
            <strong>Última actualización:</strong> Enero 2026
          </p>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-700 leading-relaxed">
              Al utilizar Health4Spain, aceptas estos términos y condiciones. Si no estás de acuerdo 
              con alguna parte de estos términos, no debes utilizar nuestros servicios.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">2. Descripción del Servicio</h2>
            <p className="text-gray-700 leading-relaxed">
              Health4Spain es una plataforma de conexión que pone en contacto a personas que desean 
              establecerse en España con profesionales verificados (abogados, corredores de seguros, 
              agentes inmobiliarios y gestores administrativos).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">3. Para Usuarios</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Servicio Gratuito:</strong> El uso de Health4Spain es completamente gratuito para los usuarios finales.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Sin Compromiso:</strong> No estás obligado a contratar con ninguno de los profesionales 
              que te presentamos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Responsabilidad:</strong> Health4Spain actúa únicamente como intermediario. No somos 
              responsables de los servicios prestados por los profesionales.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">4. Para Profesionales</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Verificación:</strong> Todos los profesionales deben pasar nuestro proceso de verificación 
              antes de recibir leads.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Comisiones:</strong> Los profesionales pagan una comisión solo cuando hay conversión 
              (el usuario contrata el servicio).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Conducta Profesional:</strong> Los profesionales deben mantener estándares éticos 
              y proporcionar información precisa.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">5. Propiedad Intelectual</h2>
            <p className="text-gray-700 leading-relaxed">
              Todos los contenidos de Health4Spain, incluyendo textos, imágenes, logos y diseño, 
              están protegidos por derechos de propiedad intelectual.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">6. Limitación de Responsabilidad</h2>
            <p className="text-gray-700 leading-relaxed">
              Health4Spain no se hace responsable de:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>La calidad de los servicios prestados por los profesionales</li>
              <li>Disputas entre usuarios y profesionales</li>
              <li>Errores u omisiones en la información proporcionada</li>
              <li>Daños indirectos o consecuentes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">7. Modificaciones</h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Los cambios serán efectivos inmediatamente después de su publicación en el sitio web.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">8. Ley Aplicable</h2>
            <p className="text-gray-700 leading-relaxed">
              Estos términos se rigen por las leyes españolas. Cualquier disputa se resolverá 
              en los tribunales de España.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">9. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Para preguntas sobre estos términos, contáctanos en: 
              <a href="mailto:legal@health4spain.com" className="text-accent hover:underline ml-1">legal@health4spain.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
