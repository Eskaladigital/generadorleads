'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/es', label: 'Inicio' },
  { href: '/es/destinos', label: 'Destinos' },
  { href: '/es/servicios', label: 'Servicios' },
  { href: '/es/contacto', label: 'Contacto' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-base">
        <nav className="nav-minimal">
          {/* Logo Minimal */}
          <Link href="/es" className="logo-minimal">
            <Image
              src="/images/logo-siglas.png"
              alt="H4S - Health4Spain"
              height={80}
              width={160}
              className="h-20 w-auto"
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
          <div className="md:hidden py-6 border-t border-gray-200">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:opacity-50 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
