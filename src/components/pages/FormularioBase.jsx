import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ARTICULOS_URL } from "../../config/api";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  .rb-wrap * { font-family: 'Space Grotesk', sans-serif; box-sizing: border-box; }

  .rb-form {
    position: relative;
    background: rgba(255,255,255,0.78);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(124,58,237,0.13);
    border-radius: 28px;
    padding: 2.6rem 2.8rem;
    box-shadow:
      0 8px 48px rgba(124,58,237,0.10),
      0 2px 12px rgba(6,182,212,0.07),
      inset 0 1.5px 0 rgba(255,255,255,0.95);
    overflow: hidden;
  }

  .rb-blob {
    position: absolute; border-radius: 50%;
    filter: blur(72px); pointer-events: none; z-index: 0;
  }
  .rb-blob-1 { width:280px; height:280px; background:rgba(124,58,237,0.11); top:-80px;  right:-80px; }
  .rb-blob-2 { width:200px; height:200px; background:rgba(6,182,212,0.09);  bottom:-60px; left:-60px; }
  .rb-blob-3 { width:140px; height:140px; background:rgba(236,72,153,0.07); top:50%; left:50%; transform:translate(-50%,-50%); }

  .rb-inner { position: relative; z-index: 1; }

  .rb-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 2rem; padding-bottom: 1.4rem;
    border-bottom: 1px solid rgba(124,58,237,0.10);
  }
  .rb-icon-box {
    display: grid; place-items: center;
    width: 46px; height: 46px; flex-shrink: 0;
    background: linear-gradient(135deg, #7c3aed, #06b6d4);
    border-radius: 14px;
    box-shadow: 0 4px 14px rgba(124,58,237,0.30);
  }
  .rb-heading {
    font-size: 1.45rem; font-weight: 700; letter-spacing: -0.025em;
    background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin: 0;
  }
  .rb-subheading { font-size: 0.78rem; color: #a78bfa; font-weight: 400; margin: 2px 0 0; }

  .rb-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.71rem; font-weight: 600; letter-spacing: 0.09em;
    text-transform: uppercase; color: #6b46c1; margin-bottom: 7px;
  }
  .rb-label-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: linear-gradient(135deg,#7c3aed,#06b6d4); flex-shrink: 0;
  }

  .rb-input, .rb-textarea {
    width: 100%;
    background: rgba(248,246,255,0.9);
    border: 1.5px solid rgba(124,58,237,0.16);
    border-radius: 13px; padding: 11px 15px;
    font-size: 0.9rem; color: #1e1b4b; outline: none;
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
  }
  .rb-input::placeholder, .rb-textarea::placeholder { color: #c4b5fd; font-weight: 300; }
  .rb-input:focus, .rb-textarea:focus {
    border-color: #7c3aed; background: #fff;
    box-shadow: 0 0 0 3.5px rgba(124,58,237,0.11), 0 2px 10px rgba(124,58,237,0.07);
  }
  .rb-textarea { resize: vertical; min-height: 110px; }

  .rb-input-icon-wrap { position: relative; }
  .rb-input-icon-wrap .rb-input { padding-left: 40px; }
  .rb-input-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: #a78bfa; pointer-events: none;
  }

  .rb-preview-wrap {
    margin-top: 10px; border-radius: 13px; overflow: hidden;
    border: 1.5px solid rgba(124,58,237,0.14);
    background: rgba(124,58,237,0.03);
  }
  .rb-preview-wrap img { width: 100%; height: 180px; object-fit: cover; display: block; }

  .rb-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124,58,237,0.15), transparent);
    margin: 1.4rem 0;
  }

  .rb-btn {
    position: relative; width: 100%; padding: 13px;
    border: none; border-radius: 13px;
    font-size: 0.95rem; font-weight: 600; letter-spacing: 0.05em; color: #fff;
    background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
    cursor: pointer; overflow: hidden;
    box-shadow: 0 4px 18px rgba(124,58,237,0.28);
    transition: transform 0.15s, box-shadow 0.2s;
  }
  .rb-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
  }
  .rb-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
    opacity: 0; transition: opacity 0.35s;
  }
  .rb-btn:hover { box-shadow: 0 6px 26px rgba(124,58,237,0.36); }
  .rb-btn:hover::after { opacity: 1; }
  .rb-btn span { position: relative; z-index: 1; display:flex; align-items:center; justify-content:center; gap:8px; }
  .rb-btn:active { transform: scale(0.985); }

  .rb-field { margin-bottom: 1.15rem; }

  .rb-status {
    margin: 0 0 1rem;
    padding: 0.8rem 1rem;
    border-radius: 14px;
    font-size: 0.88rem;
    font-weight: 500;
  }
  .rb-status-ok {
    color: #166534;
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.22);
  }
  .rb-status-error {
    color: #991b1b;
    background: rgba(239, 68, 68, 0.11);
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .rb-badge {
    display: inline-flex; align-items:center; gap:5px;
    font-size: 0.68rem; font-weight:600; letter-spacing:0.06em; color: #7c3aed;
    background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.15);
    border-radius: 20px; padding: 3px 10px; margin-bottom: 1.4rem;
  }
  .rb-badge-dot { width:5px; height:5px; border-radius:50%; background:#7c3aed; }
`;

const FieldWrapper = ({ children, delay = 0 }) => (
  <motion.div
    className="rb-field"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const buildInitialState = (initialData = {}) => ({
  titulo: initialData.titulo || "",
  contenido: initialData.contenido || "",
  imagen: initialData.imagen || "",
  fecha: initialData.fecha || "",
});

const FormularioBase = ({ initialData, mode = "create" }) => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(buildInitialState(initialData));
  const [imageUrl, setImageUrl] = useState(initialData?.imagen || "");
  const [estadoEnvio, setEstadoEnvio] = useState({ tipo: "", mensaje: "" });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const nextState = buildInitialState(initialData);
    setFormulario(nextState);
    setImageUrl(nextState.imagen);
  }, [initialData]);

  const cambiado = ({ target }) => {
    const { name, value } = target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUrl = (e) => {
    cambiado(e);
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formulario,
      fecha: formulario.fecha || initialData?.fecha || new Date().toISOString().slice(0, 10),
    };

    setEstadoEnvio({ tipo: "", mensaje: "" });
    setGuardando(true);

    try {
      const response = await fetch(
        mode === "edit" ? `${ARTICULOS_URL}/${initialData.id}` : ARTICULOS_URL,
        {
          method: mode === "edit" ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo guardar el articulo");
      }

      setEstadoEnvio({
        tipo: "ok",
        mensaje:
          data.message ||
          (mode === "edit"
            ? "Articulo actualizado correctamente"
            : "Articulo creado correctamente"),
      });

      if (mode === "edit") {
        navigate("/articulos");
        return;
      }

      const emptyState = buildInitialState();
      setFormulario(emptyState);
      setImageUrl("");
      e.target.reset();
    } catch (error) {
      setEstadoEnvio({
        tipo: "error",
        mensaje: error.message || "Ocurrio un error al guardar el articulo",
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="rb-wrap" style={{ maxWidth: 640, margin: "2.5rem auto", padding: "0 1rem" }}>
      <style>{css}</style>

        <motion.form
          className="rb-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <div className="rb-blob rb-blob-1" />
        <div className="rb-blob rb-blob-2" />
        <div className="rb-blob rb-blob-3" />

        <div className="rb-inner">

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className="rb-badge">
              <span className="rb-badge-dot" />
              {mode === "edit" ? "EDITAR ARTICULO" : "NUEVO ARTICULO"}
            </span>
          </motion.div>

          <motion.div
            className="rb-header"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="rb-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
              </svg>
            </div>
            <div>
              <h2 className="rb-heading">
                {mode === "edit" ? "Editar entrada" : "Nueva entrada"}
              </h2>
              <p className="rb-subheading">
                {mode === "edit"
                  ? "Actualiza los campos y guarda los cambios"
                  : "Completa los campos para publicar"}
              </p>
            </div>
          </motion.div>

          {estadoEnvio.mensaje ? (
            <div
              className={`rb-status ${
                estadoEnvio.tipo === "ok" ? "rb-status-ok" : "rb-status-error"
              }`}
            >
              {estadoEnvio.mensaje}
            </div>
          ) : null}

          <FieldWrapper delay={0.17}>
            <label htmlFor="titulo" className="rb-label">
              <span className="rb-label-dot" /> Título
            </label>
            <motion.input
              id="titulo" name="titulo" type="text"
              placeholder="Escribe un título atractivo..."
              className="rb-input"
              onChange={cambiado}
              value={formulario.titulo}
              whileFocus={{ scale: 1.004 }}
            />
          </FieldWrapper>

          <FieldWrapper delay={0.24}>
            <label htmlFor="contenido" className="rb-label">
              <span className="rb-label-dot" /> Contenido
            </label>
            <motion.textarea
              id="contenido" name="contenido" rows="5"
              placeholder="Escribe el contenido de tu entrada..."
              className="rb-textarea"
              onChange={cambiado}
              value={formulario.contenido}
              whileFocus={{ scale: 1.004 }}
            />
          </FieldWrapper>

          <FieldWrapper delay={0.31}>
            <label htmlFor="imagen" className="rb-label">
              <span className="rb-label-dot" /> URL de imagen
            </label>
            <div className="rb-input-icon-wrap">
              <svg className="rb-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              <motion.input
                id="imagen" name="imagen" type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                className="rb-input"
                onChange={handleUrl}
                value={formulario.imagen}
                whileFocus={{ scale: 1.004 }}
              />
            </div>
            {imageUrl && (
              <motion.div
                className="rb-preview-wrap"
                initial={{ opacity: 0, scaleY: 0.7 }}
                animate={{ opacity: 1, scaleY: 1 }}
                style={{ originY: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <img
                  src={imageUrl}
                  alt="Vista previa"
                  onError={(e) => { e.target.parentElement.style.display = "none"; }}
                />
              </motion.div>
            )}
          </FieldWrapper>

          <div className="rb-divider" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.38 }}
          >
              <motion.button
                type="submit" className="rb-btn"
                whileHover={{ scale: 1.018 }}
                whileTap={{ scale: 0.975 }}
                disabled={guardando}
              >
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  {guardando
                    ? "Guardando..."
                    : mode === "edit"
                      ? "Guardar cambios"
                      : "Publicar entrada"}
                </span>
              </motion.button>
            </motion.div>

        </div>
      </motion.form>
    </div>
  );
};

export default FormularioBase;
