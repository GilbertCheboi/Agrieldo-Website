import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Divider,
  Grid,
  Box,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Add this at the top

const CartItems = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [quantities, setQuantities] = useState(cart.map(() => 1));

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    const updatedQuantities = [...quantities];
    updatedQuantities.splice(index, 1);
    setCart(updatedCart);
    setQuantities(updatedQuantities);
  };

  const handleClearCart = () => {
    setCart([]);
    setQuantities([]);
  };

  const handleQuantityChange = (index, amount) => {
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(1, updated[index] + amount);
      return updated;
    });
  };

  const total = cart.reduce(
    (sum, item, i) => sum + item.price * quantities[i],
    0
  );

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if token has expired
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("accessToken"); // Optional: clear expired token
          navigate("/login");
        } else {
          navigate("/checkout");
        }
      } catch (error) {
        // Invalid token format
        console.error("Invalid token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Box p={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Your Cart Items
          </Typography>
          {cart.length === 0 ? (
            <Typography color="text.secondary">No items in cart.</Typography>
          ) : (
            cart.map((item, index) => (
              <Link
                key={item.id || index}
                to={`/items/${item.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    p: 2,
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      mr: 3,
                      borderRadius: 2,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 1.5 }}
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "rgba(255,165,0,0.8)" }}
                    >
                      KES {item.price.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityChange(index, -1);
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography variant="h6" fontWeight="bold" sx={{ mx: 2 }}>
                      {quantities[index]}
                    </Typography>
                    <IconButton
                      size="small"
                      color="success"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityChange(index, 1);
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(index);
                    }}
                  >
                    Remove
                  </Button>
                </Card>
              </Link>
            ))
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Cart Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
              <Typography>
                Total Items:{" "}
                <strong>{quantities.reduce((sum, q) => sum + q, 0)}</strong>
              </Typography>
              <Typography>
                Total Price: <strong>KES {total.toLocaleString()}</strong>
              </Typography>
            </Stack>
            <Stack spacing={2} mt={3}>
              <Button
                variant="contained"
                color="error"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={cart.length === 0}
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItems;
