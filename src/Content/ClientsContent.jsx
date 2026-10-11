import { useState } from "react";
import FormPanel from "./FormPanel";

const emptyClient = {
  clientName: "",
  region: "",
  timeZone: "",
  contactPerson: "",
  contactNumber: "",
  emailAddress: "",
};

const createPrinter = () => ({
  id: `${Date.now()}-${Math.random()}`,
  printerName: "",
  serialNumber: "",
});

const inputClass =
  "box-border block h-9 w-full min-w-0 rounded-md border " +
  "border-slate-300 bg-white px-3 py-2 text-sm " +
  "text-slate-700 outline-none transition " +
  "focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass =
  "min-w-0 text-sm font-medium leading-5 text-slate-600";

const fieldGridClass =
  "grid min-w-0 grid-cols-1 items-start gap-x-3 gap-y-1.5 " +
  "sm:grid-cols-[115px_minmax(0,1fr)] sm:items-center sm:gap-y-2";

export default function ClientsContent({
  selectedCountry = "Abu Dhabi",
}) {
  const [client, setClient] = useState({ ...emptyClient });
  const [printers, setPrinters] = useState([createPrinter()]);

  const updateClient = (field, value) => {
    setClient((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updatePrinter = (id, field, value) => {
    setPrinters((previous) =>
      previous.map((printer) =>
        printer.id === id
          ? { ...printer, [field]: value }
          : printer
      )
    );
  };

  const clearForm = () => {
    setClient({ ...emptyClient });
    setPrinters([createPrinter()]);
  };

  const cancelForm = () => {
    clearForm();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Client form data:", {
      country: selectedCountry,
      ...client,
      printers: printers.map(({ id, ...printer }) => printer),
    });
  };

  return (
    <div className="box-border w-full min-w-0 px-3 pb-2 sm:px-4 lg:px-5">
      <div className="mx-auto flex w-full max-w-[1500px] min-w-0 flex-col gap-3">

        <FormPanel title={`${selectedCountry} Client Information`}>
          <form
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-col gap-4"
          >
            <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 xl:grid-cols-2">

              {/* Client Information */}
              <section className="flex min-w-0 flex-col gap-3">
                <h3 className="border-b border-slate-300 pb-2 text-sm font-bold text-slate-700">
                  Client Information
                </h3>

                <div className={fieldGridClass}>
                  <label htmlFor="clientName" className={labelClass}>
                    Client Name
                  </label>
                  <input
                    id="clientName"
                    name="clientName"
                    value={client.clientName}
                    onChange={(e) =>
                      updateClient("clientName", e.target.value)
                    }
                    placeholder={`Enter client name for ${selectedCountry}`}
                    className={inputClass}
                  />

                  <label htmlFor="region" className={labelClass}>
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={client.region}
                    onChange={(e) =>
                      updateClient("region", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Select region</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="United Kingdom">
                      United Kingdom
                    </option>
                    <option value="United States">
                      United States
                    </option>
                  </select>

                  <label htmlFor="timeZone" className={labelClass}>
                    Time Zone
                  </label>
                  <select
                    id="timeZone"
                    name="timeZone"
                    value={client.timeZone}
                    onChange={(e) =>
                      updateClient("timeZone", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Select time zone</option>
                    <option value="Asia/Dubai">
                      Dubai (GST - UTC+04:00)
                    </option>
                    <option value="Asia/Bangkok">
                      Bangkok (ICT - UTC+07:00)
                    </option>
                    <option value="Europe/London">
                      London (GMT/BST)
                    </option>
                    <option value="America/Los_Angeles">
                      San Francisco (PST/PDT)
                    </option>
                    <option value="Asia/Kolkata">
                      India (IST - UTC+05:30)
                    </option>
                  </select>
                </div>
              </section>

              {/* Contact Information */}
              <section className="flex min-w-0 flex-col gap-3 xl:border-l xl:border-slate-300 xl:pl-5">
                <h3 className="border-b border-slate-300 pb-2 text-sm font-bold text-slate-700">
                  Client Contact Information
                </h3>

                <div className={fieldGridClass}>
                  <label htmlFor="contactPerson" className={labelClass}>
                    Contact Person
                  </label>
                  <input
                    id="contactPerson"
                    name="contactPerson"
                    value={client.contactPerson}
                    onChange={(e) =>
                      updateClient("contactPerson", e.target.value)
                    }
                    placeholder="Enter contact person"
                    className={inputClass}
                  />

                  <label htmlFor="contactNumber" className={labelClass}>
                    Contact Number
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={client.contactNumber}
                    onChange={(e) =>
                      updateClient("contactNumber", e.target.value)
                    }
                    placeholder="Enter contact number"
                    className={inputClass}
                  />

                  <label htmlFor="emailAddress" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    value={client.emailAddress}
                    onChange={(e) =>
                      updateClient("emailAddress", e.target.value)
                    }
                    placeholder="Enter email address"
                    className={inputClass}
                  />
                </div>
              </section>
            </div>

            {/* Printer Information */}
            <section className="flex min-w-0 flex-col gap-3 border-t border-slate-300 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-slate-700">
                  Printer Information
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setPrinters((previous) => [
                      ...previous,
                      createPrinter(),
                    ])
                  }
                  className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-95"
                >
                  + Add Printer
                </button>
              </div>

              <div className="flex min-w-0 flex-col gap-2">
                {printers.map((printer, index) => (
                  <div
                    key={printer.id}
                    className="grid min-w-0 grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-2"
                  >
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <label
                        htmlFor={`printer-${printer.id}`}
                        className={labelClass}
                      >
                        Printer Name
                      </label>
                      <input
                        id={`printer-${printer.id}`}
                        value={printer.printerName}
                        onChange={(e) =>
                          updatePrinter(
                            printer.id,
                            "printerName",
                            e.target.value
                          )
                        }
                        placeholder="Enter printer name"
                        className={inputClass}
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-1.5">
                      <label
                        htmlFor={`serial-${printer.id}`}
                        className={labelClass}
                      >
                        Serial Number
                      </label>
                      <input
                        id={`serial-${printer.id}`}
                        value={printer.serialNumber}
                        onChange={(e) =>
                          updatePrinter(
                            printer.id,
                            "serialNumber",
                            e.target.value
                          )
                        }
                        placeholder="Enter serial number"
                        className={inputClass}
                      />
                    </div>

                    {printers.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setPrinters((previous) =>
                            previous.filter(
                              (item) => item.id !== printer.id
                            )
                          )
                        }
                        className="justify-self-start rounded-md px-2 py-1 text-sm font-semibold text-red-600 hover:bg-red-50 sm:col-span-2"
                      >
                        Remove Printer {index + 1}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-300 pt-4">
              <button
                type="button"
                onClick={clearForm}
                className="h-10 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-95"
              >
                Clear Form
              </button>

              <button
                type="button"
                onClick={cancelForm}
                className="h-10 rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-95"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-10 rounded-lg border border-emerald-600 bg-emerald-500 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-95"
              >
                Save
              </button>
            </div>
          </form>
        </FormPanel>
      </div>
    </div>
  );
}
