import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health4Spain - Tu Nueva Vida en España",
  description: "Conectamos residentes internacionales con profesionales españoles de confianza. Seguros, abogados, inmobiliarias y más.",
};

export default function ESLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
