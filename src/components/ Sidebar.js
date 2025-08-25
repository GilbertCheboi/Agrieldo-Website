import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import {
  Dashboard,
  Agriculture,
  MonetizationOn,
  Menu,
  Fastfood,
  Build,
  People,
  Videocam,
  History,
  BarChart,
  LocalHospital,
  Store,
  Assignment,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Menu items by farm type (for farmers)
const menuItemsByFarmType = {
  Dairy: [
    { to: "/dashboard", text: "Dashboard", icon: <Dashboard /> },
    {
      to: "/animal-list",
      text: "Livestock Management",
      icon: <Agriculture />,
      appendFarmId: true,
    },
    { to: "/financials", text: "Financials", icon: <MonetizationOn /> },
    { to: "/farms", text: "Farms", icon: <Store /> },
    { to: "/farm-staff", text: "Farm Staff", icon: <People /> },
    { to: "/farm-vets", text: "Farm Vets", icon: <LocalHospital /> },
    { to: "/machinery", text: "Machinery", icon: <Build /> },
    { to: "/feed_store", text: "Feed Store", icon: <Fastfood /> },
    { to: "/production", text: "Today's Production", icon: <BarChart /> },
    {
      to: "/production-history",
      text: "Production History",
      icon: <History />,
    },
    { to: "/my-farm", text: "My Farm (CCTV)", icon: <Videocam /> },
  ],
  Sheep: [
    { to: "/dashboard", text: "Dashboard", icon: <Dashboard /> },
    {
      to: "/animal_list",
      text: "Livestock Management",
      icon: <Agriculture />,
      appendFarmId: true,
    },
    { to: "/financials", text: "Financials", icon: <MonetizationOn /> },
    { to: "/farms", text: "Farms", icon: <Store /> },
    { to: "/farm-staff", text: "Farm Staff", icon: <People /> },
    { to: "/farm-vets", text: "Farm Vets", icon: <LocalHospital /> },
    { to: "/machinery", text: "Machinery", icon: <Build /> },
    { to: "/feed_store", text: "Feed Store", icon: <Fastfood /> },
    { to: "/production", text: "Today's Production", icon: <BarChart /> },
    {
      to: "/production-history",
      text: "Production History",
      icon: <History />,
    },
    { to: "/my-farm", text: "My Farm (CCTV)", icon: <Videocam /> },
  ],
  Crop: [
    { to: "/dashboard", text: "Dashboard", icon: <Dashboard /> },
    { to: "/financials", text: "Financials", icon: <MonetizationOn /> },
    { to: "/farms", text: "Farms", icon: <Store /> },
    { to: "/farm-staff", text: "Farm Staff", icon: <People /> },
    { to: "/machinery", text: "Machinery", icon: <Build /> },
    { to: "/production", text: "Today's Production", icon: <BarChart /> },
    {
      to: "/production-history",
      text: "Production History",
      icon: <History />,
    },
    { to: "/my-farm", text: "My Farm (CCTV)", icon: <Videocam /> },
  ],
  Default: [
    { to: "/dashboard", text: "Dashboard", icon: <Dashboard /> },
    { to: "/farms", text: "Farms", icon: <Store /> },
  ],
};

// Menu for Mechanization Agent (user_type = "4")
const mechanizationMenu = [
  { to: "/mechanization-dashboard", text: "Dashboard", icon: <Dashboard /> },
  { to: "/my-orders", text: "My Orders", icon: <Assignment /> },
  { to: "/available-equipment", text: "Available Equipment", icon: <Build /> },
];

const Slider = ({ farmType = "Default", farmId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedType = localStorage.getItem("user_type");
    setUserType(storedType);
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const normalizedFarmType =
    farmType && farmType.toLowerCase() === "dairy"
      ? "Dairy"
      : farmType && farmType.toLowerCase() === "sheep"
      ? "Sheep"
      : farmType && farmType.toLowerCase() === "crop"
      ? "Crop"
      : "Default";

  const menuItems =
    userType === "4"
      ? mechanizationMenu
      : menuItemsByFarmType[normalizedFarmType] || menuItemsByFarmType.Default;

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 15,
          left: 15,
          zIndex: 2000,
          bgcolor: "rgba(0,0,0,0.1)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(0,0,0,0.2)" },
        }}
      >
        <Menu />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250, bgcolor: "#fff", height: "100%", p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#1a3c34", mb: 1, ml: 2 }}
          >
            {userType === "4" ? "Mechanization Menu" : "Farm Menu"}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#888", mb: 2, ml: 2, display: "block" }}
          >
            User Type: {userType || "Unknown"}, Farm ID: {farmId || "None"}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.to}>
                <ListItem
                  button
                  onClick={() => {
                    const to =
                      item.appendFarmId && farmId
                        ? `${item.to}?farmId=${farmId}`
                        : item.to;
                    navigate(to);
                    toggleDrawer();
                  }}
                  sx={{
                    borderRadius: "8px",
                    mb: 0.5,
                    "&:hover": {
                      bgcolor: "#f4f6f8",
                      color: "#ffa500",
                      "& .MuiListItemIcon-root": { color: "#ffa500" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#1a3c34" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      color: "#1a3c34",
                    }}
                  />
                </ListItem>
                {(item.text === "Feed Store" ||
                  item.text === "Production History") && (
                  <Divider sx={{ my: 1 }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Slider;
