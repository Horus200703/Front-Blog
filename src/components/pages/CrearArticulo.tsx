const CrearArticulo = () => {
  return (
    <div>
      <h1>Crear Artículo</h1>
      <form>
        <label>
          Título:
          <input type="text" name="title" />
        </label>
        <label>
          Contenido:
          <textarea name="content" />
        </label>
        <button type="submit">Crear Artículo</button>
      </form>
    </div>
  );
};

export default CrearArticulo;