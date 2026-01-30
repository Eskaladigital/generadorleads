# Generador de Landing Pages con IA

Script para generar automáticamente 120 landing pages optimizadas para SEO usando OpenAI GPT-4o-mini.

## Requisitos

1. **API Key de OpenAI** configurada en `.env.local`:
   ```env
   OPENAI_API_KEY=sk-...
   ```

2. **Tabla `landing_pages`** creada en Supabase:
   ```bash
   # Ejecutar en Supabase SQL Editor
   supabase/landing-pages-schema.sql
   ```

## Uso

```bash
npm run generate-landings
```

## Configuración

### Servicios (6)

| Slug | Nombre |
|------|--------|
| abogados | Abogados de Extranjería |
| seguros | Seguros de Salud |
| inmobiliarias | Inmobiliarias |
| dentistas | Clínicas Dentales |
| gestorias | Gestorías |
| clinicas | Clínicas Médicas |

### Ciudades (20)

Madrid, Barcelona, Valencia, Sevilla, Málaga, Alicante, Murcia, Palma de Mallorca, Bilbao, Las Palmas, Tenerife, Zaragoza, Granada, Marbella, Ibiza, Benidorm, Torrevieja, Fuengirola, Estepona, Nerja

## Estructura de URLs

```
/es/destinos/{servicio}-{ciudad}

Ejemplos:
/es/destinos/abogados-madrid
/es/destinos/seguros-barcelona
/es/destinos/inmobiliarias-malaga
```

## Contenido Generado

Cada landing incluye:

- **SEO**: meta_title, meta_description, meta_keywords
- **Hero**: título, subtítulo, bullets de beneficios
- **Problemas**: título y lista de problemas del usuario
- **Solución**: título y texto explicativo
- **Servicios**: lista de servicios específicos
- **Por qué la ciudad**: texto y estadísticas locales
- **FAQs**: 4-5 preguntas frecuentes
- **CTA**: título y subtítulo de llamada a la acción

## Coste Estimado

- **Modelo**: gpt-4o-mini
- **Tokens por landing**: ~2,000-3,000
- **Total 120 landings**: ~300,000 tokens
- **Coste aproximado**: $1.50 - $2.50 USD

## Ejecución

El script:

1. Verifica conexión con Supabase y OpenAI
2. Genera contenido para cada combinación servicio-ciudad
3. Guarda en la tabla `landing_pages`
4. Muestra progreso en tiempo real
5. Maneja errores y reintentos

```
Generando landing 1/120: abogados-madrid
✓ abogados-madrid guardado
Generando landing 2/120: abogados-barcelona
✓ abogados-barcelona guardado
...
```

## Post-generación

Después de generar:

1. **Revisar en el admin** (`/administrator/landings`)
2. **Marcar como revisadas** las que estén correctas
3. **Activar/desactivar** según necesidad
4. **Editar manualmente** si es necesario

## Notas

- Las landings se crean con `activo: true` y `revisado: false`
- El campo `generado_por_ia: true` indica origen automático
- Se puede re-ejecutar; actualiza las existentes por slug
