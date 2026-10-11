import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar/Sidebar.jsx";
import HomeContent from "./Content/HomeContent.jsx";
import ClientsContent from "./Content/ClientsContent.jsx";
import SubscriptionContent from "./Content/SubscriptionContent.jsx";
import CountrySelector from "./Content/CountrySelector.jsx";
import GenerateLicenseContent from "./Content/GenerateLicenseContent.jsx";
import HistoryContent from "./Content/HistoryContent.jsx";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("HOME");
  const [selectedCountry, setSelectedCountry] = useState("Abu Dhabi");

  const showCountrySelector = activePage !== "HOME";

  const renderPage = () => {
    switch (activePage) {
      case "HOME":
        return <HomeContent />;

      case "CLIENTS":
        return (
          <ClientsContent selectedCountry={selectedCountry} />
        );

      case "SUBSCRIPTION":
        return (
          <SubscriptionContent selectedCountry={selectedCountry} />
        );

      case "GENERATE LICENSE":
        return (
          <GenerateLicenseContent selectedCountry={selectedCountry}/>
        );

      case "HISTORY":
        return (
          <HistoryContent selectedCountry={selectedCountry}/>
        );
    return (
      <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold text-slate-800">
          HISTORY
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          This page content will be added later.
        </p>
      </section>
    );

      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <Navbar />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main
        style={{
          width: isOpen ? "calc(100% - 240px)" : "100%",
          marginLeft: isOpen ? "240px" : "0",
          transition:
            "width 400ms ease-in-out, margin-left 400ms ease-in-out",
          boxSizing: "border-box",
        }}
        className="h-[calc(100vh-60px)] min-w-0 overflow-auto px-4 pb-4 pt-4 sm:px-5"
      >
        <div className="mx-auto w-full min-w-0 space-y-4">
          {showCountrySelector && (
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
          )}

          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
