# 🔍 Auditoría Completa - Health4Spain

**Fecha:** 12 Febrero 2026  
**Alcance:** Funcionamiento, flujo de datos, CTAs, servicios, documentación

---

## 1. ARQUITECTURA DE RUTAS

### Sitio Público (`/es/*`)

| Ruta | Componente | Datos | Descripción |
|------|------------|-------|-------------|
| `/` | redirect | - | Redirige a `/es` |
| `/es` | page.tsx | **Estático** | Home. AUDIENCIAS, SERVICIOS, CIUDADES_MURCIA, CIUDADES_ALICANTE hardcodeados |
| `/es/destinos` | destinos/page.tsx | **Supabase** getCiudades() | Lista 19 ciudades agrupadas por comunidad |
| `/es/destinos/[slug]` | destinos/[slug]/page.tsx | **Supabase** landing_pages, ciudades_contenido, ciudades_catalogo | Landing servicio×ciudad O página de ciudad |
| `/es/servicios` | servicios/page.tsx | **Supabase** getServicios() | Lista 4 servicios |
| `/es/servicios/[slug]` | servicios/[slug]/page.tsx | **Supabase** landing_pages, servicios_catalogo | Landing servicio×ciudad O página servicio general |
| `/es/blog` | blog/page.tsx | **Supabase** blog_posts | Lista posts published |
| `/es/blog/[slug]` | blog/[slug]/page.tsx | **Supabase** blog_posts | Post individual |
| `/es/contacto` | contacto/page.tsx | **Supabase** getCiudades() | Página contacto con mapa |
| `/es/solicitar` | solicitar/page.tsx | **Supabase** getCiudades() | Formulario multi-paso (4 pasos). LandingFormEmbed en landings |
| `/es/sobre-nosotros` | sobre-nosotros/page.tsx | Estático | |
| `/es/profesionales` | profesionales/page.tsx | Estático | |
| `/es/presupuesto` | presupuesto/page.tsx | Estático | |
| `/es/privacidad` | privacidad/page.tsx | Estático | |
| `/es/cookies` | cookies/page.tsx | Estático | |
| `/es/terminos` | terminos/page.tsx | Estático | |
| `/es/sitemap-html` | sitemap-html/page.tsx | **Supabase** blog_posts, servicios, ciudades, landing_pages | Mapa del sitio HTML |

### Rutas `/en`, `/de`, `/fr` — Placeholder

- Páginas básicas que enlazan a `/es/contacto`
- **No hay contenido multiidioma real** (solo enlaces)

### Admin (`/administrator/*`)

- Layout propio, login Supabase Auth
- Leads, blog, media, servicios, destinos, landings

---

## 2. FUENTES DE DATOS

### Supabase (BD)

| Tabla | Uso | Lectura/Escritura |
|-------|-----|-------------------|
| `ciudades_catalogo` | 19 ciudades | R: destinos, contacto, footer, sitemap |
| `servicios_catalogo` | 4 servicios | R: servicios, footer, sitemap |
| `landing_pages` | 76 landings (servicio×ciudad) | R: servicios/[slug], destinos/[slug], sitemap |
| `ciudades_contenido` | Contenido extendido ciudades | R: destinos/[slug] cuando es solo ciudad |
| `blog_posts` | Artículos | R: blog, sitemap. W: admin |
| `leads` | Solicitudes de contacto | R: admin. W: POST /api/leads |

### Datos estáticos (hardcodeados)

| Ubicación | Datos | Duplicación |
|-----------|-------|-------------|
| `page.tsx` (Home) | AUDIENCIAS, SERVICIOS, CIUDADES_MURCIA, CIUDADES_ALICANTE | Sí — ciudades duplican ciudades_catalogo |
| `ContactFormClient.tsx` | SERVICIOS, PRESUPUESTOS, URGENCIAS, PAISES | Servicios duplican servicios_catalogo |
| `servicios/[slug]/page.tsx` | SERVICIOS_DATA (seguros, abogados, inmobiliarias, gestorías) | Fallback cuando slug no es landing |
| `constants.ts` | CITIES, SERVICES, SOCIAL_LINKS | Referencia/duplicación |
| `Footer.tsx` | footerLinks.destinos (4 ciudades), socialLinks | Destinos hardcodeados |

### Constantes

- `HERO_IMAGE_URL` — Unsplash (constants.ts)
- `SITE_CONFIG` — url, email, phone (constants.ts)

---

## 3. FLUJO DE CTAs (Solicitar / Contacto)

**Todos los CTAs conducen a `/es/contacto`** con query params opcionales para pre-rellenar:

| Origen | URL | Parámetros |
|--------|-----|------------|
| Home hero | `/es/contacto` | - |
| Home servicios | `/es/contacto?servicio=seguros` | servicio |
| Home perfiles | `/es/contacto?perfil=jubilados` | perfil |
| Home destinos | `/es/contacto?ciudad=murcia` | ciudad |
| Destinos lista | `/es/contacto?ciudad=murcia` | ciudad |
| Servicios lista | `/es/contacto?servicio=abogados` | servicio |
| Landing página | `/es/contacto?slug=abogados-murcia` | slug |
| Landing ciudad | `/es/contacto?ciudad=murcia` | ciudad |
| StickyCTA | `/es/contacto` | - |
| Blog, footer, etc. | `/es/contacto` | - |

**ContactFormClient** lee `useSearchParams()` para pre-rellenar:
- `servicio` → Step 1
- `ciudad` → Step 2
- `perfil` → (no usado en lógica actual)
- `slug` → Parsea servicio-ciudad del slug (ej: abogados-murcia)

---

## 4. FLUJO DE LEADS

```
Usuario completa formulario
    ↓
ContactFormClient handleSubmit()
    ↓
POST /api/leads
    ↓
Validación: nombre, email, telefono, servicio, ciudad
Anti-spam: 1 lead mismo email+servicio por hora
    ↓
INSERT INTO leads (Supabase)
    ↓
Score calculado (presupuesto, urgencia, etc.)
    ↓
Respuesta: "Te contactaremos en menos de 24 horas"
```

**Campos del lead:** nombre, email, telefono, servicio, ciudad, pais_origen, ciudad_origen, presupuesto, urgencia, mensaje, landing_page, utm_source/medium/campaign, score, status

---

## 5. LÓGICA DE RUTAS DINÁMICAS

### `/es/servicios/[slug]`

1. **Slug con guión** (ej: `abogados-murcia`) → Busca en `landing_pages` → Muestra landing
2. **Slug sin guión** (ej: `abogados`) → Busca en `servicios_catalogo` → Muestra página servicio con SERVICIOS_DATA

### `/es/destinos/[slug]`

1. **Slug con guión** (ej: `abogados-murcia`) → Busca en `landing_pages` → Muestra landing
2. **Slug solo ciudad** (ej: `murcia`) → Busca en `ciudades_catalogo` + `ciudades_contenido` → Muestra página ciudad

---

## 6. LAYOUT Y COMPONENTES GLOBALES

**Layout `/es`** (`src/app/es/layout.tsx`):

```
<Navigation />     ← ÚNICO navbar. NavLinks estáticos.
<main>{children}</main>
<Footer />         ← getServicios() + links estáticos + enlace "Modificar consentimiento cookies"
<StickyCTA />      ← Oculto en /contacto. Siempre /es/contacto
<BackToTop />      ← Botón scroll arriba
<CookieConsent />  ← Banner GDPR: Esenciales, Análisis, Marketing. Reabre desde footer.
```

### Componentes no usados

- `Header.tsx` — **No se usa** (legacy). Layout usa Navigation.tsx

---

## 7. APIs

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/leads` | Público | Crear lead |
| GET | `/api/leads` | Admin | Listar leads |
| GET | `/api/ciudades` | Público | Lista ciudades |
| GET | `/api/blog` | Público | Posts |
| GET/POST/PUT/DELETE | `/api/blog/[...]` | Admin | CRUD blog |
| GET | `/api/landings` | Público | Landings |
| POST | `/api/upload` | Admin | Subir imagen |

---

## 8. SITEMAP

**sitemap.ts** genera:
- Páginas estáticas
- Landings de `landing_pages` → `/es/servicios/{slug}` y `/es/destinos/{slug}`
- Posts de `blog_posts` → `/es/blog/{slug}`

**⚠️ No incluye:**
- Páginas de ciudad puras: `/es/destinos/murcia` (desde ciudades_catalogo)
- Páginas de servicio puras: `/es/servicios/abogados` (desde servicios_catalogo)

---

## 9. MEJORAS SUGERIDAS

1. **Sitemap**: Añadir ciudades_catalogo y servicios_catalogo al sitemap
2. **Home**: Migrar ciudades/servicios a getCiudades()/getServicios() para evitar duplicación
3. **Footer destinos**: Usar getCiudades() o getCiudadesDestacadas() en lugar de 4 hardcodeados
4. **Email leads**: Implementar notificación (TODO en /api/leads)
5. **Header.tsx**: Eliminar si no se va a usar, o documentar propósito

---

## 10. RESUMEN EJECUTIVO

| Aspecto | Estado |
|---------|--------|
| Rutas públicas | ✅ Funcionales |
| Datos Supabase | ✅ Integrados correctamente |
| CTAs → Contacto | ✅ Todos unificados |
| Flujo de leads | ✅ Funcional, falta email |
| Cookies GDPR | ✅ Banner con categorías, enlace footer |
| Duplicación datos | ⚠️ Home + constants duplican BD |
| Sitemap | ⚠️ Faltan ciudades/servicios |
| Navbar | ✅ Solo Navigation.tsx |
| Documentación | ✅ Actualizada |

---

**Archivo:** `docs/AUDITORIA.md`  
**Mantener actualizado** al cambiar rutas, datos o CTAs.
