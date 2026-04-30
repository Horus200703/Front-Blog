import { NavLink } from "react-router-dom";
import logo from '../../assets/react.svg';

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[70px] items-center justify-between">

          {/* Logo + Nombre */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.5)]">
              <img src={logo} alt="Logo" className="h-5 w-5 brightness-0 invert" />
            </div>
            <span className="text-[17px] font-extrabold tracking-tight text-white">
              El Pulso <span className="text-blue-400">del Fútbol</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white'
                  : 'px-4 py-2 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10'
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/articulos"
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white'
                  : 'px-4 py-2 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10'
              }
            >
              Artículos
            </NavLink>

            <NavLink
              to="/creararticulo"
              className={({ isActive }) =>
                isActive
                  ? 'ml-2 px-4 py-2 rounded-lg text-sm font-bold border-2 border-blue-500 bg-blue-600 text-white'
                  : 'ml-2 px-4 py-2 rounded-lg text-sm font-bold border-2 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors'
              }
            >
              + Crear Artículo
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Nav;
