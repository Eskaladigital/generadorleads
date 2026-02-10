import { Suspense } from 'react';
import { getCiudades } from '@/lib/ciudades';
import ContactFormClient from './ContactFormClient';

export default async function ContactPage() {
  const ciudades = await getCiudades();

  const ciudadesOpciones = [
    ...ciudades.map((c) => ({ id: c.slug, label: c.nombre })),
    { id: 'otra', label: 'Otra ciudad' },
  ];

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ContactFormClient ciudades={ciudadesOpciones} />
    </Suspense>
  );
}
