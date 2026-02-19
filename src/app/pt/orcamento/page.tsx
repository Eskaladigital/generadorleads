import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/routes';
import PresupuestoContent from '@/components/PresupuestoContent';

const locale: Locale = 'pt';
const t = getDictionary(locale);

export const metadata: Metadata = {
  title: t.quote.metaTitle,
  description: t.quote.metaDesc,
};

export default function OrcamentoPage() {
  return <PresupuestoContent />;
}
