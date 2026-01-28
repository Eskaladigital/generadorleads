import Link from 'next/link';

export default function PresupuestoPage() {
  return (
    <>
      {/* HERO */}
      <section className="py-24 px-[5%] bg-gray-50 border-b border-gray-200">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
            Presupuesto Web Health4Spain
          </div>
          <h1 className="font-lora text-[4rem] font-bold mb-6 text-[#1a1a1a]">
            Tu Plataforma Digital Completa
          </h1>
          <p className="text-[1.2rem] text-gray-600 leading-relaxed">
            Un sitio web profesional diseñado para conectar clientes internacionales con tus servicios. Todo lo que necesitas para tener presencia online efectiva.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white border-l-4 border-accent p-8 mb-12">
            <h2 className="font-lora text-[2rem] font-bold mb-4 text-[#1a1a1a]">
              ¿Qué Incluye Este Presupuesto?
            </h2>
            <p className="text-[1.1rem] text-gray-600 leading-relaxed mb-4">
              Tu nueva web será una plataforma completa y profesional, programada a medida para captar clientes que buscan servicios en España. No usamos plantillas genéricas—cada elemento está optimizado para convertir visitantes en contactos cualificados.
            </p>
            <p className="text-[1.1rem] text-gray-600 leading-relaxed">
              El objetivo es simple: que tu negocio sea encontrado por las personas adecuadas, en el momento adecuado, sin que tengas que preocuparte de la tecnología.
            </p>
          </div>
        </div>
      </section>

      {/* PRESUPUESTO DETALLADO */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Desglose del Presupuesto
          </h2>

          <div className="space-y-6">
            {/* Diseño de la Interfaz */}
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    Diseño de la Interfaz
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Creamos el aspecto visual de tu web desde cero. Trabajaremos contigo haciendo bocetos y diseños hasta que estés 100% satisfecho con cómo se ve todo. Es como contratar a un diseñador gráfico, pero especializado en webs.
                  </p>
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 text-sm font-semibold">
                    ✓ SIN CARGO (Regalo incluido)
                  </div>
                </div>
                <div className="text-right ml-6">
                  <div className="text-gray-400 line-through text-[1.2rem]">360,00 €</div>
                  <div className="text-green-600 font-bold text-[1.5rem]">0,00 €</div>
                </div>
              </div>
            </div>

            {/* Realización de la Interfaz */}
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    Programación de la Web
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aquí convertimos el diseño en una web real que funciona. <strong>Programación a medida</strong> (no usamos plantillas de WordPress), totalmente adaptada para que se vea perfecta en móviles, tablets y ordenadores. Incluye la base de datos donde se guarda toda tu información y el menú de navegación.
                  </p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-[#1a1a1a] font-bold text-[1.5rem]">320,00 €</div>
                </div>
              </div>
            </div>

            {/* Página de Inicio */}
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    Página de Inicio Premium
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tu escaparate principal, diseñada estratégicamente para impactar y convencer. Incluye textos optimizados para aparecer en Google y un carrusel de imágenes profesional con mensajes enfocados a captar clientes. Es la primera impresión—tiene que ser perfecta.
                  </p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-[#1a1a1a] font-bold text-[1.5rem]">180,00 €</div>
                </div>
              </div>
            </div>

            {/* Secciones Estándar */}
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    Páginas Dinámicas Editables (x2)
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dos páginas que tú mismo podrás editar cuando quieras desde un panel privado (sin necesidad de llamarnos). Perfectas para tus páginas de Destinos y Servicios. Piensa en ello como tener un Word online donde cambias textos y fotos sin tocar código.
                  </p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-gray-600 text-sm mb-1">45 € × 2</div>
                  <div className="text-[#1a1a1a] font-bold text-[1.5rem]">90,00 €</div>
                </div>
              </div>
            </div>

            {/* Blog */}
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    Sistema de Blog Profesional
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tu espacio para publicar artículos, noticias y contenidos. Los artículos se ordenan automáticamente por fecha, con botón "leer más" y posibilidad de adjuntar documentos descargables. Gestionable desde tu área privada. Fundamental para aparecer en Google.
                  </p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-[#1a1a1a] font-bold text-[1.5rem]">210,00 €</div>
                </div>
              </div>
            </div>

            {/* Formularios */}
            <div className="bg-white border border-gray-200 p-8 border-l-4 border-accent">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    Sistema de Captación de Clientes
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    <strong>La joya de la corona.</strong> Formularios inteligentes conectados a una base de datos y enlazados con un CRM profesional. Cada vez que alguien rellena el formulario, automáticamente se clasifica en listas organizadas según su perfil. Así sabes exactamente qué tipo de cliente es y cómo contactarlo.
                  </p>
                  <div className="bg-accent/10 p-4 text-sm text-gray-700">
                    💡 Esto te ahorra horas de trabajo manual organizando contactos en Excel. Todo automatizado.
                  </div>
                </div>
                <div className="text-right ml-6">
                  <div className="text-[#1a1a1a] font-bold text-[1.5rem]">470,00 €</div>
                </div>
              </div>
            </div>

            {/* Multiidioma */}
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    Sistema Multiidioma
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tu web disponible en 4 idiomas: español, inglés, alemán y francés. Los visitantes pueden cambiar de idioma con un clic. Incluye la traducción de todos los textos fijos de la web (menús, botones, títulos...).
                  </p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-[#1a1a1a] font-bold text-[1.5rem]">120,00 €</div>
                </div>
              </div>
            </div>

            {/* Landings */}
            <div className="bg-white border border-gray-200 p-8 border-l-4 border-accent">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    320 Páginas de Aterrizaje (Landings)
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Aquí está el secreto del posicionamiento. Creamos <strong>320 páginas específicas</strong> combinando cada localidad, servicio e idioma. Por ejemplo: "Seguros de salud en Alicante", "Health insurance in Torrevieja", "Krankenversicherung in Benidorm"...
                  </p>
                  <div className="bg-accent/10 p-4 mb-3">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>¿Para qué sirven estas páginas?</strong>
                    </p>
                    <p className="text-sm text-gray-700">
                      Cuando alguien busca en Google "abogado extranjería Murcia" o "health insurance Torrevieja", tu web aparece con una página específica para esa búsqueda exacta. <strong>Sin estas páginas, estarías invisible para la mayoría de búsquedas.</strong>
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 text-sm text-gray-700">
                    💰 <strong>Ahorro importante:</strong> Gran parte del trabajo de SEO (aparecer en Google) ya está incluido aquí. No necesitarás invertir tanto en posicionamiento inicial porque estas páginas ya te posicionan automáticamente.
                  </div>
                </div>
                <div className="text-right ml-6">
                  <div className="text-gray-600 text-sm mb-1">3 € × 320</div>
                  <div className="text-[#1a1a1a] font-bold text-[1.5rem]">960,00 €</div>
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL */}
          <div className="mt-12 bg-[#1a1a1a] text-white p-12">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-lora text-[2.5rem] font-bold mb-2">
                  INVERSIÓN TOTAL
                </h3>
                <p className="text-gray-300 text-lg">
                  Plataforma completa lista para funcionar
                </p>
              </div>
              <div className="text-right">
                <div className="text-[3.5rem] font-bold">2.350,00 €</div>
                <div className="text-gray-300 text-sm">IVA no incluido</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RENDIMIENTO GARANTIZADO */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-lora text-[3rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Rendimiento Garantizado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-gray-200 p-8 text-center">
              <div className="text-5xl font-bold text-accent mb-4">90+</div>
              <div className="text-sm uppercase tracking-wider text-gray-600 mb-3">
                Puntuación PageSpeed
              </div>
              <p className="text-gray-600 text-sm">
                Velocidad de carga optimizada. Google premia las webs rápidas con mejor posicionamiento.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 text-center">
              <div className="text-5xl font-bold text-accent mb-4">100%</div>
              <div className="text-sm uppercase tracking-wider text-gray-600 mb-3">
                Responsive Design
              </div>
              <p className="text-gray-600 text-sm">
                Perfecta visualización en móviles, tablets y ordenadores. Más del 70% de visitas son desde móvil.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 text-center">
              <div className="text-5xl font-bold text-accent mb-4">A+</div>
              <div className="text-sm uppercase tracking-wider text-gray-600 mb-3">
                SEO Optimizado
              </div>
              <p className="text-gray-600 text-sm">
                Estructura técnica preparada para Google. Las 320 landings son la base de tu posicionamiento.
              </p>
            </div>
          </div>

          <div className="bg-accent/10 border-l-4 border-accent p-8">
            <h3 className="font-semibold text-lg mb-3">🎯 Compromiso de Calidad</h3>
            <p className="text-gray-700 leading-relaxed">
              Garantizamos puntuaciones de rendimiento superiores a 90/100 en Google PageSpeed Insights. Una web rápida no solo mejora la experiencia de usuario, sino que también es un factor determinante para aparecer en las primeras posiciones de búsqueda.
            </p>
          </div>
        </div>
      </section>

      {/* QUÉ NO ESTÁ INCLUIDO */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-lora text-[2.5rem] font-bold mb-8 text-center text-[#1a1a1a]">
            Qué NO Está Incluido
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-[700px] mx-auto">
            Para que no haya sorpresas, estos son los servicios adicionales que necesitarás contratar por separado:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-semibold mb-2">🌐 Dominio Web</h3>
              <p className="text-gray-600 text-sm">
                Tu dirección web (ejemplo: health4spain.com). Coste aproximado: 10-15 €/año.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-semibold mb-2">💾 Hosting / Alojamiento</h3>
              <p className="text-gray-600 text-sm">
                Donde se "guarda" tu web en internet. Coste aproximado: 5-20 €/mes según tráfico.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-semibold mb-2">📝 Redacción de Contenidos</h3>
              <p className="text-gray-600 text-sm">
                Los textos personalizados de tu negocio los proporcionas tú (o podemos presupuestarlo aparte).
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-semibold mb-2">📸 Fotografía Profesional</h3>
              <p className="text-gray-600 text-sm">
                Usaremos bancos de imágenes de calidad o fotos que nos proporciones.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-semibold mb-2">🔧 Mantenimiento Mensual</h3>
              <p className="text-gray-600 text-sm">
                Actualizaciones, cambios y soporte técnico continuo se presupuestan por separado.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-semibold mb-2">📊 Campañas de Marketing</h3>
              <p className="text-gray-600 text-sm">
                Google Ads, Facebook Ads, email marketing... son servicios adicionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRÓXIMOS PASOS */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-lora text-[2.5rem] font-bold mb-12 text-center text-[#1a1a1a]">
            Próximos Pasos
          </h2>

          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Aceptación del Presupuesto</h3>
                <p className="text-gray-600">
                  Revisa todos los detalles y confirma que cubre tus necesidades. Cualquier duda, estamos disponibles.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Reunión de Briefing</h3>
                <p className="text-gray-600">
                  Nos reunimos para entender tu visión, objetivos, público objetivo y preferencias de diseño.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Desarrollo y Validación</h3>
                <p className="text-gray-600">
                  Trabajamos en el diseño y programación. Te mostramos avances y ajustamos según tus comentarios.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Lanzamiento</h3>
                <p className="text-gray-600">
                  Una vez todo está perfecto, publicamos tu web y te formamos para que puedas gestionarla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-[5%] bg-[#1a1a1a] text-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-lora text-[2.5rem] font-bold mb-6">
            ¿Listo Para Dar el Paso?
          </h2>
          <p className="text-[1.2rem] mb-8 opacity-90 leading-relaxed">
            Este presupuesto representa una inversión en tu presencia digital profesional. Una plataforma completa, optimizada y lista para generar clientes desde el día uno.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/es/contacto"
              className="inline-block bg-white text-[#1a1a1a] py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent hover:text-white"
            >
              Aceptar Presupuesto
            </Link>
            <a
              href="mailto:info@health4spain.com?subject=Consulta sobre Presupuesto Web"
              className="inline-block bg-transparent text-white py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] border-2 border-white transition-all hover:bg-white hover:text-[#1a1a1a]"
            >
              Hacer Consulta
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
