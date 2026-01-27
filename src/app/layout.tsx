import type { Metadata } from "next";
import { Lora, Work_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const lora = Lora({ 
  subsets: ["latin"],
  variable: '--font-lora',
  display: 'swap',
});

const workSans = Work_Sans({ 
  subsets: ["latin"],
  variable: '--font-work',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Health4Spain - Tu Nueva Vida en España",
  description: "Conectamos residentes internacionales con profesionales españoles de confianza. Seguros, abogados, inmobiliarias y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} ${workSans.variable}`}>
      <body className="font-work">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
