import React, { useState } from "react";
import { login } from "../services/api"; // Import the login API function
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for navigation

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Submitting credentials:", credentials); // Log the credentials

    try {
      const response = await login(credentials); // Call the login API
      console.log("Login successful, response:", response); // Log the successful response

      // Save token to localStorage for future requests
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);

      alert("Login successful!");
      navigate("/dashboard"); // Redirect to the dashboard page
    } catch (error) {
      console.error("Login failed, error:", error.response ? error.response.data : error.message);
      setError("Invalid credentials!"); // Display error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Login</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>} {/* Display error */}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 hover:underline">
              Sign up here
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
