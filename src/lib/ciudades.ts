import { supabase } from './supabase';

export interface Ciudad {
  slug: string;
  nombre: string;
  provincia: string;
  comunidad: string;
  poblacion?: number;
  porcentaje_extranjeros?: number;
  destacada?: boolean;
  datos_extra?: any;
}

/**
 * Obtiene todas las ciudades desde Supabase
 */
export async function getCiudades(): Promise<Ciudad[]> {
  try {
    const { data, error } = await supabase
      .from('ciudades_catalogo')
      .select('slug, nombre, provincia, comunidad, poblacion, porcentaje_extranjeros, destacada, datos_extra')
      .order('nombre');
    
    if (error) {
      console.error('Error fetching ciudades:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching ciudades:', error);
    return [];
  }
}

/**
 * Obtiene una ciudad por slug
 */
export async function getCiudadBySlug(slug: string): Promise<Ciudad | null> {
  try {
    const { data, error } = await supabase
      .from('ciudades_catalogo')
      .select('slug, nombre, provincia, comunidad, poblacion, porcentaje_extranjeros, destacada, datos_extra')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching ciudad:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching ciudad:', error);
    return null;
  }
}

/**
 * Obtiene ciudades destacadas
 */
export async function getCiudadesDestacadas(): Promise<Ciudad[]> {
  try {
    const { data, error } = await supabase
      .from('ciudades_catalogo')
      .select('slug, nombre, provincia, comunidad, poblacion, porcentaje_extranjeros, destacada, datos_extra')
      .eq('destacada', true)
      .order('nombre');
    
    if (error) {
      console.error('Error fetching ciudades destacadas:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching ciudades destacadas:', error);
    return [];
  }
}
