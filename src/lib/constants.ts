// =============================================
// HEALTH4SPAIN - Constantes de la aplicación
// =============================================

// Imagen hero home. Para usar tu imagen: ponla en public/images/hero-spain.jpg y cambia a '/images/hero-spain.jpg'
export const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1920&q=80';

// Configuración del sitio
export const SITE_CONFIG = {
  name: 'Health4Spain',
  tagline: 'Tu nueva vida en España',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://health4spain.com',
  email: 'info@health4spain.com',
  phone: '+34 600 000 000',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34600000000',
};

// Idiomas soportados
export const LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸', locale: 'es-ES' },
  { code: 'en', name: 'English', flag: '🇬🇧', locale: 'en-GB' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', locale: 'de-DE' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', locale: 'fr-FR' },
] as const;

export type LanguageCode = typeof LANGUAGES[number]['code'];

// Servicios disponibles
export const SERVICES = [
  { 
    slug: 'seguros', 
    icon: '🏥',
    name: { es: 'Seguros de Salud', en: 'Health Insurance', de: 'Krankenversicherung', fr: 'Assurance Santé' },
  },
  { 
    slug: 'abogados', 
    icon: '⚖️',
    name: { es: 'Abogados', en: 'Lawyers', de: 'Rechtsanwälte', fr: 'Avocats' },
  },
  { 
    slug: 'inmobiliarias', 
    icon: '🏠',
    name: { es: 'Inmobiliarias', en: 'Real Estate', de: 'Immobilien', fr: 'Immobilier' },
  },
  { 
    slug: 'gestorias', 
    icon: '📋',
    name: { es: 'Gestorías', en: 'Admin Services', de: 'Verwaltung', fr: 'Services Administratifs' },
  },
] as const;

export type ServiceSlug = typeof SERVICES[number]['slug'];

// Ciudades disponibles - LAS 19 CIUDADES ESTRATÉGICAS
// Región de Murcia (12) + Provincia de Alicante (7)
export const CITIES = [
  // REGIÓN DE MURCIA (12 ciudades)
  { slug: 'murcia', name: 'Murcia', province: 'Murcia', popular: true },
  { slug: 'cartagena', name: 'Cartagena', province: 'Murcia', popular: true },
  { slug: 'lorca', name: 'Lorca', province: 'Murcia', popular: false },
  { slug: 'mazarron', name: 'Mazarrón', province: 'Murcia', popular: false },
  { slug: 'torre-pacheco', name: 'Torre Pacheco', province: 'Murcia', popular: false },
  { slug: 'san-javier', name: 'San Javier', province: 'Murcia', popular: false },
  { slug: 'san-pedro-pinatar', name: 'San Pedro del Pinatar', province: 'Murcia', popular: false },
  { slug: 'molina-de-segura', name: 'Molina de Segura', province: 'Murcia', popular: false },
  { slug: 'aguilas', name: 'Águilas', province: 'Murcia', popular: false },
  { slug: 'cieza', name: 'Cieza', province: 'Murcia', popular: false },
  { slug: 'jumilla', name: 'Jumilla', province: 'Murcia', popular: false },
  { slug: 'yecla', name: 'Yecla', province: 'Murcia', popular: false },
  
  // PROVINCIA DE ALICANTE (7 ciudades)
  { slug: 'alicante', name: 'Alicante', province: 'Alicante', popular: true },
  { slug: 'elche', name: 'Elche', province: 'Alicante', popular: false },
  { slug: 'torrevieja', name: 'Torrevieja', province: 'Alicante', popular: true },
  { slug: 'orihuela', name: 'Orihuela', province: 'Alicante', popular: false },
  { slug: 'rojales', name: 'Rojales', province: 'Alicante', popular: false },
  { slug: 'benidorm', name: 'Benidorm', province: 'Alicante', popular: true },
  { slug: 'denia', name: 'Dénia', province: 'Alicante', popular: false },
] as const;

// Total: 19 ciudades × 4 servicios = 76 landing pages

export type CitySlug = typeof CITIES[number]['slug'];

// Niveles de urgencia
export const URGENCY_LEVELS = [
  { value: 'esta_semana', label: { es: 'Esta semana', en: 'This week' }, priority: 'hot' },
  { value: 'este_mes', label: { es: 'Este mes', en: 'This month' }, priority: 'warm' },
  { value: 'sin_prisa', label: { es: 'Sin prisa', en: 'No rush' }, priority: 'cold' },
] as const;

// Estados de leads
export const LEAD_STATUSES = [
  { value: 'nuevo', label: 'Nuevo', color: 'blue' },
  { value: 'contactado', label: 'Contactado', color: 'yellow' },
  { value: 'cualificado', label: 'Cualificado', color: 'purple' },
  { value: 'asignado', label: 'Asignado', color: 'indigo' },
  { value: 'en_proceso', label: 'En proceso', color: 'cyan' },
  { value: 'convertido', label: 'Convertido', color: 'green' },
  { value: 'perdido', label: 'Perdido', color: 'gray' },
  { value: 'descartado', label: 'Descartado', color: 'gray' },
] as const;

// Categorías de blog
export const BLOG_CATEGORIES = [
  { slug: 'guias', name: { es: 'Guías', en: 'Guides' }, color: 'blue' },
  { slug: 'tramites', name: { es: 'Trámites', en: 'Procedures' }, color: 'purple' },
  { slug: 'vida-espana', name: { es: 'Vida en España', en: 'Life in Spain' }, color: 'green' },
  { slug: 'noticias', name: { es: 'Noticias', en: 'News' }, color: 'orange' },
  { slug: 'testimonios', name: { es: 'Testimonios', en: 'Testimonials' }, color: 'pink' },
] as const;

// Supabase Storage Buckets
export const STORAGE_BUCKETS = {
  BLOG_IMAGES: 'blog-images',
  SERVICE_IMAGES: 'service-images',
  CITY_IMAGES: 'city-images',
  PARTNER_LOGOS: 'partner-logos',
  UPLOADS: 'uploads',
} as const;

// Tamaños de imagen recomendados
export const IMAGE_SIZES = {
  hero: { width: 1920, height: 1080 },
  card: { width: 800, height: 600 },
  thumbnail: { width: 400, height: 300 },
  avatar: { width: 200, height: 200 },
  logo: { width: 400, height: 200 },
  og: { width: 1200, height: 630 },
} as const;

// Límites y configuración
export const LIMITS = {
  maxLeadsPerHour: 5, // Límite de leads por IP por hora
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxBlogExcerpt: 160, // Caracteres
  maxMetaTitle: 60, // Caracteres
  maxMetaDescription: 160, // Caracteres
} as const;

// URLs de redes sociales
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/health4spain',
  instagram: 'https://instagram.com/health4spain',
  linkedin: 'https://linkedin.com/company/health4spain',
  twitter: 'https://twitter.com/health4spain',
} as const;

// Textos comunes reutilizables
export const COMMON_TEXTS = {
  es: {
    cta: {
      primary: 'Solicitar ayuda gratis',
      secondary: 'Ver servicios',
      contact: 'Contactar ahora',
    },
    trust: {
      free: '100% gratis',
      response: 'Respuesta en 24h',
      verified: 'Profesionales verificados',
      language: 'En tu idioma',
    },
    form: {
      success: '¡Recibido! Te contactaremos en menos de 24 horas.',
      error: 'Error al enviar. Por favor, inténtalo de nuevo.',
    },
  },
  en: {
    cta: {
      primary: 'Get free help',
      secondary: 'View services',
      contact: 'Contact now',
    },
    trust: {
      free: '100% free',
      response: 'Response in 24h',
      verified: 'Verified professionals',
      language: 'In your language',
    },
    form: {
      success: "Received! We'll contact you within 24 hours.",
      error: 'Error sending. Please try again.',
    },
  },
} as const;
