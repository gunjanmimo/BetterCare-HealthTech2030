import React from "react";
import "./ControlPanelScreen.css"; // Importing the CSS

const ControlPanelScreen = () => {
  return (
    <div className="control-panel">
      <header className="control-panel-header">
        <h1>Control Panel</h1>
      </header>
      <div className="button-group">
        <button className="control-button">New Patient Registration</button>
        <button className="control-button">Admitted Patients List</button>
        <button className="control-button">Family Messages</button>
      </div>
    </div>
  );
};

export { ControlPanelScreen };
