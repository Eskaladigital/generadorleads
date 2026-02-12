'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LOGO_PATHS } from '@/lib/constants';

const NAV_LINKS = [
  { href: '/es', label: 'Inicio', exact: true },
  { href: '/es/destinos', label: 'Destinos' },
  { href: '/es/servicios', label: 'Servicios' },
  { href: '/es/sobre-nosotros', label: 'Nosotros' },
  { href: '/es/blog', label: 'Blog' },
];

const LANGUAGES = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/health4spain' },
  { name: 'Facebook', href: 'https://facebook.com/health4spain' },
  { name: 'Instagram', href: 'https://instagram.com/health4spain' },
  { name: 'Twitter', href: 'https://twitter.com/health4spain' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detectar idioma actual
  const currentLang = pathname.split('/')[1] || 'es';

  // Función para cambiar idioma
  const switchLanguage = (langCode: string) => {
    const pathParts = pathname.split('/');
    pathParts[1] = langCode;
    return pathParts.join('/') || `/${langCode}`;
  };

  // Función para verificar si un link está activo
  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Navbar fijo */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/es" className="flex items-center">
              <Image
                src={LOGO_PATHS.siglas}
                alt="H4S - Health4Spain"
                height={50}
                width={120}
                className="h-[50px] w-auto"
                priority
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#3bbdda] ${
                    isActive(link.href, link.exact)
                      ? 'text-[#293f92]'
                      : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* CTA Desktop */}
              <Link
                href="/es/contacto"
                className="bg-[#293f92] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#3bbdda] transition-all shadow-md hover:shadow-lg"
              >
                Solicitar contacto
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#3bbdda] transition-colors"
              aria-label="Menú"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Espaciado para el navbar fijo */}
      <div className="h-20" />

      {/* Off-Canvas Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[999] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 bottom-0 right-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
            {/* Header del menú */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Image
                src={LOGO_PATHS.siglas}
                alt="H4S"
                height={40}
                width={96}
                className="h-[40px] w-auto"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links principales */}
            <nav className="p-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive(link.href, link.exact)
                      ? 'bg-gray-100 text-[#293f92]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#3bbdda]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Mobile */}
            <div className="px-6 pb-6">
              <Link
                href="/es/contacto"
                className="block w-full bg-[#293f92] text-white text-center px-6 py-4 rounded-lg font-semibold text-base hover:bg-[#3bbdda] transition-colors shadow-md"
              >
                Solicitar contacto
              </Link>
            </div>

            {/* Selector de idioma */}
            <div className="px-6 pb-6 border-t border-gray-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Idioma</p>
              <div className="grid grid-cols-4 gap-2">
                {LANGUAGES.map((lang) => (
                  <Link
                    key={lang.code}
                    href={switchLanguage(lang.code)}
                    className={`flex flex-col items-center gap-1 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      currentLang === lang.code
                        ? 'bg-[#293f92] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-xs">{lang.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div className="px-6 pb-8 border-t border-gray-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Síguenos</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-[#3bbdda] hover:text-white transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
