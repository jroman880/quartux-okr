import { useState } from "react";

// ─── Alignment Data ────────────────────────────────────────────────────────
// parentCompanyIds / parentTeamIds define the cascade linkage

const COMPANY_OKRS = [
  {
    id: 1, color: "red",
    objective: "Become the #1 platform in LATAM for SMB financial management",
    owner: "Lucía Méndez (CEO)", quarter: "Q1 2026", progress: 62, status: "on_track",
    keyResults: [
      { id: 1, text: "Reach 10,000 active paying customers", progress: 70, current: "7,000", target: "10,000" },
      { id: 2, text: "Achieve NPS score of 55+", progress: 80, current: "44", target: "55" },
      { id: 3, text: "Expand to 3 new countries", progress: 33, current: "1", target: "3" },
    ],
  },
  {
    id: 2, color: "violet",
    objective: "Deliver a world-class product experience with zero critical bugs",
    owner: "Carlos Ríos (CTO)", quarter: "Q1 2026", progress: 48, status: "at_risk",
    keyResults: [
      { id: 4, text: "Reduce P1 bug resolution time to under 4 hours", progress: 60, current: "5.8h", target: "4h" },
      { id: 5, text: "Ship 4 major product features", progress: 50, current: "2", target: "4" },
      { id: 6, text: "Achieve 99.9% uptime SLA", progress: 35, current: "99.4%", target: "99.9%" },
    ],
  },
  {
    id: 3, color: "emerald",
    objective: "Build a high-performance culture that attracts and retains top talent",
    owner: "Andrea Torres (VP People)", quarter: "Q1 2026", progress: 75, status: "on_track",
    keyResults: [
      { id: 7, text: "Achieve 90% employee engagement score", progress: 85, current: "76%", target: "90%" },
      { id: 8, text: "Reduce voluntary churn to below 8%", progress: 80, current: "9.2%", target: "8%" },
      { id: 9, text: "Fill all open headcount within 45 days avg", progress: 60, current: "52 days", target: "45 days" },
    ],
  },
];

const TEAM_OKRS = [
  {
    id: 10, parentCompanyIds: [1, 2],
    objective: "Launch onboarding v2 and reduce time-to-value to under 7 days",
    owner: "Growth Team", quarter: "Q1 2026", progress: 55, status: "on_track",
    keyResults: [
      { id: 11, text: "Ship new onboarding flow by Feb 15", progress: 100, current: "Done", target: "Done" },
      { id: 12, text: "Reduce avg activation time from 14 to 7 days", progress: 40, current: "10.2 days", target: "7 days" },
      { id: 13, text: "Increase onboarding completion rate to 80%", progress: 25, current: "52%", target: "80%" },
    ],
  },
  {
    id: 14, parentCompanyIds: [1],
    objective: "Scale revenue team to close $2M in new ARR this quarter",
    owner: "Sales Team", quarter: "Q1 2026", progress: 72, status: "on_track",
    keyResults: [
      { id: 15, text: "Close 120 new accounts", progress: 75, current: "90", target: "120" },
      { id: 16, text: "Achieve $2M in new ARR", progress: 70, current: "$1.4M", target: "$2M" },
      { id: 17, text: "Maintain win rate above 28%", progress: 70, current: "26%", target: "28%" },
    ],
  },
  {
    id: 18, parentCompanyIds: [3],
    objective: "Launch Q1 hiring sprint and hit 100% headcount by end of March",
    owner: "People Ops Team", quarter: "Q1 2026", progress: 68, status: "on_track",
    keyResults: [
      { id: 19, text: "Post all 12 open roles by Jan 31", progress: 100, current: "Done", target: "Done" },
      { id: 201, text: "Reach 85% offer acceptance rate", progress: 60, current: "74%", target: "85%" },
      { id: 202, text: "Complete onboarding for 8 new hires", progress: 50, current: "4", target: "8" },
    ],
  },
];

const INDIVIDUAL_OKRS = [
  {
    id: 20, parentTeamIds: [10, 14],
    objective: "Drive product-led growth initiatives that increase free-to-paid conversion",
    owner: "Jaime", initials: "JR", role: "Growth Lead",
    quarter: "Q1 2026", progress: 43, status: "at_risk",
    keyResults: [
      { id: 21, text: "Run 3 A/B tests on the upgrade flow", progress: 33, current: "1", target: "3" },
      { id: 22, text: "Increase free-to-paid conversion from 4% to 7%", progress: 50, current: "5.5%", target: "7%" },
      { id: 23, text: "Publish 5 case studies with customers", progress: 40, current: "2", target: "5" },
    ],
  },
  {
    id: 30, parentTeamIds: [10],
    objective: "Redesign onboarding experience to boost activation completion rate",
    owner: "Ana López", initials: "AL", role: "Product Designer",
    quarter: "Q1 2026", progress: 68, status: "on_track",
    keyResults: [
      { id: 31, text: "Complete UX audit of current onboarding flow", progress: 100, current: "Done", target: "Done" },
      { id: 32, text: "Ship redesigned onboarding to 50% of users", progress: 60, current: "30%", target: "50%" },
      { id: 33, text: "Raise completion rate from 52% to 70%", progress: 45, current: "59%", target: "70%" },
    ],
  },
  {
    id: 40, parentTeamIds: [10],
    objective: "Build scalable API infrastructure to support multi-country expansion",
    owner: "Diego Reyes", initials: "DR", role: "Backend Engineer",
    quarter: "Q1 2026", progress: 55, status: "on_track",
    keyResults: [
      { id: 41, text: "Migrate 3 core services to new architecture", progress: 67, current: "2", target: "3" },
      { id: 42, text: "Achieve p99 API latency under 200ms", progress: 40, current: "340ms", target: "200ms" },
      { id: 43, text: "Deploy to Colombia staging env", progress: 60, current: "In progress", target: "Done" },
    ],
  },
  {
    id: 50, parentTeamIds: [14],
    objective: "Implement revenue intelligence dashboard to accelerate deal velocity",
    owner: "Valentina Cruz", initials: "VC", role: "Data Analyst",
    quarter: "Q1 2026", progress: 80, status: "on_track",
    keyResults: [
      { id: 51, text: "Build pipeline health dashboard in Metabase", progress: 100, current: "Done", target: "Done" },
      { id: 52, text: "Reduce avg sales cycle from 22 to 16 days", progress: 70, current: "18 days", target: "16 days" },
      { id: 53, text: "Deliver weekly pipeline report to leadership", progress: 70, current: "7 of 10", target: "10 reports" },
    ],
  },
  {
    id: 60, parentTeamIds: [18],
    objective: "Build world-class candidate experience that attracts top engineering talent",
    owner: "Sofia Vargas", initials: "SV", role: "Talent Partner",
    quarter: "Q1 2026", progress: 72, status: "on_track",
    keyResults: [
      { id: 61, text: "Cut interview process from 6 to 4 rounds", progress: 100, current: "Done", target: "Done" },
      { id: 62, text: "Achieve 4.5★ Glassdoor rating for interview experience", progress: 60, current: "4.1★", target: "4.5★" },
      { id: 63, text: "Source 50% of hires via referrals", progress: 55, current: "28%", target: "50%" },
    ],
  },
];

// ─── Review Data ──────────────────────────────────────────────────────────

const REVIEW_DIMENSIONS = ["Execution", "Collaboration", "Impact", "Growth"];

const INITIAL_REVIEWS = [
  {
    id: "r1", employee: "Jaime Mico", initials: "JM", role: "Growth Lead",
    manager: "Sofía Vargas", quarter: "Q1 2026", status: "pending_manager",
    selfRatings: { Execution: 4, Collaboration: 5, Impact: 3, Growth: 4 },
    selfComment: "This quarter I focused on launching the new A/B testing framework. We made great progress on onboarding conversion, though expansion to new markets was slower than expected due to integration blockers.",
    managerRatings: {}, managerComment: "", submittedAt: "Mar 5, 2026", reviewedAt: null,
  },
  {
    id: "r2", employee: "Ana López", initials: "AL", role: "Product Designer",
    manager: "Sofía Vargas", quarter: "Q1 2026", status: "pending_manager",
    selfRatings: { Execution: 5, Collaboration: 4, Impact: 4, Growth: 3 },
    selfComment: "I delivered the onboarding v2 redesign ahead of schedule and the results have been outstanding.",
    managerRatings: {}, managerComment: "", submittedAt: "Mar 4, 2026", reviewedAt: null,
  },
  {
    id: "r3", employee: "Diego Reyes", initials: "DR", role: "Backend Engineer",
    manager: "Sofía Vargas", quarter: "Q1 2026", status: "pending_self",
    selfRatings: {}, selfComment: "", managerRatings: {}, managerComment: "",
    submittedAt: null, reviewedAt: null,
  },
  {
    id: "r4", employee: "Valentina Cruz", initials: "VC", role: "Data Analyst",
    manager: "Sofía Vargas", quarter: "Q1 2026", status: "completed",
    selfRatings: { Execution: 4, Collaboration: 4, Impact: 5, Growth: 4 },
    selfComment: "Built the entire metrics pipeline from scratch. Proud of the impact on our data-driven decisions.",
    managerRatings: { Execution: 4, Collaboration: 5, Impact: 5, Growth: 4 },
    managerComment: "Valentina exceeded expectations this quarter. Her data infrastructure work directly enabled our expansion decisions.",
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
const RATING_COLORS = { 1: "text-red-500", 2: "text-orange-400", 3: "text-amber-500", 4: "text-emerald-500", 5: "text-indigo-600" };

// Company color palettes
const COMPANY_COLORS = {
  indigo:  { bg: "bg-indigo-500",  light: "bg-indigo-50",  border: "border-indigo-400", ring: "ring-indigo-400",  text: "text-indigo-700",  badge: "bg-indigo-100 text-indigo-700",  bar: "bg-indigo-500"  },
  violet:  { bg: "bg-violet-500",  light: "bg-violet-50",  border: "border-violet-400", ring: "ring-violet-400",  text: "text-violet-700",  badge: "bg-violet-100 text-violet-700",  bar: "bg-violet-500"  },
  emerald: { bg: "bg-emerald-500", light: "bg-emerald-50", border: "border-emerald-400",ring: "ring-emerald-400", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" },
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
                      className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors">
                      Update
                    </button>
                  )}
                </div>
              </div>
              <ProgressBar value={kr.progress} size="sm" />
              {updateKR === kr.id && (
                <div className="mt-2 bg-indigo-50 rounded-xl p-3 space-y-2">
                  <p className="text-xs font-semibold text-indigo-700">Post a progress update</p>
                  <textarea className="w-full text-sm border border-indigo-200 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    rows={2} placeholder="What's the latest? Any blockers?" value={noteVal} onChange={(e) => setNoteVal(e.target.value)} />
                  <div className="flex gap-2">
                    <button onClick={() => { setUpdateKR(null); setNoteVal(""); }}
                      className="text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Save Update</button>
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
      <button onClick={onClose} className="mt-2 text-sm px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">Done</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0">{review.initials}</div>
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
          <div className="bg-indigo-50 rounded-2xl p-4 space-y-4">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Manager Review</p>
            {REVIEW_DIMENSIONS.map((dim) => (
              <div key={dim}><p className="text-xs text-gray-600 mb-1 font-medium">{dim}</p><StarRating value={review.managerRatings[dim] || 0} readonly /></div>
            ))}
            <div className="pt-2 border-t border-indigo-200"><p className="text-xs text-gray-500 font-medium mb-1">Manager Feedback</p><p className="text-sm text-gray-700 leading-relaxed">{review.managerComment}</p></div>
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
                {allRated && <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-xl"><span className="text-xs text-gray-500">Avg score</span><span className="text-sm font-bold text-indigo-700">{avgRating} / 5</span></div>}
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
              <textarea className="w-full text-sm border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
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
                  className={`text-sm px-5 py-2 rounded-xl font-medium transition-colors ${allRated && comment.trim() ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
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
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{review.initials}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-gray-800">{review.employee}</p>
          <span className="text-xs text-gray-400">·</span>
          <p className="text-xs text-gray-500">{review.role}</p>
        </div>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <ReviewStatusBadge status={review.status} />
          {selfAvg && <span className="text-xs text-gray-500">Self: <span className="font-semibold text-amber-500">{selfAvg}★</span></span>}
          {managerAvg && <span className="text-xs text-gray-500">Manager: <span className="font-semibold text-indigo-600">{managerAvg}★</span></span>}
        </div>
        {review.submittedAt && <p className="text-xs text-gray-400 mt-1">Submitted {review.submittedAt}</p>}
      </div>
      <div className="flex-shrink-0">
        {review.status === "pending_self" && <span className="text-xs text-gray-400 italic">Waiting for employee…</span>}
        {review.status === "pending_manager" && (role === "Team Lead" || role === "HR / People Ops") && (
          <button onClick={() => onOpen(review, "manager")} className="text-xs px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium">Write Review</button>
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
      {isMe && <span className="mt-1.5 inline-block text-xs bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-medium">You</span>}
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
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-medium ${viewMode === v ? "bg-indigo-600 text-white" : "text-gray-500 hover:text-gray-700"}`}>
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
                        <button className="text-xs text-indigo-500 hover:text-indigo-700">+ Link a team OKR</button>
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
                                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{ind.initials}</div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                          <span className="text-xs font-medium text-gray-500">{ind.owner}</span>
                                          {ind.owner === "Jaime Mico" && <span className="text-xs bg-indigo-50 text-indigo-600 px-1.5 rounded font-medium">You</span>}
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
                                <button className="text-xs text-indigo-500 hover:text-indigo-700">+ Link</button>
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
                <span className={`px-2 py-1 rounded-lg font-medium ${highlights.company.length ? "bg-indigo-100 text-indigo-700" : "bg-gray-50 text-gray-400"}`}>
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
                {myReview.status === "pending_self" && <button onClick={() => setModal({ review: myReview, mode: "self" })} className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium">Start Self-Review</button>}
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
                <p className="text-xs text-indigo-500 font-medium mb-2">Manager ratings</p>
                <div className="flex gap-4 flex-wrap">{REVIEW_DIMENSIONS.map(dim => (<div key={dim} className="text-center"><p className="text-xs text-gray-500">{dim}</p><StarRating value={myReview.managerRatings[dim] || 0} readonly /></div>))}</div>
                {myReview.managerComment && <div className="mt-3 bg-indigo-50 rounded-xl p-3"><p className="text-xs text-indigo-600 font-medium mb-1">Manager's message</p><p className="text-sm text-gray-700 italic">"{myReview.managerComment}"</p></div>}
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
      <aside className={`${sidebarOpen ? "w-56" : "w-16"} transition-all duration-300 bg-white border-r border-gray-100 flex flex-col flex-shrink-0`}>
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-50">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">Q</div>
          {sidebarOpen && <span className="font-bold text-base text-gray-800 truncate">Quartux OKR</span>}
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${activeNav === item.id ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}>
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
              {item.id === "reviews" && sidebarOpen && (
                <span className="ml-auto bg-amber-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0">2</span>
              )}
            </button>
          ))}
        </nav>
        {sidebarOpen && (
          <div className="px-3 pb-5 border-t border-gray-50 pt-4">
            <p className="text-xs text-gray-400 mb-1.5 px-1">View as role</p>
            <select value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200">
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-4 mx-auto w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors text-sm">
          {sidebarOpen ? "◂" : "▸"}
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{pageTitle[activeNav]}</h1>
            <p className="text-xs text-gray-400 mt-0.5">Q1 2026 · Viewing as <span className="font-medium text-indigo-600">{role}</span></p>
          </div>
          <div className="flex items-center gap-3">
            {activeNav !== "reviews" && activeNav !== "alignment" && (
              <span className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer hover:bg-indigo-700 transition-colors">+ New Objective</span>
            )}
            {activeNav === "reviews" && (role === "Team Lead" || role === "HR / People Ops") && (
              <span className="text-xs bg-violet-600 text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer hover:bg-violet-700 transition-colors">⬇ Export Reviews</span>
            )}
            {activeNav === "alignment" && (
              <span className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer hover:bg-indigo-700 transition-colors">+ Link OKR</span>
            )}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              {role === "Individual" ? "JM" : role === "Team Lead" ? "TL" : role === "HR / People Ops" ? "HR" : "EX"}
            </div>
          </div>
        </header>

        <div className={`flex-1 overflow-hidden ${activeNav === "alignment" ? "p-6 flex flex-col" : "overflow-y-auto p-6"}`}>

          {/* DASHBOARD */}
          {activeNav === "dashboard" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-4 gap-4">
                <StatCard label="Avg. Progress" value={`${avgProgress}%`} sub="across all OKRs" color="text-indigo-600" />
                <StatCard label="On Track" value={onTrack} sub={`of ${allOkrs.length} objectives`} color="text-emerald-600" />
                <StatCard label="At Risk" value={atRisk} sub="need attention" color="text-amber-500" />
                <StatCard label="Reviews Pending" value={2} sub="→ Go to Reviews" color="text-amber-500" highlight onClick={() => setActiveNav("reviews")} />
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-700">OKR Health by Level</p>
                  <button onClick={() => setActiveNav("alignment")} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View cascade →</button>
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
                    { user: "Jaime M.", action: "submitted self-assessment", time: "3h ago", color: "bg-indigo-100 text-indigo-700" },
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
