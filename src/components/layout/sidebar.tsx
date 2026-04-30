const widgets = [
  {
    category: "FICHAJES",
    title: "Mercado de transferencias",
    desc: "Mbappé suena con fuerza para el City. El PSG pide 180M y el jugador ya habría dado el sí.",
    status: "Actualizado hace 12 min",
    statusColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
    accent: "bg-blue-50 border-blue-100 text-blue-600"
  },
  {
    category: "TÁCTICA",
    title: "Análisis del fin de semana",
    desc: "El 4-3-3 de Ancelotti sigue dominando en Europa. Cómo neutralizarlo con línea de cinco.",
    status: "Actualizado hace 1 h",
    statusColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
    accent: "bg-purple-50 border-purple-100 text-purple-600"
  },
  {
    category: "RESULTADOS",
    title: "Jornada 34 — LaLiga",
    desc: "Real Madrid 3 - 1 Atlético. Doblete de Vinícius y golazo de Bellingham desde fuera del área.",
    status: "Finalizado",
    statusColor: "text-gray-400",
    dotColor: "bg-gray-300",
    accent: "bg-orange-50 border-orange-100 text-orange-600"
  },
  {
    category: "PARTIDOS",
    title: "Jornada 4 — BetPlay",
    desc: "Deportes Tolima 3 - 1 Cali. Doblete de Vinícius y golazo de Bellingham desde fuera del área.",
    status: "Finalizado",
    statusColor: "text-gray-400",
    dotColor: "bg-gray-300",
    accent: "bg-green-50 border-green-100 text-green-700"
  }
];

const Sidebar = () => {
  return (
    <aside className="w-full shrink-0 flex flex-col gap-4">
      {/* Panel de tendencias */}
      <div className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-900 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">En Vivo</span>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Tendencias</span>
        </div>

        {/* Widgets */}
        <div className="divide-y divide-gray-50">
          {widgets.map((widget, i) => (
            <div key={i} className="group px-5 py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 shrink-0 rounded-lg border px-2 py-1 text-[9px] font-extrabold uppercase tracking-widest ${widget.accent}`}>
                  {widget.category}
                </span>
              </div>
              <h4 className="mt-2.5 text-[14px] font-extrabold leading-snug text-gray-900 group-hover:text-blue-600 transition-colors">
                {widget.title}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500 line-clamp-2">{widget.desc}</p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${widget.dotColor}`}></span>
                <span className={`text-[11px] font-bold ${widget.statusColor}`}>{widget.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini-card de info */}
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-800 p-5 text-white shadow-sm shadow-blue-600/20">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-blue-200 mb-2">Newsletter</p>
        <h4 className="text-base font-extrabold leading-snug mb-3">Recibe las noticias más importantes cada día</h4>
        <button className="w-full rounded-xl bg-white py-2.5 text-sm font-extrabold text-blue-700 hover:bg-blue-50 transition-colors">
          Suscribirme
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
