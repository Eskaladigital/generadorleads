# 🎯 SCRIPTS DE LANDING PAGES - DOCUMENTACIÓN

## ✅ ESTADO ACTUAL (7 Febrero 2026)

**76 landing pages generadas exitosamente** (4 servicios × 19 ciudades)

---

## 📝 Scripts Disponibles

### 1. `check-landings.ts` - VERIFICAR

**Archivo:** `scripts/check-landings.ts`

**Comando:**
```bash
npm run check-landings
```

**Qué hace:**
- ✅ Lee todas las landing pages de Supabase
- ✅ Analiza cuáles están vacías o incompletas
- ✅ Muestra un reporte detallado
- ✅ **NO genera nada nuevo**
- ✅ **NO cuesta dinero** (no usa OpenAI)

**Salida actual:**
```
🔍 VERIFICANDO LANDING PAGES EXISTENTES...

📊 Total landing pages encontradas: 76

✅ ¡PERFECTO! Todas las landing pages están completas
```

---

### 2. `verify-landings.ts` - DETECTAR FALTANTES

**Archivo:** `scripts/verify-landings.ts`

**Comando:**
```bash
npx tsx scripts/verify-landings.ts
```

**Qué hace:**
- ✅ Compara landing pages existentes con catálogo completo
- ✅ Detecta qué combinaciones servicio+ciudad faltan
- ✅ Lista exacta de slugs faltantes
- ✅ **NO cuesta dinero** (no usa OpenAI)

---

### 3. `retry-landings.ts` - REGENERAR INCOMPLETAS

**Archivo:** `scripts/retry-landings.ts`

**Comando:**
```bash
npm run retry-landings
```

**Qué hace:**
- ✅ Detecta automáticamente landing pages incompletas
- ✅ Usa OpenAI para regenerar solo esas
- ✅ Sobrescribe el contenido existente
- ✅ Ahorra tiempo y dinero vs regenerar todo

**Salida actual:**
```
🔄 REGENERANDO LANDING PAGES INCOMPLETAS...

✅ No hay landing pages incompletas para regenerar
```

---

### 4. `generate-landings.ts` - GENERAR TODAS

**Archivo:** `scripts/generate-landings.ts`

**Comando:**
```bash
# Todas las combinaciones (76)
npm run generate-landings
```

**Qué hace:**
- ✅ Genera todas las landing pages desde cero
- ✅ Lee servicios y ciudades desde Supabase
- ✅ Usa OpenAI GPT-4o-mini
- ✅ Guarda en `landing_pages` con upsert

**Resultado última ejecución (7 Feb 2026):**
- ✅ Exitosas: 68
- ❌ Fallidas: 8 (errores JSON de OpenAI)
- ⏱️ Tiempo: ~11 minutos
- 💰 Coste: ~$0.15 USD

---

### 5. `fix-missing-landing.ts` - CORREGIR ESPECÍFICA

**Archivo:** `scripts/fix-missing-landing.ts`

**Comando:**
```bash
npx tsx scripts/fix-missing-landing.ts
```

**Qué hace:**
- ✅ Borra landing pages incorrectas
- ✅ Genera la landing page correcta
- ✅ Caso usado: Corregir `gestorias-zaragoza` → `gestorias-san-javier`

---

### 6. `list-all-landings.ts` - LISTAR TODAS

**Archivo:** `scripts/list-all-landings.ts`

**Comando:**
```bash
npx tsx scripts/list-all-landings.ts
```

**Qué hace:**
- ✅ Lista todas las landing pages ordenadas por servicio
- ✅ Cuenta por servicio
- ✅ Útil para inspección visual

---

### 7. Scripts de Base de Datos

**Archivo:** `scripts/fix-database.ts`
```bash
npm run fix-database
```
- ✅ Limpia ciudades incorrectas
- ✅ Verifica servicios y ciudades correctos

**Archivo:** `scripts/clear-landings.ts`
```bash
npm run clear-landings
```
- ✅ Borra TODAS las landing pages (PELIGRO)
- ✅ Útil para regeneración completa

**Archivo:** `scripts/clean-auxiliary-tables.ts`
```bash
npm run clean-auxiliary
```
- ✅ Limpia `landing_generation_log`
- ✅ Limpia `ciudades_contenido`
- ✅ Mantiene solo registros relevantes

---

## 🔍 Criterios de Validación

Una landing page se considera **INCOMPLETA** si cumple uno o más de estos criterios:

| Campo | Criterio de Fallo |
|-------|-------------------|
| `meta_title` | Vacío o < 10 caracteres |
| `hero_title` | Vacío o < 10 caracteres |
| `hero_subtitle` | Vacío o < 20 caracteres |
| `services` | Array vacío, null o < 3 servicios |
| `faqs` | Array vacío, null o < 2 FAQs |
| `problem_title` | Vacío o < 5 caracteres |
| `solution_text` | Vacío o < 30 caracteres |

---

## 💻 Workflow Completado (7 Feb 2026)

### Primera Generación
```bash
# 1. Limpiar base de datos
npm run clear-landings

# 2. Generar todas (resultado: 68 exitosas, 8 fallidas)
npm run generate-landings

# 3. Detectar problema (gestorias-zaragoza incorrecta)
npx tsx scripts/list-all-landings.ts
npx tsx scripts/verify-landings.ts

# 4. Corregir manualmente
npx tsx scripts/fix-missing-landing.ts

# 5. Verificar final
npm run check-landings  # ✅ 76/76

# 6. Limpiar logs
npm run clean-auxiliary  # ✅ 222 registros eliminados
```

---

## 💰 Costes Reales

| Script | Coste Real | Uso de OpenAI |
|--------|------------|---------------|
| `check-landings` | **$0.00** | No |
| `verify-landings` | **$0.00** | No |
| `list-all-landings` | **$0.00** | No |
| `retry-landings` | ~$0.015 por landing | Sí, solo incompletas |
| `generate-landings` (76) | **~$0.15-0.20** | Sí, todas |
| `fix-missing-landing` (1) | **~$0.002** | Sí, 1 landing |

**Total real del proyecto:** ~$0.17 USD (129,200 tokens)

---

## 📦 Configuración en package.json

```json
{
  "scripts": {
    "generate-landings": "npx tsx scripts/generate-landings.ts",
    "check-landings": "npx tsx scripts/check-landings.ts",
    "retry-landings": "npx tsx scripts/retry-landings.ts",
    "fix-database": "npx tsx scripts/fix-database.ts",
    "clear-landings": "npx tsx scripts/clear-landings.ts",
    "clean-auxiliary": "npx tsx scripts/clean-auxiliary-tables.ts",
    "insert-ciudades": "npx tsx scripts/insert-19-ciudades.ts",
    "generate-cities": "npx tsx scripts/generate-ciudades.ts"
  }
}
```

---

## ✅ Lecciones Aprendidas

1. **Validación previa**: Siempre verificar ciudades en `ciudades_catalogo` antes de generar
2. **Errores JSON**: OpenAI GPT-4o-mini ocasionalmente genera JSON inválido (~10% de casos)
3. **Limpieza importante**: Mantener `landing_generation_log` limpio para mejor seguimiento
4. **Scripts modulares**: Tener scripts separados para cada tarea facilita debugging
5. **Verificación constante**: Usar `check-landings` y `verify-landings` frecuentemente

---

## 📊 Resumen Final

| Necesitas | Comando |
|-----------|---------|
| Ver estado (gratis) | `npm run check-landings` |
| Detectar faltantes (gratis) | `npx tsx scripts/verify-landings.ts` |
| Listar todas (gratis) | `npx tsx scripts/list-all-landings.ts` |
| Regenerar incompletas | `npm run retry-landings` |
| Generar todo | `npm run generate-landings` |
| Limpiar todo | `npm run clear-landings` |
| Limpiar auxiliares | `npm run clean-auxiliary` |

---

**Última actualización:** 7 de Febrero 2026
**Estado:** ✅ 76/76 landing pages completadas
