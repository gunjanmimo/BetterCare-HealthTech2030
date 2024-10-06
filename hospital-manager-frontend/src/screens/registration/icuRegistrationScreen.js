import React, { useState } from "react";
import "./registrationForm.css"; // Import the CSS file for styling

const ICURegistrationScreen = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    medicalHistory: "",
    familyContact: "",
    whatsappNumber: "",
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
        <h1 className="form-title">ICU Patient Registration</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="patientName">Patient ID</label>
            <input
              type="text"
              name="patientName"
              id="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ICURegistrationScreen };
