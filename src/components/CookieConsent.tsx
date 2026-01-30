'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookieConsentProps {
  lang?: string;
}

const CONTENT = {
  es: {
    title: 'Usamos cookies 🍪',
    description: 'Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra',
    policyLink: 'política de cookies',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Solo esenciales',
    customize: 'Personalizar',
  },
  en: {
    title: 'We use cookies 🍪',
    description: 'We use cookies to improve your experience. By continuing, you accept our',
    policyLink: 'cookie policy',
    acceptAll: 'Accept all',
    rejectAll: 'Essential only',
    customize: 'Customize',
  },
};

export default function CookieConsent({ lang = 'es' }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const content = CONTENT[lang as keyof typeof CONTENT] || CONTENT.es;

  useEffect(() => {
    // Verificar si ya aceptó cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Mostrar después de 1 segundo
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
    // Aquí activarías Google Analytics, etc.
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:flex md:items-center md:justify-between gap-6">
        <div className="mb-4 md:mb-0">
          <h4 className="font-bold text-gray-900 mb-1">{content.title}</h4>
          <p className="text-sm text-gray-600">
            {content.description}{' '}
            <Link href={`/${lang}/cookies`} className="text-blue-600 hover:underline">
              {content.policyLink}
            </Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRejectAll}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {content.rejectAll}
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {content.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
