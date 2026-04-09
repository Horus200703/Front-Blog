import { Link } from "react-router-dom";

const cards = [
  {
    title: "Publica rapido",
    text: "Comparte una nueva historia con titulo, contenido e imagen en pocos pasos.",
  },
  {
    title: "Gestiona articulos",
    text: "Edita o elimina entradas desde el listado cuando necesites actualizar informacion.",
  },
];

const links = [
  { to: "/articulos", label: "Ver articulos" },
  { to: "/crear-articulo", label: "Crear articulo" },
];

const SideBar = () => {
  return (
    <aside className="basis-full p-2 lg:basis-1/4">
      <div className="relative overflow-hidden rounded-[28px] border border-violet-200/60 bg-white/80 p-6 text-slate-800 shadow-[0_8px_48px_rgba(124,58,237,0.10),0_2px_12px_rgba(6,182,212,0.07),inset_0_1.5px_0_rgba(255,255,255,0.95)] backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative z-10 space-y-6">
          <div>
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-100/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-700">
              Panel blog
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-violet-950">
              Espacio editorial
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Un lateral simple para moverte entre publicaciones y mantener el mismo estilo visual del editor.
            </p>
          </div>

          <div className="grid gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex items-center justify-between rounded-2xl border border-violet-200/70 bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-3 text-sm font-semibold text-violet-800 transition hover:scale-[1.01] hover:border-violet-300 hover:shadow-lg"
              >
                <span>{link.label}</span>
                <span className="text-base">+</span>
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-violet-200/60 bg-white/70 p-4 shadow-sm"
              >
                <h4 className="text-sm font-semibold text-violet-900">{card.title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-200/70 bg-gradient-to-br from-violet-600 to-cyan-500 p-4 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Consejo rapido
            </p>
            <p className="mt-2 text-sm leading-6 text-white/95">
              Usa imagenes claras y un titulo corto para que cada articulo se vea mejor en el listado.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
