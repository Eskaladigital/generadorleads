# 🎯 SCRIPTS SEPARADOS - SOLUCIÓN FINAL

## ✅ Problema Resuelto

El problema original era que el flag `--check` no se pasaba correctamente a través de `npm run` + `tsx`.

**Solución:** Crear **3 scripts separados** en lugar de uno con flags complicados.

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

**Salida:**
```
🔍 VERIFICANDO LANDING PAGES EXISTENTES...

📊 Total landing pages encontradas: 240

⚠️  Landing pages incompletas o vacías: 15

📋 RESUMEN DE PROBLEMAS:
   - Sin título SEO: 5
   - Sin hero completo: 8
   - Sin servicios: 12
   - Sin FAQs: 15

🔧 PARA REGENERAR ESTAS PÁGINAS:
   npm run retry-landings

📝 LISTA DE SLUGS INCOMPLETOS:
   - abogados-malaga
   - seguros-barcelona
   ...
```

---

### 2. `retry-landings.ts` - REGENERAR FALLIDAS

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

**Salida:**
```
🔄 REGENERANDO LANDING PAGES INCOMPLETAS...

⚠️  Encontradas 15 landing pages incompletas

🎯 Regenerando 15 landing pages...

🔄 Regenerando: abogados-malaga...
✅ abogados-malaga (2435 tokens, 3245ms)

...

========================================
✅ Regeneradas exitosamente: 15
❌ Fallidas: 0
📊 Total: 15
========================================
```

---

### 3. `generate-landings.ts` - GENERAR TODAS (Original)

**Archivo:** `scripts/generate-landings.ts`

**Comando:**
```bash
# Todas las combinaciones
npm run generate-landings

# Filtros opcionales (pasar argumentos directamente)
npm run generate-landings servicio=abogados
npm run generate-landings ciudad=marbella
npm run generate-landings slug=abogados-marbella
```

**Qué hace:**
- ✅ Genera todas las landing pages (o filtradas)
- ✅ Comportamiento original sin cambios

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

## 💻 Casos de Uso

### Caso 1: Primera generación falló parcialmente

```bash
# 1. Genera todas
npm run generate-landings

# 2. Verifica cuántas fallaron (gratis, no usa API)
npm run check-landings

# 3. Regenera solo las fallidas
npm run retry-landings

# 4. Verifica de nuevo
npm run check-landings
```

---

### Caso 2: Revisión periódica

```bash
# Solo verifica el estado (gratis)
npm run check-landings
```

Ejecuta esto semanalmente o después de cada generación masiva.

---

### Caso 3: Actualizar contenido específico

```bash
# Solo una ciudad
npm run generate-landings ciudad=marbella

# Solo un servicio
npm run generate-landings servicio=abogados

# Verificar si quedó algo incompleto
npm run check-landings
```

---

## 📦 Configuración en package.json

```json
{
  "scripts": {
    "generate-landings": "npx tsx scripts/generate-landings.ts",
    "check-landings": "npx tsx scripts/check-landings.ts",
    "retry-landings": "npx tsx scripts/retry-landings.ts"
  }
}
```

---

## 💰 Costes

| Script | Coste | Uso de OpenAI |
|--------|-------|---------------|
| `check-landings` | **$0.00** | No |
| `retry-landings` | ~$0.015-0.025 por landing | Sí, solo las incompletas |
| `generate-landings` | ~$0.015-0.025 por landing | Sí, todas |

**Ejemplo:**
- 15 landings incompletas con `retry-landings`: ~$0.20-0.40
- 240 landings completas con `generate-landings`: ~$3.60-6.00

**Ahorro:** 90% usando `retry-landings` en lugar de regenerar todo.

---

## ✅ Ventajas de Esta Solución

1. **Simple:** Cada script hace una sola cosa
2. **Sin flags complicados:** No hay problemas con argumentos npm/tsx
3. **Nombres claros:** `check` y `retry` son autoexplicativos
4. **Código limpio:** Cada script es independiente
5. **Fácil de mantener:** Modificar uno no afecta a los otros
6. **Testeable:** Puedes probar cada script por separado

---

## 🎯 Workflow Recomendado

### Primera Generación
```bash
npm run generate-landings
npm run check-landings
npm run retry-landings  # Solo si check encontró problemas
```

### Mantenimiento Regular
```bash
npm run check-landings  # Cada semana
```

### Actualización de Contenido
```bash
npm run generate-landings ciudad=marbella
npm run check-landings
```

---

## 📊 Resumen

| Necesitas | Comando |
|-----------|---------|
| Ver estado (gratis) | `npm run check-landings` |
| Regenerar fallidas | `npm run retry-landings` |
| Generar todo | `npm run generate-landings` |
| Generar filtrado | `npm run generate-landings ciudad=X` |

---

**Fecha:** Febrero 2026
**Autor:** Sistema de scripts mejorado
