# Scripts de Health4Spain

Esta carpeta contiene scripts para automatizar tareas administrativas y de generación de contenido del proyecto.

---

## 📍 generate-city-content.ts ⭐ NUEVO

Script para generar contenido SEO extenso y detallado para páginas de ciudades usando OpenAI GPT-4o.

### Uso

```bash
# Generar todas las ciudades
npx ts-node scripts/generate-city-content.ts

# Solo ciudades destacadas (Madrid, Barcelona, Marbella, etc.)
npx ts-node scripts/generate-city-content.ts --destacadas

# Una ciudad específica
npx ts-node scripts/generate-city-content.ts --ciudad=marbella
```

### Contenido Generado

Cada página de ciudad incluye **1500+ palabras** con:

- **Introducción extensa** (200-300 palabras) sobre por qué vivir en la ciudad
- **5+ barrios/zonas** con descripciones detalladas (60-100 palabras cada uno)
- **Coste de vida desglosado**:
  - Alquiler (100-150 palabras)
  - Compra (100-150 palabras)
  - Alimentación (80-120 palabras)
  - Transporte (80-100 palabras)
  - Utilidades (60-80 palabras)
- **8+ trámites esenciales** con ubicaciones específicas
- **8+ FAQs** con respuestas detalladas (100-150 palabras cada una)
- **6+ ventajas** específicas de la ciudad
- **Datos climáticos** detallados
- **Metadatos SEO** optimizados

### Características

- **Modelo**: GPT-4o (alta calidad para contenido largo)
- **Tokens por ciudad**: 3,000-4,000
- **Tiempo por ciudad**: 5-10 segundos
- **Coste por ciudad**: $0.02-0.04
- **Contenido específico** para cada ciudad (no genérico)
- **Optimizado para SEO** con keywords long-tail

### Almacenamiento

Los datos se guardan en la tabla `ciudades_contenido` de Supabase. Las páginas en `/es/destinos/{ciudad}` cargan automáticamente este contenido.

### Coste Estimado

- **10 ciudades destacadas**: ~$0.30
- **40 ciudades totales**: ~$1.00-1.60

---

## 📍 generate-landings.ts

Script para generar automáticamente landing pages de **servicio × ciudad** usando OpenAI GPT-4o-mini.

### ⭐ Scripts Disponibles

```bash
# 1. GENERAR todas las landing pages (o filtradas)
npm run generate-landings

# 2. VERIFICAR cuáles están vacías/incompletas (NO genera nada, solo revisa)
npm run check-landings

# 3. REGENERAR solo las vacías/incompletas
npm run retry-landings
```

### Uso de generate-landings

```bash
# Generar todas las combinaciones
npm run generate-landings

# Solo un servicio específico
npm run generate-landings servicio=abogados

# Solo una ciudad específica
npm run generate-landings ciudad=marbella

# Una landing específica
npm run generate-landings slug=abogados-marbella
```

### 🔍 Script check-landings

**Verifica el estado de las landing pages sin generar nada nuevo.**

```bash
npm run check-landings
```

**Salida:**
- Total de landing pages encontradas
- Número de páginas incompletas
- Desglose por tipo de problema (sin título, sin servicios, sin FAQs, etc.)
- Lista de slugs afectados

Una landing se considera incompleta si:
- ❌ `meta_title` < 10 caracteres
- ❌ `hero_title` < 10 caracteres
- ❌ `hero_subtitle` < 20 caracteres
- ❌ `services` tiene menos de 3 elementos
- ❌ `faqs` tiene menos de 2 elementos
- ❌ `problem_title` < 5 caracteres
- ❌ `solution_text` < 30 caracteres

### 🔄 Script retry-landings

**Regenera automáticamente solo las landing pages incompletas.**

```bash
npm run retry-landings
```

**Funcionalidad:**
1. Detecta automáticamente páginas vacías/incompletas
2. Usa OpenAI para generar contenido completo
3. Sobrescribe el contenido existente
4. Ahorra tiempo y dinero al no regenerar todo

### Estructura de URLs

```
/es/destinos/{servicio}-{ciudad}

Ejemplos:
/es/destinos/abogados-marbella
/es/destinos/seguros-barcelona
/es/destinos/inmobiliarias-malaga
```

### Contenido Generado

Cada landing incluye:

- **SEO**: meta_title, meta_description, meta_keywords
- **Hero**: título, subtítulo, bullets de beneficios
- **Problemas**: título y lista de problemas del usuario
- **Solución**: título y texto explicativo
- **Servicios**: lista de servicios específicos
- **Por qué la ciudad**: texto y estadísticas locales
- **FAQs**: 4-5 preguntas frecuentes
- **CTA**: título y subtítulo de llamada a la acción

### Servicios (6)

| Slug | Nombre |
|------|--------|
| abogados | Abogados de Extranjería |
| seguros | Seguros de Salud |
| inmobiliarias | Inmobiliarias |
| dentistas | Clínicas Dentales |
| gestorias | Gestorías |
| clinicas | Clínicas Médicas |

### Coste Estimado

- **Modelo**: gpt-4o-mini
- **Tokens por landing**: ~2,000-3,000
- **Total 6×40 ciudades = 240 landings**: ~$2.00-4.00

---

## 📄 generate-blog-posts.ts

Script para generar automáticamente artículos de blog completos con contenido optimizado para SEO usando OpenAI GPT-4o-mini.

### Uso

```bash
npm run generate-blog
```

### Características

- Genera **30 artículos de blog** en español
- Contenido entre **1500-2000 palabras** por artículo
- **Categorías**: Guías de Ciudad, Procedimientos, Salud, Finanzas, Vida en España
- Optimizado para **SEO** con meta descripciones
- Se insertan directamente en **Supabase** con status `published`

### Artículos Generados

#### Guías de Ciudad (6)
1. Vivir en Torrevieja: Guía Completa 2026
2. Valencia para Expatriados: Todo lo que Necesitas Saber
3. Málaga vs Alicante: ¿Dónde Establecerte en 2026?
4. Madrid para Extranjeros: Costos, Barrios y Consejos
5. Barcelona: Pros y Contras de Vivir en la Ciudad Condal
6. Las Mejores Ciudades Pequeñas de la Costa Blanca

#### Procedimientos (8)
7. Visa No Lucrativa 2026: Guía Paso a Paso Actualizada
8. Arraigo Social en España: Requisitos y Proceso Completo
9. Golden Visa España: ¿Vale la Pena en 2026?
10. Cómo Obtener el NIE: Guía Práctica y Documentación
... y más

### Coste Estimado

- **Modelo**: gpt-4o-mini
- **Total 30 artículos**: ~100,000 tokens
- **Coste aproximado**: $0.50 - $1.00

---

## 🧪 test-supabase.ts

Script para verificar la conexión con Supabase.

```bash
npx ts-node scripts/test-supabase.ts
```

---

## 📋 Requisitos

Asegúrate de tener estas variables en `.env.local`:

```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Y las tablas creadas en Supabase:

```bash
# Ejecutar en Supabase SQL Editor
supabase/landing-pages-schema.sql
supabase/schema.sql
```

---

## 🚀 Flujo de Trabajo Recomendado

### 1. Configurar Base de Datos

```bash
# Ejecutar en Supabase SQL Editor
supabase/landing-pages-schema.sql
```

### 2. Generar Contenido de Ciudades Importantes

```bash
# Ciudades destacadas primero (Madrid, Barcelona, Marbella, etc.)
npx ts-node scripts/generate-city-content.ts --destacadas
```

Esto genera contenido SEO extenso para las páginas `/es/destinos/{ciudad}`.

### 3. Generar Landing Pages Servicio×Ciudad

```bash
# Por ejemplo, todas las combinaciones de abogados
npm run generate-landings servicio=abogados

# O todas las landings de una ciudad
npm run generate-landings ciudad=marbella

# IMPORTANTE: Después de generar, verifica si alguna quedó incompleta
npm run check-landings

# Si hay páginas incompletas, regenera solo esas
npm run retry-landings
```

Esto genera landings para URLs como `/es/destinos/abogados-marbella`.

### 4. Generar Blog Posts

```bash
npm run generate-blog
```

### 5. Revisar en el Admin

Accede a `/administrator/landings` y `/administrator/blog` para revisar y activar el contenido.

---

## 💰 Resumen de Costes

| Script | Modelo | Contenido | Coste Aprox |
|--------|--------|-----------|-------------|
| `generate-city-content.ts` | GPT-4o | 40 ciudades | $1.00-1.60 |
| `generate-landings.ts` | GPT-4o-mini | 240 landings | $2.00-4.00 |
| `generate-blog-posts.ts` | GPT-4o-mini | 30 posts | $0.50-1.00 |
| **TOTAL** | | | **$3.50-6.60** |

---

## 📊 Logs y Debugging

Los logs de generación se guardan en `landing_generation_log` e incluyen:
- Tokens usados
- Coste estimado
- Tiempo de ejecución
- Errores

---

## ♻️ Actualizar Contenido

Para regenerar contenido específico:

```bash
# Una ciudad
npx ts-node scripts/generate-city-content.ts --ciudad=marbella

# Una landing
npm run generate-landings slug=abogados-marbella

# Verificar si hay landings incompletas
npm run check-landings

# Regenerar solo las incompletas
npm run retry-landings
```

El contenido existente se sobrescribirá (upsert por slug).
