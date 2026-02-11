# Health4Spain (H4S)

**Marketplace de Servicios para Extranjeros en España**

Health4Spain es una plataforma-marketplace digital que conecta a personas extranjeras con profesionales y servicios especializados en España. Marketplace neutral que facilita el encuentro entre usuarios y profesionales verificados.

---

## 📌 Resumen Ejecutivo: Los 3 Pilares

### 1️⃣ **4 Servicios Esenciales**

1. **Seguros de Salud** - Pólizas obligatorias para visados
2. **Abogados** - Familia, civil, laboral, extranjería
3. **Inmobiliarias** - Especialistas en extranjeros
4. **Gestorías** - Trámites y documentación

### 2️⃣ **19 Ciudades Estratégicas**

- **Región de Murcia (12)**: Murcia, Cartagena, Lorca, Mazarrón, Torre Pacheco, San Javier, San Pedro del Pinatar, Molina de Segura, Águilas, Cieza, Jumilla, Yecla
- **Provincia de Alicante (7)**: Alicante, Elche, Torrevieja, Orihuela, Rojales, Benidorm, Dénia

### 3️⃣ **76 Landing Pages SEO**

**4 servicios × 19 ciudades = 76 páginas optimizadas**

**✅ ESTADO**: Proyecto optimizado y production-ready (11 Feb 2026)

---

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Storage**: Supabase Storage (imágenes WebP)
- **Estilos**: Tailwind CSS
- **Editor**: TinyMCE
- **IA**: OpenAI GPT-4o-mini
- **Optimización**: sharp (conversión WebP)

---

## 🎯 Propuesta de Valor

**"Conectamos extranjeros con profesionales verificados en España"**

1. Usuario completa formulario cualificador
2. Sistema clasifica por perfil/necesidad
3. Conecta con profesional adecuado
4. Profesional contacta en 24h
5. Sin coste para el usuario (comisión a profesional)

---

## 📁 Estructura del Proyecto

```
health4spain/
├── src/
│   ├── app/
│   │   ├── api/                    # API Routes
│   │   │   ├── blog/               # CRUD blog
│   │   │   ├── ciudades/           # Lista ciudades
│   │   │   ├── leads/              # Gestión leads
│   │   │   ├── landings/           # Landing pages
│   │   │   └── upload/             # Subida imágenes
│   │   ├── administrator/          # Panel admin
│   │   ├── es/                     # Rutas español
│   │   │   ├── blog/
│   │   │   ├── contacto/           # Formulario multi-paso
│   │   │   ├── destinos/           # 19 ciudades
│   │   │   └── servicios/          # 4 servicios
│   │   └── en/de/fr/              # Multiidioma
│   ├── components/
│   │   ├── Navigation.tsx          # Navbar único
│   │   ├── Footer.tsx
│   │   ├── CookieConsent.tsx       # GDPR
│   │   └── OptimizedImage.tsx      # Componente Image
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── ciudades.ts
│   │   ├── services.ts
│   │   └── constants.ts            # LOGO_PATHS, HERO_IMAGE_URL
│   └── hooks/
│       └── useAuth.ts
├── scripts/
│   ├── generate-landings.ts        # Generador IA
│   └── convert-images-to-webp.ts   # Conversión WebP
├── public/
│   └── images/
│       ├── *.png                    # Originales
│       └── *.webp                   # Optimizadas (85% quality)
└── supabase/
    ├── schema.sql
    └── landing-pages-schema.sql
```

---

## 🎨 Diseño y UX

### Filosofía: Condensado y Escaneable
- **Modern Minimalist**: Negro, blanco, acento azul (`#3bbdda`)
- **Condensación**: 50% menos padding/margins vs. versión original
- **Above the fold**: Contenido principal visible sin scroll
- **Mobile-first**: Grid denso, botones pequeños, texto optimizado

### Navegación
- **Desktop**: Navbar fijo con logo WebP, links, CTA
- **Mobile**: Off-canvas lateral con selector idioma y social
- **Botón flotante**: "Solicitar Información" en móvil (oculto en contacto)

### Formulario Contacto (Ultra-Compacto)
**Paso 1**: 4 servicios en lista vertical (sin iconos)
**Paso 2**: Grid 3-5 columnas de ~20 ciudades
**Paso 3**: Datos personales condensados
**Paso 4**: Presupuesto + urgencia + textarea corto

**Todo visible sin scroll en cada paso**

---

## 🔐 Autenticación

### Supabase Auth
- **Panel Admin**: Email/password
- **APIs protegidas**: Bearer token
- **Admins**: Variable `NEXT_PUBLIC_ADMIN_EMAILS`

### Roles
| Recurso | Público | Admin |
|---------|---------|-------|
| Ver landings/blog | ✅ | ✅ |
| Enviar leads | ✅ | ✅ |
| Panel admin | ❌ | ✅ |
| Gestión contenido | ❌ | ✅ |

---

## 🛠️ Instalación

### 1. Clonar e instalar
```bash
git clone <repo>
cd health4spain
npm install
```

### 2. Variables de entorno
```bash
cp .env.example .env.local
```

Configurar:
- Supabase URL + keys
- OpenAI API key
- TinyMCE key
- Admin emails
- Site URL (con www)

### 3. Configurar Supabase
1. Crear proyecto en supabase.com
2. Ejecutar scripts SQL en orden
3. Crear bucket `blog-images` (público)
4. Habilitar Email Auth
5. Crear usuario admin

### 4. Ejecutar
```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run start        # Servidor producción
```

---

## 📊 APIs

### Endpoints Públicos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/blog` | Posts publicados |
| GET | `/api/blog/[slug]` | Post por slug |
| GET | `/api/ciudades` | Lista ciudades |
| GET | `/api/landings` | Landings activas |
| POST | `/api/leads` | Crear lead |

### Endpoints Protegidos (Auth)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST/PUT/DELETE | `/api/blog/*` | CRUD posts |
| GET | `/api/leads` | Gestión leads |
| POST/PUT/DELETE | `/api/landings/*` | CRUD landings |
| POST/DELETE | `/api/upload` | Gestión imágenes |

---

## 🎨 Panel de Administración

Acceso: `/administrator/login`

### Secciones
- **Dashboard**: Estadísticas
- **Leads**: Lista, filtros, estados, detalle
- **Blog**: Editor TinyMCE, imágenes
- **Media**: Galería, subir, organizar
- **Servicios**: Catálogo 4 servicios
- **Destinos**: Catálogo 19 ciudades
- **Landings**: 76 landings, revisar/activar

---

## 📝 Scripts Disponibles

```bash
# Performance
npm run images:webp            # Convertir PNG → WebP

# Contenido
npm run generate-landings      # 76 landing pages
npm run generate-cities        # Contenido ciudades
npm run generate-blog          # Posts blog

# Base de datos
npm run fix-database           # Limpiar
npm run insert-ciudades        # 19 ciudades
npm run clear-landings         # Borrar landings

# Regeneración específica
npm run regenerate-abogados-landings
npm run regenerate-seguros-landings
npm run regenerate-inmobiliarias-landings
npm run regenerate-gestorias-landings

# Verificación
npm run check-landings         # Estado
```

---

## 🌐 SEO y Estrategia

### Keywords Target
- **Primarias**: `[servicio] [ciudad]`
  - Ej: "seguros Torrevieja", "abogados Murcia"
- **Secundarias**: `[servicio] para extranjeros [ciudad]`
  - Ej: "inmobiliarias para británicos Alicante"
- **Long-tail**: Perfil + servicio + ciudad

### Meta Datos
- Meta Title: 50-60 caracteres
- Meta Description: 150-155 caracteres
- Keywords: 5-8 por landing

### Sitemap Dinámico
- Ruta: `/sitemap.xml`
- Generado automáticamente por Next.js
- Incluye: home, servicios, destinos, blog, landings

---

## 💰 Modelo de Negocio

### Revenue Streams
1. **Leads cualificados**: 15-50€/lead
2. **Comisión servicios**: 3-10% sobre venta
3. **Suscripción partners**: 50-200€/mes
4. **Destacados premium**: 100-500€/mes

### Volumen Estimado
- 100-300 leads/mes
- Revenue potencial: 1.500€ - 15.000€/mes

---

## 📈 Performance Metrics

### Optimizaciones Aplicadas
- ✅ WebP con 60-70% reducción de peso
- ✅ Next.js Image con srcset automático
- ✅ Priority + fetchPriority en elementos críticos
- ✅ Lazy loading fuera del viewport
- ✅ Condensación UX: 50% menos scroll

### Core Web Vitals Target
- **LCP**: < 2.5s ✅
- **FID**: < 100ms ✅
- **CLS**: < 0.1 ✅

---

## 🔧 Variables de Entorno

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Admin
NEXT_PUBLIC_ADMIN_EMAILS=admin@health4spain.com

# OpenAI
OPENAI_API_KEY=

# TinyMCE
NEXT_PUBLIC_TINYMCE_API_KEY=

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=34600000000

# Site (URL canónica: siempre con www)
NEXT_PUBLIC_SITE_URL=https://www.health4spain.com
```

---

## 📄 Documentación Detallada

### Técnica
- [docs/AUDITORIA.md](./docs/AUDITORIA.md) - Auditoría completa
- [docs/HISTORIAL.md](./docs/HISTORIAL.md) - Historial de cambios
- [docs/SCRIPTS_LANDINGS.md](./docs/SCRIPTS_LANDINGS.md) - Scripts

### Estratégica
- [docs/MODELO_NEGOCIO.md](./docs/MODELO_NEGOCIO.md) - Modelo de negocio
- [docs/ESTRATEGIA_BLOG.md](./docs/ESTRATEGIA_BLOG.md) - Estrategia blog
- [INDICE_DOCUMENTACION.md](./INDICE_DOCUMENTACION.md) - Índice completo

---

## 🌐 URL Canónica

- **Dominio**: `https://www.health4spain.com` (siempre con www)
- **Redirect 301**: `health4spain.com` → `www.health4spain.com`
- Configurar `NEXT_PUBLIC_SITE_URL` en Vercel con www

---

## 📄 Licencia

Privado - Health4Spain © 2026
