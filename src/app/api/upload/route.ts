import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { validateAdminAuth } from '@/lib/auth';

// Tipos de archivos permitidos
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// POST /api/upload - Subir imagen (requiere Supabase Auth admin)
export async function POST(request: NextRequest) {
  try {
    // Validar autenticación admin
    const authResult = await validateAdminAuth(request);
    if (authResult.error) return authResult.error;
    
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'blog-images';
    const folder = (formData.get('folder') as string) || '';
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se recibió ningún archivo' },
        { status: 400 }
      );
    }
    
    // Validar tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: `Tipo no permitido. Usa: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validar tamaño
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'El archivo excede 5MB' },
        { status: 400 }
      );
    }
    
    // Generar nombre único
    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = folder 
      ? `${folder}/${timestamp}-${randomStr}.${ext}`
      : `${timestamp}-${randomStr}.${ext}`;
    
    // Subir a Supabase Storage
    const supabase = createServerSupabaseClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) {
      console.error('Supabase Storage error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    
    // Obtener URL pública
    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return NextResponse.json({
      success: true,
      data: {
        path: data.path,
        url: publicUrl.publicUrl,
        bucket,
        size: file.size,
        type: file.type,
      },
      message: 'Imagen subida correctamente',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/upload - Eliminar imagen (requiere Supabase Auth admin)
export async function DELETE(request: NextRequest) {
  try {
    // Validar autenticación admin
    const authResult = await validateAdminAuth(request);
    if (authResult.error) return authResult.error;
    
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    const bucket = searchParams.get('bucket') || 'blog-images';
    
    if (!path) {
      return NextResponse.json(
        { success: false, error: 'Parámetro path requerido' },
        { status: 400 }
      );
    }
    
    const supabase = createServerSupabaseClient();
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      console.error('Supabase Storage delete error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Imagen eliminada correctamente',
    });
    
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
