import "./Navigation.css";
export const History = ({ onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`nav-animation w-full rounded-xl border border-slate-300 text-sm font-semibold tracking-wide ${
        isActive
          ? "bg-slate-800 text-white shadow-md"
          : "bg-white/70 text-slate-800 hover:bg-white"
      }`}
    >
      HISTORY
    </button>
  );
};
