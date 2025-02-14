import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
import { Provider } from "react-redux";
import { store } from "./store/store";
import Signup from './pages/Signup';
import './index.css';
import './App.css';
import DailyConsumptionPage from "./pages/DailyConsumptionPage"; // Import the new page
import ProductionHistory from "./components/ProductionHistory";
import MyFarm from "./components/MyFarm";
import FarmStaff from "./components/FarmStaff";
import LivestockManagement from "./components/LivestockManagement";

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
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscribe" element={<SubscriptionForm />} />
              <Route path="/field-trip-report" element={<FieldTripReport />} />
              <Route path="/merchandise" element={<MerchandiseScreen />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/livestock" element={<Livestock />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/signup" element={<Signup />} /> {/* New signup route */}
              <Route path="/daily-consumption" element={<DailyConsumptionPage />} /> {/* New Route */}
              <Route path="/production-history" element={<ProductionHistory />} /> {/* New Route */}
              <Route path="/farm-staff" element={<FarmStaff />} /> {/* New Route */}
              <Route path="/livestock" element={<LivestockManagement />} /> {/* New Route */}

              <Route path="/my-farm" element={<MyFarm />} />


            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
