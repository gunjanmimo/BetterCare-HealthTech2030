import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed state
import "./patientDetailScreen.css"; // Create your own styles for this screen

const PatientDetailScreen = () => {
  const location = useLocation();
  const { patient } = location.state; // Get the patient data from state

  const [icuAdmitted, setIcuAdmitted] = useState(patient.icu_admitted);
  const [familyMembers, setFamilyMembers] = useState(patient.family_members);
  const [newFamilyMember, setNewFamilyMember] = useState({
    name: "",
    age: "",
    relation: "",
  });

  const toggleIcuAdmitted = () => {
    setIcuAdmitted((prevStatus) => !prevStatus);
  };

  const handleAddFamilyMember = () => {
    setFamilyMembers([...familyMembers, newFamilyMember]);
    setNewFamilyMember({ name: "", age: "", relation: "" }); // Reset the form
  };

  return (
    <div className="patient-detail-screen">
      <h1>Patient Details</h1>
      <h2>{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>ID: {patient.id}</p>
      <label>
        ICU Admitted:
        <input
          type="checkbox"
          checked={icuAdmitted}
          onChange={toggleIcuAdmitted}
        />
      </label>

      <h3>Family Members</h3>
      <div className="family-members">
        {familyMembers.map((member, index) => (
          <div key={index} className="family-member-card">
            <p>Name: {member.name}</p>
            <p>Age: {member.age}</p>
            <p>Relation: {member.relation}</p>
            <p>Relation: {member.id}</p>
          </div>
        ))}
      </div>

      <h3>Add Family Member</h3>
      <div className="add-family-member">
        <input
          type="text"
          placeholder="Name"
          value={newFamilyMember.name}
          onChange={(e) =>
            setNewFamilyMember({ ...newFamilyMember, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Age"
          value={newFamilyMember.age}
          onChange={(e) =>
            setNewFamilyMember({ ...newFamilyMember, age: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Relation"
          value={newFamilyMember.relation}
          onChange={(e) =>
            setNewFamilyMember({ ...newFamilyMember, relation: e.target.value })
          }
        />
        <button onClick={handleAddFamilyMember}>Add</button>
      </div>
    </div>
  );
};

export { PatientDetailScreen };
