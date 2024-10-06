import React from "react";
import logo from "./logo.svg"; // Optional, keep or remove
import "./App.css";
import {
  ICURegistrationScreen,
  PatientRegistrationScreen,
  AdminLoginScreen,
  ControlPanelScreen,
} from "./screens/index"; // Ensure this is the correct import path
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLoginScreen />} />{" "}
        <Route path="/admin/control-panel" element={<ControlPanelScreen />} />
        <Route
          path="/patient-registration"
          element={<PatientRegistrationScreen />}
        />
        <Route
          path="/admin//icu-registration"
          element={<ICURegistrationScreen />}
        />
      </Routes>
    </Router>
  );
}

export default App;
