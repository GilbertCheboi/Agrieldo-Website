import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the CSS file for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    user_type: 3, // Default to Staff
    phone_number: "", // Add phone number field
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match. Please try again.");
      return;
    }
  
    const { confirm_password, ...dataToSend } = formData; // Exclude confirm_password from the payload
  
    // Create FormData to send as multipart/form-data
    const formDataToSend = new FormData();
    Object.keys(dataToSend).forEach(key => {
      formDataToSend.append(key, dataToSend[key]);
    });
  
    // Append confirm_password to FormData explicitly
    formDataToSend.append("confirm_password", formData.confirm_password);
  
    // Log the data being sent to the API
    console.log("Data being sent to the API:");
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const response = await axios.post(
        "http://207.154.253.97:8000/api/accounts/users/",
        formDataToSend, // Send the form data as multipart/form-data
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Signup successful:", response.data);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to sign up. Please check your details and try again.");
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password type
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              onChange={handlePasswordToggle}
              checked={showPassword}
            />
            Show Password
          </label>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password type
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>User Type:</label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            required
          >
            <option value={1}>Farmer</option>
            <option value={2}>Vet</option>
            <option value={3}>Staff</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
