import React from "react";
import { Container, Typography } from "@mui/material";
import DailyConsumption from "../components/DailyConsumption"; // Import the component

const DailyConsumptionPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Daily Feed Consumption
      </Typography>
      <DailyConsumption />
    </Container>
  );
};

export default DailyConsumptionPage;
