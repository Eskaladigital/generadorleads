import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-24 px-[5%] bg-white border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div>
            <div className="font-lora text-[2.5rem] font-bold mb-6 italic">
              Health4Spain
            </div>
            <p className="text-[1.1rem] text-gray-600 leading-relaxed">
              Conectando residentes internacionales con profesionales españoles de confianza desde 2026.
            </p>
          </div>
          
          <div>
            <h4 className="uppercase text-[0.8rem] tracking-[2px] mb-6 font-semibold">
              Servicios
            </h4>
            <ul className="list-none space-y-4">
              <li>
                <Link href="/es/servicios/seguros" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Seguros de salud
                </Link>
              </li>
              <li>
                <Link href="/es/servicios/abogados" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Abogados extranjería
                </Link>
              </li>
              <li>
                <Link href="/es/servicios/inmobiliarias" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Inmobiliarias
                </Link>
              </li>
              <li>
                <Link href="/es/servicios/gestorias" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Gestorías
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase text-[0.8rem] tracking-[2px] mb-6 font-semibold">
              Destinos
            </h4>
            <ul className="list-none space-y-4">
              <li>
                <Link href="/es/destinos/torrevieja" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Torrevieja
                </Link>
              </li>
              <li>
                <Link href="/es/destinos/alicante" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Alicante
                </Link>
              </li>
              <li>
                <Link href="/es/destinos/murcia" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Murcia
                </Link>
              </li>
              <li>
                <Link href="/es/destinos" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Todas las ciudades
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase text-[0.8rem] tracking-[2px] mb-6 font-semibold">
              Empresa
            </h4>
            <ul className="list-none space-y-4">
              <li>
                <Link href="/es/sobre-nosotros" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/es/profesionales" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Para profesionales
                </Link>
              </li>
              <li>
                <Link href="/es/blog" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Historias
                </Link>
              </li>
              <li>
                <Link href="/es/contacto" className="text-gray-600 no-underline hover:text-accent transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[0.85rem] text-gray-500">
            © 2026 Health4Spain. Todos los derechos reservados.
          </div>
          <div className="flex gap-8">
            <Link href="/es/privacidad" className="text-gray-500 no-underline text-[0.85rem] uppercase tracking-wider hover:text-accent transition-colors">
              Privacidad
            </Link>
            <Link href="/es/terminos" className="text-gray-500 no-underline text-[0.85rem] uppercase tracking-wider hover:text-accent transition-colors">
              Términos
            </Link>
            <Link href="/es/cookies" className="text-gray-500 no-underline text-[0.85rem] uppercase tracking-wider hover:text-accent transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
