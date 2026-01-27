# Health4Spain - Plataforma de Leads para Extranjeros en España

Aplicación Next.js 14 con diseño Magazine Style para conectar extranjeros con profesionales verificados en España.

## 🚀 Características

- ✅ **Next.js 14** con App Router
- ✅ **TypeScript** para type safety
- ✅ **Tailwind CSS** para estilos
- ✅ **Diseño Magazine Style** editorial y elegante
- ✅ **Multiidioma** preparado (ES, EN, DE, FR)
- ✅ **Blog dinámico** con páginas generadas por slug
- ✅ **Servicios dinámicos** con contenido detallado
- ✅ **Destinos dinámicos** con información completa
- ✅ **Formulario de contacto** funcional
- ✅ **SEO optimizado** con metadata
- ✅ **Responsive** mobile-first

## 📁 Estructura del Proyecto

```
health4spain/
├── src/
│   ├── app/
│   │   ├── es/                       # Versión española
│   │   │   ├── page.tsx              # Home
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx          # Lista de artículos
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Artículo individual
│   │   │   ├── servicios/
│   │   │   │   ├── page.tsx          # Lista de servicios
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Servicio individual
│   │   │   ├── destinos/
│   │   │   │   ├── page.tsx          # Lista de destinos
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Destino individual
│   │   │   ├── contacto/
│   │   │   │   └── page.tsx          # Formulario contacto
│   │   │   ├── sobre-nosotros/
│   │   │   │   └── page.tsx          # About
│   │   │   └── profesionales/
│   │   │       └── page.tsx          # Para partners
│   │   ├── en/                       # Versión inglés (pendiente)
│   │   ├── de/                       # Versión alemán (pendiente)
│   │   ├── fr/                       # Versión francés (pendiente)
│   │   ├── globals.css               # Estilos globales
│   │   └── layout.tsx                # Layout raíz
│   └── components/
│       ├── Navigation.tsx            # Navegación principal
│       └── Footer.tsx                # Footer
├── messages/                         # Traducciones (pendiente completar)
│   ├── es.json
│   └── en.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en desarrollo:**
```bash
npm run dev
```

3. **Abrir en navegador:**
```
http://localhost:3000
```

La aplicación por defecto cargará en `/es` (español).

## 📄 Páginas Creadas (Español)

### Páginas Principales
- ✅ **/** - Home con hero, stats, perfiles, servicios y CTA
- ✅ **/blog** - Lista de artículos del blog
- ✅ **/blog/[slug]** - Artículo individual con contenido completo
- ✅ **/servicios** - Lista de servicios disponibles
- ✅ **/servicios/[slug]** - Detalles de cada servicio (seguros, abogados, inmobiliarias, gestorías)
- ✅ **/destinos** - Lista de ciudades
- ✅ **/destinos/[slug]** - Info completa de cada ciudad (Torrevieja, Alicante, Murcia)
- ✅ **/contacto** - Formulario de contacto funcional
- ✅ **/sobre-nosotros** - Información de la empresa
- ✅ **/profesionales** - Página para partners/profesionales

## 🎨 Diseño

El diseño está basado en **Magazine Style** con:
- Tipografías: **Lora** (serif) para títulos + **Work Sans** (sans-serif) para texto
- Color accent: **#c7956d** (dorado/bronce)
- Estética editorial limpia y profesional
- Espacios generosos y legibilidad óptima
- Borders sutiles y sombras suaves

## 🔄 Próximos Pasos

### Idiomas
- [ ] Replicar toda la estructura en `/en` (inglés)
- [ ] Replicar toda la estructura en `/de` (alemán)
- [ ] Replicar toda la estructura en `/fr` (francés)
- [ ] Completar archivos de traducciones en `/messages`

### Contenido Dinámico
- [ ] Conectar con CMS o base de datos para artículos del blog
- [ ] Sistema de gestión de contenido para servicios
- [ ] Base de datos de profesionales verificados
- [ ] Sistema de leads y CRM

### Funcionalidades
- [ ] Implementar envío real del formulario de contacto (API endpoint)
- [ ] Sistema de búsqueda de artículos
- [ ] Filtros en servicios y destinos
- [ ] Testimonios de clientes
- [ ] Páginas legales (Privacidad, Términos, Cookies)
- [ ] Selector de idioma en navegación
- [ ] Sitemap automático
- [ ] robots.txt

### SEO & Performance
- [ ] Metadatos dinámicos por página
- [ ] Open Graph tags
- [ ] Schema.org structured data
- [ ] Optimización de imágenes (next/image)
- [ ] Lazy loading components
- [ ] Analytics (Google Analytics / Plausible)

### Deployment
- [ ] Configurar para Vercel o similar
- [ ] Variables de entorno
- [ ] Domain setup
- [ ] SSL certificate

## 📝 Notas de Desarrollo

### Datos de Ejemplo
Actualmente todas las páginas dinámicas (`[slug]`) usan datos hardcodeados en el mismo componente. Para producción, deberías:

1. **Crear un servicio de contenido:**
```typescript
// src/lib/content.ts
export async function getBlogPost(slug: string) {
  // Fetch from CMS, database, or markdown files
}
```

2. **Conectar con base de datos:**
```typescript
// Ejemplo con Prisma
const post = await prisma.post.findUnique({
  where: { slug }
});
```

3. **O usar archivos Markdown:**
```typescript
import fs from 'fs';
import matter from 'gray-matter';

export function getPostBySlug(slug: string) {
  const fileContents = fs.readFileSync(`content/posts/${slug}.md`, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
}
```

### Formulario de Contacto
El formulario actual simula el envío. Para implementar realmente:

1. **Crear API route:**
```typescript
// src/app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Enviar email, guardar en DB, etc.
}
```

2. **Conectar con servicio de email:**
- Resend
- SendGrid
- AWS SES
- Nodemailer

## 🐛 Troubleshooting

### Error: Module not found
```bash
npm install --legacy-peer-deps
```

### Tailwind no se aplica
Verificar que `globals.css` esté importado en `layout.tsx`

### Imágenes no cargan
Agregar dominio a `next.config.js`:
```javascript
images: {
  domains: ['images.unsplash.com'],
}
```

## 📧 Contacto

Para dudas sobre el proyecto: Narciso Pardo Buendía

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2026
