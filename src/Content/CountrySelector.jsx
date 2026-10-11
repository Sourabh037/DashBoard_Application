import { ChevronLeft, ChevronRight } from "lucide-react";

export const countries = [
  "Dubai",
  "Abu Dhabi",
  "Bangkok",
  "Birmingham",
  "San Francisco",
];

export default function CountrySelector({
  selectedCountry,
  onCountryChange,
}) {
  const selectedIndex = countries.indexOf(selectedCountry);

  const showPrevious = () => {
    const index =
      (selectedIndex - 1 + countries.length) % countries.length;

    onCountryChange(countries[index]);
  };

  const showNext = () => {
    const index = (selectedIndex + 1) % countries.length;

    onCountryChange(countries[index]);
  };

  const arrowButton =
    "flex h-11 w-11 shrink-0 items-center justify-center " +
    "rounded-xl border border-slate-300 bg-white " +
    "text-slate-700 shadow-sm transition duration-200 " +
    "hover:bg-slate-200 active:scale-95";

  return (
    <section className="w-full min-w-0 rounded-xl border border-slate-300 bg-slate-100 p-4 shadow-sm sm:p-5">
      <div className="flex w-full min-w-0 items-center gap-3 sm:gap-5">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous country"
          className={arrowButton}
        >
          <ChevronLeft size={25} strokeWidth={2.5} />
        </button>

        <div className="grid min-w-0 flex-1 grid-cols-5 gap-2 sm:gap-3">
          {countries.map((country) => {
            const isActive = country === selectedCountry;

            return (
              <button
                key={country}
                type="button"
                onClick={() => onCountryChange(country)}
                aria-pressed={isActive}
                className={`flex min-h-12 min-w-0 items-center justify-center rounded-xl border px-1 py-3 text-center text-xs font-semibold leading-5 transition duration-200 sm:px-3 sm:text-sm ${
                  isActive
                    ? "border-emerald-600 bg-emerald-500 text-white shadow-sm"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-200"
                }`}
              >
                {country}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={showNext}
          aria-label="Next country"
          className={arrowButton}
        >
          <ChevronRight size={25} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
