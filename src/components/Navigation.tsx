'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="py-8 px-[5%] border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <Link href="/es" className="font-lora text-[2rem] font-bold text-[#1a1a1a] italic">
          Health4Spain
        </Link>
        
        <div className="flex items-center gap-8">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-12 list-none items-center">
            <li>
              <Link 
                href="/es" 
                className="no-underline text-[#1a1a1a] text-[0.95rem] uppercase tracking-wider font-medium hover:text-accent transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                href="/es/destinos" 
                className="no-underline text-[#1a1a1a] text-[0.95rem] uppercase tracking-wider font-medium hover:text-accent transition-colors"
              >
                Destinos
              </Link>
            </li>
            <li>
              <Link 
                href="/es/servicios" 
                className="no-underline text-[#1a1a1a] text-[0.95rem] uppercase tracking-wider font-medium hover:text-accent transition-colors"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link 
                href="/es/blog" 
                className="no-underline text-[#1a1a1a] text-[0.95rem] uppercase tracking-wider font-medium hover:text-accent transition-colors"
              >
                Historias
              </Link>
            </li>
            <li>
              <Link 
                href="/es/contacto" 
                className="inline-block bg-[#1a1a1a] text-white py-3 px-8 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent"
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Language Switcher */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-8 pb-8">
          <ul className="flex flex-col gap-6 list-none mb-6">
            <li>
              <Link 
                href="/es" 
                className="block no-underline text-[#1a1a1a] text-[1rem] uppercase tracking-wider font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                href="/es/destinos" 
                className="block no-underline text-[#1a1a1a] text-[1rem] uppercase tracking-wider font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Destinos
              </Link>
            </li>
            <li>
              <Link 
                href="/es/servicios" 
                className="block no-underline text-[#1a1a1a] text-[1rem] uppercase tracking-wider font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link 
                href="/es/blog" 
                className="block no-underline text-[#1a1a1a] text-[1rem] uppercase tracking-wider font-medium hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Historias
              </Link>
            </li>
            <li>
              <Link 
                href="/es/contacto" 
                className="inline-block bg-[#1a1a1a] text-white py-3 px-8 no-underline font-medium uppercase tracking-wider text-[0.85rem] transition-all hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
          
          {/* Language Switcher Mobile */}
          <div className="border-t border-gray-200 pt-6">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
