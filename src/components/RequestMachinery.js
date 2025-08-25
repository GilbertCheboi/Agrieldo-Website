import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const machineryOptions = [
  { label: "Tractor", value: "tractor" },
  { label: "Tractor and Harvester", value: "tractor_harvester" },
  { label: "Tractor and Plough", value: "tractor_plough" },
  { label: "Tractor and Baler", value: "tractor_baler" },
  { label: "Tractor and Sprayer", value: "tractor_sprayer" },
  { label: "Tractor and Planter", value: "tractor_planter" },
];

export default function RequestMachineryModal({ open, handleClose }) {
  const [machineryType, setMachineryType] = useState("");
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Could not retrieve your location.");
        }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };

  const handleSubmit = () => {
    if (!machineryType || !location) {
      alert("Please select machinery type and use current location.");
      return;
    }

    // Redirect to search results page
    navigate(
      `/machinery-results?type=${machineryType}&lat=${location.lat}&lng=${location.lng}`
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#f97316",
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Select Machinery Type
        </Typography>

        <TextField
          select
          fullWidth
          label="Type of Machinery"
          margin="dense"
          value={machineryType}
          onChange={(e) => setMachineryType(e.target.value)}
        >
          {machineryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleGetLocation}
        >
          Use Current Location
        </Button>

        {location && (
          <Typography
            variant="body2"
            sx={{ mt: 1, textAlign: "center", color: "green" }}
          >
            📍 Location captured
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#f97316",
            "&:hover": { backgroundColor: "#ea580c" },
          }}
          onClick={handleSubmit}
        >
          Submit Request
        </Button>
      </Box>
    </Modal>
  );
}
