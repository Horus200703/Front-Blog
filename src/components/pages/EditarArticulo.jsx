import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormularioBase from "./FormularioBase";
import { ARTICULOS_URL } from "../../config/api";

const EditarArticulo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articulo, setArticulo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarArticulo = async () => {
      try {
        const response = await fetch(`${ARTICULOS_URL}/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "No se pudo cargar el articulo");
        }

        setArticulo(data.result);
      } catch (fetchError) {
        setError(fetchError.message || "No se pudo cargar el articulo");
      } finally {
        setCargando(false);
      }
    };

    cargarArticulo();
  }, [id]);

  if (cargando) {
    return <p className="p-4 text-sm text-gray-500">Cargando articulo...</p>;
  }

  if (error) {
    return (
      <div className="space-y-4 p-4">
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
        <button
          type="button"
          onClick={() => navigate("/articulos")}
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Volver
        </button>
      </div>
    );
  }

  return <FormularioBase initialData={articulo} mode="edit" />;
};

export default EditarArticulo;
