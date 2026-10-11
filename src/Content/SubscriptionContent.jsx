import { useEffect, useState } from "react";
import FormPanel from "./FormPanel";

const initialCountries = {
  Dubai: {
    clientName: "Embassy of India, Dubai",
    region: "UAE",
    timeZone: "Dubai [GST - UTC+04:00]",
    issueDate: "2026-09-29",
    expiryDate: "2026-10-28",
  },
  "Abu Dhabi": {
    clientName: "Embassy of India, Abu Dhabi",
    region: "UAE",
    timeZone: "Dubai [GST - UTC+04:00]",
    issueDate: "2026-09-29",
    expiryDate: "2026-10-28",
  },
  Bangkok: {
    clientName: "Embassy of India, Bangkok",
    region: "Thailand",
    timeZone: "Bangkok [ICT - UTC+07:00]",
    issueDate: "2026-09-15",
    expiryDate: "2026-10-14",
  },
  Birmingham: {
    clientName: "Consulate General of India, Birmingham",
    region: "UK",
    timeZone: "London [GMT - UTC+00:00]",
    issueDate: "2026-09-10",
    expiryDate: "2026-10-09",
  },
  "San Francisco": {
    clientName: "Consulate General of India, San Francisco",
    region: "US",
    timeZone: "Pacific Time [PST - UTC-08:00]",
    issueDate: "2026-09-01",
    expiryDate: "2026-09-30",
  },
};

const regions = ["UAE", "Thailand", "UK", "US"];

const timeZones = [
  "Dubai [GST - UTC+04:00]",
  "Bangkok [ICT - UTC+07:00]",
  "London [GMT - UTC+00:00]",
  "Pacific Time [PST - UTC-08:00]",
];

const inputClass =
  "mt-2 block h-12 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass =
  "block min-w-0 text-sm font-semibold text-slate-700";

export default function SubscriptionContent({
  selectedCountry = "Abu Dhabi",
}) {
  const [savedCountries, setSavedCountries] = useState(
    () => structuredClone(initialCountries)
  );

  const [formData, setFormData] = useState(
    () => ({ ...initialCountries["Abu Dhabi"] })
  );

  useEffect(() => {
    setFormData({
      ...(savedCountries[selectedCountry] ??
        initialCountries["Abu Dhabi"]),
    });
  }, [selectedCountry, savedCountries]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      ...(savedCountries[selectedCountry] ??
        initialCountries["Abu Dhabi"]),
    });
  };

  const handleSave = (event) => {
    event.preventDefault();

    setSavedCountries((previous) => ({
      ...previous,
      [selectedCountry]: { ...formData },
    }));

    window.alert(
      `${selectedCountry} subscription saved successfully.`
    );
  };

  return (
    <div className="box-border flex min-h-[calc(100vh-130px)] w-full min-w-0 flex-col">
      <form
        onSubmit={handleSave}
        className="flex flex-1 flex-col gap-5"
      >
        {/* Client Information */}
        <div className="flex-1">
          <FormPanel title="Client Information">
            <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-7 py-3 lg:grid-cols-2">
              <label className={labelClass}>
                Client Name
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </label>

              <label className={labelClass}>
                Region
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${labelClass} lg:col-span-2`}>
                Time Zone
                <select
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {timeZones.map((timeZone) => (
                    <option key={timeZone} value={timeZone}>
                      {timeZone}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </FormPanel>
        </div>

        {/* Validity */}
        <div className="flex-1">
          <FormPanel
            title="Validity"
            actions={
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="h-11 rounded-lg border border-slate-300 bg-white px-7 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-11 rounded-lg bg-blue-600 px-9 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                >
                  Save
                </button>
              </>
            }
          >
            <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-7 py-3 lg:grid-cols-2">
              <label className={labelClass}>
                Issue Date
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </label>

              <label className={labelClass}>
                Expiry Date
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </label>
            </div>
          </FormPanel>
        </div>
      </form>
    </div>
  );
}
