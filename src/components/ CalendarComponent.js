import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import dayjs from "dayjs"; // For date formatting

const CalendarComponent = () => {
  const dayNumber = dayjs().format("D"); // Example: 9
  const monthYear = dayjs().format("MMMM YYYY"); // Example: February 2025
  const weekday = dayjs().format("dddd"); // Example: Sunday

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: "12px",
        textAlign: "center",
        bgcolor: "#ffa500",
        color: "#fff",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
      }}
    >
      {/* Large Date Display */}
      <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold", lineHeight: 1 }}>
        {dayNumber}
      </Typography>

      <Typography variant="h6" sx={{ fontSize: "1.5rem", mt: 1 }}>
        {weekday}
      </Typography>

      <Typography variant="body1" sx={{ fontSize: "1.2rem", opacity: 0.9 }}>
        {monthYear}
      </Typography>
    </Paper>
  );
};

export default CalendarComponent;
