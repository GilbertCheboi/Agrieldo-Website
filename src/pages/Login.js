import React, { useState } from "react";
import { login } from "../services/api"; // Import the login API function
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for navigation

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🚀 Submitting login credentials:", credentials);

    try {
      const response = await login(credentials); // Call the login API
      console.log("✅ Login API call successful. Full response:", response);

      const { accessToken, refreshToken, user_type } = {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        user_type: localStorage.getItem("user_type"),
      };

      console.log("📦 Tokens and user type from localStorage after login:");
      console.log("➡️ Access Token:", accessToken);
      console.log("➡️ Refresh Token:", refreshToken);
      console.log("➡️ User Type:", user_type);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login failed!");

      if (error.response) {
        console.error("📛 Error Response Data:", error.response.data);
        console.error("📛 Error Status:", error.response.status);
        console.error("📛 Error Headers:", error.response.headers);
        setError(JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error(
          "📡 No response received from server. Request details:",
          error.request
        );
        setError("Network Error: No response from server");
      } else {
        console.error("⚠️ Error setting up the request:", error.message);
        setError(error.message);
      }

      console.log("🧠 Full error object:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}{" "}
        {/* Display error */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
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
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
