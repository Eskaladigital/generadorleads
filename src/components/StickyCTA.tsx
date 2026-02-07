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
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40 py-4 px-4 md:hidden">
      <Link 
        href="/es/contacto" 
        className="block text-center text-white font-bold text-sm uppercase tracking-widest border-b-3 border-red-600 pb-2 hover:opacity-50 transition-opacity"
      >
        Solicitar Información
      </Link>
    </div>
  );
}
