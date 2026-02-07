'use client';

import Link from 'next/link';

export default function StickyCTA() {
  return (
    <div className="sticky-cta-mobile fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 py-3 px-4 md:hidden">
      <Link 
        href="/es/contacto" 
        className="btn-primary w-full text-center"
      >
        Solicitar información
      </Link>
    </div>
  );
}
