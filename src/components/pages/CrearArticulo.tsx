import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const fallbackImage = 'https://images.stockcake.com/public/7/d/e/7de62cd2-e218-47a9-9532-c1fe87686474_medium/city-night-contemplation-stockcake.jpg';
const fechaActual = new Date().toISOString().slice(0, 10);

const CrearArticulo = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    titulo: '',
    contenido: '',
    imagen: '',
    fecha: fechaActual,
  });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const previewImage = useMemo(() => formulario.imagen.trim() || fallbackImage, [formulario.imagen]);

  const actualizarCampo = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const enviarFormulario = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setExito('');

    if (!formulario.titulo.trim() || !formulario.contenido.trim() || !formulario.imagen.trim() || !formulario.fecha) {
      setError('Completa titulo, contenido, imagen y fecha antes de publicar.');
      return;
    }

    setGuardando(true);

    try {
      const { error: insertError } = await supabase
        .from('articulos')
        .insert([
          {
            titulo: formulario.titulo.trim(),
            contenido: formulario.contenido.trim(),
            imagen: formulario.imagen.trim(),
            fecha: formulario.fecha,
          }
        ]);

      if (insertError) throw insertError;

      setExito('Artículo publicado correctamente. Redirigiendo a la portada...');
      window.setTimeout(() => {
        navigate('/articulos');
      }, 900);
    } catch (submitError) {
      console.error('Error creando articulo:', submitError);
      setError('No se pudo crear el artículo en Supabase. Revisa la conexión y las políticas de RLS.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_420px]">
      {/* Columna Izquierda: Formulario */}
      <div className="rounded-[34px] border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 md:p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold">Sala de redacción</p>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">Publica una nota con imagen y fecha</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
              Este artículo se guardará directamente en tu base de datos de Supabase.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {exito && (
          <div className="mb-5 rounded-2xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
            {exito}
          </div>
        )}

        <form className="space-y-5" onSubmit={enviarFormulario}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">Título</span>
              <input
                type="text"
                name="titulo"
                value={formulario.titulo}
                onChange={actualizarCampo}
                placeholder="Ej. La selección define su lista final"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">Fecha</span>
              <input
                type="date"
                name="fecha"
                value={formulario.fecha}
                onChange={actualizarCampo}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">URL de imagen</span>
            <input
              type="url"
              name="imagen"
              value={formulario.imagen}
              onChange={actualizarCampo}
              placeholder="https://..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">Contenido</span>
            <textarea
              name="contenido"
              rows={8}
              value={formulario.contenido}
              onChange={actualizarCampo}
              placeholder="Desarrolla la noticia, el análisis o la crónica."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={guardando}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {guardando ? 'Publicando...' : 'Publicar artículo'}
            </button>

            <button
              type="button"
              onClick={() => {
                setFormulario({ titulo: '', contenido: '', imagen: '', fecha: fechaActual });
                setError('');
                setExito('');
              }}
              className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Limpiar formulario
            </button>
          </div>
        </form>
      </div>

      {/* Columna Derecha: Preview */}
      <aside className="overflow-hidden rounded-[34px] border border-gray-200/80 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
        <div className="relative h-64 overflow-hidden shrink-0">
          <img src={previewImage} alt="Vista previa del articulo" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs tracking-[0.2em] text-white backdrop-blur-sm">
            PREVIEW
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gray-300">
              {formulario.fecha || fechaActual}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white leading-tight">
              {formulario.titulo.trim() || 'Tu titular aparecerá aquí'}
            </h2>
          </div>
        </div>

        <div className="space-y-4 p-5 flex-1 flex flex-col">
          <p className="text-sm leading-7 text-gray-600">
            {formulario.contenido.trim()
              ? formulario.contenido.trim()
              : 'La vista previa te ayuda a verificar que imagen, fecha y titular se vean con buena presencia antes de publicar.'}
          </p>

          <div className="grid gap-3 mt-auto">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500 font-semibold">💡 Tip de redacción</p>
              <p className="mt-2 text-sm text-gray-800">Un buen titular es corto, directo y genera curiosidad. Evita los spoilers y usa verbos de acción.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-blue-600 font-semibold">📸 Sobre la imagen</p>
              <p className="mt-2 text-sm text-gray-800">Usa imágenes horizontales de buena resolución. Las fotos de acción o celebraciones generan más engagement.</p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default CrearArticulo;
