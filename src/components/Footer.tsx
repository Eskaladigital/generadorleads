import Link from 'next/link';
import { getServicios } from '@/lib/services';

const footerLinks = {
  destinos: [
    { href: '/es/destinos/torrevieja', label: 'Torrevieja' },
    { href: '/es/destinos/alicante', label: 'Alicante' },
    { href: '/es/destinos/lorca', label: 'Lorca' },
    { href: '/es/destinos/murcia', label: 'Murcia' },
  ],
  empresa: [
    { href: '/es/sobre-nosotros', label: 'Sobre nosotros' },
    { href: '/es/blog', label: 'Blog' },
    { href: '/es/contacto', label: 'Contacto' },
  ],
  legal: [
    { href: '/es/privacidad', label: 'Privacidad' },
    { href: '/es/terminos', label: 'Términos' },
    { href: '/es/cookies', label: 'Cookies' },
  ],
};

export default async function Footer() {
  const servicios = await getServicios();
  
  return (
    <footer className="stats-minimal">
      <div className="container-base">
        {/* Logo */}
        <div className="mb-16">
          <Link href="/es" className="text-3xl md:text-4xl font-bold tracking-tight">
            Health4Spain
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 pb-16 border-b border-gray-800">
          {/* Servicios */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-gray-400">Servicios</h4>
            <ul className="space-y-3">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link href={`/es/servicios/${servicio.slug}`} className="text-base hover:opacity-50 transition-opacity">
                    {servicio.nombre_plural || servicio.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-gray-400">Destinos</h4>
            <ul className="space-y-3">
              {footerLinks.destinos.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-base hover:opacity-50 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-gray-400">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-base hover:opacity-50 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-gray-400">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-base hover:opacity-50 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-8 text-center">
          <p className="stat-label">
            © {new Date().getFullYear()} Health4Spain
          </p>
        </div>
      </div>
    </footer>
  );
}
