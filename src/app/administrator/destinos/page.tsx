'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Destino {
  slug: string;
  nombre: string;
  provincia: string;
  comunidad: string;
  poblacion: number | null;
  porcentaje_extranjeros: number | null;
  destacada: boolean;
  datos_extra: any;
}

export default function DestinosPage() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDestino, setEditingDestino] = useState<Destino | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Destino>>({
    slug: '',
    nombre: '',
    provincia: '',
    comunidad: '',
    poblacion: null,
    porcentaje_extranjeros: null,
    destacada: false,
    datos_extra: {},
  });
  const [filterDestacada, setFilterDestacada] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDestinos();
  }, [filterDestacada]);

  const fetchDestinos = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('ciudades_catalogo')
        .select('*')
        .order('nombre', { ascending: true });

      if (filterDestacada === 'true') query = query.eq('destacada', true);
      if (filterDestacada === 'false') query = query.eq('destacada', false);

      const { data, error } = await query;

      if (error) throw error;
      setDestinos(data || []);
    } catch (error) {
      console.error('Error fetching destinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingDestino) {
        // Actualizar
        const { error } = await supabase
          .from('ciudades_catalogo')
          .update({
            nombre: formData.nombre,
            provincia: formData.provincia,
            comunidad: formData.comunidad,
            poblacion: formData.poblacion,
            porcentaje_extranjeros: formData.porcentaje_extranjeros,
            destacada: formData.destacada,
            datos_extra: formData.datos_extra,
          })
          .eq('slug', editingDestino.slug);

        if (error) throw error;
        alert('Destino actualizado correctamente');
      } else {
        // Crear
        const { error } = await supabase
          .from('ciudades_catalogo')
          .insert([{
            slug: formData.slug,
            nombre: formData.nombre,
            provincia: formData.provincia,
            comunidad: formData.comunidad,
            poblacion: formData.poblacion,
            porcentaje_extranjeros: formData.porcentaje_extranjeros,
            destacada: formData.destacada,
            datos_extra: formData.datos_extra,
          }]);

        if (error) throw error;
        alert('Destino creado correctamente');
      }

      // Reset form
      setFormData({
        slug: '',
        nombre: '',
        provincia: '',
        comunidad: '',
        poblacion: null,
        porcentaje_extranjeros: null,
        destacada: false,
        datos_extra: {},
      });
      setEditingDestino(null);
      setShowForm(false);
      fetchDestinos();
    } catch (error: any) {
      console.error('Error saving destino:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (destino: Destino) => {
    setEditingDestino(destino);
    setFormData({
      slug: destino.slug,
      nombre: destino.nombre,
      provincia: destino.provincia,
      comunidad: destino.comunidad,
      poblacion: destino.poblacion,
      porcentaje_extranjeros: destino.porcentaje_extranjeros,
      destacada: destino.destacada,
      datos_extra: destino.datos_extra || {},
    });
    setShowForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('¿Estás seguro de eliminar este destino? Esto puede afectar las landing pages existentes.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('ciudades_catalogo')
        .delete()
        .eq('slug', slug);

      if (error) throw error;
      alert('Destino eliminado correctamente');
      fetchDestinos();
    } catch (error: any) {
      console.error('Error deleting destino:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const toggleDestacada = async (slug: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('ciudades_catalogo')
        .update({ destacada: !currentValue })
        .eq('slug', slug);

      if (error) throw error;

      setDestinos(destinos.map(d => d.slug === slug ? { ...d, destacada: !currentValue } : d));
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const cancelEdit = () => {
    setEditingDestino(null);
    setShowForm(false);
    setFormData({
      slug: '',
      nombre: '',
      provincia: '',
      comunidad: '',
      poblacion: null,
      porcentaje_extranjeros: null,
      destacada: false,
      datos_extra: {},
    });
  };

  const filteredDestinos = destinos.filter(destino => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      destino.nombre.toLowerCase().includes(term) ||
      destino.provincia.toLowerCase().includes(term) ||
      destino.slug.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Destinos</h1>
          <p className="text-gray-500 mt-1">Gestiona el catálogo de ciudades disponibles</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#c7956d] text-white rounded-lg hover:bg-[#b8845c] transition"
        >
          {showForm ? 'Cancelar' : 'Nuevo Destino'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingDestino ? 'Editar Destino' : 'Nuevo Destino'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  disabled={!!editingDestino}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7956d] focus:border-transparent outline-none disabled:bg-gray-100"
                  placeholder="torrevieja"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7956d] focus:border-transparent outline-none"
                  placeholder="Torrevieja"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provincia *
                </label>
                <input
                  type="text"
                  value={formData.provincia}
                  onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7956d] focus:border-transparent outline-none"
                  placeholder="Alicante"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comunidad Autónoma *
                </label>
                <input
                  type="text"
                  value={formData.comunidad}
                  onChange={(e) => setFormData({ ...formData, comunidad: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7956d] focus:border-transparent outline-none"
                  placeholder="Comunidad Valenciana"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Población
                </label>
                <input
                  type="number"
                  value={formData.poblacion || ''}
                  onChange={(e) => setFormData({ ...formData, poblacion: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7956d] focus:border-transparent outline-none"
                  placeholder="82000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  % Extranjeros
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.porcentaje_extranjeros || ''}
                  onChange={(e) => setFormData({ ...formData, porcentaje_extranjeros: e.target.value ? parseFloat(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7956d] focus:border-transparent outline-none"
                  placeholder="28.00"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="destacada"
                checked={formData.destacada}
                onChange={(e) => setFormData({ ...formData, destacada: e.target.checked })}
                className="w-4 h-4 text-[#c7956d] border-gray-300 rounded focus:ring-[#c7956d]"
              />
              <label htmlFor="destacada" className="text-sm font-medium text-gray-700">
                Ciudad destacada (se muestra en homepage)
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#c7956d] text-white rounded-lg hover:bg-[#b8845c] transition"
              >
                {editingDestino ? 'Actualizar' : 'Crear'} Destino
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Destinos</p>
          <p className="text-2xl font-bold text-gray-900">{destinos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Destacados</p>
          <p className="text-2xl font-bold text-[#c7956d]">{destinos.filter(d => d.destacada).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Población Total</p>
          <p className="text-2xl font-bold text-gray-900">
            {(destinos.reduce((acc, d) => acc + (d.poblacion || 0), 0) / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, provincia o slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7956d] focus:border-transparent outline-none"
          />
          <select
            value={filterDestacada}
            onChange={(e) => setFilterDestacada(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7956d] focus:border-transparent outline-none"
          >
            <option value="">Todos los destinos</option>
            <option value="true">Solo destacados</option>
            <option value="false">No destacados</option>
          </select>
          <button
            onClick={() => { setFilterDestacada(''); setSearchTerm(''); }}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provincia</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comunidad</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Población</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">% Extran.</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Destacada</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center">
                    <div className="w-6 h-6 border-2 border-[#c7956d] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : filteredDestinos.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No hay destinos configurados
                  </td>
                </tr>
              ) : (
                filteredDestinos.map((destino) => (
                  <tr key={destino.slug} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{destino.nombre}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">{destino.slug}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{destino.provincia}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{destino.comunidad}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">
                      {destino.poblacion ? destino.poblacion.toLocaleString('es-ES') : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">
                      {destino.porcentaje_extranjeros ? `${destino.porcentaje_extranjeros}%` : '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleDestacada(destino.slug, destino.destacada)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                          destino.destacada
                            ? 'bg-[#c7956d] border-[#c7956d] text-white'
                            : 'border-gray-300 hover:border-[#c7956d]'
                        }`}
                      >
                        {destino.destacada && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(destino)}
                          className="text-[#c7956d] hover:text-[#b8845c] text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(destino.slug)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Count */}
        <div className="px-4 py-3 border-t text-sm text-gray-500">
          Mostrando {filteredDestinos.length} de {destinos.length} destinos
        </div>
      </div>
    </div>
  );
}
