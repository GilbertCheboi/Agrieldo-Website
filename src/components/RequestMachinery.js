import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

export default function RequestMachineryModal({ open, handleClose }) {
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
          Request Machinery Leasing
        </Typography>

        <TextField fullWidth label="Full Name" margin="dense" />
        <TextField fullWidth label="Phone Number" margin="dense" />
        <TextField fullWidth label="Type of Machinery" margin="dense" />
        <TextField
          fullWidth
          label="Lease Duration (e.g. 1 week)"
          margin="dense"
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#f97316",
            "&:hover": { backgroundColor: "#ea580c" },
          }}
          onClick={handleClose}
        >
          Submit Request
        </Button>
      </Box>
    </Modal>
  );
}
