import React, { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`menu-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
      </button>

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Navigation will come here later */}
      </aside>
    </>
  );
};