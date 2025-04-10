import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  TextField,
  Grid,
  Card,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Check from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { fetchPackages, addSubscription } from "../services/api";

const steps = ["Enter Cow Details", "Select Package", "Payment"];

// Helper: Override service availability based on package name
const getServiceStatus = (pkg, serviceName) => {
  if (pkg.name === "Gold") {
    return true; // Gold has all services
  } else if (pkg.name === "Basic") {
    // Basic: assume missing "Insurance" and "24/7 Support"
    if (serviceName === "Insurance" || serviceName === "24/7 Support")
      return false;
    return true;
  } else if (pkg.name === "Premium") {
    // Premium: assume missing only "24/7 Support"
    if (serviceName === "24/7 Support") return false;
    return true;
  }
  // Default: check if service exists in the package (fallback)
  return pkg.services.some((s) => s.name === serviceName);
};

const Packages = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cowCount, setCowCount] = useState("");
  const [packages, setPackages] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data);

        // Extract unique service names across all packages
        const servicesSet = new Set();
        data.forEach((pkg) => {
          pkg.services.forEach((service) => {
            servicesSet.add(service.name);
          });
        });
        setAllServices(Array.from(servicesSet));
      } catch (error) {
        console.error("Failed to load packages:", error);
      }
    };

    loadPackages();
  }, []);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleCowCountChange = (e) => {
    setCowCount(e.target.value);
  };

  const handleSelectPackage = (id) => {
    setSelectedPackageId(id);
  };

  const handlePayLater = async () => {
    // Get the selected package details
    const selectedPkg = packages.find((p) => p.id === selectedPackageId);
    if (!selectedPkg) {
      console.error("No package selected.");
      return;
    }

    // Calculate total cost
    const totalCost =
      cowCount && selectedPkg ? cowCount * parseFloat(selectedPkg.price) : 0;

    // Prepare payload with correct field names as expected by the API
    const payload = {
      number_of_cows: cowCount,
      package: selectedPackageId,
      price: totalCost,
      payment_status: "pending",
    };

    try {
      await addSubscription(payload);
      alert("Subscription saved! Payment status is pending.");
      navigate("/login");
    } catch (error) {
      alert("Error saving subscription. Please try again.");
    }
  };

  const handlePayNow = () => {
    alert("coming soon");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Enter the number of cows
            </Typography>
            <TextField
              label="Number of Cows"
              type="number"
              value={cowCount}
              onChange={handleCowCountChange}
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Select a Package
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={selectedPackageId}
                onChange={(e) =>
                  handleSelectPackage(parseInt(e.target.value, 10))
                }
              >
                <Grid container spacing={3}>
                  {packages.map((pkg) => (
                    <Grid item xs={12} md={4} key={pkg.id}>
                      <Card
                        variant="outlined"
                        sx={{
                          borderColor:
                            selectedPackageId === pkg.id
                              ? "primary.main"
                              : "grey.300",
                        }}
                      >
                        <CardContent>
                          <FormControlLabel
                            value={pkg.id}
                            control={<Radio />}
                            label={pkg.name}
                          />
                          <Typography variant="h6" color="textSecondary">
                            Price: KES {parseFloat(pkg.price).toLocaleString()}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <List dense>
                            {allServices.map((serviceName) => {
                              const isIncluded = getServiceStatus(
                                pkg,
                                serviceName
                              );
                              return (
                                <ListItem key={serviceName}>
                                  <ListItemIcon>
                                    {isIncluded ? (
                                      <Check color="success" />
                                    ) : (
                                      <CloseIcon color="error" />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText primary={serviceName} />
                                </ListItem>
                              );
                            })}
                          </List>
                        </CardContent>
                        <CardActions>
                          <Button
                            fullWidth
                            variant="contained"
                            color={
                              selectedPackageId === pkg.id
                                ? "primary"
                                : "inherit"
                            }
                            onClick={() => handleSelectPackage(pkg.id)}
                          >
                            {selectedPackageId === pkg.id
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 2: {
        const selectedPkg = packages.find((p) => p.id === selectedPackageId);
        const totalCost =
          cowCount && selectedPkg
            ? cowCount * parseFloat(selectedPkg.price)
            : 0;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <Card
              sx={{
                width: 400,
                p: 3,
                boxShadow: 3,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Summary
                </Typography>
                <Typography variant="body1">
                  Number of Cows: {cowCount}
                </Typography>
                <Typography variant="body1">
                  Package Selected: {selectedPkg ? selectedPkg.name : ""}
                </Typography>
                <Typography variant="body1">
                  Price per Cow: KES{" "}
                  {selectedPkg
                    ? parseFloat(selectedPkg.price).toLocaleString()
                    : 0}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Total Monthly Cost: KES {totalCost.toLocaleString()}
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    gap: 1.5,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ px: 2.5, py: 1, borderRadius: 2, fontSize: "0.8rem" }}
                    onClick={handlePayLater}
                  >
                    Pay Later
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ px: 2.5, py: 1, borderRadius: 2, fontSize: "0.8rem" }}
                    onClick={handlePayNow}
                  >
                    Pay Now!
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
      }
      default:
        return "Unknown Step";
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {renderStepContent(activeStep)}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        {activeStep < steps.length - 1 && (
          <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            disabled={
              (activeStep === 0 && cowCount === "") ||
              (activeStep === 1 && selectedPackageId === null)
            }
          >
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Packages;
