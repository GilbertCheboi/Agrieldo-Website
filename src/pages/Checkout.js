import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | cancelled | timeout
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!name || !phone || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("loading");

    // Simulate M-Pesa interaction delay (e.g. 8 seconds)
    setTimeout(() => {
      // Random outcome (for demo): success, cancelled, or timeout
      const outcomes = ["success", "cancelled", "timeout"];
      const result = outcomes[Math.floor(Math.random() * outcomes.length)];
      setStatus(result);
    }, 8000);
  };

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        navigate("/");
      }, 2000); // Give user time to read success message
    }
  }, [status, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card elevation={4}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <PhoneAndroidIcon color="primary" sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Lipa na M-Pesa
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            Secure and fast mobile payment
          </Typography>

          {status === "loading" && (
            <Box textAlign="center" mt={3}>
              <CircularProgress color="primary" />
              <Typography mt={2}>
                Waiting for payment confirmation...
              </Typography>
            </Box>
          )}

          {status === "success" && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Payment successful! Redirecting...
            </Alert>
          )}

          {status === "cancelled" && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              Payment was cancelled by the user.
            </Alert>
          )}

          {status === "timeout" && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Payment request timed out. Please try again.
            </Alert>
          )}

          {status === "idle" ||
          status === "cancelled" ||
          status === "timeout" ? (
            <Box component="form" noValidate autoComplete="off" mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    placeholder="e.g. 07XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Amount (KES)"
                    variant="outlined"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handlePayment}
                  >
                    Pay with M-Pesa
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Checkout;
