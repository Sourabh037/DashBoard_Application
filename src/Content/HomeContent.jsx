const citiesData = [
  { name: "Abu Dhabi", expire: 2, active: 2, printer: 4 },
  { name: "Dubai", expire: 3, active: 5, printer: 4 },
  { name: "Birmingham", expire: 1, active: 3, printer: 5 },
  { name: "Chicago", expire: 4, active: 2, printer: 6 },
  { name: "Doha", expire: 2, active: 6, printer: 3 },
  { name: "Jeddah", expire: 5, active: 4, printer: 2 },
  { name: "Kuwait", expire: 3, active: 2, printer: 5 },
  { name: "Munich", expire: 1, active: 4, printer: 6 },
];

const metrics = [
  { key: "expire", label: "Expire", color: "bg-rose-500" },
  { key: "active", label: "Active", color: "bg-emerald-500" },
  { key: "printer", label: "Printer", color: "bg-sky-500" },
];

function CityGraph({ city }) {
  const maxValue = Math.max(
    city.expire,
    city.active,
    city.printer,
    1
  );

  return (
    <article className="min-w-0 border border-slate-200 bg-white p-2">
      <h3 className="mb-1 truncate text-center text-xs font-semibold text-slate-800">
        {city.name}
      </h3>

      <div className="flex h-24 items-end justify-center border-b border-slate-300">
        <div className="flex h-full w-24 items-end justify-center gap-0">
          {metrics.map((metric) => {
            const value = city[metric.key];
            const height = (value / maxValue) * 100;

            return (
              <div
                key={metric.key}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <span className="mb-1 text-[10px] font-semibold text-slate-600">
                  {value}
                </span>

                <div
                  className={`w-full ${metric.color}`}
                  style={{ height: `${height}%` }}
                  title={`${metric.label}: ${value}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function HomeContent() {
  return (
    <section className="flex h-full min-h-0 w-full min-w-0 flex-col gap-3">
      {/* Color legend */}
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-6 gap-y-2 border border-slate-200 bg-white py-2 pl-10 pr-3">
        {metrics.map((metric) => (
          <div key={metric.key} className="flex items-center gap-2">
            <span className={`h-3 w-3 ${metric.color}`} />
            <span className="text-xs font-medium text-slate-700">
              {metric.label}
            </span>
          </div>
        ))}
      </div>

      {/* City graphs */}
      <div className="grid min-h-0 grid-cols-2 content-start gap-2 sm:grid-cols-4">
        {citiesData.map((city) => (
          <CityGraph key={city.name} city={city} />
        ))}
      </div>
    </section>
  );
}
