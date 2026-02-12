'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ContactoPageMarker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/es/contacto') {
      document.body.classList.add('contacto-page');
      return () => document.body.classList.remove('contacto-page');
    }
  }, [pathname]);

  return null;
}
