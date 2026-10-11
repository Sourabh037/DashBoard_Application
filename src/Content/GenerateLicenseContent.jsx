
import { useState } from "react";

const initialLicenseData = {
  Dubai: {
    name: "Embassy of India, Dubai",
    region: "United Arab Emirates",
    timeZone: "Dubai [GST - UTC+04:00]",
    printerCount: "5",
    printers: [
      "PVCD10049SA",
      "PVCD10050SA",
      "PVCD10057SA",
      "PVCD10052SA",
      "PVCD10053SA",
      "",
      "",
      "",
      "",
      "",
    ],
    issueDate: "29 September 2026",
    expiryDate: "28 October 2026",
  },
  "Abu Dhabi": {
    name: "Embassy of India, Abu Dhabi",
    region: "United Arab Emirates",
    timeZone: "Dubai [GST - UTC+04:00]",
    printerCount: "5",
    printers: [
      "PVCD10049SA",
      "PVCD10050SA",
      "PVCD10057SA",
      "PVCD10052SA",
      "PVCD10053SA",
      "",
      "",
      "",
      "",
      "",
    ],
    issueDate: "29 September 2026",
    expiryDate: "28 October 2026",
  },
  Bangkok: {
    name: "Embassy of India, Bangkok",
    region: "Thailand",
    timeZone: "Bangkok [ICT - UTC+07:00]",
    printerCount: "3",
    printers: [
      "PVCD20011SA",
      "PVCD20012SA",
      "PVCD20013SA",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    issueDate: "15 September 2026",
    expiryDate: "14 October 2026",
  },
  Birmingham: {
    name: "Consulate General of India, Birmingham",
    region: "United Kingdom",
    timeZone: "London [GMT - UTC+00:00]",
    printerCount: "2",
    printers: [
      "PVCD30019SA",
      "PVCD30020SA",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    issueDate: "10 September 2026",
    expiryDate: "09 October 2026",
  },
  "San Francisco": {
    name: "Consulate General of India, San Francisco",
    region: "United States",
    timeZone: "Pacific Time [PST - UTC-08:00]",
    printerCount: "4",
    printers: [
      "PVCD40001SA",
      "PVCD40002SA",
      "PVCD40003SA",
      "PVCD40004SA",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    issueDate: "01 September 2026",
    expiryDate: "30 September 2026",
  },
};

const STORAGE_KEY = "gcss-generate-license-data";

function loadLicenseData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved
      ? { ...initialLicenseData, ...JSON.parse(saved) }
      : initialLicenseData;
  } catch {
    return initialLicenseData;
  }
}

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";

export default function GenerateLicenseContent({
  selectedCountry = "Abu Dhabi",
}) {
  const [allLicenses, setAllLicenses] = useState(loadLicenseData);
  const [savedMessage, setSavedMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const current =
    allLicenses[selectedCountry] ||
    initialLicenseData["Abu Dhabi"];

  const updateField = (field, value) => {
    setAllLicenses((previous) => ({
      ...previous,
      [selectedCountry]: {
        ...(
          previous[selectedCountry] ||
          initialLicenseData["Abu Dhabi"]
        ),
        [field]: value,
      },
    }));

    setSavedMessage("");
    setActionMessage("");
  };

  const updatePrinter = (index, value) => {
    const updatedPrinters = [...current.printers];
    updatedPrinters[index] = value;

    updateField("printers", updatedPrinters);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(allLicenses)
      );

      setSavedMessage(
        `License details for ${selectedCountry} saved successfully.`
      );
      setActionMessage("");
    } catch {
      setSavedMessage(
        "Unable to save. Please check your browser storage settings."
      );
    }
  };

  const handleCreateLicense = () => {
    setActionMessage(
      `License creation requested for ${current.name}. Connect the license-generation API to create a real license.`
    );
    setSavedMessage("");
  };

  const handleSendMail = () => {
    setActionMessage(
      `Email request prepared for ${current.name}. Connect the email service to send the actual license.`
    );
    setSavedMessage("");
  };

  const handleReset = () => {
    setAllLicenses((previous) => ({
      ...previous,
      [selectedCountry]: {
        ...initialLicenseData[selectedCountry],
      },
    }));

    setSavedMessage("");
    setActionMessage("Form reset to the original sample data.");
  };

  return (
    <section className="flex min-h-[calc(100vh-190px)] w-full min-w-0 flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-sm sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
            GCSS License Portal
          </p>
          <h1 className="mt-1 text-xl font-bold text-slate-800 sm:text-2xl">
            Generate License
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review client information and configure license details.
          </p>
        </div>

        <span className="inline-flex w-fit items-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          {selectedCountry}
        </span>
      </div>

      {/* Client preview and actions */}
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800">
              Preview License Details
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Client Information
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Client Name</label>
              <input
                className={inputClass}
                value={current.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
              />
            </div>

            <div>
              <label className={labelClass}>Region</label>
              <input
                className={inputClass}
                value={current.region}
                onChange={(e) =>
                  updateField("region", e.target.value)
                }
              />
            </div>

            <div>
              <label className={labelClass}>Time Zone</label>
              <input
                className={inputClass}
                value={current.timeZone}
                onChange={(e) =>
                  updateField("timeZone", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <h2 className="mb-1 text-sm font-bold text-slate-800">
            License Actions
          </h2>

          <button
            type="button"
            onClick={handleCreateLicense}
            className="w-full rounded-lg border border-emerald-700 bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
          >
            Create New License
          </button>

          <button
            type="button"
            onClick={handleSendMail}
            className="w-full rounded-lg border border-sky-700 bg-sky-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-700 active:scale-[0.99]"
          >
            Send License Via Mail
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Reset Form
          </button>
        </div>
      </div>

      {/* Printer information */}
      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Printer Information
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Enter the serial numbers for the selected client.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="printer-count"
              className="text-sm font-medium text-slate-600"
            >
              Number of Printers
            </label>

            <select
              id="printer-count"
              value={current.printerCount}
              onChange={(e) =>
                updateField("printerCount", e.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                (number) => (
                  <option key={number} value={String(number)}>
                    {number}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          {current.printers.map((serial, index) => {
            const isEnabled =
              index < Number(current.printerCount);

            return (
              <div
                key={index}
                className={`min-w-0 rounded-lg border p-3 transition ${
                  isEnabled
                    ? "border-slate-200 bg-slate-50"
                    : "border-slate-100 bg-slate-100/60"
                }`}
              >
                <label
                  htmlFor={`printer-${index}`}
                  className="mb-2 block text-xs font-semibold text-slate-600"
                >
                  Printer {index + 1}
                  {isEnabled && (
                    <span className="ml-2 text-emerald-600">
                      Active
                    </span>
                  )}
                </label>

                <input
                  id={`printer-${index}`}
                  value={serial}
                  disabled={!isEnabled}
                  onChange={(e) =>
                    updatePrinter(index, e.target.value)
                  }
                  placeholder="Enter serial number"
                  className={`${inputClass} font-mono disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Validity */}
      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-bold text-slate-800">
            License Validity
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Set the dates associated with this license.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Issue Date</label>
            <input
              className={inputClass}
              value={current.issueDate}
              onChange={(e) =>
                updateField("issueDate", e.target.value)
              }
              placeholder="Enter issue date"
            />
          </div>

          <div>
            <label className={labelClass}>Expiry Date</label>
            <input
              className={inputClass}
              value={current.expiryDate}
              onChange={(e) =>
                updateField("expiryDate", e.target.value)
              }
              placeholder="Enter expiry date"
            />
          </div>
        </div>
      </div>

      {/* Feedback and save */}
      <div className="mt-auto flex min-w-0 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0 flex-1" aria-live="polite">
          {savedMessage && (
            <p className="text-sm font-medium text-emerald-700">
              {savedMessage}
            </p>
          )}

          {actionMessage && (
            <p className="text-sm text-slate-600">
              {actionMessage}
            </p>
          )}

          {!savedMessage && !actionMessage && (
            <p className="text-xs text-slate-500">
              Save your changes before leaving this page.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full shrink-0 rounded-lg border border-emerald-700 bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99] sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
}
