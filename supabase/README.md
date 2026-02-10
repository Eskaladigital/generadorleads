# Configuración de Supabase para Health4Spain

## 1. Crear Proyecto

1. Ir a [supabase.com](https://supabase.com) y crear nuevo proyecto
2. Guardar las credenciales (Settings > API):
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service role key → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Ejecutar Esquemas SQL

En **SQL Editor**, ejecutar en orden:

```
1. schema.sql              # Esquema principal (leads, blog_posts)
2. landing-pages-schema.sql # Landings + ciudades_catalogo + servicios_catalogo
3. 01-limpiar-ciudades.sql  # (Opcional) Limpia ciudades no estratégicas
4. 02-insertar-19-ciudades.sql  # 19 ciudades: 12 Murcia + 7 Alicante
5. 03-actualizar-abogados.sql   # Abogados general (no solo extranjería)
6. rls-policies.sql         # Políticas RLS
7. storage-policies.sql     # Políticas Storage
```

## 3. Configurar Storage

### Crear bucket

1. Dashboard > **Storage** > **New bucket**
2. Nombre: `blog-images`
3. **Public bucket**: ✅ ON
4. Click **Create bucket**

### Aplicar políticas

Ejecutar `supabase/storage-policies.sql` en SQL Editor.

**⚠️ IMPORTANTE**: Cambiar los emails en el SQL por los de tus administradores.

## 4. Configurar Autenticación

### Habilitar Email Auth

1. **Authentication** > **Providers**
2. Asegurar que **Email** está habilitado

### Crear usuario admin

1. **Authentication** > **Users** > **Add user**
2. Email: debe coincidir con `NEXT_PUBLIC_ADMIN_EMAILS`
3. Password: contraseña segura
4. Click **Create user**

## 5. Variables de Entorno

Añadir a `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_ADMIN_EMAILS=tu-email@gmail.com
```

## Archivos SQL

| Archivo | Descripción |
|---------|-------------|
| `schema.sql` | Tablas principales (leads, blog_posts) |
| `landing-pages-schema.sql` | Tabla landing_pages, ciudades_catalogo, servicios_catalogo |
| `01-limpiar-ciudades.sql` | Limpieza de ciudades no estratégicas |
| `02-insertar-19-ciudades.sql` | Las 19 ciudades iniciales (12 Murcia + 7 Alicante) |
| `03-actualizar-abogados.sql` | Actualiza abogados a formato general (no solo extranjería) |
| `rls-policies.sql` | Row Level Security para tablas |
| `storage-policies.sql` | Políticas para bucket blog-images |

## Troubleshooting

### "Invalid API key"
- Verificar keys en `.env.local`
- Reiniciar servidor (`npm run dev`)

### No puedo hacer login
- Crear usuario en Authentication > Users
- Email debe coincidir con `NEXT_PUBLIC_ADMIN_EMAILS`

### Las imágenes no se suben
- Verificar que bucket `blog-images` existe y es público
- Ejecutar políticas de `storage-policies.sql`
- Cambiar emails en las políticas por los correctos

### Error 401 en APIs
- Verificar que el token se envía en Authorization header
- Verificar email en `NEXT_PUBLIC_ADMIN_EMAILS`
