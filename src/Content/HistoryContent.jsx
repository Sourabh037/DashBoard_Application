
const columns = [
  { key: "slNo", label: "SL.NO.", align: "center" },
  { key: "clientName", label: "Client Name" },
  { key: "location", label: "Location" },
  { key: "timeZone", label: "Time Zone" },
  { key: "noOfPrinters", label: "No. Of Printers", align: "center" },
  { key: "issueDate", label: "Issue Date", align: "center" },
  { key: "startDate", label: "Start Date", align: "center" },
  { key: "expiryDate", label: "Expiry Date", align: "center" },
];

function LicenseTable({ title, licenses = [] }) {
  return (
    <section className="min-w-0 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold tracking-wide text-slate-800">
          {title}
        </h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {licenses.length} records
        </span>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-250 border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-100 text-slate-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`whitespace-nowrap border-r border-slate-200 px-3 py-3 font-semibold last:border-r-0 ${
                    column.align === "center" ? "text-center" : ""
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {licenses.length > 0 ? (
              licenses.map((license, index) => (
                <tr
                  key={license.id ?? license.slNo ?? index}
                  className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`whitespace-nowrap border-r border-slate-100 px-3 py-3 text-slate-600 last:border-r-0 ${
                        column.align === "center"
                          ? "text-center"
                          : ""
                      }`}
                    >
                      {license[column.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-slate-400"
                >
                  No {title.toLowerCase()} records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function HistoryContent({
  selectedCountry,
  activeLicenses = [],
  expiredLicenses = [],
  loading = false,
  error = "",
}) {
  // Filter API records for the currently selected country.
  const filterByCountry = (licenses) =>
    licenses.filter((license) => {
      const country =
        license.country ??
        license.location ??
        license.city;

      // Keep records without a country field until the API
      // response format is confirmed.
      if (!country) return true;

      return (
        String(country).toLowerCase() ===
        String(selectedCountry).toLowerCase()
      );
    });

  const activeRecords = filterByCountry(activeLicenses);
  const expiredRecords = filterByCountry(expiredLicenses);

  if (loading) {
    return (
      <section className="flex min-h-75 items-center justify-center rounded-xl border border-slate-200 bg-white">
        <p className="text-sm font-medium text-slate-500">
          Loading license history...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-xl border border-red-200 bg-white p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load license history
        </h2>
        <p className="mt-2 text-sm text-slate-600">{error}</p>
      </section>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-7 pb-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            License History
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            License records for {selectedCountry}
          </p>
        </div>
      </div>

      <LicenseTable
        title="Active License"
        licenses={activeRecords}
      />

      <LicenseTable
        title="Expired License"
        licenses={expiredRecords}
      />
    </div>
  );
}
