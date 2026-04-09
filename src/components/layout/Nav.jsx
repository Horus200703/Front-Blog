import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex bg-gray-200 h-auto p-2 text-gray-600 justify-evenly mb-1">
      <ul className="flex gap-12">
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/articulos">Artículos</NavLink>
        </li>
        <li>
          <NavLink to="/crear-articulo">Crear Artículo</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
