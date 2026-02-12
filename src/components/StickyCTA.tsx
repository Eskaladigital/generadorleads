'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StickyCTA() {
  const pathname = usePathname();
  
  // Ocultar en la página de contacto
  if (pathname === '/es/contacto') {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-3 border-gray-900 z-40 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden">
      <Link 
        href="/es/solicitar" 
        className="block w-full bg-black text-white font-bold text-base py-5 px-6 text-center hover:bg-gray-900 active:bg-gray-800 transition-colors rounded-sm"
      >
        Solicitar información gratuita
      </Link>
      <p className="text-xs text-gray-500 text-center mt-2">
        Sin compromiso · Respuesta en 24h
      </p>
    </div>
  );
}
