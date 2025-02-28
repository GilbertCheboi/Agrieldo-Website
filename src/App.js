import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
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
import "./index.css";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscribe" element={<SubscriptionForm />} />
              <Route path="/field-trip-report" element={<FieldTripReport />} />
              <Route path="/merchandise" element={<MerchandiseScreen />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/livestock" element={<Livestock />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/daily-consumption" element={<DailyConsumptionPage />} />
              <Route path="/production-history" element={<ProductionHistory />} />
              <Route path="/farm-staff" element={<FarmStaff />} />
              <Route path="/livestock-management" element={<LivestockManagement />} />
              <Route path="/profile" element={<ProfilePage/> } />
              <Route path="/my-farm" element={<MyFarm />} />
              <Route path="/machinery" element={<Machinery />} />
              <Route path="/machinery/:id" element={<MachineryDetails />} />
              <Route path="/animal_detail" element={<AnimalProfileDashboard />} />
              <Route path="/animal_list" element={<AnimalList />} />




            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
