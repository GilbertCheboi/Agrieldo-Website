import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const DashboardCard = ({ title, children, onClick }) => {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 1.5,
        borderRadius: "12px",
        bgcolor: "#fff",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)",
          cursor: "pointer",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: "#1a3c34",
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
};

export default DashboardCard;