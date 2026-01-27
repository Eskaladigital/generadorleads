'use client';

import { useState } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    pais: '',
    perfil: '',
    ciudad: '',
    servicio: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí conectarías con tu API/backend
    try {
      // Simulación de envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        pais: '',
        perfil: '',
        ciudad: '',
        servicio: '',
        mensaje: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* HEADER */}
      <section className="py-24 px-[5%] bg-gray-50 border-b border-gray-200">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
            Contacta Con Nosotros
          </div>
          <h1 className="font-lora text-[4rem] font-bold mb-6 text-[#1a1a1a]">
            Comienza Tu Historia
          </h1>
          <p className="text-[1.2rem] text-gray-600 leading-relaxed">
            Cuéntanos tu situación y te conectamos con los profesionales más adecuados en 24-48 horas. Sin comisiones, sin compromiso.
          </p>
        </div>
      </section>

      <section className="py-16 px-[5%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* SIDEBAR INFO */}
          <div className="lg:col-span-2">
            <h2 className="font-lora text-[2rem] font-bold mb-8 text-[#1a1a1a]">
              ¿Por Qué Health4Spain?
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">100% Gratis Para Ti</h3>
                  <p className="text-gray-600">No cobramos comisiones. Los profesionales nos pagan por las conexiones, tú recibes el servicio sin coste.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Profesionales Verificados</h3>
                  <p className="text-gray-600">Todos nuestros partners están verificados, con licencias activas y experiencia con clientes internacionales.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🌐</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">En Tu Idioma</h3>
                  <p className="text-gray-600">Te conectamos con profesionales que hablan español, inglés, alemán o francés.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Respuesta Rápida</h3>
                  <p className="text-gray-600">En 24-48 horas recibirás contacto de 2-3 profesionales que mejor se ajustan a tu caso.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 border-l-4 border-accent">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Garantía de privacidad:</strong> Tu información solo se comparte con los profesionales que seleccionamos para ti. Nunca vendemos datos a terceros.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-10">
              <h3 className="font-lora text-[1.8rem] font-semibold mb-8">
                Formulario de Contacto
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-600 text-green-900">
                  <strong>✓ ¡Recibido!</strong><br />
                  Te contactaremos en las próximas 24-48 horas. Revisa tu email (incluyendo spam).
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-600 text-red-900">
                  <strong>✗ Error</strong><br />
                  Hubo un problema al enviar. Por favor intenta de nuevo o escríbenos a info@health4spain.com
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent focus:outline-none"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-accent focus:outline-none"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-accent focus:outline-none"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    País de Origen *
                  </label>
                  <input
                    type="text"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent focus:outline-none"
                    placeholder="Ej: Reino Unido, Alemania..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tu Perfil *
                  </label>
                  <select
                    name="perfil"
                    value={formData.perfil}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent focus:outline-none"
                  >
                    <option value="">Selecciona tu perfil</option>
                    <option value="movil">Móviles (22-34 años) - Trabajo/Estudios</option>
                    <option value="familia">Familias (35-49 años) - Reubicación</option>
                    <option value="profesional">Profesionales (50-59 años) - Semi-retiro</option>
                    <option value="jubilado">Jubilados (60-70 años) - Retiro completo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Ciudad de Interés
                  </label>
                  <select
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent focus:outline-none"
                  >
                    <option value="">No estoy seguro aún</option>
                    <option value="torrevieja">Torrevieja</option>
                    <option value="alicante">Alicante</option>
                    <option value="murcia">Murcia</option>
                    <option value="benidorm">Benidorm</option>
                    <option value="cartagena">Cartagena</option>
                    <option value="elche">Elche</option>
                    <option value="otra">Otra ciudad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Servicio Que Necesitas *
                  </label>
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent focus:outline-none"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="seguro">Seguro de Salud</option>
                    <option value="abogado">Abogado de Extranjería</option>
                    <option value="inmobiliaria">Agente Inmobiliario</option>
                    <option value="gestoria">Gestoría</option>
                    <option value="multiple">Varios servicios</option>
                    <option value="asesoria">Asesoría general</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Cuéntanos Tu Situación *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-accent focus:outline-none resize-none"
                    placeholder="Describe brevemente tu situación, plazos, dudas o necesidades específicas..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a1a1a] text-white py-5 px-10 font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario aceptas nuestra política de privacidad. 
                  Responderemos en 24-48 horas laborables.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ALTERNATIVE CONTACT */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-lora text-[2rem] font-bold mb-8 text-[#1a1a1a]">
            Otras Formas de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-l-4 border-accent">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:info@health4spain.com" className="text-accent hover:underline">
                info@health4spain.com
              </a>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <a href="https://wa.me/34600000000" className="text-accent hover:underline">
                +34 600 000 000
              </a>
            </div>
            <div className="bg-white p-8 border-l-4 border-accent">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <a href="tel:+34600000000" className="text-accent hover:underline">
                +34 600 000 000
              </a>
              <p className="text-sm text-gray-600 mt-2">Lun-Vie 9:00-18:00</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
