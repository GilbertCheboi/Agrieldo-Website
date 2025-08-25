import React, { useState } from "react";
import { login, updateMyLocation } from "../services/api"; // Import the login API function
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
      // 1) Perform login
      const response = await login(credentials);
      console.log("✅ Login API call successful. Full response:", response);

      // 2) Retrieve tokens/user info from localStorage (set by your login helper)
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const user_type = localStorage.getItem("user_type");

      console.log("📦 Tokens and user type from localStorage after login:");
      console.log("➡️ Access Token:", accessToken);
      console.log("➡️ Refresh Token:", refreshToken);
      console.log("➡️ User Type:", user_type);

      alert("Login successful!");

      // 3) Try to get geolocation and update vendor location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            try {
              await updateMyLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
              });
              console.log("📍 Vendor location updated successfully");
            } catch (locErr) {
              console.warn("⚠️ Failed to update vendor location:", locErr);
            } finally {
              // 4) Redirect after location attempt
              const redirectPath = sessionStorage.getItem("redirectAfterLogin");
              if (redirectPath) {
                sessionStorage.removeItem("redirectAfterLogin");
                navigate(redirectPath);
              } else {
                if (user_type === "4") {
                  navigate("/mechanization-dashboard");
                } else {
                  navigate("/dashboard");
                }
              }
            }
          },
          (geoErr) => {
            console.warn(
              "⚠️ Geolocation error, proceeding without update:",
              geoErr
            );
            const redirectPath = sessionStorage.getItem("redirectAfterLogin");
            if (redirectPath) {
              sessionStorage.removeItem("redirectAfterLogin");
              navigate(redirectPath);
            } else {
              navigate("/dashboard");
            }
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.warn("⚠️ Browser does not support geolocation");
        const redirectPath = sessionStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        } else {
          if (user_type == "4") {
            navigate("/mechanization-dashboard");
          } else {
            navigate("/dashboard");
          }
        }
      }
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
