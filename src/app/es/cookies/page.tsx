export default function CookiesPage() {
  return (
    <div className="py-16 px-[5%]">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-lora text-[3.5rem] font-bold mb-8">Política de Cookies</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-8">
            <strong>Última actualización:</strong> Enero 2026
          </p>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">¿Qué son las cookies?</h2>
            <p className="text-gray-700 leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas 
              nuestro sitio web. Nos ayudan a mejorar tu experiencia y entender cómo utilizas nuestro sitio.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">Cookies que utilizamos</h2>
            
            <div className="mb-8">
              <h3 className="font-semibold text-xl mb-3">Cookies Esenciales</h3>
              <p className="text-gray-700 leading-relaxed">
                Estas cookies son necesarias para el funcionamiento básico del sitio web. 
                No pueden ser desactivadas.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Cookies de sesión</li>
                <li>Cookies de preferencias de idioma</li>
                <li>Cookies de seguridad</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-xl mb-3">Cookies de Análisis</h3>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos estas cookies para entender cómo los visitantes interactúan con nuestro sitio.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Google Analytics (si está habilitado)</li>
                <li>Cookies de seguimiento de rendimiento</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-xl mb-3">Cookies de Marketing</h3>
              <p className="text-gray-700 leading-relaxed">
                Estas cookies nos ayudan a mostrar contenido relevante y medir la efectividad 
                de nuestras campañas.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">Gestión de cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies 
              que ya están en tu dispositivo y configurar la mayoría de los navegadores para que no se coloquen.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Ten en cuenta que si eliminas las cookies o no aceptas las cookies de terceros, 
              es posible que no puedas utilizar todas las funciones de nuestro sitio web.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">Cookies de terceros</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos servicios de terceros que pueden establecer cookies en tu dispositivo:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
              <li>Google Analytics para análisis web</li>
              <li>Plataformas de redes sociales para compartir contenido</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">Actualizaciones de esta política</h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos actualizar esta política de cookies periódicamente. Te recomendamos que la revises 
              regularmente para estar informado sobre cómo utilizamos las cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-lora text-[2rem] font-semibold mb-4">Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Si tienes preguntas sobre nuestra política de cookies, contáctanos en: 
              <a href="mailto:info@health4spain.com" className="text-accent hover:underline ml-1">info@health4spain.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
