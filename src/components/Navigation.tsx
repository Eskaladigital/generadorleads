'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/es', label: 'Inicio' },
  { href: '/es/destinos', label: 'Destinos' },
  { href: '/es/servicios', label: 'Servicios' },
  { href: '/es/historias', label: 'Historias' },
  { href: '/es/blog', label: 'Blog' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-soft py-2' 
          : 'bg-white/95 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container-base">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/es" className="flex items-center">
            {/* Logo siglas color en navbar */}
            <Image 
              src="/images/logo-siglas-color.png" 
              alt="Health4Spain" 
              width={60}
              height={60}
              priority
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/es/contacto" className="btn-primary btn-sm">
              Empezar ahora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary"
            aria-label="Abrir menú"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 mt-2">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-primary font-medium py-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/es/contacto" 
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-2"
              >
                Empezar ahora
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
