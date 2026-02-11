'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/es', label: 'Inicio' },
  { href: '/es/destinos', label: 'Destinos' },
  { href: '/es/servicios', label: 'Servicios' },
  { href: '/es/blog', label: 'Blog' },
  { href: '/es/contacto', label: 'Contacto' },
];

const LANGUAGES = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/health4spain' },
  { name: 'Facebook', href: 'https://facebook.com/health4spain' },
  { name: 'Instagram', href: 'https://instagram.com/health4spain' },
  { name: 'Twitter', href: 'https://twitter.com/health4spain' },
];

// Inicio (/es) solo activo con coincidencia exacta; el resto con startsWith
function isLinkActive(pathname: string, href: string): boolean {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  if (href === '/es' || href === '/en' || href === '/de' || href === '/fr') {
    return cleanPath === href;
  }
  return cleanPath === href || cleanPath.startsWith(href + '/');
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const pathnameWhenOpened = useRef<string | null>(null);

  // Congelar pathname al abrir menú para evitar el "rebote" durante hidratación
  useEffect(() => {
    if (isOpen) {
      pathnameWhenOpened.current = pathname;
    } else {
      pathnameWhenOpened.current = null;
    }
  }, [isOpen, pathname]);

  const activePathname = isOpen && pathnameWhenOpened.current !== null ? pathnameWhenOpened.current : pathname;

  const currentLang = pathname.startsWith('/en') ? 'en' :
    pathname.startsWith('/de') ? 'de' :
    pathname.startsWith('/fr') ? 'fr' : 'es';

  const switchLanguage = (langCode: string) => {
    const newPath = pathname.replace(/^\/(es|en|de|fr)/, `/${langCode}`);
    return newPath || `/${langCode}`;
  };

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="bg-white border-b border-gray-200 relative z-50">
      <div className="container-base">
        <nav className="nav-minimal">
          {/* Logo Minimal */}
          <Link href="/es" className="logo-minimal">
            <Image
              src="/images/h4s siglas color_recortado.png"
              alt="H4S - Health4Spain"
              height={50}
              width={120}
              className="h-[50px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex nav-links-minimal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-minimal"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:opacity-50 transition-opacity"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Menu - Full-width overlay superpuesto */}
      <div
        className={`md:hidden fixed inset-0 z-[100] transition-all duration-300 ease-out ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop - clic fuera cierra */}
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Panel del menú - full-width desde arriba */}
        <div
          className={`absolute top-0 left-0 right-0 bg-white shadow-xl transition-transform duration-300 ease-out ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav className="container-base py-6 pb-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                    isLinkActive(activePathname, link.href)
                      ? 'bg-gray-100 text-[#293f92]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#3bbdda]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA destacado */}
            <Link
              href="/es/contacto"
              onClick={() => setIsOpen(false)}
              className="block mt-6 bg-[#293f92] text-white text-center px-6 py-4 rounded-lg font-semibold text-lg hover:bg-[#3bbdda] transition-colors shadow-md"
            >
              Solicitar ayuda gratis
            </Link>

            {/* Selector de idioma */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Idioma</p>
              <div className="flex gap-2">
                {LANGUAGES.map((lang) => (
                  <Link
                    key={lang.code}
                    href={switchLanguage(lang.code)}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentLang === lang.code
                        ? 'bg-[#293f92] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Síguenos</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-[#3bbdda] font-medium text-sm transition-colors"
                    aria-label={social.name}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
