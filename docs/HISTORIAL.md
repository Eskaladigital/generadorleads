# Historial de Desarrollo - Health4Spain

## Versión 2.3.0 (Enero 2025)

### Panel de Administración Completo

**Autenticación unificada con Supabase Auth:**
- Login en `/administrator/login` con email/password
- Verificación de emails autorizados via `NEXT_PUBLIC_ADMIN_EMAILS`
- JWT tokens para autenticación en APIs
- Protección de rutas con `ProtectedRoute` component

**Dashboard (`/administrator`):**
- Estadísticas: total leads, leads del mes, posts publicados, landings revisadas
- Gráficos: leads por servicio (top 5), por ciudad (top 5), por estado
- Tabla de últimos 5 leads

**Gestión de Leads (`/administrator/leads`):**
- Lista paginada con filtros (estado, servicio, ciudad, búsqueda)
- Modal de detalle con toda la información del lead
- Cambio de estado: nuevo → contactado → cualificado → asignado → convertido/perdido
- Indicadores de score y urgencia

**Editor de Blog (`/administrator/blog`):**
- Lista de posts con filtros (estado, categoría, búsqueda)
- Editor completo con TinyMCE
- Gestión de imagen destacada
- SEO: meta título, meta descripción
- Estados: borrador, publicado, archivado

**Gestor de Medios (`/administrator/media`):**
- Galería de imágenes del bucket `blog-images`
- Subida drag & drop o por botón
- Creación de carpetas para organizar
- Copiar URL, eliminar imágenes
- Integrado en el editor de blog

**Gestión de Landings (`/administrator/landings`):**
- Lista de 120 landing pages
- Filtros por servicio, estado de revisión
- Toggle de revisado/activo
- Estadísticas de progreso

### APIs Actualizadas

Todas las APIs protegidas ahora usan **Supabase Auth JWT**:

```
POST /api/blog          → Requiere Bearer token
PUT /api/blog/[slug]    → Requiere Bearer token
DELETE /api/blog/[slug] → Requiere Bearer token
GET /api/leads          → Requiere Bearer token
POST /api/upload        → Requiere Bearer token
DELETE /api/upload      → Requiere Bearer token
POST /api/landings      → Requiere Bearer token
PUT /api/landings/[slug] → Requiere Bearer token
...
```

APIs públicas (sin auth):
- `GET /api/blog` - Posts publicados
- `GET /api/blog/[slug]` - Post individual
- `POST /api/leads` - Crear lead (formulario)
- `GET /api/landings` - Landings activas
- `GET /api/landings/[slug]` - Landing individual

### Archivos Creados

```
src/
├── app/administrator/
│   ├── layout.tsx
│   ├── page.tsx (Dashboard)
│   ├── login/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── leads/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── media/page.tsx
│   └── landings/page.tsx
├── components/admin/
│   ├── ProtectedRoute.tsx
│   └── MediaManager.tsx
├── hooks/
│   └── useAuth.ts
└── lib/
    ├── auth.ts (validación JWT)
    └── supabase.ts (helpers admin)

supabase/
├── rls-policies.sql
└── storage-policies.sql
```

---

## Versión 2.2.0 (Enero 2025)

### Sistema de Landing Pages con IA

**Esquema de base de datos:**
- Tabla `landing_pages` con todos los campos para contenido dinámico
- Soporte para 6 servicios × 20 ciudades = 120 landings

**Script de generación:**
- `scripts/generate-landings.ts` usando OpenAI GPT-4o-mini
- Prompts optimizados para contenido SEO en español
- Coste estimado: ~$1.50-2.50 USD

**Página dinámica:**
- `/es/destinos/[slug]/page.tsx` renderiza las landings
- URL pattern: `/es/destinos/{servicio}-{ciudad}`

### Documentación

**Estructura `/docs`:**
- `ESTRATEGIA_BLOG.md` - Plan de contenido y SEO
- `MODELO_NEGOCIO.md` - Modelo de partners y leads
- `HISTORIAL.md` - Este archivo

**Limpieza:**
- Eliminados 9 archivos markdown redundantes del root
- Consolidada toda la documentación

---

## Versión 2.1.0 (Enero 2025)

### APIs REST

- `/api/blog` - CRUD de posts
- `/api/leads` - Gestión de leads con anti-spam
- `/api/upload` - Subida de imágenes a Supabase Storage

### Base de datos

- Tabla `blog_posts` con soporte multiidioma
- Tabla `leads` con scoring automático
- Índices optimizados para consultas frecuentes

---

## Versión 2.0.0 (Enero 2025)

### Migración a Next.js 15

- App Router con Server Components
- TypeScript estricto
- Tailwind CSS 3.4

### Estructura inicial

- Páginas públicas en `/es` y `/en`
- Componentes reutilizables
- Sistema de formularios con validación

---

## Notas Técnicas

### Next.js 15

- Params en rutas dinámicas son `Promise`: `const { slug } = await params`
- Usar `'use client'` para componentes con hooks

### Supabase

- Cliente público: `supabase` (con anon key)
- Cliente servidor: `createServerSupabaseClient()` (con service role)
- Service role bypasa RLS

### Autenticación

- Admin emails en `NEXT_PUBLIC_ADMIN_EMAILS`
- JWT verificado con `supabase.auth.getUser(token)`
- Hook `useAuth()` para frontend
