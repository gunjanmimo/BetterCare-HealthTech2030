import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./registrationForm.css"; // Import the CSS file for styling

const PatientRegistrationScreen = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    medicalHistory: "",
    familyContact: "",
    contactNumber: "",
    preferredLanguage: "",
    relationshipType: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLanguageSelect = (language) => {
    setFormData({
      ...formData,
      preferredLanguage: language,
    });
  };
  const handleRelationshipSelect = (relationship) => {
    setFormData({
      ...formData,
      relationshipType: relationship, // Update relationship type
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload for the API call
    const payload = {
      name: formData.patientName,
      age: formData.age,
      family_members: [
        {
          name: formData.familyContact,
          age: 10,
          relation: formData.relationshipType,
        },
      ],
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/patient/patient_registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // Handle successful response
        console.log("Patient registration successful");
        navigate("/admin/control-panel");
      } else {
        // Handle error response
        console.error("Failed to register patient");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">Patient Registration</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              name="patientName"
              id="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="familyContact">Family Contact Name</label>
            <input
              type="text"
              name="familyContact"
              id="familyContact"
              value={formData.familyContact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Family Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preferred Language</label>
            <div className="button-group">
              {["English", "Spanish", "Catalan"].map((language) => (
                <button
                  key={language}
                  type="button"
                  className={`language-button ${
                    formData.preferredLanguage === language ? "active" : ""
                  }`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label>Relationship with Patient</label>

            <div className="button-group">
              {[
                "Spouse",
                "Children",
                "Mother",
                "Father",
                "Sister",
                "Brother",
              ].map((language) => (
                <button
                  key={language}
                  type="button"
                  className={`language-button ${
                    formData.relationshipType === language ? "active" : ""
                  }`}
                  onClick={() => handleRelationshipSelect(language)}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          <div className="form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { PatientRegistrationScreen };
