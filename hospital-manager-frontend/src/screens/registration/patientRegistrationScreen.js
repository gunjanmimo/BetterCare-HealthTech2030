import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./registrationForm.css"; // Import the CSS file for styling

const PatientRegistrationScreen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    medicalHistory: "",
    familyContact: "",
    whatsappNumber: "",
    preferredLanguage: "",
    relationship: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the family member object based on form data
    const familyMember = {
      name: formData.familyContact,
      age: formData.age, // Assuming family member's age is captured here, you may want to adjust this
      relation: formData.relationship,
    };

    // Create the request body
    const requestBody = {
      name: formData.patientName,
      age: formData.age,
      family_members: [familyMember], // Assuming only one family member for now
    };

    // Make the POST request to the backend
    fetch("http://localhost:8000/api/patient/patient_registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/admin/control-panel");

        // Handle success (e.g., show a success message, clear form, etc.)
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., show an error message)
      });
  };

  // const handleLanguageChange = (language) => {
  //   setFormData({
  //     ...formData,
  //     preferredLanguage: language,
  //   });
  // };

  // const handleRelationshipChange = (relationship) => {
  //   setFormData({
  //     ...formData,
  //     relationship: relationship,
  //   });
  // };

  const handleLanguageChange = (e, language) => {
    e.preventDefault(); // Prevent form submission
    setFormData({
      ...formData,
      preferredLanguage: language,
    });
  };

  const handleRelationshipChange = (e, relationship) => {
    e.preventDefault(); // Prevent form submission
    setFormData({
      ...formData,
      relationship: relationship,
    });
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
            <label htmlFor="whatsappNumber">Family Contact Number</label>
            <input
              type="tel"
              name="whatsappNumber"
              id="whatsappNumber"
              value={formData.whatsappNumber}
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
                  className={`language-button ${
                    formData.preferredLanguage === language ? "active" : ""
                  }`}
                  onClick={(e) => handleLanguageChange(e, language)} // Pass the event
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Relation with patient</label>
            <div className="button-group">
              {[
                "Spouse",
                "Mother",
                "Father",
                "Brother",
                "Sister",
                "Son",
                "Daughter",
              ].map((relation) => (
                <button
                  key={relation}
                  className={`language-button ${
                    formData.relationship === relation ? "active" : ""
                  }`}
                  onClick={(e) => handleRelationshipChange(e, relation)} // Pass the event
                >
                  {relation}
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
