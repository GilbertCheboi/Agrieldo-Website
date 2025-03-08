// src/components/Slider.js
import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Collapse } from "@mui/material";
import { 
  Dashboard, Agriculture, MonetizationOn, Task, Menu, Fastfood, Build, People, Videocam, History, BarChart, ExpandLess, ExpandMore 
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Slider = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [livestockOpen, setLivestockOpen] = useState(false);
  const [filter, setFilter] = useState("All"); // Default filter

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleLivestockMenu = () => {
    setLivestockOpen(!livestockOpen);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    if (onFilterChange) {
      onFilterChange(selectedFilter); // Pass filter to parent (e.g., AnimalList)
    }
  };

  return (
    <>
      {/* Hamburger Menu Button - Fixed to top-left */}
      <IconButton 
        onClick={toggleDrawer} 
        style={{ position: "fixed", top: 15, left: 15, zIndex: 2000, backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <Menu style={{ color: "#fff" }} />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List style={{ width: 250 }}>
          <ListItem button component={Link} to="/dashboard" onClick={toggleDrawer}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={toggleLivestockMenu}>
            <ListItemIcon><Agriculture /></ListItemIcon>
            <ListItem button component={Link} to="/animal_list" onClick={toggleDrawer}>
            <ListItemText primary="Livestock Management" />
            </ListItem>

            {/* {livestockOpen ? <ExpandLess /> : <ExpandMore />} */}
          </ListItem>
          {/* <Collapse in={livestockOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem style={{ paddingLeft: 32 }}  button component={Link} to="/animal_list" onClick={toggleDrawer} >
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="w-full p-2 text-sm border rounded-md bg-white text-gray-800"
                >
                 
                  <option value="All">All Animals</option>
                  <option value="Calf">Calf</option>
                  <option value="Heifer">Heifer</option>
                  <option value="Milking">Milking Cow</option>
                  <option value="Dry">Dry Cow</option>
                  <option value="Bull">Bull</option>
                  <option value="Pregnant">Pregnant</option>
                </select>
              </ListItem>
            </List>
          </Collapse> */}
          <ListItem button component={Link} to="/financials" onClick={toggleDrawer}>
            <ListItemIcon><MonetizationOn /></ListItemIcon>
            <ListItemText primary="Financials" />
          </ListItem>
          <ListItem button component={Link} to="/tasks" onClick={toggleDrawer}>
            <ListItemIcon><Task /></ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button component={Link} to="/daily-consumption" onClick={toggleDrawer}>
            <ListItemIcon><Fastfood /></ListItemIcon>
            <ListItemText primary="Daily Feed Consumption" />
          </ListItem>
          <ListItem button component={Link} to="/machinery" onClick={toggleDrawer}>
            <ListItemIcon><Build /></ListItemIcon>
            <ListItemText primary="Machinery" />
          </ListItem>
          <ListItem button component={Link} to="/farm-staff" onClick={toggleDrawer}>
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary="Farm Staff" />
          </ListItem>

          {/* Divider */}
          <Divider />

          {/* Production Links */}
          <ListItem button component={Link} to="/production" onClick={toggleDrawer}>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText primary="Today's Production" />
          </ListItem>
          <ListItem button component={Link} to="/production-history" onClick={toggleDrawer}>
            <ListItemIcon><History /></ListItemIcon>
            <ListItemText primary="Production History" />
          </ListItem>

          {/* Divider */}
          <Divider />

          {/* My Farm - Link to CCTV Page */}
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