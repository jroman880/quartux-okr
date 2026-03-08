import { useState } from "react";

// ─── Alignment Data ────────────────────────────────────────────────────────
// parentCompanyIds / parentTeamIds define the cascade linkage

const COMPANY_OKRS = [
  {
    id: 1, color: "indigo",
    objective: "Crecimiento Exponencial: Quartux como el corazón de la nueva red eléctrica nacional",
    owner: "Dirección General", quarter: "Q1 2026", progress: 5, status: "on_track",
    keyResults: [
      { id: 1, text: "Proyectos RTP aprobados en HubSpot: > 1.3 GWh anuales", progress: 4, current: "~50 MWh", target: "1,300 MWh" },
      { id: 2, text: "≥ 5 proyectos Utility Scale con contrato firmado", progress: 0, current: "0", target: "5" },
      { id: 3, text: "≥ 50 proyectos Venta Directa cerrados en el año", progress: 5, current: "~3", target: "50" },
    ],
  },
  {
    id: 2, color: "violet",
    objective: "Excelencia Operacional: Quartux = 4C",
    owner: "COO", quarter: "Q1 2026", progress: 10, status: "on_track",
    keyResults: [
      { id: 4, text: "Tiempo promedio RTP a CAP < 210 días (vs 266 días en Q3 2025)", progress: 15, current: "266 días", target: "210 días" },
      { id: 5, text: "OpEx < $2.7 USD/kWh/yr", progress: 5, current: "En medición", target: "$2.7 USD/kWh/yr" },
      { id: 6, text: "CapEx < $300 USD/kWh en proyectos C&I", progress: 10, current: "En medición", target: "$300 USD/kWh" },
    ],
  },
  {
    id: 3, color: "emerald",
    objective: "Sostenibilidad Financiera: No nos detienen ni las pandémias",
    owner: "CFO", quarter: "Q1 2026", progress: 12, status: "on_track",
    keyResults: [
      { id: 7, text: "Gross margin promedio > 25% en compraventa (vs 21% en 2024)", progress: 20, current: "21%", target: "25%" },
      { id: 8, text: "Utilidad neta > $15M USD en el año", progress: 5, current: "En medición", target: "$15M USD" },
      { id: 9, text: "Desviación ≤ 5% cotización vs. costo real por proyecto", progress: 10, current: "~10%", target: "≤ 5%" },
    ],
  },
  {
    id: 4, color: "orange",
    objective: "Calidad Innegociable: Cero Fallas",
    owner: "COO / HSEQ", quarter: "Q1 2026", progress: 10, status: "on_track",
    keyResults: [
      { id: 10, text: "No Conformidades < 20 en el trimestre (vs 36 eventos en Q3 2025)", progress: 15, current: "0 registradas", target: "< 20" },
      { id: 11, text: "0 accidentes registrables según STPS en el mes", progress: 10, current: "0", target: "0" },
      { id: 12, text: "100% cumplimiento regulatorio NFPA 855 en instalaciones BESS", progress: 5, current: "En evaluación", target: "100%" },
    ],
  },
  {
    id: 5, color: "rose",
    objective: "Cultura Quartux: el mejor equipo de energía de México, punto.",
    owner: "VP People", quarter: "Q1 2026", progress: 8, status: "on_track",
    keyResults: [
      { id: 13, text: "eNPS score > 45% (vs 34% en Q3 2025)", progress: 10, current: "34%", target: "45%" },
      { id: 14, text: "6 posiciones de management estafeadas en el año", progress: 0, current: "0", target: "6" },
      { id: 15, text: "100% matrices de habilidades terminadas por equipo", progress: 15, current: "~15%", target: "100%" },
    ],
  },
];

const TEAM_OKRS = [
  {
    id: 10, parentCompanyIds: [1],
    objective: "Incrementar generación de SQLs y acelerar cierres comerciales en todos los canales",
    owner: "Growth", quarter: "Q1 2026", progress: 15, status: "on_track",
    keyResults: [
      { id: 101, text: "+5% conversión calificada por canal vs. trimestre anterior", progress: 10, current: "Baseline", target: "+5%" },
      { id: 102, text: "Reducir ciclo de ventas a ≤ 120 días VD y ≤ 180 días KAM", progress: 15, current: "En medición", target: "120 / 180 días" },
      { id: 103, text: "Revenue Dashboard en HubSpot 100% implementado", progress: 20, current: "En progreso", target: "Done" },
    ],
  },
  {
    id: 20, parentCompanyIds: [1, 3],
    objective: "Ser el principal motor de cierre C&I: 430 MWh firmados en 2026",
    owner: "KAM & Venta Directa", quarter: "Q1 2026", progress: 12, status: "on_track",
    keyResults: [
      { id: 201, text: "RTP aprobado KAM: 250 MWh en el año (Q1 meta: 30 MWh)", progress: 10, current: "~3 MWh", target: "250 MWh" },
      { id: 202, text: "RTP aprobado Venta Directa: 180 MWh en el año (Q1 meta: 22 MWh)", progress: 12, current: "~2 MWh", target: "180 MWh" },
      { id: 203, text: "Ciclo de venta ≤ 120 días en ≥ 70% de oportunidades", progress: 15, current: "En medición", target: "≥ 70% en 120 días" },
    ],
  },
  {
    id: 30, parentCompanyIds: [1, 3],
    objective: "Firmar 700 MWh de proyectos Utility-SAE y ser líderes del segmento en México",
    owner: "Utility Scale", quarter: "Q1 2026", progress: 5, status: "on_track",
    keyResults: [
      { id: 301, text: "Firmar 700 MWh proyectos Utility-SAE en 2026 (Q1: 1 contrato)", progress: 0, current: "0 MWh", target: "700 MWh" },
      { id: 302, text: "≥ 5 contratos firmados en el año", progress: 0, current: "0", target: "5" },
      { id: 303, text: "Roles clave contratados en Q1: Gestor de Proyectos + Regulación GA", progress: 5, current: "En proceso", target: "2 contratados" },
    ],
  },
  {
    id: 40, parentCompanyIds: [2, 4],
    objective: "Todos los proyectos arrancan cuando el cliente lo espera, sin excepción",
    owner: "Dirección de Operaciones", quarter: "Q1 2026", progress: 10, status: "on_track",
    keyResults: [
      { id: 401, text: "RTP a CAP < 210 días promedio (meta COO compartida)", progress: 15, current: "266 días", target: "210 días" },
      { id: 402, text: "Descargas fallidas y quejas de cliente < 8 por mes", progress: 10, current: "En medición", target: "< 8/mes" },
      { id: 403, text: "0 accidentes registrables en el semestre", progress: 10, current: "0", target: "0" },
    ],
  },
  {
    id: 50, parentCompanyIds: [2, 4],
    objective: "Ingeniería sin fallas: más rápida, más precisa, 100% NFPA 855",
    owner: "Ingeniería", quarter: "Q1 2026", progress: 12, status: "on_track",
    keyResults: [
      { id: 501, text: "RTP a ingeniería detallada aprobada: < 65 días promedio", progress: 10, current: "En medición", target: "65 días" },
      { id: 502, text: "Rechazos de ingeniería por cliente: < 1 al semestre", progress: 15, current: "0 rechazos", target: "< 1" },
      { id: 503, text: "CapEx preliminar por proyecto: < $5 USD/kWh reducción mensual", progress: 10, current: "En medición", target: "< $5 USD/kWh" },
    ],
  },
  {
    id: 60, parentCompanyIds: [2, 4],
    objective: "Plataforma de control y monitoreo sin fallas, instalación plug & play",
    owner: "Software", quarter: "Q1 2026", progress: 8, status: "on_track",
    keyResults: [
      { id: 601, text: "Instalación EMS exitosa sin intervención de software (cobertura Modbus 80%)", progress: 10, current: "~20%", target: "80%" },
      { id: 602, text: "Reducción del 80% en tickets de soporte", progress: 5, current: "Baseline", target: "-80%" },
      { id: 603, text: "Arquitectura full HA en 100% de sitios prioritarios", progress: 8, current: "~10%", target: "100%" },
    ],
  },
  {
    id: 70, parentCompanyIds: [3],
    objective: "Disciplina financiera: márgenes sanos, capital eficiente y cero desviaciones",
    owner: "Finanzas", quarter: "Q1 2026", progress: 12, status: "on_track",
    keyResults: [
      { id: 701, text: "Margen bruto > 20% y neto > 15% por proyecto", progress: 15, current: "En medición", target: "> 20% bruto" },
      { id: 702, text: "Desviación < 7.5% cotizador vs. presupuesto real", progress: 10, current: "~10%", target: "< 7.5%" },
      { id: 703, text: "CCC (ciclo de conversión de caja) < 65 días", progress: 10, current: "En medición", target: "< 65 días" },
    ],
  },
  {
    id: 80, parentCompanyIds: [1, 2],
    objective: "Construir la máquina de talento más rápida y precisa del sector energético",
    owner: "People", quarter: "Q1 2026", progress: 10, status: "on_track",
    keyResults: [
      { id: 801, text: "Tiempo cobertura vacantes: < 25 días operativas / < 40 días estratégicas", progress: 10, current: "En medición", target: "25 / 40 días" },
      { id: 802, text: "85% participación en Programa de Liderazgo Quartux (PLQ)", progress: 5, current: "Lanzamiento Q1", target: "85%" },
      { id: 803, text: "100% matrices de habilidades por equipo terminadas", progress: 15, current: "~15%", target: "100%" },
    ],
  },
  {
    id: 90, parentCompanyIds: [1, 3],
    objective: "Escalabilidad legal y compliance sin fricciones para el crecimiento",
    owner: "Legal", quarter: "Q1 2026", progress: 5, status: "on_track",
    keyResults: [
      { id: 901, text: "100% de solicitudes legales gestionadas en herramienta digital", progress: 5, current: "En selección", target: "100%" },
      { id: 902, text: "70% de tickets atendidos dentro del SLA acordado", progress: 0, current: "Sin herramienta", target: "70%" },
      { id: 903, text: "100% de contratos firmados antes de inicio de cualquier servicio", progress: 10, current: "En revisión", target: "100%" },
    ],
  },
  {
    id: 100, parentCompanyIds: [1, 4],
    objective: "Lealtad total del cliente: NPS > 85%, Churn 0%, upselling activo",
    owner: "Customer Success", quarter: "Q1 2026", progress: 8, status: "on_track",
    keyResults: [
      { id: 1001, text: "NPS / CSAT anual > 85% y Churn = 0%", progress: 10, current: "En medición", target: "85% NPS / 0% Churn" },
      { id: 1002, text: "≥ 3 cierres de Upselling / Cross-selling en 2026", progress: 0, current: "0", target: "3" },
      { id: 1003, text: "Chatbot de soporte operativo en Q2 (en colaboración con Software)", progress: 15, current: "En desarrollo", target: "Q2 listo" },
    ],
  },
  {
    id: 110, parentCompanyIds: [1, 5],
    objective: "Posicionar a Quartux como líder en almacenamiento energético en México",
    owner: "Marketing", quarter: "Q1 2026", progress: 10, status: "on_track",
    keyResults: [
      { id: 1101, text: "12 SQL generados para MEM (Mercado Eléctrico Mayorista) en el año", progress: 8, current: "~1", target: "12" },
      { id: 1102, text: "6,000 nuevos seguidores en LinkedIn en el año", progress: 5, current: "~300", target: "6,000" },
      { id: 1103, text: "+20% alcance orgánico publicaciones de marca empleadora", progress: 10, current: "Baseline", target: "+20%" },
    ],
  },
];

const INDIVIDUAL_OKRS = [
  {
    id: 2001, parentTeamIds: [40],
    objective: "Cero No Conformidades y cumplimiento NFPA 855 al 100% en todos los proyectos",
    owner: "HSEQ", initials: "HQ", role: "Calidad y Seguridad",
    quarter: "Q1 2026", progress: 10, status: "on_track",
    keyResults: [
      { id: 20011, text: "0 NC mayores; NC menores: cierre en < 45 días (ATNC ≥ 90%)", progress: 15, current: "0 NC abiertas", target: "0 NC / ATNC 90%" },
      { id: 20012, text: "Cumplimiento legal HSEQ ≥ 90% (contratos, IMSS, EPP)", progress: 10, current: "En auditoría", target: "≥ 90%" },
      { id: 20013, text: "Cumplimiento NFPA 855 = 100% en instalaciones BESS", progress: 5, current: "En revisión", target: "100%" },
    ],
  },
  {
    id: 2002, parentTeamIds: [40],
    objective: "Construcción en tiempo y forma: kick off a CAP en < 83 días, 0 accidentes",
    owner: "Site Managers", initials: "SM", role: "Construcción",
    quarter: "Q1 2026", progress: 8, status: "on_track",
    keyResults: [
      { id: 20021, text: "Kick off preliminar de obra a CAP aprobado: < 83 días", progress: 8, current: "En medición", target: "< 83 días" },
      { id: 20022, text: "Adicionales por proyecto: < 5% del presupuesto", progress: 10, current: "En medición", target: "< 5%" },
      { id: 20023, text: "0 accidentes registrables en construcción", progress: 10, current: "0", target: "0" },
    ],
  },
  {
    id: 2003, parentTeamIds: [40],
    objective: "Máximos ahorros para el cliente y cero descargas fallidas en operación",
    owner: "Monitoreo", initials: "MN", role: "Operaciones",
    quarter: "Q1 2026", progress: 12, status: "on_track",
    keyResults: [
      { id: 20031, text: "Descargas fallidas: < 8 por mes (48 en el semestre)", progress: 10, current: "En medición", target: "< 8/mes" },
      { id: 20032, text: "95% de ahorros logrados por operación en setpoint ideal", progress: 15, current: "En medición", target: "95%" },
      { id: 20033, text: "0 tickets asignados a monitoreo por reportes incorrectos", progress: 12, current: "En seguimiento", target: "0 tickets" },
    ],
  },
  {
    id: 2004, parentTeamIds: [40],
    objective: "Disponibilidad operativa al 100% con mantenimiento preventivo y correctivo al día",
    owner: "Mantenimiento", initials: "MT", role: "O&M",
    quarter: "Q1 2026", progress: 10, status: "on_track",
    keyResults: [
      { id: 20041, text: "0 descargas fallidas en proyectos previos a aceptación de CAP", progress: 10, current: "0", target: "0" },
      { id: 20042, text: "Cumplimiento del PAM (Plan Anual de Mantenimiento) ≥ 99%", progress: 8, current: "En medición", target: "≥ 99%" },
      { id: 20043, text: "0 accidentes registrables en O&M", progress: 10, current: "0", target: "0" },
    ],
  },
  {
    id: 2005, parentTeamIds: [40],
    objective: "Ejecución del ciclo RTP–CAP con excelencia: 0 retrasos por gestión Quartux",
    owner: "PMs", initials: "PM", role: "Project Management",
    quarter: "Q1 2026", progress: 8, status: "on_track",
    keyResults: [
      { id: 20051, text: "Ruta RTP a CAP < 210 días; 0 proyectos con retraso por gestión QTX", progress: 12, current: "En seguimiento", target: "210 días / 0 retrasos" },
      { id: 20052, text: "Descargas fallidas y quejas < 2 por mes (12 en el semestre)", progress: 8, current: "0", target: "< 2/mes" },
      { id: 20053, text: "100% matrices de habilidades PMs terminadas", progress: 5, current: "~5%", target: "100%" },
    ],
  },
];

// ─── Review Data ──────────────────────────────────────────────────────────

const REVIEW_DIMENSIONS = ["Execution", "Collaboration", "Impact", "Growth"];

const INITIAL_REVIEWS = [
  {
    id: "r1", employee: "Líder Growth", initials: "LG", role: "Growth Lead",
    manager: "Director Comercial", quarter: "Q1 2026", status: "pending_manager",
    selfRatings: { Execution: 4, Collaboration: 5, Impact: 3, Growth: 4 },
    selfComment: "Este trimestre enfoqué el trabajo en mejorar la conversión calificada por canal y en sentar las bases del Revenue Dashboard en HubSpot. El ciclo de ventas aún está por encima del target, pero ya tenemos visibilidad clara de los bloqueos.",
    managerRatings: {}, managerComment: "", submittedAt: "Mar 5, 2026", reviewedAt: null,
  },
  {
    id: "r2", employee: "Líder Ingeniería", initials: "LI", role: "Jefe de Ingeniería",
    manager: "COO", quarter: "Q1 2026", status: "pending_manager",
    selfRatings: { Execution: 5, Collaboration: 4, Impact: 4, Growth: 3 },
    selfComment: "El equipo logró cero rechazos de ingeniería por cliente en el trimestre y avanzamos bien en la certificación NFPA 855. El tiempo RTP a ingeniería detallada bajó de 80 a 72 días en promedio.",
    managerRatings: {}, managerComment: "", submittedAt: "Mar 4, 2026", reviewedAt: null,
  },
  {
    id: "r3", employee: "Líder Software", initials: "LS", role: "Tech Lead Software",
    manager: "COO", quarter: "Q1 2026", status: "pending_self",
    selfRatings: {}, selfComment: "", managerRatings: {}, managerComment: "",
    submittedAt: null, reviewedAt: null,
  },
  {
    id: "r4", employee: "Líder People", initials: "LP", role: "VP People",
    manager: "CEO", quarter: "Q1 2026", status: "completed",
    selfRatings: { Execution: 4, Collaboration: 4, Impact: 5, Growth: 4 },
    selfComment: "Lanzamos el Programa de Liderazgo Quartux con 3 módulos planificados y ya tenemos el 40% de las matrices de habilidades documentadas. El tiempo de cobertura de vacantes bajó a 32 días en promedio.",
    managerRatings: { Execution: 4, Collaboration: 5, Impact: 5, Growth: 4 },
    managerComment: "El equipo de People está construyendo la infraestructura de talento que Quartux necesita para escalar. El PLQ es un diferenciador real. Excelente ejecución este trimestre.",
    submittedAt: "Mar 1, 2026", reviewedAt: "Mar 6, 2026",
  },
];

// ─── Config ────────────────────────────────────────────────────────────────

const ROLES = ["Individual", "Team Lead", "HR / People Ops", "Executive"];

const statusConfig = {
  on_track: { label: "On Track", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  at_risk:  { label: "At Risk",  color: "bg-amber-100 text-amber-700",   dot: "bg-amber-500"  },
  off_track:{ label: "Off Track",color: "bg-red-100 text-red-700",       dot: "bg-red-500"    },
  completed:{ label: "Completed",color: "bg-blue-100 text-blue-700",     dot: "bg-blue-500"   },
};

const reviewStatusConfig = {
  pending_self:    { label: "Awaiting Self-Review", color: "bg-gray-100 text-gray-600",       icon: "○" },
  pending_manager: { label: "Awaiting Manager",     color: "bg-amber-100 text-amber-700",     icon: "◑" },
  completed:       { label: "Completed",            color: "bg-emerald-100 text-emerald-700", icon: "●" },
};

const RATING_LABELS = { 1: "Needs Improvement", 2: "Developing", 3: "Meets Expectations", 4: "Exceeds Expectations", 5: "Outstanding" };
const RATING_COLORS = { 1: "text-red-500", 2: "text-orange-400", 3: "text-amber-500", 4: "text-emerald-500", 5: "text-[#e40014]" };

// Company color palettes
const COMPANY_COLORS = {
  indigo:  { bg: "bg-red-500",  light: "bg-red-50",  border: "border-[#e40014]", ring: "ring-[#e40014]",  text: "text-red-700",  badge: "bg-red-50 text-red-700",  bar: "bg-red-500"  },
  violet:  { bg: "bg-violet-500",  light: "bg-violet-50",  border: "border-violet-400", ring: "ring-violet-400",  text: "text-violet-700",  badge: "bg-violet-100 text-violet-700",  bar: "bg-violet-500"  },
  emerald: { bg: "bg-emerald-500", light: "bg-emerald-50", border: "border-emerald-400",ring: "ring-emerald-400", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" },
  orange:  { bg: "bg-orange-500",  light: "bg-orange-50",  border: "border-orange-400", ring: "ring-orange-400",  text: "text-orange-700",  badge: "bg-orange-100 text-orange-700",  bar: "bg-orange-500"  },
  rose:    { bg: "bg-rose-500",    light: "bg-rose-50",    border: "border-rose-400",   ring: "ring-rose-400",   text: "text-rose-700",   badge: "bg-rose-100 text-rose-700",      bar: "bg-rose-500"    },
};

// ─── Utility Components ────────────────────────────────────────────────────

function ProgressBar({ value, size = "md", colorClass }) {
  const h = size === "sm" ? "h-1.5" : "h-2.5";
  const bar = colorClass || (value >= 70 ? "bg-emerald-500" : value >= 40 ? "bg-amber-400" : "bg-red-400");
  return (
    <div className={`w-full bg-gray-100 rounded-full ${h}`}>
      <div className={`${h} rounded-full transition-all duration-500 ${bar}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.on_track;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function ReviewStatusBadge({ status }) {
  const cfg = reviewStatusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <span className="text-xs leading-none">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

function StatCard({ label, value, sub, color = "text-gray-800", onClick, highlight }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 ${onClick ? "cursor-pointer hover:shadow-md transition-all" : ""} ${highlight ? "border-amber-200" : "border-gray-100"}`} onClick={onClick}>
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {sub && <p className={`text-xs mt-1 ${highlight ? "text-amber-500" : "text-gray-400"}`}>{sub}</p>}
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────

function StarRating({ value, onChange, readonly = false }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value || 0;
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((star) => (
        <button key={star} disabled={readonly}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`text-xl leading-none transition-colors ${readonly ? "cursor-default" : "cursor-pointer"} ${star <= display ? "text-amber-400" : "text-gray-200"}`}>
          ★
        </button>
      ))}
      {value > 0 && <span className={`ml-2 text-xs font-medium ${RATING_COLORS[value]}`}>{RATING_LABELS[value]}</span>}
    </div>
  );
}

// ─── OKR Card ─────────────────────────────────────────────────────────────

function OKRCard({ okr, expanded: defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [updateKR, setUpdateKR] = useState(null);
  const [noteVal, setNoteVal] = useState("");
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <StatusBadge status={okr.status} />
              <span className="text-xs text-gray-400">{okr.quarter}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">{okr.owner || okr.role}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 leading-snug">{okr.objective}</h3>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <div className="text-xl font-bold text-gray-800">{okr.progress}%</div>
              <div className="text-xs text-gray-400">overall</div>
            </div>
            <div className={`transform transition-transform ${expanded ? "rotate-180" : ""} text-gray-400`}>▾</div>
          </div>
        </div>
        <div className="mt-3"><ProgressBar value={okr.progress} /></div>
      </div>
      {expanded && (
        <div className="border-t border-gray-50 px-5 pb-5 pt-4 space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Results</p>
          {okr.keyResults.map((kr) => (
            <div key={kr.id} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-700 flex-1">{kr.text}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-medium text-gray-500">{kr.current} / {kr.target}</span>
                  <span className="text-xs font-bold text-gray-700">{kr.progress}%</span>
                  {(okr.owner === "You" || okr.owner === "Jaime Mico") && (
                    <button onClick={(e) => { e.stopPropagation(); setUpdateKR(updateKR === kr.id ? null : kr.id); }}
                      className="text-xs px-2 py-0.5 bg-red-50 text-[#e40014] rounded-md hover:bg-red-100 transition-colors">
                      Update
                    </button>
                  )}
                </div>
              </div>
              <ProgressBar value={kr.progress} size="sm" />
              {updateKR === kr.id && (
                <div className="mt-2 bg-red-50 rounded-xl p-3 space-y-2">
                  <p className="text-xs font-semibold text-red-700">Post a progress update</p>
                  <textarea className="w-full text-sm border border-red-200 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-200"
                    rows={2} placeholder="What's the latest? Any blockers?" value={noteVal} onChange={(e) => setNoteVal(e.target.value)} />
                  <div className="flex gap-2">
                    <button onClick={() => { setUpdateKR(null); setNoteVal(""); }}
                      className="text-xs px-3 py-1.5 bg-[#e40014] text-white rounded-lg hover:bg-[#bf000f] transition-colors">Save Update</button>
                    <button onClick={() => { setUpdateKR(null); setNoteVal(""); }}
                      className="text-xs px-3 py-1.5 text-gray-500 hover:text-gray-700 transition-colors">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Review Form ──────────────────────────────────────────────────────────

function ReviewForm({ review, mode, onSave, onClose }) {
  const isManager = mode === "manager";
  const isView = mode === "view";
  const [ratings, setRatings] = useState(isManager ? { ...review.managerRatings } : { ...review.selfRatings });
  const [comment, setComment] = useState(isManager ? review.managerComment : review.selfComment);
  const [submitted, setSubmitted] = useState(false);
  const allRated = REVIEW_DIMENSIONS.every((d) => ratings[d] > 0);
  const avgRating = allRated ? (REVIEW_DIMENSIONS.reduce((s, d) => s + ratings[d], 0) / REVIEW_DIMENSIONS.length).toFixed(1) : "—";

  if (submitted) return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl">✓</div>
      <p className="text-lg font-bold text-gray-800">{isManager ? "Review submitted!" : "Self-assessment submitted!"}</p>
      <p className="text-sm text-gray-500">Your feedback has been recorded for Q1 2026.</p>
      <button onClick={onClose} className="mt-2 text-sm px-5 py-2 bg-[#e40014] text-white rounded-xl hover:bg-[#bf000f] transition-colors">Done</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0" style={{background:"#e40014"}}>{review.initials}</div>
        <div>
          <p className="font-bold text-gray-900">{review.employee}</p>
          <p className="text-sm text-gray-500">{review.role} · {review.quarter}</p>
        </div>
        <div className="ml-auto"><ReviewStatusBadge status={review.status} /></div>
      </div>
      {isView && review.status === "completed" ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Self-Assessment</p>
            {REVIEW_DIMENSIONS.map((dim) => (
              <div key={dim}><p className="text-xs text-gray-600 mb-1 font-medium">{dim}</p><StarRating value={review.selfRatings[dim] || 0} readonly /></div>
            ))}
            <div className="pt-2 border-t border-gray-200"><p className="text-xs text-gray-500 font-medium mb-1">Comments</p><p className="text-sm text-gray-700 leading-relaxed">{review.selfComment}</p></div>
          </div>
          <div className="bg-red-50 rounded-2xl p-4 space-y-4">
            <p className="text-xs font-bold text-[#e40014] uppercase tracking-wide">Manager Review</p>
            {REVIEW_DIMENSIONS.map((dim) => (
              <div key={dim}><p className="text-xs text-gray-600 mb-1 font-medium">{dim}</p><StarRating value={review.managerRatings[dim] || 0} readonly /></div>
            ))}
            <div className="pt-2 border-t border-red-100"><p className="text-xs text-gray-500 font-medium mb-1">Manager Feedback</p><p className="text-sm text-gray-700 leading-relaxed">{review.managerComment}</p></div>
          </div>
        </div>
      ) : (
        <>
          {isManager && review.status === "pending_manager" && (
            <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Employee Self-Assessment</p>
              <div className="grid grid-cols-2 gap-3">
                {REVIEW_DIMENSIONS.map((dim) => (<div key={dim}><p className="text-xs text-gray-500 mb-1">{dim}</p><StarRating value={review.selfRatings[dim] || 0} readonly /></div>))}
              </div>
              {review.selfComment && <div className="pt-2 border-t border-gray-200"><p className="text-xs text-gray-500 font-medium mb-1">Employee Comments</p><p className="text-sm text-gray-700 italic">"{review.selfComment}"</p></div>}
            </div>
          )}
          {!isView && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">{isManager ? "Your Ratings" : "Rate Yourself"}</p>
                {allRated && <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-xl"><span className="text-xs text-gray-500">Avg score</span><span className="text-sm font-bold text-red-700">{avgRating} / 5</span></div>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {REVIEW_DIMENSIONS.map((dim) => (
                  <div key={dim} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs font-semibold text-gray-600 mb-2">{dim}</p>
                    <StarRating value={ratings[dim] || 0} onChange={(v) => setRatings((r) => ({ ...r, [dim]: v }))} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {!isView && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">{isManager ? "Manager Feedback" : "Self-Assessment Comments"}</label>
              <textarea className="w-full text-sm border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-200 bg-gray-50"
                rows={4} placeholder={isManager ? "Share specific examples of this person's impact…" : "Reflect on your achievements, challenges…"}
                value={comment} onChange={(e) => setComment(e.target.value)} />
              <p className="text-xs text-gray-400">{comment.length} characters</p>
            </div>
          )}
          {!isView && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400">{!allRated ? "Rate all 4 dimensions to submit" : !comment.trim() ? "Add a comment to submit" : "Ready to submit ✓"}</p>
              <div className="flex gap-2">
                <button onClick={onClose} className="text-sm px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors">Save Draft</button>
                <button onClick={() => { if (allRated && comment.trim()) { onSave({ ratings, comment }); setSubmitted(true); } }}
                  disabled={!allRated || !comment.trim()}
                  className={`text-sm px-5 py-2 rounded-xl font-medium transition-colors ${allRated && comment.trim() ? "bg-[#e40014] text-white hover:bg-[#bf000f]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                  {isManager ? "Submit Review" : "Submit Self-Assessment"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Review Queue Card ────────────────────────────────────────────────────

function ReviewQueueCard({ review, role, onOpen }) {
  const selfAvg = Object.values(review.selfRatings).length
    ? (Object.values(review.selfRatings).reduce((s, v) => s + v, 0) / Object.values(review.selfRatings).length).toFixed(1) : null;
  const managerAvg = Object.values(review.managerRatings).length === REVIEW_DIMENSIONS.length
    ? (Object.values(review.managerRatings).reduce((s, v) => s + v, 0) / Object.values(review.managerRatings).length).toFixed(1) : null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{background:"#e40014"}}>{review.initials}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-gray-800">{review.employee}</p>
          <span className="text-xs text-gray-400">·</span>
          <p className="text-xs text-gray-500">{review.role}</p>
        </div>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <ReviewStatusBadge status={review.status} />
          {selfAvg && <span className="text-xs text-gray-500">Self: <span className="font-semibold text-amber-500">{selfAvg}★</span></span>}
          {managerAvg && <span className="text-xs text-gray-500">Manager: <span className="font-semibold text-[#e40014]">{managerAvg}★</span></span>}
        </div>
        {review.submittedAt && <p className="text-xs text-gray-400 mt-1">Submitted {review.submittedAt}</p>}
      </div>
      <div className="flex-shrink-0">
        {review.status === "pending_self" && <span className="text-xs text-gray-400 italic">Waiting for employee…</span>}
        {review.status === "pending_manager" && (role === "Team Lead" || role === "HR / People Ops") && (
          <button onClick={() => onOpen(review, "manager")} className="text-xs px-4 py-2 bg-[#e40014] text-white rounded-xl hover:bg-[#bf000f] transition-colors font-medium">Write Review</button>
        )}
        {review.status === "completed" && (
          <button onClick={() => onOpen(review, "view")} className="text-xs px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">View Completed</button>
        )}
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10 text-sm">✕</button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Alignment Page ───────────────────────────────────────────────────────

function getHighlights(selected) {
  if (!selected) return { company: [], team: [], individual: [] };
  if (selected.level === "company") {
    const teamIds = TEAM_OKRS.filter(t => t.parentCompanyIds.includes(selected.id)).map(t => t.id);
    const indIds  = INDIVIDUAL_OKRS.filter(i => i.parentTeamIds.some(tid => teamIds.includes(tid))).map(i => i.id);
    return { company: [selected.id], team: teamIds, individual: indIds };
  }
  if (selected.level === "team") {
    const t = TEAM_OKRS.find(t => t.id === selected.id);
    const companyIds = t ? t.parentCompanyIds : [];
    const indIds = INDIVIDUAL_OKRS.filter(i => i.parentTeamIds.includes(selected.id)).map(i => i.id);
    return { company: companyIds, team: [selected.id], individual: indIds };
  }
  if (selected.level === "individual") {
    const ind = INDIVIDUAL_OKRS.find(i => i.id === selected.id);
    const teamIds = ind ? ind.parentTeamIds : [];
    const companyIds = [...new Set(TEAM_OKRS.filter(t => teamIds.includes(t.id)).flatMap(t => t.parentCompanyIds))];
    return { company: companyIds, team: teamIds, individual: [selected.id] };
  }
  return { company: [], team: [], individual: [] };
}

// Mini cascade node card
function CascadeCard({ label, objective, owner, progress, status, colorKey, highlighted, dimmed, onClick, isMe }) {
  const pal = COMPANY_COLORS[colorKey] || COMPANY_COLORS.indigo;
  const baseClasses = "rounded-xl border p-3 cursor-pointer transition-all duration-200 ";
  const stateClasses = highlighted
    ? `bg-white border-2 ${pal.border} shadow-lg ring-2 ${pal.ring} ring-offset-1`
    : dimmed
    ? "bg-white border-gray-100 opacity-30"
    : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm";
  return (
    <div className={baseClasses + stateClasses} onClick={onClick}>
      {label && (
        <span className={`inline-block text-xs font-semibold px-1.5 py-0.5 rounded mb-1.5 ${pal.badge}`}>{label}</span>
      )}
      <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 mb-2">{objective}</p>
      <p className="text-xs text-gray-400 mb-1.5 truncate">{owner}</p>
      <div className="flex items-center gap-2">
        <div className={`flex-1 h-1.5 rounded-full bg-gray-100`}>
          <div className={`h-1.5 rounded-full ${pal.bar}`} style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <span className={`text-xs font-bold ${pal.text}`}>{progress}%</span>
      </div>
      {isMe && <span className="mt-1.5 inline-block text-xs bg-red-50 text-[#e40014] px-1.5 py-0.5 rounded font-medium">You</span>}
    </div>
  );
}

// Tree branch line helper
function TreeLine({ last }) {
  return (
    <div className="flex items-stretch flex-shrink-0 w-6">
      <div className="w-px bg-gray-200 ml-3" style={{ marginBottom: last ? "50%" : 0 }} />
      <div className="w-3 h-px bg-gray-200 mt-5 flex-shrink-0" />
    </div>
  );
}

function AlignmentPage({ role }) {
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState("cascade");
  const [expandedCompany, setExpandedCompany] = useState({ 1: true, 2: true, 3: true });
  const [expandedTeam, setExpandedTeam] = useState({});
  const [modal, setModal] = useState(null);

  const highlights = getHighlights(selected);
  const hasSelection = !!selected;

  function toggleSelect(level, id) {
    setSelected(prev => (prev && prev.level === level && prev.id === id) ? null : { level, id });
  }

  // Get company color for a team or individual
  function teamColor(teamId) {
    const t = TEAM_OKRS.find(t => t.id === teamId);
    if (!t || !t.parentCompanyIds.length) return "indigo";
    const c = COMPANY_OKRS.find(c => c.id === t.parentCompanyIds[0]);
    return c ? c.color : "indigo";
  }
  function individualColor(ind) {
    if (!ind.parentTeamIds.length) return "indigo";
    const t = TEAM_OKRS.find(t => t.id === ind.parentTeamIds[0]);
    if (!t || !t.parentCompanyIds.length) return "indigo";
    const c = COMPANY_OKRS.find(c => c.id === t.parentCompanyIds[0]);
    return c ? c.color : "indigo";
  }

  // Cascade coverage stats
  const teamCoverage = Math.round((TEAM_OKRS.length / (TEAM_OKRS.length + 1)) * 100);
  const indCoverage = Math.round((INDIVIDUAL_OKRS.length / (INDIVIDUAL_OKRS.length + 0)) * 100);

  return (
    <div className="h-full flex flex-col gap-4">

      {/* Controls */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-200 rounded-xl flex p-1 gap-1">
            {[["cascade", "⊞ Cascade"], ["tree", "⊳ Tree"]].map(([v, l]) => (
              <button key={v} onClick={() => setViewMode(v)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-medium ${viewMode === v ? "bg-[#e40014] text-white" : "text-gray-500 hover:text-gray-700"}`}>
                {l}
              </button>
            ))}
          </div>
          {hasSelection && (
            <button onClick={() => setSelected(null)} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
              ✕ Clear selection
            </button>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span><span className="font-semibold text-gray-600">{COMPANY_OKRS.length}</span> company</span>
          <span>→</span>
          <span><span className="font-semibold text-gray-600">{TEAM_OKRS.length}</span> team</span>
          <span>→</span>
          <span><span className="font-semibold text-gray-600">{INDIVIDUAL_OKRS.length}</span> individual OKRs</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {COMPANY_OKRS.map((c) => {
          const pal = COMPANY_COLORS[c.color];
          return (
            <div key={c.id} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg ${pal.badge}`}>
              <span className={`w-2 h-2 rounded-full ${pal.bg}`} />
              <span className="font-medium truncate max-w-32">{c.owner.split(" (")[0]}</span>
            </div>
          );
        })}
        <span className="text-xs text-gray-400 ml-1">Click any card to trace its cascade</span>
      </div>

      {/* ── CASCADE VIEW ─────────────────────────────────── */}
      {viewMode === "cascade" && (
        <div className="flex gap-3 flex-1 min-h-0 overflow-hidden">

          {/* Company column */}
          <div className="flex flex-col gap-2 w-64 flex-shrink-0 overflow-y-auto pr-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-1 flex-shrink-0">Company Level</p>
            {COMPANY_OKRS.map((c) => {
              const isHl = !hasSelection || highlights.company.includes(c.id);
              const isDim = hasSelection && !highlights.company.includes(c.id);
              return (
                <CascadeCard key={c.id}
                  label={`C${c.id}`}
                  objective={c.objective}
                  owner={c.owner}
                  progress={c.progress}
                  status={c.status}
                  colorKey={c.color}
                  highlighted={hasSelection && highlights.company.includes(c.id)}
                  dimmed={isDim}
                  onClick={() => toggleSelect("company", c.id)}
                />
              );
            })}
          </div>

          {/* Arrow divider */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 gap-1 pt-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px h-6 bg-gray-200" />
            ))}
            <div className="text-gray-300 text-lg">›</div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px h-6 bg-gray-200" />
            ))}
          </div>

          {/* Team column */}
          <div className="flex flex-col gap-2 w-64 flex-shrink-0 overflow-y-auto pr-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-1 flex-shrink-0">Team Level</p>
            {TEAM_OKRS.map((t) => {
              const colorKey = teamColor(t.id);
              const isHl = hasSelection && highlights.team.includes(t.id);
              const isDim = hasSelection && !highlights.team.includes(t.id);
              // which company badge to show
              const parentColors = t.parentCompanyIds.map(cid => {
                const c = COMPANY_OKRS.find(c => c.id === cid);
                return c ? { id: cid, color: c.color } : null;
              }).filter(Boolean);
              return (
                <div key={t.id} className="space-y-1">
                  {parentColors.length > 1 && (
                    <div className="flex gap-1 px-1">
                      {parentColors.map(pc => (
                        <span key={pc.id} className={`text-xs px-1.5 py-0.5 rounded font-semibold ${COMPANY_COLORS[pc.color].badge}`}>C{pc.id}</span>
                      ))}
                    </div>
                  )}
                  <CascadeCard
                    label={parentColors.length === 1 ? `C${parentColors[0].id}` : null}
                    objective={t.objective}
                    owner={t.owner}
                    progress={t.progress}
                    status={t.status}
                    colorKey={colorKey}
                    highlighted={isHl}
                    dimmed={isDim}
                    onClick={() => toggleSelect("team", t.id)}
                  />
                </div>
              );
            })}
          </div>

          {/* Arrow divider */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 gap-1 pt-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px h-6 bg-gray-200" />
            ))}
            <div className="text-gray-300 text-lg">›</div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px h-6 bg-gray-200" />
            ))}
          </div>

          {/* Individual column */}
          <div className="flex flex-col gap-2 flex-1 min-w-0 overflow-y-auto pr-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-1 flex-shrink-0">Individual Level</p>
            {INDIVIDUAL_OKRS.map((ind) => {
              const colorKey = individualColor(ind);
              const isHl = hasSelection && highlights.individual.includes(ind.id);
              const isDim = hasSelection && !highlights.individual.includes(ind.id);
              const parentTeams = TEAM_OKRS.filter(t => ind.parentTeamIds.includes(t.id));
              return (
                <div key={ind.id} className="space-y-1">
                  <div className="flex gap-1 px-1 flex-wrap">
                    {parentTeams.map(pt => {
                      const ptColors = pt.parentCompanyIds.map(cid => COMPANY_OKRS.find(c => c.id === cid)).filter(Boolean);
                      return ptColors.map(pc => (
                        <span key={`${pt.id}-${pc.id}`} className={`text-xs px-1.5 py-0.5 rounded font-semibold ${COMPANY_COLORS[pc.color].badge}`}>C{pc.id}</span>
                      ));
                    })}
                  </div>
                  <CascadeCard
                    objective={ind.objective}
                    owner={ind.owner}
                    progress={ind.progress}
                    status={ind.status}
                    colorKey={colorKey}
                    highlighted={isHl}
                    dimmed={isDim}
                    onClick={() => toggleSelect("individual", ind.id)}
                    isMe={ind.owner === "Jaime Mico"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TREE VIEW ────────────────────────────────────── */}
      {viewMode === "tree" && (
        <div className="flex-1 min-h-0 overflow-y-auto space-y-3">
          {COMPANY_OKRS.map((c) => {
            const pal = COMPANY_COLORS[c.color];
            const isExpC = expandedCompany[c.id] !== false;
            const childTeams = TEAM_OKRS.filter(t => t.parentCompanyIds.includes(c.id));
            return (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Company row */}
                <div className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer ${pal.light} border-b border-gray-100`}
                  onClick={() => setExpandedCompany(prev => ({ ...prev, [c.id]: !isExpC }))}>
                  <div className={`w-2 h-2 rounded-full ${pal.bg} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-bold ${pal.text} uppercase tracking-wide`}>Company</span>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="text-sm font-semibold text-gray-800 truncate">{c.objective}</p>
                    <p className="text-xs text-gray-500">{c.owner}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${pal.text}`}>{c.progress}%</div>
                      <div className="w-24"><ProgressBar value={c.progress} colorClass={pal.bar} /></div>
                    </div>
                    <span className={`text-gray-400 text-sm transition-transform ${isExpC ? "rotate-90" : ""} inline-block`}>▶</span>
                  </div>
                </div>

                {/* Child teams */}
                {isExpC && (
                  <div className="px-4 py-3 space-y-2">
                    {childTeams.length === 0 && (
                      <div className="flex items-center gap-3 py-2 pl-6">
                        <div className="w-px h-4 bg-gray-200" />
                        <p className="text-xs text-gray-400 italic">No team OKRs linked yet</p>
                        <button className="text-xs text-red-500 hover:text-red-700">+ Link a team OKR</button>
                      </div>
                    )}
                    {childTeams.map((t, ti) => {
                      const tLast = ti === childTeams.length - 1;
                      const isExpT = expandedTeam[`${c.id}-${t.id}`] !== false;
                      const childInds = INDIVIDUAL_OKRS.filter(i => i.parentTeamIds.includes(t.id));
                      return (
                        <div key={t.id} className="flex gap-0">
                          {/* Vertical + horizontal connector */}
                          <div className="flex flex-col items-center w-6 flex-shrink-0">
                            <div className={`w-px flex-1 bg-gray-200 ${tLast ? "max-h-5" : ""}`} />
                            <div className="w-3 h-px bg-gray-200 mt-5 self-end" />
                          </div>
                          <div className="flex-1 min-w-0 pl-1">
                            {/* Team row */}
                            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer mb-2 ${pal.light} border-gray-100`}
                              onClick={() => setExpandedTeam(prev => ({ ...prev, [`${c.id}-${t.id}`]: !isExpT }))}>
                              <div className={`w-1.5 h-1.5 rounded-full ${pal.bg} flex-shrink-0`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className={`text-xs font-semibold ${pal.text}`}>Team</span>
                                  <StatusBadge status={t.status} />
                                </div>
                                <p className="text-xs font-semibold text-gray-800 truncate">{t.objective}</p>
                                <p className="text-xs text-gray-400">{t.owner}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className={`text-sm font-bold ${pal.text}`}>{t.progress}%</span>
                                <span className={`text-gray-400 text-xs transition-transform ${isExpT ? "rotate-90" : ""} inline-block`}>▶</span>
                              </div>
                            </div>

                            {/* Child individuals */}
                            {isExpT && childInds.map((ind, ii) => {
                              const iLast = ii === childInds.length - 1;
                              return (
                                <div key={ind.id} className="flex gap-0 mb-1.5">
                                  <div className="flex flex-col items-center w-5 flex-shrink-0">
                                    <div className={`w-px flex-1 bg-gray-100 ${iLast ? "max-h-4" : ""}`} />
                                    <div className="w-2.5 h-px bg-gray-100 mt-4 self-end" />
                                  </div>
                                  <div className="flex-1 min-w-0 pl-1">
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border bg-white border-gray-100`}>
                                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:"#e40014"}}>{ind.initials}</div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                          <span className="text-xs font-medium text-gray-500">{ind.owner}</span>
                                          {ind.owner === "Jaime Mico" && <span className="text-xs bg-red-50 text-[#e40014] px-1.5 rounded font-medium">You</span>}
                                          <StatusBadge status={ind.status} />
                                        </div>
                                        <p className="text-xs text-gray-700 truncate">{ind.objective}</p>
                                      </div>
                                      <span className="text-sm font-bold text-gray-600 flex-shrink-0">{ind.progress}%</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {isExpT && childInds.length === 0 && (
                              <div className="flex items-center gap-2 px-3 pb-1 pl-8">
                                <p className="text-xs text-gray-400 italic">No individual OKRs linked</p>
                                <button className="text-xs text-red-500 hover:text-red-700">+ Link</button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Detail panel when selection is active */}
      {selected && (
        <div className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Selected: {selected.level === "company" ? "Company OKR" : selected.level === "team" ? "Team OKR" : "Individual OKR"}
            </p>
            <button onClick={() => setSelected(null)} className="text-xs text-gray-400 hover:text-gray-600">Clear ✕</button>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Cascade trace</p>
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-1 rounded-lg font-medium ${highlights.company.length ? "bg-red-50 text-red-700" : "bg-gray-50 text-gray-400"}`}>
                  {highlights.company.length} company OKR{highlights.company.length !== 1 ? "s" : ""}
                </span>
                <span className="text-gray-300">→</span>
                <span className={`px-2 py-1 rounded-lg font-medium ${highlights.team.length ? "bg-violet-100 text-violet-700" : "bg-gray-50 text-gray-400"}`}>
                  {highlights.team.length} team OKR{highlights.team.length !== 1 ? "s" : ""}
                </span>
                <span className="text-gray-300">→</span>
                <span className={`px-2 py-1 rounded-lg font-medium ${highlights.individual.length ? "bg-emerald-100 text-emerald-700" : "bg-gray-50 text-gray-400"}`}>
                  {highlights.individual.length} individual OKR{highlights.individual.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="border-l border-gray-100 pl-6">
              <p className="text-xs text-gray-500 mb-1">Avg. progress across cascade</p>
              <div className="flex items-center gap-2">
                {(() => {
                  const nodes = [
                    ...COMPANY_OKRS.filter(c => highlights.company.includes(c.id)),
                    ...TEAM_OKRS.filter(t => highlights.team.includes(t.id)),
                    ...INDIVIDUAL_OKRS.filter(i => highlights.individual.includes(i.id)),
                  ];
                  const avg = nodes.length ? Math.round(nodes.reduce((s, n) => s + n.progress, 0) / nodes.length) : 0;
                  return (
                    <>
                      <span className="text-2xl font-bold text-gray-800">{avg}%</span>
                      <div className="w-32"><ProgressBar value={avg} /></div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Reviews Page ─────────────────────────────────────────────────────────

function ReviewsPage({ role }) {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [modal, setModal] = useState(null);
  const myReview = reviews.find(r => r.id === "r1");

  function handleSave({ ratings, comment }) {
    setReviews(prev => prev.map(r => {
      if (r.id !== modal.review.id) return r;
      if (modal.mode === "self") return { ...r, selfRatings: ratings, selfComment: comment, status: "pending_manager", submittedAt: "Mar 8, 2026" };
      return { ...r, managerRatings: ratings, managerComment: comment, status: "completed", reviewedAt: "Mar 8, 2026" };
    }));
  }

  const pendingManager = reviews.filter(r => r.status === "pending_manager").length;
  const completed = reviews.filter(r => r.status === "completed").length;
  const pendingSelf = reviews.filter(r => r.status === "pending_self").length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center"><p className="text-2xl font-bold text-amber-600">{pendingManager}</p><p className="text-xs text-amber-700 mt-0.5">Awaiting Manager Review</p></div>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center"><p className="text-2xl font-bold text-gray-600">{pendingSelf}</p><p className="text-xs text-gray-500 mt-0.5">Awaiting Self-Assessment</p></div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{completed}</p><p className="text-xs text-emerald-700 mt-0.5">Completed Reviews</p></div>
      </div>
      {role === "Individual" && myReview && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">My Q1 2026 Review</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2"><ReviewStatusBadge status={myReview.status} /><span className="text-xs text-gray-400">Manager: {myReview.manager}</span></div>
                {myReview.status === "pending_self" && <p className="text-sm text-gray-600">Your self-assessment is due.</p>}
                {myReview.status === "pending_manager" && <p className="text-sm text-gray-600">Submitted. Waiting for manager's review.</p>}
                {myReview.status === "completed" && <p className="text-sm text-gray-600">Your review is complete.</p>}
              </div>
              <div>
                {myReview.status === "pending_self" && <button onClick={() => setModal({ review: myReview, mode: "self" })} className="text-sm px-4 py-2 bg-[#e40014] text-white rounded-xl hover:bg-[#bf000f] transition-colors font-medium">Start Self-Review</button>}
                {myReview.status === "pending_manager" && <button onClick={() => setModal({ review: myReview, mode: "view" })} className="text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">View Submission</button>}
                {myReview.status === "completed" && <button onClick={() => setModal({ review: myReview, mode: "view" })} className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium">View Full Review</button>}
              </div>
            </div>
            {myReview.status !== "pending_self" && Object.keys(myReview.selfRatings).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-xs text-gray-400 mb-2">Your ratings</p>
                <div className="flex gap-4 flex-wrap">{REVIEW_DIMENSIONS.map(dim => (<div key={dim} className="text-center"><p className="text-xs text-gray-500">{dim}</p><StarRating value={myReview.selfRatings[dim] || 0} readonly /></div>))}</div>
              </div>
            )}
            {myReview.status === "completed" && Object.keys(myReview.managerRatings).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-xs text-red-500 font-medium mb-2">Manager ratings</p>
                <div className="flex gap-4 flex-wrap">{REVIEW_DIMENSIONS.map(dim => (<div key={dim} className="text-center"><p className="text-xs text-gray-500">{dim}</p><StarRating value={myReview.managerRatings[dim] || 0} readonly /></div>))}</div>
                {myReview.managerComment && <div className="mt-3 bg-red-50 rounded-xl p-3"><p className="text-xs text-[#e40014] font-medium mb-1">Manager's message</p><p className="text-sm text-gray-700 italic">"{myReview.managerComment}"</p></div>}
              </div>
            )}
          </div>
        </div>
      )}
      {(role === "Team Lead" || role === "HR / People Ops" || role === "Executive") && (
        <div className="space-y-3">
          <div className="flex items-center justify-between"><p className="text-sm font-semibold text-gray-700">Team Review Queue — Q1 2026</p><span className="text-xs text-gray-400">{reviews.length} reviews</span></div>
          {reviews.map(r => <ReviewQueueCard key={r.id} review={r} role={role} onOpen={(rev, mode) => setModal({ review: rev, mode })} />)}
        </div>
      )}
      <Modal open={!!modal} onClose={() => setModal(null)}>
        {modal && <ReviewForm review={modal.review} mode={modal.mode} onSave={handleSave} onClose={() => setModal(null)} />}
      </Modal>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",    icon: "▦" },
  { id: "my",         label: "My OKRs",      icon: "◎" },
  { id: "team",       label: "Team OKRs",    icon: "⬡" },
  { id: "company",    label: "Company OKRs", icon: "◈" },
  { id: "alignment",  label: "Alignment",    icon: "⇢" },
  { id: "reviews",    label: "Reviews",      icon: "✦" },
];

// ─── App Root ─────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [role, setRole] = useState("Individual");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const allOkrs = [...INDIVIDUAL_OKRS.slice(0, 1), ...TEAM_OKRS, ...COMPANY_OKRS];
  const onTrack  = allOkrs.filter(o => o.status === "on_track").length;
  const atRisk   = allOkrs.filter(o => o.status === "at_risk").length;
  const avgProgress = Math.round(allOkrs.reduce((s, o) => s + o.progress, 0) / allOkrs.length);

  const pageTitle = { dashboard: "Overview", my: "My OKRs", team: "Team OKRs", company: "Company OKRs", alignment: "Alignment & Cascade", reviews: "Review Cycles" };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-16"} transition-all duration-300 flex flex-col flex-shrink-0`} style={{background:"#111111"}}>
        <div className="flex items-center gap-2.5 px-4 py-5" style={{borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          {/* Quartux Q logo mark */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <circle cx="16" cy="16" r="15" stroke="#e40014" strokeWidth="2" fill="none"/>
            <circle cx="16" cy="16" r="7" stroke="#e40014" strokeWidth="2" fill="none"/>
            <line x1="21" y1="21" x2="28" y2="28" stroke="#e40014" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          {sidebarOpen && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm text-white tracking-widest uppercase">Quartux</span>
              <span className="text-xs tracking-wider" style={{color:"#e40014"}}>OKR Platform</span>
            </div>
          )}
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${activeNav === item.id ? "font-semibold" : "hover:bg-white/5"}`}
              style={activeNav === item.id
                ? {background:"rgba(228,0,20,0.15)", color:"#e40014"}
                : {color:"rgba(255,255,255,0.5)"}}>
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
              {item.id === "reviews" && sidebarOpen && (
                <span className="ml-auto text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0" style={{background:"#e40014"}}>2</span>
              )}
            </button>
          ))}
        </nav>
        {sidebarOpen && (
          <div className="px-3 pb-5 pt-4" style={{borderTop:"1px solid rgba(255,255,255,0.07)"}}>
            <p className="text-xs mb-1.5 px-1" style={{color:"rgba(255,255,255,0.35)"}}>View as role</p>
            <select value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2"
              style={{background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.8)", focusRingColor:"#e40014"}}>
              {ROLES.map(r => <option key={r} style={{background:"#111111"}}>{r}</option>)}
            </select>
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-4 mx-auto w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-sm hover:bg-white/10"
          style={{color:"rgba(255,255,255,0.35)"}}>
          {sidebarOpen ? "◂" : "▸"}
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{pageTitle[activeNav]}</h1>
            <p className="text-xs text-gray-400 mt-0.5">Q1 2026 · Viewing as <span className="font-medium" style={{color:"#e40014"}}>{role}</span></p>
          </div>
          <div className="flex items-center gap-3">
            {activeNav !== "reviews" && activeNav !== "alignment" && (
              <span className="text-xs text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors" style={{background:"#e40014"}}>+ New Objective</span>
            )}
            {activeNav === "reviews" && (role === "Team Lead" || role === "HR / People Ops") && (
              <span className="text-xs text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors" style={{background:"#111111"}}>⬇ Export Reviews</span>
            )}
            {activeNav === "alignment" && (
              <span className="text-xs text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors" style={{background:"#e40014"}}>+ Link OKR</span>
            )}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:"#e40014"}}>
              {role === "Individual" ? "JM" : role === "Team Lead" ? "TL" : role === "HR / People Ops" ? "HR" : "EX"}
            </div>
          </div>
        </header>

        <div className={`flex-1 overflow-hidden ${activeNav === "alignment" ? "p-6 flex flex-col" : "overflow-y-auto p-6"}`}>

          {/* DASHBOARD */}
          {activeNav === "dashboard" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-4 gap-4">
                <StatCard label="Avg. Progress" value={`${avgProgress}%`} sub="across all OKRs" color="text-[#e40014]" />
                <StatCard label="On Track" value={onTrack} sub={`of ${allOkrs.length} objectives`} color="text-emerald-600" />
                <StatCard label="At Risk" value={atRisk} sub="need attention" color="text-amber-500" />
                <StatCard label="Reviews Pending" value={2} sub="→ Go to Reviews" color="text-amber-500" highlight onClick={() => setActiveNav("reviews")} />
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-700">OKR Health by Level</p>
                  <button onClick={() => setActiveNav("alignment")} className="text-xs text-[#e40014] hover:text-[#bf000f] font-medium">View cascade →</button>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Company", progress: Math.round(COMPANY_OKRS.reduce((s,o) => s+o.progress,0)/COMPANY_OKRS.length), count: COMPANY_OKRS.length },
                    { label: "Team",    progress: Math.round(TEAM_OKRS.reduce((s,o) => s+o.progress,0)/TEAM_OKRS.length),    count: TEAM_OKRS.length },
                    { label: "Individual", progress: Math.round(INDIVIDUAL_OKRS.reduce((s,o) => s+o.progress,0)/INDIVIDUAL_OKRS.length), count: INDIVIDUAL_OKRS.length },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-4">
                      <span className="text-sm text-gray-600 w-20 flex-shrink-0">{row.label}</span>
                      <div className="flex-1"><ProgressBar value={row.progress} /></div>
                      <span className="text-sm font-semibold text-gray-700 w-10 text-right">{row.progress}%</span>
                      <span className="text-xs text-gray-400 w-16 text-right">{row.count} OKRs</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-sm font-semibold text-gray-700 mb-4">Recent Activity</p>
                <div className="space-y-3">
                  {[
                    { user: "Jaime M.", action: "submitted self-assessment", time: "3h ago", color: "bg-red-50 text-red-700" },
                    { user: "Carlos R.", action: "updated P1 bug resolution time → 5.8h", time: "5h ago", color: "bg-amber-100 text-amber-700" },
                    { user: "Valentina C.", action: "review completed by manager ✓", time: "2d ago", color: "bg-emerald-100 text-emerald-700" },
                    { user: "Growth Team", action: "completed Ship new onboarding flow ✓", time: "3d ago", color: "bg-emerald-100 text-emerald-700" },
                  ].map((u, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full ${u.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>{u.user[0]}</div>
                      <div className="flex-1 min-w-0"><span className="text-sm font-medium text-gray-800">{u.user}</span><span className="text-sm text-gray-500"> {u.action}</span></div>
                      <span className="text-xs text-gray-400 flex-shrink-0">{u.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeNav === "my" && (
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-sm text-gray-500">{INDIVIDUAL_OKRS.filter(i => i.owner === "Jaime Mico").length} objective this quarter</p>
              {INDIVIDUAL_OKRS.filter(i => i.owner === "Jaime Mico").map(okr => <OKRCard key={okr.id} okr={okr} expanded={true} />)}
            </div>
          )}
          {activeNav === "team" && (
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-sm text-gray-500">{TEAM_OKRS.length} team objectives this quarter</p>
              {TEAM_OKRS.map(okr => <OKRCard key={okr.id} okr={okr} />)}
            </div>
          )}
          {activeNav === "company" && (
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-sm text-gray-500">{COMPANY_OKRS.length} company objectives this quarter</p>
              {COMPANY_OKRS.map(okr => <OKRCard key={okr.id} okr={okr} />)}
            </div>
          )}
          {activeNav === "alignment" && <AlignmentPage role={role} />}
          {activeNav === "reviews" && <ReviewsPage role={role} />}

        </div>
      </main>
    </div>
  );
}
