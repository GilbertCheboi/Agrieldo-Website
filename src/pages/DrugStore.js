import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Pagination,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom"; // ✅ use Link instead of navigate
import { useCart } from "../components/CartContext";
import paracetamolImage from "../assets/paracetamol.jpg";
import AmoxicillinlImage from "../assets/Amoxicillin.jpg";
import IbuprofenImage from "../assets/Ibuprofen.jpg";

const drugs = [
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DrugStore = () => {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleExpandClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
    setExpandedCard(null);
  };

  const paginatedDrugs = filteredDrugs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDrugs.length / itemsPerPage);

  return (
    <Box p={4}>
      <Box mb={3} maxWidth={400}>
        <TextField
          fullWidth
          label="Search medicine..."
          variant="outlined"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {paginatedDrugs.map((drug) => (
          <Grid item xs={12} sm={6} md={4} key={drug.id}>
            <Link to={`/items/${drug.id}`} style={{ textDecoration: "none" }}>
              <Card
                onClick={(e) => e.stopPropagation()}
                sx={{ cursor: "pointer" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                      {drug.name.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={drug.name}
                  subheader={`KES ${drug.price}`}
                />
                <CardMedia
                  component="img"
                  image={drug.image}
                  alt={drug.name}
                  sx={{
                    width: "100%",
                    height: "194px",
                    objectFit: "contain",
                    padding: 1,
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {drug.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                  }}
                >
                  <IconButton
                    aria-label="whatsapp"
                    onClick={(e) => e.stopPropagation()}
                    component="a"
                    href={`https://wa.me/254745441222?text=${encodeURIComponent(
                      `Hi, I'm interested in buying:\n\n🩺 *${drug.name}*\n💰 Price: KES ${drug.price}\n📃 Description: ${drug.description}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon sx={{ color: "#25D366" }} />
                  </IconButton>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(drug);
                    }}
                    sx={{
                      backgroundColor: "#ff9800",
                      color: "#fff",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#fb8c00",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>

                  <ExpandMore
                    expand={expandedCard === drug.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpandClick(drug.id);
                    }}
                    aria-expanded={expandedCard === drug.id}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>

                <Collapse
                  in={expandedCard === drug.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <Typography paragraph>Usage:</Typography>
                    <Typography paragraph>
                      Take as prescribed by a healthcare professional. Typically
                      1–2 times daily.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default DrugStore;
