/**
 * Script de verificación de conexión a Supabase
 * 
 * Uso:
 *   npm run test-supabase
 * 
 * Este script verifica:
 * 1. Que las variables de entorno estén configuradas
 * 2. Que la conexión a Supabase funcione
 * 3. Que las tablas principales existan
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🔍 Verificando configuración de Supabase...\n');

// Verificar variables de entorno
console.log('1. Variables de entorno:');
console.log(`   ✅ NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓ Configurada' : '✗ Falta'}`);
console.log(`   ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓ Configurada' : '✗ Falta'}`);
console.log(`   ✅ SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✓ Configurada' : '✗ Falta'}`);

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.error('\n❌ Error: Faltan variables de entorno obligatorias');
  console.log('Asegúrate de tener el archivo .env.local configurado');
  process.exit(1);
}

// Crear cliente con anon key (frontend)
const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

// Crear cliente con service role key (backend)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testConnection() {
  console.log('\n2. Probando conexión con Anon Key (frontend):');
  
  try {
    const { data, error } = await supabaseAnon
      .from('blog_posts')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log(`   ⚠️ Tabla blog_posts: ${error.message}`);
    } else {
      console.log('   ✅ Conexión exitosa - Tabla blog_posts accesible');
    }
  } catch (err) {
    console.error(`   ❌ Error de conexión: ${err}`);
  }

  console.log('\n3. Probando conexión con Service Role Key (backend):');
  
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log(`   ⚠️ Tabla blog_posts: ${error.message}`);
    } else {
      console.log('   ✅ Conexión exitosa - Tabla blog_posts accesible');
    }
  } catch (err) {
    console.error(`   ❌ Error de conexión: ${err}`);
  }

  console.log('\n4. Verificando tablas principales:');
  
  const tables = [
    'blog_posts',
    'landing_pages',
    'leads',
    'ciudades_catalogo'
  ];

  for (const table of tables) {
    try {
      const { data, error, count } = await supabaseAdmin
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        if (error.message.includes('does not exist')) {
          console.log(`   ⚠️ ${table}: No existe - Ejecuta los scripts SQL`);
        } else {
          console.log(`   ⚠️ ${table}: ${error.message}`);
        }
      } else {
        console.log(`   ✅ ${table}: Existe y es accesible (${count || 0} registros)`);
      }
    } catch (err) {
      console.error(`   ❌ ${table}: Error desconocido`);
    }
  }

  console.log('\n5. Verificando storage buckets:');
  
  try {
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();
    
    if (error) {
      console.log(`   ⚠️ Error al listar buckets: ${error.message}`);
    } else {
      const requiredBuckets = ['blog-images', 'media'];
      
      for (const bucketName of requiredBuckets) {
        const exists = buckets?.some(b => b.name === bucketName);
        if (exists) {
          console.log(`   ✅ ${bucketName}: Existe`);
        } else {
          console.log(`   ⚠️ ${bucketName}: No existe - Créalo en Supabase`);
        }
      }
    }
  } catch (err) {
    console.error(`   ❌ Error al verificar storage: ${err}`);
  }

  console.log('\n6. Verificando autenticación:');
  
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
      console.log(`   ⚠️ Error al listar usuarios: ${error.message}`);
    } else {
      console.log(`   ✅ Auth configurado - ${data?.users?.length || 0} usuarios registrados`);
    }
  } catch (err) {
    console.error(`   ❌ Error al verificar auth: ${err}`);
  }

  console.log('\n✅ Verificación completada!\n');
  console.log('📝 Próximos pasos:');
  console.log('   1. Si faltan tablas, ejecuta los scripts SQL en /supabase/');
  console.log('   2. Si faltan buckets, créalos en Supabase Storage');
  console.log('   3. Configura Google OAuth en Supabase Authentication');
  console.log('   4. Añade las mismas variables en Vercel\n');
}

testConnection();
