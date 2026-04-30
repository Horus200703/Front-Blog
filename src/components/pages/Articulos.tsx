import { useEffect, useState } from 'react';
import type { Articulo } from '../../types/articulo';
import { supabase } from '../../lib/supabase';

const fallbackImage = 'https://images.stockcake.com/public/7/d/e/7de62cd2-e218-47a9-9532-c1fe87686474_medium/city-night-contemplation-stockcake.jpg';

const Articulos = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [articuloAEliminar, setArticuloAEliminar] = useState<Articulo | null>(null);
  const [articuloAEditar, setArticuloAEditar] = useState<Articulo | null>(null);
  const [editForm, setEditForm] = useState({ titulo: '', contenido: '', imagen: '', fecha: '' });

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('articulos')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setArticulos(data || []);
      setError('');
    } catch (err) {
      console.error('Error cargando articulos:', err);
      setError('No fue posible cargar los articulos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleDeleteConfirm = async () => {
    if (!articuloAEliminar) return;
    try {
      const { error: deleteError } = await supabase
        .from('articulos')
        .delete()
        .eq('id', articuloAEliminar.id);

      if (deleteError) throw deleteError;
      
      setArticuloAEliminar(null);
      cargarDatos();
    } catch (err) { 
      console.error('Error eliminando:', err);
      alert("Error eliminando articulo"); 
    }
  };

  const handleEditConfirm = async () => {
    if (!articuloAEditar) return;
    try {
      const { error: updateError } = await supabase
        .from('articulos')
        .update({
          titulo: editForm.titulo,
          contenido: editForm.contenido,
          imagen: editForm.imagen,
          fecha: editForm.fecha
        })
        .eq('id', articuloAEditar.id);

      if (updateError) throw updateError;

      setArticuloAEditar(null);
      cargarDatos();
    } catch (err) { 
      console.error('Error actualizando:', err);
      alert("Error actualizando articulo"); 
    }
  };

  const openEdit = (a: Articulo) => {
    setArticuloAEditar(a);
    setEditForm({ titulo: a.titulo, contenido: a.contenido, imagen: a.imagen, fecha: a.fecha.slice(0, 10) });
  };

  return (
    <div>
      {/* Cabecera de sección */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Portada</p>
          <h1 className="mt-1 text-2xl font-extrabold text-gray-900">Todos los artículos</h1>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-100">
          {articulos.length} publicaciones
        </span>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <span>⚠</span> {error}
        </div>
      )}

      {cargando ? (
        <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <p className="text-sm font-semibold">Cargando artículos...</p>
        </div>
      ) : articulos.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white py-16 text-center">
          <p className="text-4xl mb-3">📰</p>
          <p className="font-bold text-gray-700">No hay artículos publicados.</p>
          <p className="text-sm text-gray-400 mt-1">¡Crea el primero desde la sección Crear Artículo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {articulos.map((articulo) => (
            <article
              key={articulo.id}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={articulo.imagen || fallbackImage}
                  alt={articulo.titulo}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white shadow">
                    Noticia
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-black/40 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-white">
                    #{articulo.id}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1 p-5">
                <p className="mb-2 text-xs font-semibold text-gray-400">
                  {new Date(articulo.fecha).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="mb-3 text-lg font-extrabold leading-snug text-gray-900 line-clamp-2">
                  {articulo.titulo}
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-gray-500 line-clamp-3">
                  {articulo.contenido}
                </p>

                {/* Acciones */}
                <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => openEdit(articulo)}
                    className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-600/30 hover:bg-blue-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setArticuloAEliminar(articulo)}
                    className="flex-1 rounded-xl bg-gray-50 py-2.5 text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white border border-gray-200 hover:border-red-500 transition-all"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal Eliminar */}
      {articuloAEliminar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
              <span className="text-2xl">🗑️</span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Eliminar Artículo</h3>
            <p className="text-gray-500 text-sm mb-6">¿Estás seguro que deseas eliminar "<span className="font-bold text-gray-700">{articuloAEliminar.titulo}</span>"? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setArticuloAEliminar(null)} className="flex-1 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-bold text-sm border border-gray-200 transition-colors">Cancelar</button>
              <button onClick={handleDeleteConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold text-sm shadow-sm shadow-red-600/30 transition-colors">Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {articuloAEditar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-7 max-w-lg w-full shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <span className="text-2xl">✏️</span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-5">Editar Artículo</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Título</label>
                <input type="text" value={editForm.titulo} onChange={e => setEditForm({ ...editForm, titulo: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Contenido</label>
                <textarea rows={4} value={editForm.contenido} onChange={e => setEditForm({ ...editForm, contenido: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)] transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Imagen (URL)</label>
                  <input type="text" value={editForm.imagen} onChange={e => setEditForm({ ...editForm, imagen: e.target.value })}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)] transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Fecha</label>
                  <input type="date" value={editForm.fecha} onChange={e => setEditForm({ ...editForm, fecha: e.target.value })}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)] transition-all" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setArticuloAEditar(null)} className="flex-1 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-bold text-sm border border-gray-200 transition-colors">Cancelar</button>
              <button onClick={handleEditConfirm} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-sm shadow-blue-600/30 transition-colors">Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articulos;
