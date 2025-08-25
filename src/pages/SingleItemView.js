import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  CardMedia,
  Fade,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import paracetamolImage from "../assets/paracetamol.jpg";
import AmoxicillinlImage from "../assets/Amoxicillin.jpg";
import IbuprofenImage from "../assets/Ibuprofen.jpg";

// All available products
const allDrugs = [
  {
    id: 1,
    name: "Paracetamol",
    price: 50,
    description: "Pain reliever and fever reducer.",
    image: paracetamolImage,
  },
  {
    id: 2,
    name: "Amoxicillin",
    price: 120,
    description: "Antibiotic used for infections.",
    image: AmoxicillinlImage,
  },
  {
    id: 3,
    name: "Ibuprofen",
    price: 90,
    description: "Reduces pain, fever, and inflammation.",
    image: IbuprofenImage,
  },
];

const SingleItemView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  const item = allDrugs.find((i) => i.id.toString() === id);
  const isInCart = cart.some((c) => c.id.toString() === id);

  if (!item) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5" color="error">
          Item not found.
        </Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }} variant="contained">
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Fade in timeout={500}>
      <Box p={{ xs: 2, sm: 4 }} display="flex" justifyContent="center">
        <Paper
          elevation={6}
          sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1000, width: "100%" }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: 400,
                  objectFit: "contain",
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="100%"
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {item.description}
                </Typography>
                <Typography
                  variant="h5"
                  color="primary"
                  fontWeight="bold"
                  gutterBottom
                >
                  KES {item.price.toLocaleString()}
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
                  {!isInCart ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => navigate("/cart")}
                    >
                      Back to Cart
                    </Button>
                  )}
                  <Button variant="outlined" onClick={() => navigate(-1)}>
                    Go Back
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Fade>
  );
};

export default SingleItemView;
