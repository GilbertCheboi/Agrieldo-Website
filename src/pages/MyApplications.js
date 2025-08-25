// src/pages/MyApplications.js
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { submitMachineryApplicationLease } from "../services/api";
import tractor from "../assets/mf-green.jpeg";
import MachineryApplicationModal from "./MachineryApplicationModal";

const MyApplications = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      await submitMachineryApplicationLease(formData);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Card sx={{ maxWidth: 1000, margin: "auto", padding: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              image={tractor}
              alt="Tractor"
              sx={{ borderRadius: "10px", height: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={7} display="flex" flexDirection="column">
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Lease Your Machinery
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Make extra income by leasing your farm machinery through
                Agrieldo. Whether it's a tractor, harvester, or plough, submit
                your details and get discovered by nearby farmers looking for
                quality equipment.
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => setShowModal(true)}
              >
                Submit Application
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <MachineryApplicationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MyApplications;
