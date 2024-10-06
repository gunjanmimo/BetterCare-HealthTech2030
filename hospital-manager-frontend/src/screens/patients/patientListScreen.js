import React from "react";
import { Search, AlertCircle } from "lucide-react";

const PatientListScreen = () => {
  // Sample data for patients
  const patients = [
    { id: 1, name: "John Doe", isInICU: true },
    { id: 2, name: "Jane Smith", isInICU: false },
    { id: 3, name: "Mike Johnson", isInICU: true },
    { id: 4, name: "Alice Brown", isInICU: false },
    { id: 5, name: "Chris Evans", isInICU: true },
    { id: 6, name: "Diana Prince", isInICU: false },
    { id: 7, name: "Bruce Wayne", isInICU: true },
    { id: 8, name: "Clark Kent", isInICU: false },
    { id: 9, name: "Barry Allen", isInICU: true },
    { id: 10, name: "Hal Jordan", isInICU: false },
    { id: 11, name: "Arthur Curry", isInICU: true },
    { id: 12, name: "Victor Stone", isInICU: false },
    { id: 13, name: "Oliver Queen", isInICU: true },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Patient List</h1>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{patient.name}</h3>
        <p className="text-sm text-gray-600 mb-2">ID: {patient.id}</p>
        <div
          className={`flex items-center ${
            patient.isInICU ? "text-red-500" : "text-green-500"
          }`}
        >
          {patient.isInICU && <AlertCircle className="mr-2" size={16} />}
          <span className="text-sm font-medium">
            {patient.isInICU ? "Admitted in ICU" : "Not in ICU"}
          </span>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right">
        <button className="text-sm text-blue-500 hover:text-blue-700 font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export { PatientListScreen };
