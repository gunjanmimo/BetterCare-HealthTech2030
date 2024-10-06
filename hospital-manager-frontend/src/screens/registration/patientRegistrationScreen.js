import React, { useState } from "react";
import "./registrationForm.css"; // Import the CSS file for styling

const PatientRegistrationScreen = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    medicalHistory: "",
    familyContact: "",
    whatsappNumber: "",
    preferredLanguage: "",
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
    // Handle form submission, e.g., send data to backend
    console.log(formData);
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
          {/* <div className="form-group">
            <label className="">Preferred Language</label>
            <div className="">
              {["English", "Spanish", "Catalan"].map((language) => (
                <button
                  key={language}
                  className={`px-4 py-2 rounded ${
                    formData.preferredLanguage === language
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div> */}

          <div className="form-group">
            <label className="form-label">Preferred Language</label>
            <div className="button-group">
              {["English", "Spanish", "Catalan"].map((language) => (
                <button
                  key={language}
                  className={`language-button ${
                    formData.preferredLanguage === language ? "active" : ""
                  }`}
                  //   onClick={() => handleLanguageChange(language)}
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
