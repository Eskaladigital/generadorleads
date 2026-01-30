// Tipos para el sistema de Blog

export interface BlogPost {
  id: string;
  slug: string;
  
  // Contenido
  title: string;
  excerpt: string;
  content: string; // HTML de TinyMCE
  featured_image?: string;
  
  // Taxonomía
  category: BlogCategory;
  tags: string[];
  
  // SEO
  meta_title?: string;
  meta_description?: string;
  
  // Multiidioma
  lang: 'es' | 'en' | 'de' | 'fr';
  translations?: {
    es?: string;
    en?: string;
    de?: string;
    fr?: string;
  };
  
  // Autor
  author_id?: string;
  author_name?: string;
  
  // Estado
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  
  // Tracking
  views?: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export type BlogCategory = 
  | 'guias'
  | 'tramites'
  | 'vida-espana'
  | 'noticias'
  | 'testimonios';

export interface BlogCategoryInfo {
  slug: BlogCategory;
  name: { es: string; en: string };
  description: { es: string; en: string };
  color: string;
}

export const BLOG_CATEGORIES: BlogCategoryInfo[] = [
  {
    slug: 'guias',
    name: { es: 'Guías', en: 'Guides' },
    description: { es: 'Guías prácticas paso a paso', en: 'Step-by-step practical guides' },
    color: 'blue',
  },
  {
    slug: 'tramites',
    name: { es: 'Trámites', en: 'Procedures' },
    description: { es: 'Documentación y burocracia', en: 'Documentation and bureaucracy' },
    color: 'purple',
  },
  {
    slug: 'vida-espana',
    name: { es: 'Vida en España', en: 'Life in Spain' },
    description: { es: 'Cultura, costumbres y consejos', en: 'Culture, customs and tips' },
    color: 'green',
  },
  {
    slug: 'noticias',
    name: { es: 'Noticias', en: 'News' },
    description: { es: 'Actualidad para expatriados', en: 'News for expats' },
    color: 'orange',
  },
  {
    slug: 'testimonios',
    name: { es: 'Testimonios', en: 'Testimonials' },
    description: { es: 'Historias de éxito', en: 'Success stories' },
    color: 'pink',
  },
];

// Tipos para Leads
export interface Lead {
  id: string;
  
  // Datos de contacto
  nombre: string;
  email: string;
  telefono: string;
  
  // Origen del lead
  pais_origen?: string;
  ciudad_origen?: string;
  
  // Necesidad
  servicio: string;
  ciudad: string;
  presupuesto?: string;
  urgencia: string;
  idioma_preferido: 'es' | 'en' | 'de' | 'fr';
  mensaje?: string;
  
  // Tracking
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  dispositivo?: 'mobile' | 'desktop';
  
  // Estado del lead
  status: LeadStatus;
  score?: number; // 1-100
  
  // Asignación
  partner_id?: string;
  assigned_at?: string;
  
  // Seguimiento
  contacted_at?: string;
  converted_at?: string;
  notes?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 
  | 'nuevo'
  | 'contactado'
  | 'cualificado'
  | 'asignado'
  | 'en_proceso'
  | 'convertido'
  | 'perdido'
  | 'descartado';

// Tipos para Partners
export interface Partner {
  id: string;
  
  nombre_comercial: string;
  razon_social: string;
  cif: string;
  
  email: string;
  telefono: string;
  direccion?: string;
  ciudad: string;
  
  tipo_servicio: string[];
  ciudades_cobertura: string[];
  idiomas: string[];
  
  status: 'activo' | 'inactivo' | 'pendiente';
  verificado: boolean;
  
  leads_max_mes?: number;
  leads_actuales_mes?: number;
  precio_lead?: number;
  
  leads_totales?: number;
  leads_convertidos?: number;
  rating?: number;
  
  created_at: string;
  updated_at: string;
}

// Tipos para Landing Pages
export interface LandingPage {
  id: string;
  slug: string;
  servicio_slug: string;
  ciudad_slug: string;
  
  // SEO
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  
  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_bullets: string[];
  
  // Problemas
  problem_title: string;
  problems: Array<{ title: string; description: string }>;
  
  // Solución
  solution_title: string;
  solution_text: string;
  
  // Servicios
  services_title: string;
  services: Array<{ title: string; description: string }>;
  
  // Por qué la ciudad
  why_city_title: string;
  why_city_text: string;
  why_city_stats: Array<{ value: string; label: string }>;
  
  // FAQs
  faqs: Array<{ question: string; answer: string }>;
  
  // CTA
  cta_title: string;
  cta_subtitle: string;
  
  // Estado
  activo: boolean;
  revisado: boolean;
  generado_por_ia: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// Respuestas API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Servicios disponibles
export const SERVICIOS = [
  { id: 'seguros', label: 'Seguros de Salud', icon: '🏥' },
  { id: 'abogados', label: 'Abogados de Extranjería', icon: '⚖️' },
  { id: 'inmobiliarias', label: 'Inmobiliarias', icon: '🏠' },
  { id: 'dentistas', label: 'Clínicas Dentales', icon: '🦷' },
  { id: 'gestorias', label: 'Gestorías', icon: '📋' },
  { id: 'clinicas', label: 'Clínicas Médicas', icon: '🩺' },
] as const;

// Ciudades disponibles
export const CIUDADES = [
  { id: 'madrid', label: 'Madrid' },
  { id: 'barcelona', label: 'Barcelona' },
  { id: 'valencia', label: 'Valencia' },
  { id: 'alicante', label: 'Alicante' },
  { id: 'malaga', label: 'Málaga' },
  { id: 'marbella', label: 'Marbella' },
  { id: 'torrevieja', label: 'Torrevieja' },
  { id: 'benidorm', label: 'Benidorm' },
  { id: 'murcia', label: 'Murcia' },
  { id: 'sevilla', label: 'Sevilla' },
  { id: 'palma', label: 'Palma de Mallorca' },
  { id: 'tenerife', label: 'Tenerife' },
  { id: 'las-palmas', label: 'Las Palmas' },
  { id: 'ibiza', label: 'Ibiza' },
  { id: 'granada', label: 'Granada' },
  { id: 'bilbao', label: 'Bilbao' },
  { id: 'zaragoza', label: 'Zaragoza' },
  { id: 'fuengirola', label: 'Fuengirola' },
  { id: 'estepona', label: 'Estepona' },
  { id: 'nerja', label: 'Nerja' },
] as const;
