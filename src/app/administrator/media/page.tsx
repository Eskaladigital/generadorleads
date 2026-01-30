'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface MediaFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  metadata: {
    size: number;
    mimetype: string;
  };
  url: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('blog-images')
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      // Obtener URLs públicas
      const filesWithUrls = (data || [])
        .filter(f => !f.name.startsWith('.')) // Ignorar archivos ocultos
        .map(file => {
          const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(file.name);
          return {
            ...file,
            url: urlData.publicUrl,
          };
        });

      setFiles(filesWithUrls);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file) return;

    // Validar tipo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de archivo no permitido. Usa JPG, PNG, WebP o GIF.');
      return;
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo excede 5MB');
      return;
    }

    setUploading(true);
    try {
      // Generar nombre único
      const ext = file.name.split('.').pop() || 'jpg';
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `${timestamp}-${randomStr}.${ext}`;

      const { error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          contentType: file.type,
          cacheControl: '3600',
        });

      if (error) throw error;

      // Refrescar lista
      await fetchFiles();
    } catch (error: any) {
      console.error('Error uploading:', error);
      alert(error.message || 'Error al subir el archivo');
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (fileName: string) => {
    if (!confirm('¿Eliminar esta imagen? Esta acción no se puede deshacer.')) return;

    try {
      const { error } = await supabase.storage
        .from('blog-images')
        .remove([fileName]);

      if (error) throw error;

      setFiles(files.filter(f => f.name !== fileName));
      if (selectedFile?.name === fileName) {
        setSelectedFile(null);
      }
    } catch (error: any) {
      console.error('Error deleting:', error);
      alert(error.message || 'Error al eliminar');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copiada al portapapeles');
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Media</h1>
          <p className="text-gray-500 mt-1">Gestiona las imágenes del blog</p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#c7956d] text-white rounded-lg hover:bg-[#b8845c] cursor-pointer transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {uploading ? 'Subiendo...' : 'Subir Imagen'}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center transition ${
          dragOver
            ? 'border-[#c7956d] bg-[#c7956d]/5'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-600">
          Arrastra imágenes aquí o{' '}
          <label className="text-[#c7956d] hover:underline cursor-pointer">
            selecciona archivos
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </p>
        <p className="text-sm text-gray-400 mt-1">JPG, PNG, WebP o GIF hasta 5MB</p>
      </div>

      {/* Gallery */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500">No hay imágenes todavía</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file) => (
            <div
              key={file.id || file.name}
              className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedFile(file)}
            >
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); copyUrl(file.url); }}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    title="Copiar URL"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteFile(file.name); }}
                    className="p-2 bg-white rounded-full shadow hover:bg-red-50 text-red-500"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Detail Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFile(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex">
              {/* Image Preview */}
              <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              
              {/* Details */}
              <div className="w-80 p-6 border-l">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-semibold text-gray-900">Detalles</h3>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Nombre</p>
                    <p className="text-sm text-gray-900 break-all">{selectedFile.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Tamaño</p>
                    <p className="text-sm text-gray-900">{formatSize(selectedFile.metadata?.size || 0)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Tipo</p>
                    <p className="text-sm text-gray-900">{selectedFile.metadata?.mimetype || 'image'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">URL</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={selectedFile.url}
                        readOnly
                        className="flex-1 text-xs bg-gray-50 border rounded px-2 py-1 truncate"
                      />
                      <button
                        onClick={() => copyUrl(selectedFile.url)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs"
                      >
                        Copiar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t space-y-2">
                  <button
                    onClick={() => copyUrl(selectedFile.url)}
                    className="w-full py-2 px-4 bg-[#c7956d] text-white rounded-lg hover:bg-[#b8845c] transition text-sm"
                  >
                    Copiar URL
                  </button>
                  <button
                    onClick={() => deleteFile(selectedFile.name)}
                    className="w-full py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition text-sm"
                  >
                    Eliminar Imagen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
