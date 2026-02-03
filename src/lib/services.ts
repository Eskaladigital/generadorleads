import { supabase } from './supabase';

export interface Servicio {
  slug: string;
  nombre: string;
  nombre_plural?: string;
  icon?: string;
  descripcion_corta?: string;
  keywords?: string[];
}

/**
 * Obtiene todos los servicios activos desde Supabase
 */
export async function getServicios(): Promise<Servicio[]> {
  try {
    const { data, error } = await supabase
      .from('servicios_catalogo')
      .select('slug, nombre, nombre_plural, icon, descripcion_corta, keywords')
      .order('slug');
    
    if (error) {
      console.error('Error fetching servicios:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching servicios:', error);
    return [];
  }
}

/**
 * Obtiene un servicio por slug
 */
export async function getServicioBySlug(slug: string): Promise<Servicio | null> {
  try {
    const { data, error } = await supabase
      .from('servicios_catalogo')
      .select('slug, nombre, nombre_plural, icon, descripcion_corta, keywords')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching servicio:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching servicio:', error);
    return null;
  }
}
