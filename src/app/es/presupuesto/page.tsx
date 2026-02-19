import { Metadata } from 'next';
import PresupuestoContent from '@/components/PresupuestoContent';

export const metadata: Metadata = {
  title: 'Presupuesto - Web Generadora de Leads | Health4Spain',
  description: 'Sistema de generación de leads con 76 landings SEO: 4 servicios × 19 ciudades. Posicionamiento en Google para profesionales que sirven a extranjeros.',
};

export default function PresupuestoPage() {
  return <PresupuestoContent />;
}
