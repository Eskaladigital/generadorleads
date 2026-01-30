# Health4Spain

**Plataforma de generación de leads para expatriados en España**

Conectamos a residentes internacionales con profesionales españoles verificados: abogados, asesores fiscales, inmobiliarias, seguros, dentistas y más.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Storage**: Supabase Storage
- **Estilos**: Tailwind CSS
- **Editor**: TinyMCE
- **IA**: OpenAI GPT-4o-mini (generación de landings)

## 📁 Estructura del Proyecto

```
health4spain/
├── src/
│   ├── app/
│   │   ├── api/                    # API Routes
│   │   │   ├── blog/               # CRUD blog posts
│   │   │   ├── leads/              # Gestión de leads
│   │   │   ├── landings/           # Landing pages
│   │   │   └── upload/             # Subida de imágenes
│   │   ├── administrator/          # Panel de administración
│   │   │   ├── login/              # Login admin
│   │   │   ├── leads/              # Gestión de leads
│   │   │   ├── blog/               # Editor de posts
│   │   │   ├── media/              # Gestor de imágenes
│   │   │   └── landings/           # Gestión de landings
│   │   ├── es/                     # Rutas en español
│   │   │   ├── blog/               # Blog público
│   │   │   └── destinos/           # Landing pages
│   │   └── en/                     # Rutas en inglés
│   ├── components/
│   │   ├── admin/                  # Componentes del admin
│   │   └── ...                     # Componentes públicos
│   ├── hooks/
│   │   └── useAuth.ts              # Hook de autenticación
│   └── lib/
│       ├── supabase.ts             # Cliente Supabase
│       ├── auth.ts                 # Validación de auth en APIs
│       └── types.ts                # TypeScript types
├── supabase/
│   ├── schema.sql                  # Esquema de base de datos
│   ├── landing-pages-schema.sql    # Tabla de landings
│   ├── rls-policies.sql            # Políticas RLS
│   └── storage-policies.sql        # Políticas de Storage
├── scripts/
│   └── generate-landings.ts        # Generador de landings con IA
├── docs/
│   ├── ESTRATEGIA_BLOG.md          # Estrategia de contenido
│   ├── MODELO_NEGOCIO.md           # Modelo de negocio
│   └── HISTORIAL.md                # Historial de cambios
└── public/                         # Assets estáticos
```

## 🔐 Sistema de Autenticación

### Autenticación Unificada con Supabase Auth

Todo el sistema usa **Supabase Auth** con JWT:

| Contexto | Método |
|----------|--------|
| Panel Admin | Email/password → Supabase Auth |
| APIs protegidas | Bearer token en header |

### Roles y Permisos

| Recurso | Visitante | Admin |
|---------|-----------|-------|
| Ver blog posts publicados | ✅ | ✅ |
| Ver landing pages activas | ✅ | ✅ |
| Enviar formulario de lead | ✅ | ✅ |
| Ver imágenes públicas | ✅ | ✅ |
| Acceder a `/administrator` | ❌ | ✅ |
| Crear/editar posts | ❌ | ✅ |
| Ver/gestionar leads | ❌ | ✅ |
| Subir/borrar imágenes | ❌ | ✅ |
| Editar landings | ❌ | ✅ |

### Configuración de Admins

Los administradores se definen en la variable de entorno:

```env
NEXT_PUBLIC_ADMIN_EMAILS=admin@health4spain.com,otro@email.com
```

## 🛠️ Instalación

### 1. Clonar e instalar dependencias

```bash
git clone <repo>
cd health4spain
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales.

### 3. Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar los scripts SQL en orden:
   - `supabase/schema.sql`
   - `supabase/landing-pages-schema.sql`
   - `supabase/rls-policies.sql`
   - `supabase/storage-policies.sql`
3. Crear bucket `blog-images` (público)
4. Habilitar Email Auth en Authentication > Providers
5. Crear usuario admin en Authentication > Users

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

## 📊 APIs

### Endpoints Públicos (sin auth)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/blog` | Listar posts publicados |
| GET | `/api/blog/[slug]` | Obtener post por slug |
| GET | `/api/landings` | Listar landings activas |
| GET | `/api/landings/[slug]` | Obtener landing |
| POST | `/api/leads` | Crear nuevo lead |

### Endpoints Protegidos (requieren Supabase Auth)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/blog` | Crear post |
| PUT | `/api/blog/[slug]` | Actualizar post |
| DELETE | `/api/blog/[slug]` | Eliminar post |
| GET | `/api/leads` | Listar leads |
| POST | `/api/landings` | Crear landing |
| PUT/PATCH | `/api/landings/[slug]` | Actualizar landing |
| DELETE | `/api/landings/[slug]` | Eliminar landing |
| POST | `/api/upload` | Subir imagen |
| DELETE | `/api/upload` | Eliminar imagen |

### Uso de APIs protegidas

```typescript
// Desde el frontend con useAuth
const { getAccessToken } = useAuth();
const token = await getAccessToken();

const response = await fetch('/api/leads', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

## 🎨 Panel de Administración

Acceso: `/administrator/login`

### Secciones

- **Dashboard**: Estadísticas de leads, posts y landings
- **Leads**: Lista, filtros, cambio de estado, detalle
- **Blog**: Lista de posts, crear/editar con TinyMCE
- **Media**: Galería de imágenes, subir, organizar en carpetas
- **Landings**: Lista de 120 landings, marcar revisadas/activas

## 🤖 Generación de Landings con IA

120 landing pages (6 servicios × 20 ciudades) generadas con GPT-4o-mini.

```bash
# Configurar OPENAI_API_KEY en .env.local
npm run generate-landings
```

Ver `scripts/README.md` para más detalles.

## 📝 Scripts Disponibles

```bash
npm run dev              # Desarrollo
npm run build            # Build producción
npm run start            # Servidor producción
npm run lint             # Linter
npm run generate-landings # Generar landings con IA
```

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

# Site
NEXT_PUBLIC_SITE_URL=https://health4spain.com
```

## 📄 Licencia

Privado - Health4Spain © 2025
