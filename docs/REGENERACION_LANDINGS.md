# 🔄 Regeneración Automática de Landing Pages

Este documento explica cómo usar las nuevas funcionalidades de detección y regeneración automática de landing pages vacías o incompletas.

## 📋 Índice

1. [Características Nuevas](#características-nuevas)
2. [Detección de Páginas Incompletas](#detección-de-páginas-incompletas)
3. [Comandos Disponibles](#comandos-disponibles)
4. [Casos de Uso](#casos-de-uso)
5. [Criterios de Validación](#criterios-de-validación)

---

## ✨ Características Nuevas

El script `generate-landings.ts` ahora incluye:

### 🔍 Modo Verificación (`--check`)
- Analiza todas las landing pages existentes en la base de datos
- Detecta cuáles están vacías o tienen contenido incompleto
- Muestra un reporte detallado con problemas específicos
- No genera ni modifica nada, solo analiza

### 🔄 Modo Regeneración (`--retry-failed`)
- Detecta automáticamente landing pages incompletas
- Regenera solo las que tienen problemas
- Usa OpenAI para generar contenido completo
- Sobrescribe el contenido existente (upsert)

---

## 🔍 Detección de Páginas Incompletas

Una landing page se considera **incompleta** si cumple uno o más de estos criterios:

| Campo | Criterio de Fallo |
|-------|-------------------|
| `meta_title` | Vacío o menos de 10 caracteres |
| `hero_title` | Vacío o menos de 10 caracteres |
| `hero_subtitle` | Vacío o menos de 20 caracteres |
| `services` | Array vacío, null o menos de 3 servicios |
| `faqs` | Array vacío, null o menos de 2 FAQs |
| `problem_title` | Vacío o menos de 5 caracteres |
| `solution_text` | Vacío o menos de 30 caracteres |

---

## 💻 Comandos Disponibles

### 1️⃣ Verificar Estado

```bash
npm run generate-landings -- --check
```

**Qué hace:**
- Lee todas las landing pages de Supabase
- Analiza cada una según los criterios de validación
- Muestra un reporte con:
  - Total de páginas encontradas
  - Número de páginas incompletas
  - Desglose por tipo de problema
  - Lista completa de slugs afectados

**Salida esperada:**

```
🔍 Verificando landing pages existentes...

📊 Total landing pages encontradas: 240

⚠️  Landing pages incompletas o vacías: 15

📋 Resumen de problemas encontrados:
   - Sin título SEO: 5
   - Sin hero completo: 8
   - Sin servicios: 12
   - Sin FAQs: 15
   - Sin problema: 3
   - Sin solución: 7

🔧 Para regenerar estas páginas, ejecuta:
   npm run generate-landings -- --retry-failed

📝 Lista de slugs incompletos:
   - abogados-malaga
   - seguros-barcelona
   - inmobiliarias-valencia
   ...
```

---

### 2️⃣ Regenerar Páginas Incompletas

```bash
npm run generate-landings -- --retry-failed
```

**Qué hace:**
- Detecta automáticamente todas las landing pages incompletas
- Genera contenido nuevo con OpenAI para cada una
- Guarda el contenido en Supabase (sobrescribe el existente)
- Registra el proceso en `landing_generation_log`

**Salida esperada:**

```
🚀 Iniciando generación de landing pages...

📊 Servicios: 6
📊 Ciudades: 40
📊 Total combinaciones: 240

🔄 Modo regeneración: detectando landing pages incompletas...
⚠️  Encontradas 15 landing pages para regenerar

🎯 Generando 15 landing pages...

🔄 Generando: abogados-malaga...
✅ abogados-malaga generado (2435 tokens, 3245ms)

🔄 Generando: seguros-barcelona...
✅ seguros-barcelona generado (2588 tokens, 3567ms)

...

========================================
✅ Exitosas: 15
❌ Fallidas: 0
📊 Total: 15
========================================
```

---

### 3️⃣ Comandos Existentes (Sin Cambios)

Estos comandos siguen funcionando igual:

```bash
# Generar todas las combinaciones
npm run generate-landings

# Solo un servicio específico
npm run generate-landings -- --servicio=abogados

# Solo una ciudad específica
npm run generate-landings -- --ciudad=marbella

# Una landing específica
npm run generate-landings -- --slug=abogados-marbella
```

---

## 📝 Casos de Uso

### Caso 1: Primera Generación Falló Parcialmente

**Escenario:** Ejecutaste la generación masiva pero algunos fallos de API causaron que 20 landing pages quedaran vacías.

**Solución:**

```bash
# 1. Verificar cuántas están incompletas
npm run generate-landings -- --check

# 2. Regenerar solo las fallidas
npm run generate-landings -- --retry-failed
```

**Resultado:** Solo se regeneran las 20 que fallaron, ahorrando tiempo y costes de API.

---

### Caso 2: Cambio en el Prompt de OpenAI

**Escenario:** Modificaste el prompt para mejorar la calidad del contenido y quieres actualizar algunas ciudades específicas.

**Solución:**

```bash
# Regenerar todas las landing de una ciudad
npm run generate-landings -- --ciudad=marbella

# O regenerar un servicio específico
npm run generate-landings -- --servicio=abogados
```

---

### Caso 3: Revisión Periódica de Calidad

**Escenario:** Quieres revisar periódicamente si hay páginas con contenido incompleto.

**Solución:**

```bash
# Ejecutar verificación (no cuesta nada, no usa OpenAI)
npm run generate-landings -- --check
```

**Frecuencia recomendada:** Semanalmente o después de cada generación masiva.

---

### Caso 4: Fallos de Rate Limiting

**Escenario:** Durante una generación masiva, OpenAI devolvió errores de rate limiting y muchas páginas quedaron sin generar.

**Solución:**

```bash
# El script detectará automáticamente las fallidas
npm run generate-landings -- --retry-failed

# Nota: El script tiene un delay de 500ms entre requests para evitar rate limiting
```

---

## ✅ Criterios de Validación

### Tabla Completa de Validación

| Campo | Tipo | Mínimo | Descripción |
|-------|------|--------|-------------|
| `meta_title` | string | 10 caracteres | Título SEO de la página |
| `meta_description` | string | - | Descripción SEO (no validado actualmente) |
| `hero_title` | string | 10 caracteres | Título principal del hero |
| `hero_subtitle` | string | 20 caracteres | Subtítulo del hero |
| `hero_bullets` | array | - | Bullets del hero (no validado actualmente) |
| `services` | array | 3 elementos | Lista de servicios específicos |
| `faqs` | array | 2 elementos | Preguntas frecuentes |
| `problem_title` | string | 5 caracteres | Título de la sección de problemas |
| `solution_text` | string | 30 caracteres | Texto de la solución |
| `problems` | array | - | Lista de problemas (no validado actualmente) |
| `why_city_text` | string | - | Texto "por qué esta ciudad" (no validado actualmente) |

### Campos No Validados

Estos campos no se validan actualmente porque son menos críticos:

- `meta_description`: Opcional para SEO
- `hero_bullets`: Puede ser vacío
- `problems`: Puede ser array vacío
- `why_city_text`: Opcional
- `why_city_stats`: Opcional
- `cta_title` / `cta_subtitle`: Opcionales

---

## 🔧 Personalización de Criterios

Si quieres modificar los criterios de validación, edita la función `isLandingIncomplete()` en `scripts/generate-landings.ts`:

```typescript
function isLandingIncomplete(landing: ExistingLanding): boolean {
  // Verificar campos críticos
  if (!landing.meta_title || landing.meta_title.trim().length < 10) return true;
  if (!landing.hero_title || landing.hero_title.trim().length < 10) return true;
  if (!landing.hero_subtitle || landing.hero_subtitle.trim().length < 20) return true;
  
  // Verificar arrays JSON
  if (!landing.services || !Array.isArray(landing.services) || landing.services.length < 3) return true;
  if (!landing.faqs || !Array.isArray(landing.faqs) || landing.faqs.length < 2) return true;
  
  // Verificar contenido textual
  if (!landing.problem_title || landing.problem_title.trim().length < 5) return true;
  if (!landing.solution_text || landing.solution_text.trim().length < 30) return true;
  
  return false;
}
```

**Ejemplo de personalización:**

```typescript
// Añadir validación para meta_description
if (!landing.meta_description || landing.meta_description.trim().length < 100) return true;

// Aumentar requisito mínimo de FAQs
if (!landing.faqs || !Array.isArray(landing.faqs) || landing.faqs.length < 4) return true;

// Validar problemas
if (!landing.problems || !Array.isArray(landing.problems) || landing.problems.length < 3) return true;
```

---

## 💰 Costes

### Modo Verificación (`--check`)
- **Coste:** $0.00
- **Llamadas a API:** 0
- Solo lee de Supabase

### Modo Regeneración (`--retry-failed`)
- **Coste por landing:** ~$0.015-0.025
- **15 landings incompletas:** ~$0.20-0.40
- **50 landings incompletas:** ~$0.75-1.25

---

## 📊 Logs y Tracking

Cada generación/regeneración se registra en la tabla `landing_generation_log`:

```sql
SELECT 
  slug,
  modelo_ia,
  tokens_input,
  tokens_output,
  coste_estimado,
  exito,
  error_mensaje,
  tiempo_ms,
  created_at
FROM landing_generation_log
WHERE slug = 'abogados-marbella'
ORDER BY created_at DESC;
```

Esto te permite:
- Ver histórico de regeneraciones
- Calcular costes totales
- Identificar páginas problemáticas
- Analizar tiempos de generación

---

## ⚡ Mejores Prácticas

### ✅ Recomendado

1. **Siempre verificar primero:**
   ```bash
   npm run generate-landings -- --check
   ```

2. **Regenerar en lotes pequeños:**
   ```bash
   # Por servicio
   npm run generate-landings -- --servicio=abogados --retry-failed
   ```

3. **Monitorear logs en Supabase:**
   - Revisar `landing_generation_log` después de cada generación
   - Identificar patrones de error

4. **Delay entre requests:**
   - El script ya incluye 500ms de delay
   - Si tienes rate limiting, aumenta este valor

### ❌ Evitar

1. **No ejecutar `--retry-failed` sin verificar primero:**
   - Puede regenerar más páginas de las esperadas
   - Cuesta dinero innecesariamente

2. **No regenerar todo si solo falló una ciudad:**
   ```bash
   # ❌ Incorrecto
   npm run generate-landings
   
   # ✅ Correcto
   npm run generate-landings -- --ciudad=marbella
   ```

3. **No ignorar los logs de error:**
   - Revisa `error_mensaje` en la tabla de logs
   - Soluciona problemas de configuración antes de reintentar

---

## 🐛 Solución de Problemas

### Error: "No hay landing pages para generar/regenerar"

**Causa:** Todas las landing pages están completas según los criterios.

**Solución:** Ejecuta `--check` para verificar el estado actual.

---

### Error: OpenAI rate limiting

**Causa:** Demasiados requests en poco tiempo.

**Solución:**
1. Aumenta el delay en el código (línea ~535):
   ```typescript
   await new Promise(resolve => setTimeout(resolve, 1000)); // Cambiar de 500 a 1000
   ```
2. Regenera en lotes pequeños por servicio o ciudad

---

### Algunas páginas siguen fallando

**Causa:** Error en el prompt o respuesta de OpenAI mal formateada.

**Solución:**
1. Revisa los logs:
   ```sql
   SELECT * FROM landing_generation_log WHERE exito = false ORDER BY created_at DESC;
   ```
2. Verifica la configuración de OpenAI API
3. Ejecuta una sola landing para debug:
   ```bash
   npm run generate-landings -- --slug=abogados-marbella
   ```

---

## 📈 Workflow Recomendado

### Generación Inicial (Primera Vez)

```bash
# 1. Generar todas las landing pages
npm run generate-landings

# 2. Verificar si hay fallos
npm run generate-landings -- --check

# 3. Regenerar solo las fallidas (si hay)
npm run generate-landings -- --retry-failed

# 4. Verificar nuevamente
npm run generate-landings -- --check
```

### Mantenimiento Periódico

```bash
# Cada semana o después de cambios importantes
npm run generate-landings -- --check
```

### Actualización de Contenido

```bash
# Por ciudad (cuando se actualizan datos de la ciudad)
npm run generate-landings -- --ciudad=marbella

# Por servicio (cuando cambias el prompt de un servicio)
npm run generate-landings -- --servicio=abogados
```

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa la tabla `landing_generation_log` en Supabase
2. Verifica las variables de entorno en `.env.local`
3. Ejecuta `--check` para entender el estado actual
4. Consulta este documento para casos de uso similares

---

**Última actualización:** Febrero 2026
