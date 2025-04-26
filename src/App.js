import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import SubscriptionForm from "./pages/SubscriptionForm";
import FieldTripReport from "./pages/FieldTripReport";
import MerchandiseScreen from "./pages/MerchandiseScreen";
import Calendar from "./pages/Calendar";
import Dashboard from "./components/Dashboard";
import Livestock from "./pages/Livestock";
import Tasks from "./pages/Tasks";
import DailyConsumptionPage from "./pages/DailyConsumptionPage";
import ProductionHistory from "./components/ProductionHistory";
import MyFarm from "./components/MyFarm";
import FarmStaff from "./components/FarmStaff";
import LivestockManagement from "./components/LivestockManagement";
import ProfilePage from "./pages/ProfilePage";
import Machinery from "./pages/Machinery";
import MachineryDetails from "./pages/MachineryDetail";
import AnimalProfileDashboard from "./pages/AnimalProfileDashboard";
import AnimalList from "./pages/AnimalList";
import InventoryDashboard from "./components/InventoryDashboard";
import OutletInventory from "./components/OutletInventory";
import Farms from "./pages/Farms";
import FarmDashboard from "./components/FarmDashboard"; // New component we'll create
import VetStaff from "./components/VetStaff";
import SheepList from "./pages/SheepList";
import SheepDetails from "./pages/SheepDetails";
import FeedStore from "./components/FeedStore";
import "./index.css";
import "./App.css";
import Packages from "./pages/packages";
import LivestockSummary from "./components/LivestockSummary";

// MUI Theme for FABs and Modals
const theme = createTheme({
  palette: {
    primary: { main: "#4caf50" }, // Green for farming theme
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1, padding: "20px" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/features" element={<Features />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/subscribe" element={<SubscriptionForm />} />
                <Route
                  path="/field-trip-report"
                  element={<FieldTripReport />}
                />
                <Route path="/merchandise" element={<MerchandiseScreen />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/livestock" element={<Livestock />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route
                  path="/daily-consumption"
                  element={<DailyConsumptionPage />}
                />
                <Route
                  path="/production-history"
                  element={<ProductionHistory />}
                />
                <Route path="/farm-staff" element={<FarmStaff />} />
                <Route
                  path="/livestock-management"
                  element={<LivestockManagement />}
                />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-farm" element={<MyFarm />} />
                <Route path="/machinery" element={<Machinery />} />
                <Route path="/machinery/:id" element={<MachineryDetails />} />
                <Route
                  path="/animal/:id"
                  element={<AnimalProfileDashboard />}
                />
                <Route path="/animal_list" element={<LivestockSummary />} />
                <Route path="/farms" element={<Farms />} />
                <Route path="/farm-vets" element={<VetStaff />} />
                <Route path="/dashboard/:farmId" element={<FarmDashboard />} />
                <Route path="/sheep-list/:farmId" element={<SheepList />} />
                <Route
                  path="/sheep-details/:farmId/:sheepId"
                  element={<SheepDetails />}
                />
                <Route path="/feed_store" element={<FeedStore />} />

                {/* Inventory Management Routes */}
                <Route path="/inventory" element={<InventoryDashboard />} />
                <Route
                  path="/inventory/outlet/:id"
                  element={<OutletInventory />}
                />
              </Routes>
            </div>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
