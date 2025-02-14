import React from "react";
import { Box, Typography } from "@mui/material";
import { FaHeartbeat } from "react-icons/fa";

const HealthMonitoring = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
        <FaHeartbeat color="#ffa500" /> Cattle Health
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        🚑 Sick Cows: <b>2</b> <br />
        👩‍⚕️ Recent Vet Visit: <b>5th Feb</b> <br />
        💉 Next Vaccination: <b>20th Feb</b>
      </Typography>
    </Box>
  );
};

export default HealthMonitoring;
