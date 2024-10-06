import React from "react";
import { useNavigate } from "react-router-dom";

import "./ControlPanelScreen.css"; // Importing the CSS

const ControlPanelScreen = () => {
  const navigate = useNavigate();

  const handleNavigation = (pagePath) => {
    return () => navigate(pagePath);
  };

  return (
    <div className="control-panel">
      <header className="control-panel-header">
        <h1>Control Panel</h1>
      </header>
      <div className="button-group">
        <button
          className="control-button"
          onClick={handleNavigation("/patient-registration")}
        >
          New Patient Registration
        </button>
        <button
          className="control-button"
          onClick={handleNavigation("/admitted-patients")}
        >
          Admitted Patients List
        </button>
        <button
          className="control-button"
          onClick={handleNavigation("/message-list")}
        >
          Family Messages
        </button>
      </div>
    </div>
  );
};

export { ControlPanelScreen };
