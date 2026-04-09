import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ARTICULOS_URL } from "../../config/api";

const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [estado, setEstado] = useState({ tipo: "", mensaje: "" });

  useEffect(() => {
    consumirApi();
  }, []);

  async function consumirApi() {
    const peticion = await fetch(ARTICULOS_URL, { method: "GET" });
    const datos = await peticion.json();

    if (Array.isArray(datos.result)) {
      setArticulos(datos.result);
    } else if (Array.isArray(datos.articulos)) {
      setArticulos(datos.articulos);
    }
  }

  const eliminarArticulo = async (id) => {
    const confirmar = window.confirm("¿Quieres eliminar este articulo?");

    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(`${ARTICULOS_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo eliminar el articulo");
      }

      setArticulos((prev) => prev.filter((articulo) => articulo.id !== id));
      setEstado({ tipo: "ok", mensaje: data.message || "Articulo eliminado correctamente" });
    } catch (error) {
      setEstado({
        tipo: "error",
        mensaje: error.message || "Ocurrio un error al eliminar el articulo",
      });
    }
  };

  return (
    <>
      <div className="grid gap-5 p-3 md:grid-cols-2 xl:grid-cols-3">
        {estado.mensaje ? (
          <p
            className={`rounded-2xl border p-3 text-sm ${
              estado.tipo === "ok"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-600"
            }`}
          >
            {estado.mensaje}
          </p>
        ) : null}

        {articulos.length === 0 ? (
          <p className="text-sm text-gray-500 md:col-span-2 xl:col-span-3">
            No hay articulos para mostrar.
          </p>
        ) : (
          articulos.map((articulo) => (
            <article
              key={articulo.id}
              className="group overflow-hidden rounded-[28px] border border-violet-200/70 bg-white shadow-[0_10px_30px_rgba(124,58,237,0.10)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(124,58,237,0.18)]"
            >
              <div className="h-52 w-full overflow-hidden bg-slate-200">
                {articulo.imagen ? (
                  <img
                    src={articulo.imagen}
                    alt={articulo.titulo}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-100 to-cyan-100 text-sm font-semibold text-violet-700">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="space-y-4 p-6 transition duration-300 group-hover:bg-slate-800">
                <div className="flex items-center justify-between gap-3 text-xs text-slate-500 transition duration-300 group-hover:text-slate-300">
                  <span className="rounded-full bg-violet-50 px-3 py-1 font-semibold text-violet-700 transition duration-300 group-hover:bg-violet-500/20 group-hover:text-violet-200">
                    Articulo #{articulo.id}
                  </span>
                  {articulo.fecha ? (
                    <span>
                      {new Date(articulo.fecha).toLocaleDateString("es-ES")}
                    </span>
                  ) : null}
                </div>
                <h4 className="line-clamp-2 text-xl font-semibold leading-tight text-slate-900 transition duration-300 group-hover:text-cyan-300">
                  {articulo.titulo}
                </h4>
                <p className="line-clamp-4 text-sm leading-6 text-slate-600 transition duration-300 group-hover:text-slate-100">
                  {articulo.contenido}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Link
                    to={`/editar-articulo/${articulo.id}`}
                    className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-100 group-hover:border-violet-300 group-hover:bg-violet-500/20 group-hover:text-violet-100"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => eliminarArticulo(articulo.id)}
                    className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 group-hover:border-red-300 group-hover:bg-red-500/15 group-hover:text-red-100"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
};

export default Articulos;
