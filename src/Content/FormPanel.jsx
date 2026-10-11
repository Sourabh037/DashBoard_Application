export default function FormPanel({
  title,
  children,
  actions,
}) {
  return (
    <section className="box-border w-full min-w-0 rounded-xl border border-slate-300 bg-slate-100 p-3 sm:p-4 lg:p-5">
      <div className="mb-4 border-b border-slate-300 px-1 pb-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 sm:text-base">
          {title}
        </h2>
      </div>

      <div className="min-w-0 px-1">
        {children}
      </div>

      {actions && (
        <div className="mt-4 flex flex-wrap justify-end gap-3 border-t border-slate-300 px-1 pt-4">
          {actions}
        </div>
      )}
    </section>
  );
}
