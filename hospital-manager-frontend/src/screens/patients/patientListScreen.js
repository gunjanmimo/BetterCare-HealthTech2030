import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./patientListScreen.css";

const PatientListScreen = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/patients")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.map((patient) => ({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          icu_admitted: patient.icu_admitted,
          family_members: patient.family_members, // Include family members
        }));
        setPatients(filteredData);
      })
      .catch((error) => console.error("Error fetching patient data:", error));
  }, []);

  return (
    <div className="patient-list-screen">
      <h1>Patient List</h1>
      <div className="search-container">
        <input type="text" placeholder="Search patients..." />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <div className="patient-grid">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

const PatientCard = ({ patient }) => {
  return (
    <div className="patient-card">
      <div className="patient-info">
        <h3>{patient.name}</h3>
        <p className="patient-id">ID: {patient.id}</p>
        <p
          className={`patient-status ${
            patient.icu_admitted ? "icu" : "non-icu"
          }`}
        >
          {patient.icu_admitted ? "Admitted in ICU" : "Not in ICU"}
        </p>
      </div>
      <div className="patient-actions">
        <Link to={`/patient/${patient.id}`} state={{ patient }}>
          <button>View Details</button>
        </Link>
      </div>
    </div>
  );
};

const PatientListScreenWithStyles = () => (
  <>
    <PatientListScreen />
  </>
);

export { PatientListScreenWithStyles };
