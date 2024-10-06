import React, { useState } from "react";
import "../registration/registrationForm.css"; // Import the CSS file for styling

const AdminLoginScreen = () => {
  const [formData, setFormData] = useState({
    adminUsername: "",
    adminPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: formData.adminUsername,
      password: formData.adminPassword,
    };

    try {
      // Send POST request to the API
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-title">Hospital Admin Login</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="adminUsername">Admin username</label>
            <input
              type="text"
              name="adminUsername"
              id="adminUsername"
              value={formData.adminUsername}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminPassword">Admin password</label>
            <input
              type="password"
              name="adminPassword"
              id="adminPassword"
              value={formData.adminPassword}
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

export { AdminLoginScreen };
