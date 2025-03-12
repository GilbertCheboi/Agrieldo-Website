// src/components/Slider.js
import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import { 
  Dashboard, Agriculture, MonetizationOn, Menu, Fastfood, Build, People, Videocam, History, BarChart, 
  LocalHospital, Store
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Slider = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton 
        onClick={toggleDrawer} 
        style={{ position: "fixed", top: 15, left: 15, zIndex: 2000, backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <Menu style={{ color: "#fff" }} />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List style={{ width: 250 }}>
          <ListItem button component={Link} to="/dashboard" onClick={toggleDrawer}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button component={Link} to="/animal_list" onClick={toggleDrawer}>
            <ListItemIcon><Agriculture /></ListItemIcon>
            <ListItemText primary="Livestock Management" />
          </ListItem>

          <ListItem button component={Link} to="/financials" onClick={toggleDrawer}>
            <ListItemIcon><MonetizationOn /></ListItemIcon>
            <ListItemText primary="Financials" />
          </ListItem>

          <ListItem button component={Link} to="/farms" onClick={toggleDrawer}>
            <ListItemIcon><Store /></ListItemIcon>
            <ListItemText primary="Farms" />
          </ListItem>

          <ListItem button component={Link} to="/farm-staff" onClick={toggleDrawer}>
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary="Farm Staff" />
          </ListItem>

          <ListItem button component={Link} to="/farm-vets" onClick={toggleDrawer}>
            <ListItemIcon><LocalHospital /></ListItemIcon>
            <ListItemText primary="Farm Vets" />
          </ListItem>

          <ListItem button component={Link} to="/machinery" onClick={toggleDrawer}>
            <ListItemIcon><Build /></ListItemIcon>
            <ListItemText primary="Machinery" />
          </ListItem>

          <ListItem button component={Link} to="/daily-consumption" onClick={toggleDrawer}>
            <ListItemIcon><Fastfood /></ListItemIcon>
            <ListItemText primary="Daily Feed Consumption" />
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/production" onClick={toggleDrawer}>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText primary="Today's Production" />
          </ListItem>

          <ListItem button component={Link} to="/production-history" onClick={toggleDrawer}>
            <ListItemIcon><History /></ListItemIcon>
            <ListItemText primary="Production History" />
          </ListItem>

          <Divider />

          <ListItem button component={Link} to="/my-farm" onClick={toggleDrawer}>
            <ListItemIcon><Videocam /></ListItemIcon>
            <ListItemText primary="My Farm (CCTV)" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Slider;
