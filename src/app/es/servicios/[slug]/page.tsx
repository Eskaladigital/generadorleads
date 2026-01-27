import { notFound } from 'next/navigation';
import Link from 'next/link';

const servicesData: Record<string, any> = {
  seguros: {
    category: "Salud y Bienestar",
    title: "Seguros de Salud",
    icon: "🏥",
    description: "Encuentra el seguro médico privado perfecto para tu situación en España",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200",
    content: {
      intro: "El seguro de salud es uno de los requisitos más importantes para vivir en España, especialmente si necesitas tramitar una visa no lucrativa o de residencia. Te ayudamos a comparar y elegir la mejor opción según tu perfil.",
      sections: [
        {
          title: "Tipos de Seguros Disponibles",
          items: [
            {
              name: "Seguro Básico",
              description: "Cobertura esencial para cumplir requisitos de visado. Desde 50€/mes.",
              features: ["Consultas médicas generales", "Urgencias 24/7", "Hospitalización básica"]
            },
            {
              name: "Seguro Completo",
              description: "Cobertura amplia sin copagos. Desde 120€/mes.",
              features: ["Sin copagos", "Especialistas sin espera", "Pruebas diagnósticas", "Hospitalización completa"]
            },
            {
              name: "Seguro Premium",
              description: "Cobertura total con dentista y óptica. Desde 200€/mes.",
              features: ["Todo lo anterior", "Dental incluido", "Óptica incluida", "Segunda opinión médica"]
            }
          ]
        },
        {
          title: "Requisitos Para Visa No Lucrativa",
          items: [
            {
              name: "Cobertura Mínima",
              description: "El seguro debe cubrir: asistencia sanitaria completa en España, gastos de hospitalización, repatriación sanitaria. Sin copagos superiores a 50€."
            },
            {
              name: "Aseguradoras Aceptadas",
              description: "Debe ser una compañía autorizada para operar en España. Las principales: Sanitas, Adeslas, Asisa, DKV, Mapfre."
            }
          ]
        },
        {
          title: "Cómo Te Ayudamos",
          items: [
            {
              name: "Comparación Personalizada",
              description: "Analizamos tu perfil y te presentamos las 3 mejores opciones para tu caso específico."
            },
            {
              name: "Asesoramiento en Tu Idioma",
              description: "Todos nuestros partners hablan inglés, alemán o francés además de español."
            },
            {
              name: "Tramitación Completa",
              description: "Te ayudamos con toda la documentación necesaria para tu visado."
            }
          ]
        }
      ],
      faqs: [
        {
          question: "¿Puedo usar mi seguro europeo?",
          answer: "Para estadías temporales sí, pero para residencia permanente necesitas un seguro privado español."
        },
        {
          question: "¿Qué pasa si tengo condiciones preexistentes?",
          answer: "La mayoría de aseguradoras las aceptan tras un periodo de carencia de 6-12 meses. Te ayudamos a encontrar la mejor opción para tu caso."
        },
        {
          question: "¿Puedo cambiar de seguro después?",
          answer: "Sí, puedes cambiar anualmente. Te recomendamos mantener el seguro durante el primer año para evitar problemas con renovaciones de visado."
        }
      ]
    }
  },
  abogados: {
    category: "Servicios Legales",
    title: "Abogados de Extranjería",
    icon: "⚖️",
    description: "Especialistas en inmigración y residencia en España",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200",
    content: {
      intro: "Navegar el sistema legal español puede ser complejo. Nuestros abogados especializados en extranjería te guían en cada paso del proceso migratorio.",
      sections: [
        {
          title: "Servicios Legales Disponibles",
          items: [
            {
              name: "Visado No Lucrativo",
              description: "Para residentes sin intención de trabajar en España. Desde 800€.",
              features: ["Asesoría completa", "Preparación de documentación", "Presentación oficial", "Seguimiento hasta aprobación"]
            },
            {
              name: "Arraigo Social / Laboral",
              description: "Para personas que ya residen en España. Desde 600€.",
              features: ["Evaluación de viabilidad", "Recopilación de pruebas", "Presentación de solicitud", "Recurso si es necesario"]
            },
            {
              name: "Reagrupación Familiar",
              description: "Para traer a familiares directos. Desde 1.200€.",
              features: ["Estudio de requisitos", "Documentación completa", "Gestión integral", "Apoyo en adaptación"]
            },
            {
              name: "Nacionalidad Española",
              description: "Proceso completo de ciudadanía. Desde 1.500€.",
              features: ["Verificación de requisitos", "Preparación de expediente", "Exámenes DELE/CCSE si necesario", "Seguimiento completo"]
            }
          ]
        },
        {
          title: "Proceso de Trabajo",
          items: [
            {
              name: "Consulta Inicial Gratuita",
              description: "30 minutos para evaluar tu caso y explicar opciones disponibles."
            },
            {
              name: "Propuesta Detallada",
              description: "Presupuesto cerrado, plazos estimados y plan de acción específico."
            },
            {
              name: "Gestión Completa",
              description: "Nos encargamos de todo: documentos, traducciones, apostillas, presentaciones oficiales."
            }
          ]
        }
      ],
      faqs: [
        {
          question: "¿Cuánto tarda un visado no lucrativo?",
          answer: "El proceso completo suele tomar 3-6 meses desde la preparación hasta la aprobación."
        },
        {
          question: "¿Puedo trabajar con visa no lucrativa?",
          answer: "No directamente, pero tras un año puedes solicitar modificación a permiso de trabajo."
        },
        {
          question: "¿Qué es el arraigo social?",
          answer: "Es un permiso de residencia para personas que han vivido en España al menos 3 años de forma continuada y pueden demostrar integración social."
        }
      ]
    }
  },
  inmobiliarias: {
    category: "Bienes Raíces",
    title: "Agentes Inmobiliarios",
    icon: "🏠",
    description: "Encuentra tu hogar ideal en España",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
    content: {
      intro: "Encontrar la vivienda perfecta es crucial para tu nueva vida en España. Trabajamos con agencias inmobiliarias especializadas en clientes internacionales.",
      sections: [
        {
          title: "Servicios Inmobiliarios",
          items: [
            {
              name: "Alquiler a Largo Plazo",
              description: "Viviendas para residencia permanente.",
              features: ["Contratos legales en tu idioma", "Verificación de propiedades", "Apoyo en negociación", "Gestión de fianzas y depósitos"]
            },
            {
              name: "Compra de Vivienda",
              description: "Asesoramiento completo en compraventa.",
              features: ["Búsqueda personalizada", "Verificación legal de propiedad", "Gestión de hipotecas", "Acompañamiento a notaría"]
            },
            {
              name: "Alquiler Temporal",
              description: "Para conocer la zona antes de decidir.",
              features: ["Estancias de 1-6 meses", "Sin compromiso a largo plazo", "Propiedades amuebladas"]
            }
          ]
        },
        {
          title: "Zonas Más Solicitadas",
          items: [
            {
              name: "Costa Blanca (Alicante)",
              description: "Torrevieja, Alicante ciudad, Benidorm, Calpe. Precios: 800-1.500€/mes alquiler, 1.500-2.500€/m² compra."
            },
            {
              name: "Costa Cálida (Murcia)",
              description: "Cartagena, Mazarrón, Águilas. Precios: 600-1.200€/mes alquiler, 1.200-2.000€/m² compra."
            },
            {
              name: "Interior (Murcia ciudad)",
              description: "Clima más suave, menos turístico. Precios: 500-900€/mes alquiler, 1.000-1.800€/m² compra."
            }
          ]
        }
      ],
      faqs: [
        {
          question: "¿Necesito NIE para alquilar?",
          answer: "Sí, el NIE es obligatorio para firmar contratos de alquiler en España."
        },
        {
          question: "¿Cuánto es el depósito habitual?",
          answer: "Normalmente 1-2 meses de fianza más 1 mes por adelantado. Total: 2-3 meses al inicio."
        },
        {
          question: "¿Puedo comprar sin ser residente?",
          answer: "Sí, no necesitas ser residente para comprar propiedad en España. Solo necesitas NIE."
        }
      ]
    }
  },
  gestorias: {
    category: "Administración",
    title: "Servicios de Gestoría",
    icon: "📋",
    description: "Gestión administrativa completa",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
    content: {
      intro: "La burocracia española puede ser abrumadora. Las gestorías se encargan de todos tus trámites administrativos, fiscales y laborales.",
      sections: [
        {
          title: "Servicios Administrativos",
          items: [
            {
              name: "Trámites de Extranjería",
              description: "Renovaciones, modificaciones, NIE. Desde 150€/trámite.",
              features: ["Renovación TIE", "Modificación de situación", "Solicitud NIE", "Certificados de residencia"]
            },
            {
              name: "Gestoría Fiscal",
              description: "Declaración de impuestos y obligaciones fiscales. Desde 200€/año.",
              features: ["IRPF (Renta)", "Modelo 720 (bienes extranjero)", "Modelo 210 (no residentes)", "IVA si es autónomo"]
            },
            {
              name: "Alta de Autónomo",
              description: "Para trabajadores por cuenta propia. Desde 300€.",
              features: ["Alta en Hacienda", "Alta en Seguridad Social", "Elección de epígrafe", "Asesoría fiscal mensual"]
            }
          ]
        },
        {
          title: "Servicios Incluidos",
          items: [
            {
              name: "Atención en Tu Idioma",
              description: "Gestorías con personal que habla inglés, alemán, francés."
            },
            {
              name: "Gestión Digital",
              description: "Certificado digital, firma electrónica, sede electrónica."
            },
            {
              name: "Representación Legal",
              description: "Podemos actuar en tu nombre ante administraciones públicas."
            }
          ]
        }
      ],
      faqs: [
        {
          question: "¿Qué es el Modelo 720?",
          answer: "Declaración informativa obligatoria para residentes fiscales en España con bienes en el extranjero superiores a 50.000€."
        },
        {
          question: "¿Cuándo soy residente fiscal en España?",
          answer: "Si pasas más de 183 días al año en España o si tu centro de intereses económicos está aquí."
        },
        {
          question: "¿Necesito gestoría si no trabajo?",
          answer: "Sí, aún debes presentar declaración de renta y posiblemente modelo 720 si tienes bienes en el extranjero."
        }
      ]
    }
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'seguros' },
    { slug: 'abogados' },
    { slug: 'inmobiliarias' },
    { slug: 'gestorias' },
  ];
}

export default async function ServicioPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* HEADER */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/es" className="hover:text-accent">Inicio</Link>
            <span>/</span>
            <Link href="/es/servicios" className="hover:text-accent">Servicios</Link>
            <span>/</span>
            <span className="text-gray-900">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-6xl mb-6">{service.icon}</div>
              <div className="uppercase tracking-[2px] text-[0.75rem] text-accent font-semibold mb-4">
                {service.category}
              </div>
              <h1 className="font-lora text-[4rem] font-bold leading-[1.1] mb-6 text-[#1a1a1a]">
                {service.title}
              </h1>
              <p className="text-[1.3rem] text-gray-600 leading-relaxed mb-8">
                {service.description}
              </p>
              <Link
                href="/es/contacto"
                className="inline-block bg-[#1a1a1a] text-white py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent"
              >
                Solicitar Información
              </Link>
            </div>
            <div 
              className="w-full h-[500px] bg-cover bg-center border-[15px] border-gray-100 shadow-xl"
              style={{
                backgroundImage: `url('${service.image}')`
              }}
            />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[1.2rem] text-gray-700 leading-relaxed border-l-4 border-accent pl-8">
            {service.content.intro}
          </p>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      {service.content.sections.map((section: any, index: number) => (
        <section key={index} className={`py-16 px-[5%] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-lora text-[2.5rem] font-bold mb-12 text-[#1a1a1a]">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="bg-white p-8 border-l-4 border-accent">
                  <h3 className="font-lora text-[1.5rem] font-semibold mb-3 text-[#1a1a1a]">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {item.features && (
                    <ul className="space-y-2">
                      {item.features.map((feature: string, fIndex: number) => (
                        <li key={fIndex} className="flex items-start gap-2 text-gray-600">
                          <span className="text-accent mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* FAQs */}
      <section className="py-16 px-[5%] bg-gray-50">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-lora text-[2.5rem] font-bold mb-12 text-[#1a1a1a]">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-8">
            {service.content.faqs.map((faq: any, index: number) => (
              <div key={index} className="bg-white p-8 border-l-4 border-accent">
                <h3 className="font-semibold text-[1.2rem] mb-3 text-[#1a1a1a]">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1000px] mx-auto text-center bg-[#1a1a1a] text-white p-16">
          <h2 className="font-lora text-[2.5rem] font-bold mb-6">
            ¿Necesitas Este Servicio?
          </h2>
          <p className="text-[1.2rem] mb-8 opacity-90">
            Te conectamos con 2-3 profesionales verificados en tu zona que hablan tu idioma.
            Compara propuestas y elige el que mejor se ajuste a tus necesidades.
          </p>
          <Link
            href="/es/contacto"
            className="inline-block bg-white text-[#1a1a1a] py-5 px-10 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent hover:text-white"
          >
            Solicitar Contacto Ahora
          </Link>
        </div>
      </section>
    </>
  );
}
