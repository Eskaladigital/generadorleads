import { Suspense } from 'react';
import { Metadata } from 'next';
import { getCiudades } from '@/lib/ciudades';
import ContactFormClient from './ContactFormClient';

export const metadata: Metadata = {
  title: 'Solicitar Información | Health4Spain',
  description: 'Contacta con Health4Spain. Te conectamos con seguros, abogados, inmobiliarias y gestorías verificados en menos de 24 horas. Sin compromiso.',
};

export default async function SolicitarPage() {
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
