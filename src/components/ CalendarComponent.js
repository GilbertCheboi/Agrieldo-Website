import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import dayjs from "dayjs"; // For date formatting
import axios from "axios";

const CalendarComponent = () => {
  const dayNumber = dayjs().format("D"); // Example: 3 (for March 3, 2025)
  const monthYear = dayjs().format("MMMM YYYY"); // Example: March 2025
  const weekday = dayjs().format("dddd"); // Example: Monday

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded farm coordinates
  const FARM_LAT = 0.43726682128150846; // Latitude
  const FARM_LON = 35.39203763531531;  // Longitude

  // Your OpenWeatherMap API key
  const API_KEY = "8b21b3425a04e75760764ad5f9ff1440"; // Replace if invalid

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${FARM_LAT}&lon=${FARM_LON}&appid=${API_KEY}&units=metric`
        );
        setWeather({
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        });
        setLoading(false);
      } catch (err) {
        setError(
          err.response && err.response.status === 401
            ? "Unauthorized: Invalid API key. Please check your OpenWeatherMap key."
            : "Failed to fetch weather data"
        );
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: "12px",
        textAlign: "center",
        bgcolor: "#fff", // Changed to white background
        color: "#333", // Dark gray text for contrast
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "280px",
      }}
    >
      {/* Large Date Display */}
      <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold", lineHeight: 1, color: "#000" }}>
        {dayNumber}
      </Typography>

      <Typography variant="h6" sx={{ fontSize: "1.5rem", mt: 1, color: "#555" }}>
        {weekday}
      </Typography>

      <Typography variant="body1" sx={{ fontSize: "1.2rem", opacity: 0.9, color: "#777" }}>
        {monthYear}
      </Typography>

      {/* Farm Coordinates */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ fontSize: "1rem", opacity: 0.8, color: "#666" }}>
          Lat: {FARM_LAT.toFixed(4)}, Lon: {FARM_LON.toFixed(4)}
        </Typography>
      </Box>

      {/* Weather Display */}
      <Box sx={{ mt: 1 }}>
        {loading ? (
          <CircularProgress size={20} sx={{ color: "#ffa500" }} /> // Orange spinner for visibility
        ) : error ? (
          <Typography variant="body2" sx={{ fontSize: "1rem", opacity: 0.8, color: "#d32f2f" }}>
            {error}
          </Typography>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {weather && (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt={weather.description}
                  style={{ width: "30px", height: "30px" }}
                />
                <Typography variant="body1" sx={{ fontSize: "1rem", color: "#333" }}>
                  {Math.round(weather.temp)}°C, {weather.description}
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default CalendarComponent;