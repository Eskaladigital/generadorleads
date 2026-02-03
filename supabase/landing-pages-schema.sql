-- ============================================
-- TABLA: landing_pages
-- Contenido SEO para páginas servicio×ciudad
-- ============================================

CREATE TABLE IF NOT EXISTS landing_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Identificadores (slug único: "abogados-mazarron")
  slug VARCHAR(100) UNIQUE NOT NULL,
  servicio_slug VARCHAR(50) NOT NULL,
  servicio_nombre VARCHAR(100) NOT NULL,
  ciudad_slug VARCHAR(50) NOT NULL,
  ciudad_nombre VARCHAR(100) NOT NULL,
  provincia VARCHAR(50),
  
  -- SEO
  meta_title VARCHAR(70) NOT NULL,
  meta_description VARCHAR(160) NOT NULL,
  meta_keywords TEXT,
  
  -- Hero Section
  hero_title VARCHAR(200) NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_bullets JSONB DEFAULT '[]'::jsonb,
  hero_image_url TEXT,
  
  -- Problema / Solución
  problem_title VARCHAR(100),
  problems JSONB DEFAULT '[]'::jsonb,
  solution_title VARCHAR(100),
  solution_text TEXT,
  
  -- Servicios específicos
  services_title VARCHAR(150),
  services JSONB DEFAULT '[]'::jsonb,
  -- Formato: [{"icon": "📄", "title": "NIE", "description": "..."}]
  
  -- Por qué esta ciudad
  why_city_title VARCHAR(150),
  why_city_text TEXT,
  why_city_stats JSONB DEFAULT '[]'::jsonb,
  -- Formato: [{"value": "25%", "label": "Población extranjera"}]
  
  -- FAQ (importante para SEO)
  faqs JSONB DEFAULT '[]'::jsonb,
  -- Formato: [{"question": "...", "answer": "..."}]
  
  -- CTA
  cta_title VARCHAR(150),
  cta_subtitle VARCHAR(200),
  
  -- Contenido adicional (para schema.org, rich snippets)
  schema_org JSONB,
  
  -- Control
  idioma VARCHAR(5) DEFAULT 'es',
  activo BOOLEAN DEFAULT true,
  generado_por_ia BOOLEAN DEFAULT false,
  revisado BOOLEAN DEFAULT false,
  fecha_generacion TIMESTAMPTZ,
  fecha_revision TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_landing_servicio ON landing_pages(servicio_slug);
CREATE INDEX IF NOT EXISTS idx_landing_ciudad ON landing_pages(ciudad_slug);
CREATE INDEX IF NOT EXISTS idx_landing_activo ON landing_pages(activo);
CREATE INDEX IF NOT EXISTS idx_landing_idioma ON landing_pages(idioma);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_landing_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_landing_updated ON landing_pages;
CREATE TRIGGER trigger_landing_updated
  BEFORE UPDATE ON landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_landing_timestamp();

-- RLS (Row Level Security)
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

-- Política: Lectura pública (las landing pages son públicas)
DROP POLICY IF EXISTS "Landing pages públicas" ON landing_pages;
CREATE POLICY "Landing pages públicas" ON landing_pages
  FOR SELECT USING (activo = true);

-- Política: Solo admins pueden modificar
DROP POLICY IF EXISTS "Solo admins modifican landings" ON landing_pages;
CREATE POLICY "Solo admins modifican landings" ON landing_pages
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- TABLA: landing_generation_log
-- Registro de generaciones con IA
-- ============================================

CREATE TABLE IF NOT EXISTS landing_generation_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  landing_id UUID REFERENCES landing_pages(id) ON DELETE CASCADE,
  slug VARCHAR(100) NOT NULL,
  
  -- Info de generación
  modelo_ia VARCHAR(50) NOT NULL, -- gpt-4, gpt-3.5-turbo, etc.
  prompt_usado TEXT,
  tokens_input INTEGER,
  tokens_output INTEGER,
  coste_estimado DECIMAL(10, 6),
  
  -- Resultado
  exito BOOLEAN DEFAULT false,
  error_mensaje TEXT,
  tiempo_ms INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DATOS INICIALES: Servicios y Ciudades
-- ============================================

-- Tabla auxiliar de servicios (para el script de generación)
CREATE TABLE IF NOT EXISTS servicios_catalogo (
  slug VARCHAR(50) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  nombre_plural VARCHAR(100),
  icon VARCHAR(10),
  descripcion_corta TEXT,
  keywords TEXT[]
);

INSERT INTO servicios_catalogo (slug, nombre, nombre_plural, icon, descripcion_corta, keywords) VALUES
  ('abogados', 'Abogado Extranjería', 'Abogados de Extranjería', '⚖️', 'Especialistas en visados, NIE, arraigo y nacionalidad', ARRAY['abogado extranjeria', 'nie', 'visado', 'arraigo', 'nacionalidad']),
  ('seguros', 'Seguro de Salud', 'Seguros de Salud', '🏥', 'Seguros médicos privados para extranjeros', ARRAY['seguro salud', 'seguro medico', 'aseguradora', 'poliza']),
  ('inmobiliarias', 'Inmobiliaria', 'Inmobiliarias', '🏠', 'Compra, venta y alquiler de propiedades', ARRAY['inmobiliaria', 'comprar casa', 'alquilar piso', 'vivienda']),
  ('dentistas', 'Dentista', 'Dentistas', '🦷', 'Clínicas dentales con atención multilingüe', ARRAY['dentista', 'clinica dental', 'odontologo', 'implantes']),
  ('gestorias', 'Gestoría', 'Gestorías', '📋', 'Trámites administrativos y fiscales', ARRAY['gestoria', 'gestor', 'impuestos', 'autonomo', 'declaracion']),
  ('clinicas', 'Clínica Privada', 'Clínicas Privadas', '🏥', 'Atención médica privada especializada', ARRAY['clinica', 'medico privado', 'especialista', 'hospital'])
ON CONFLICT (slug) DO NOTHING;

-- Tabla auxiliar de ciudades
CREATE TABLE IF NOT EXISTS ciudades_catalogo (
  slug VARCHAR(50) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  provincia VARCHAR(50) NOT NULL,
  comunidad VARCHAR(50) NOT NULL,
  poblacion INTEGER,
  porcentaje_extranjeros DECIMAL(5,2),
  destacada BOOLEAN DEFAULT false,
  datos_extra JSONB
);

-- ============================================
-- TABLA: ciudades_contenido
-- Contenido SEO extendido para páginas de ciudades
-- ============================================

CREATE TABLE IF NOT EXISTS ciudades_contenido (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ciudad_slug VARCHAR(50) UNIQUE NOT NULL REFERENCES ciudades_catalogo(slug) ON DELETE CASCADE,
  
  -- SEO
  meta_title VARCHAR(70) NOT NULL,
  meta_description VARCHAR(160) NOT NULL,
  meta_keywords TEXT,
  
  -- Contenido principal
  intro_text TEXT NOT NULL,
  
  -- Barrios/Zonas
  barrios JSONB DEFAULT '[]'::jsonb,
  -- Formato: [{"nombre": "Centro", "descripcion": "..."}]
  
  -- Coste de vida detallado
  coste_vida_alquiler TEXT,
  coste_vida_compra TEXT,
  coste_vida_alimentacion TEXT,
  coste_vida_transporte TEXT,
  coste_vida_utilidades TEXT,
  
  -- Trámites específicos
  tramites JSONB DEFAULT '[]'::jsonb,
  -- Formato: ["Trámite 1", "Trámite 2", ...]
  
  -- FAQs
  faqs JSONB DEFAULT '[]'::jsonb,
  -- Formato: [{"pregunta": "...", "respuesta": "..."}]
  
  -- Puntos de interés
  ventajas JSONB DEFAULT '[]'::jsonb,
  -- Formato: ["Ventaja 1", "Ventaja 2", ...]
  
  -- Datos adicionales
  clima_detalle TEXT,
  temperatura_media VARCHAR(50),
  dias_sol INTEGER,
  
  -- Control
  idioma VARCHAR(5) DEFAULT 'es',
  activo BOOLEAN DEFAULT true,
  generado_por_ia BOOLEAN DEFAULT false,
  revisado BOOLEAN DEFAULT false,
  fecha_generacion TIMESTAMPTZ,
  fecha_revision TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_ciudades_contenido_activo ON ciudades_contenido(activo);
CREATE INDEX IF NOT EXISTS idx_ciudades_contenido_ciudad ON ciudades_contenido(ciudad_slug);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS trigger_ciudades_contenido_updated ON ciudades_contenido;
CREATE TRIGGER trigger_ciudades_contenido_updated
  BEFORE UPDATE ON ciudades_contenido
  FOR EACH ROW
  EXECUTE FUNCTION update_landing_timestamp();

-- RLS
ALTER TABLE ciudades_contenido ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Contenido ciudades público" ON ciudades_contenido;
CREATE POLICY "Contenido ciudades público" ON ciudades_contenido
  FOR SELECT USING (activo = true);

DROP POLICY IF EXISTS "Solo admins modifican contenido ciudades" ON ciudades_contenido;
CREATE POLICY "Solo admins modifican contenido ciudades" ON ciudades_contenido
  FOR ALL USING (auth.role() = 'service_role');

INSERT INTO ciudades_catalogo (slug, nombre, provincia, comunidad, poblacion, porcentaje_extranjeros, destacada, datos_extra) VALUES
  ('torrevieja', 'Torrevieja', 'Alicante', 'Comunidad Valenciana', 82000, 28.00, true, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 40, "categoria": "Sol y playa", "descripcion": "Paraíso costero"}'),
  ('alicante', 'Alicante', 'Alicante', 'Comunidad Valenciana', 340000, 15.00, true, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 15, "categoria": "Costa Blanca", "descripcion": "Sol y playa"}'),
  ('murcia', 'Murcia', 'Murcia', 'Región de Murcia', 460000, 12.00, true, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 30, "categoria": "Levante", "descripcion": "Huerta mediterránea"}'),
  ('mazarron', 'Mazarrón', 'Murcia', 'Región de Murcia', 35000, 25.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 45}'),
  ('san-javier', 'San Javier', 'Murcia', 'Región de Murcia', 33000, 20.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 5}'),
  ('cartagena', 'Cartagena', 'Murcia', 'Región de Murcia', 215000, 10.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 25}'),
  ('orihuela', 'Orihuela', 'Alicante', 'Comunidad Valenciana', 77000, 22.00, false, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 50}'),
  ('benidorm', 'Benidorm', 'Alicante', 'Comunidad Valenciana', 68000, 24.00, true, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 50, "categoria": "Costa Blanca", "descripcion": ""}'),
  ('elche', 'Elche', 'Alicante', 'Comunidad Valenciana', 230000, 14.00, false, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 20}'),
  ('lorca', 'Lorca', 'Murcia', 'Región de Murcia', 95000, 15.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 70}'),
  ('rojales', 'Rojales', 'Alicante', 'Comunidad Valenciana', 20000, 45.00, false, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 35}'),
  ('guardamar', 'Guardamar del Segura', 'Alicante', 'Comunidad Valenciana', 16000, 35.00, false, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 40}'),
  ('pilar-horadada', 'Pilar de la Horadada', 'Alicante', 'Comunidad Valenciana', 25000, 30.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 20}'),
  ('los-alcazares', 'Los Alcázares', 'Murcia', 'Región de Murcia', 16000, 35.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 10}'),
  ('san-pedro-pinatar', 'San Pedro del Pinatar', 'Murcia', 'Región de Murcia', 25000, 28.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 15}'),
  ('aguilas', 'Águilas', 'Murcia', 'Región de Murcia', 35000, 12.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 90}'),
  ('la-manga', 'La Manga del Mar Menor', 'Murcia', 'Región de Murcia', 3000, 40.00, false, '{"aeropuerto_cercano": "Corvera", "distancia_aeropuerto": 25}'),
  ('santa-pola', 'Santa Pola', 'Alicante', 'Comunidad Valenciana', 35000, 18.00, false, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 25}'),
  ('altea', 'Altea', 'Alicante', 'Comunidad Valenciana', 22000, 30.00, false, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 60}'),
  ('denia', 'Dénia', 'Alicante', 'Comunidad Valenciana', 42000, 28.00, false, '{"aeropuerto_cercano": "Alicante", "distancia_aeropuerto": 90}'),
  -- Ciudades principales de España
  ('madrid', 'Madrid', 'Madrid', 'Comunidad de Madrid', 3300000, 13.50, true, '{"aeropuerto_cercano": "Madrid-Barajas", "distancia_aeropuerto": 15, "categoria": "Centro", "descripcion": "Capital cosmopolita"}'),
  ('barcelona', 'Barcelona', 'Barcelona', 'Cataluña', 1600000, 17.80, true, '{"aeropuerto_cercano": "Barcelona-El Prat", "distancia_aeropuerto": 20, "categoria": "Cataluña", "descripcion": "Arte y mediterráneo"}'),
  ('valencia', 'Valencia', 'Valencia', 'Comunidad Valenciana', 800000, 12.50, true, '{"aeropuerto_cercano": "Valencia", "distancia_aeropuerto": 12, "categoria": "Levante", "descripcion": "Ciudad de las artes"}'),
  ('malaga', 'Málaga', 'Málaga', 'Andalucía', 580000, 9.20, true, '{"aeropuerto_cercano": "Málaga-Costa del Sol", "distancia_aeropuerto": 10, "categoria": "Costa del Sol", "descripcion": "Costa andaluza"}'),
  ('marbella', 'Marbella', 'Málaga', 'Andalucía', 145000, 35.50, true, '{"aeropuerto_cercano": "Málaga-Costa del Sol", "distancia_aeropuerto": 50, "categoria": "Costa del Sol", "descripcion": "Lujo y glamour"}'),
  ('sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 690000, 4.80, true, '{"aeropuerto_cercano": "Sevilla", "distancia_aeropuerto": 15, "categoria": "Andalucía", "descripcion": "Flamenco y tradición"}'),
  ('palma', 'Palma de Mallorca', 'Baleares', 'Islas Baleares', 420000, 20.30, true, '{"aeropuerto_cercano": "Palma de Mallorca", "distancia_aeropuerto": 10, "categoria": "Islas Baleares", "descripcion": "Perla del mediterráneo"}'),
  ('tenerife', 'Tenerife', 'Santa Cruz de Tenerife', 'Canarias', 930000, 15.60, true, '{"aeropuerto_cercano": "Tenerife Sur", "distancia_aeropuerto": 60, "categoria": "Islas Canarias", "descripcion": "Eterna primavera"}'),
  ('las-palmas', 'Las Palmas', 'Las Palmas', 'Canarias', 380000, 12.40, true, '{"aeropuerto_cercano": "Gran Canaria", "distancia_aeropuerto": 20, "categoria": "Islas Canarias", "descripcion": "Clima tropical"}'),
  ('ibiza', 'Ibiza', 'Baleares', 'Islas Baleares', 150000, 28.70, true, '{"aeropuerto_cercano": "Ibiza", "distancia_aeropuerto": 8, "categoria": "Islas Baleares", "descripcion": "Vida y naturaleza"}'),
  ('granada', 'Granada', 'Granada', 'Andalucía', 230000, 6.50, true, '{"aeropuerto_cercano": "Granada-Jaén", "distancia_aeropuerto": 17, "categoria": "Andalucía", "descripcion": "Alhambra y sierra"}'),
  ('bilbao', 'Bilbao', 'Vizcaya', 'País Vasco', 350000, 7.20, true, '{"aeropuerto_cercano": "Bilbao", "distancia_aeropuerto": 12, "categoria": "País Vasco", "descripcion": "Cultura y gastronomía"}'),
  ('zaragoza', 'Zaragoza', 'Zaragoza', 'Aragón', 680000, 11.30, false, '{"aeropuerto_cercano": "Zaragoza", "distancia_aeropuerto": 15, "categoria": "Aragón", "descripcion": "Historia milenaria"}'),
  ('fuengirola', 'Fuengirola', 'Málaga', 'Andalucía', 80000, 32.40, true, '{"aeropuerto_cercano": "Málaga-Costa del Sol", "distancia_aeropuerto": 25, "categoria": "Costa del Sol", "descripcion": "Playas y familias"}'),
  ('estepona', 'Estepona', 'Málaga', 'Andalucía', 70000, 28.60, true, '{"aeropuerto_cercano": "Málaga-Costa del Sol", "distancia_aeropuerto": 80, "categoria": "Costa del Sol", "descripcion": "Pueblo andaluz"}'),
  ('nerja', 'Nerja', 'Málaga', 'Andalucía', 22000, 35.80, false, '{"aeropuerto_cercano": "Málaga-Costa del Sol", "distancia_aeropuerto": 55, "categoria": "Costa del Sol", "descripcion": "Balcón de Europa"}')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- COMENTARIOS
-- ============================================

COMMENT ON TABLE landing_pages IS 'Contenido SEO para landing pages de servicio×ciudad generado con IA';
COMMENT ON COLUMN landing_pages.slug IS 'Slug único: servicio-ciudad (ej: abogados-mazarron)';
COMMENT ON COLUMN landing_pages.hero_bullets IS 'Array JSON de bullets para el hero: ["bullet1", "bullet2"]';
COMMENT ON COLUMN landing_pages.services IS 'Array JSON de servicios: [{"icon": "📄", "title": "NIE", "description": "..."}]';
COMMENT ON COLUMN landing_pages.faqs IS 'Array JSON de FAQs: [{"question": "...", "answer": "..."}]';
