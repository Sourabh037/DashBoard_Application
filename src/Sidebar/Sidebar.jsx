import "./Sidebar.css";
import "../Navigations/Navigation.css";

import { Home } from "../Navigations/Home";
import { Clients } from "../Navigations/Clients";
import { Subscription } from "../Navigations/Subscription";
import { GenerateLicense } from "../Navigations/GenerateLicense";
import { History } from "../Navigations/History";

export const Sidebar = ({
  isOpen,
  setIsOpen,
  activePage,
  onNavigate,
}) => {
  return (
    <>
      <button
        type="button"
        className={`menu-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isOpen}
        aria-controls="main-sidebar"
      >
        <span></span>
        <span></span>
      </button>

      <aside
        id="main-sidebar"
        className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
      >
        <nav className="flex flex-col gap-3">
          <Home
            isActive={activePage === "HOME"}
            onClick={() => onNavigate("HOME")}
          />

          <Clients
            isActive={activePage === "CLIENTS"}
            onClick={() => onNavigate("CLIENTS")}
          />

          <Subscription
            isActive={activePage === "SUBSCRIPTION"}
            onClick={() => onNavigate("SUBSCRIPTION")}
          />

          <GenerateLicense
            isActive={activePage === "GENERATE LICENSE"}
            onClick={() => onNavigate("GENERATE LICENSE")}
          />

          <History
            isActive={activePage === "HISTORY"}
            onClick={() => onNavigate("HISTORY")}
          />
        </nav>

        <div className="sidebar-image-wrapper">
          <img
          src="/sidebar-image.png"
          alt="GCSS Logo"
          className="sidebar-image"/>
        </div>
      </aside>
    </>
  );
};
