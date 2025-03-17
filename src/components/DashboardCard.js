// src/components/DashboardCard.js
import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const DashboardCard = ({ title, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        bgcolor: "#fff",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-4px)",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#1a3c34",
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <span style={{ color: "#ffa500", fontSize: "1.2rem" }}>{title.split(" ")[0]}</span>
        {title.split(" ").slice(1).join(" ")}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
};

export default DashboardCard;