// src/components/SheepList.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Slider from "../components/ Sidebar";
import { fetchSheepData } from "../services/api";

const SheepList = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const [sheepData, setSheepData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSheepData = async () => {
      try {
        const data = await fetchSheepData({ farmId });
        setSheepData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load sheep data:", error);
        setLoading(false);
      }
    };
    loadSheepData();
  }, [farmId]);

  const handleBack = () => {
    navigate(`/dashboard/${farmId}`);
  };

  const handleSheepClick = (sheepId) => {
    navigate(`/sheep-details/${farmId}/${sheepId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        background: "linear-gradient(135deg, #f4f6f8 0%, #e9ecef 100%)",
      }}
    >
      <Slider />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3, lg: 4 } }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a3c34" }}>
              Sheep List (Farm ID: {farmId})
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back to Dashboard
            </Button>
          </Box>

          {loading ? (
            <Typography>Loading...</Typography>
          ) : sheepData.length === 0 ? (
            <Typography>No sheep found for this farm.</Typography>
          ) : (
            <Grid container spacing={3}>
              {sheepData.map((sheep) => (
                <Grid item xs={12} sm={6} md={4} key={sheep.id}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" },
                    }}
                    onClick={() => handleSheepClick(sheep.id)}
                  >
                    {sheep.images && sheep.images.length > 0 ? (
                      <CardMedia
                        component="img"
                        height="140"
                        image={`http://207.154.253.97:8000${sheep.images[0].image}`} // Adjust base URL
                        alt={`${sheep.tag_number} image`}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 140,
                          bgcolor: "#e0e0e0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>No Image</Typography>
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="h6">{sheep.tag_number}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        DOB: {sheep.dob}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Type:{" "}
                        {sheep.sheep_type ? sheep.sheep_type.name : "None"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Wool Yield:{" "}
                        {sheep.production_records.reduce(
                          (sum, p) => sum + p.wool_yield,
                          0
                        )}{" "}
                        kg
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default SheepList;
