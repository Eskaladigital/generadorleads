import type { Metadata } from "next";
import { Roboto_Slab, Ubuntu } from "next/font/google";
import "./globals.css";

// Roboto Slab para títulos
const robotoSlab = Roboto_Slab({ 
  subsets: ["latin"],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Ubuntu para body
const ubuntu = Ubuntu({ 
  subsets: ["latin"],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: "Health4Spain - Tu Nueva Vida en España",
    template: "%s | Health4Spain"
  },
  description: "Conectamos residentes internacionales con profesionales españoles de confianza. Seguros, abogados, inmobiliarias, dentistas y más.",
  keywords: ["expatriados españa", "residentes internacionales", "seguros extranjeros", "abogados extranjería", "inmobiliarias expatriados"],
  authors: [{ name: "Health4Spain" }],
  creator: "Health4Spain",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://health4spain.com",
    siteName: "Health4Spain",
    title: "Health4Spain - Tu Nueva Vida en España",
    description: "Conectamos residentes internacionales con profesionales españoles de confianza.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Health4Spain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health4Spain - Tu Nueva Vida en España",
    description: "Conectamos residentes internacionales con profesionales españoles de confianza.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${robotoSlab.variable} ${ubuntu.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#43beda" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
