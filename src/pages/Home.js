import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SubscriptionForm from "./SubscriptionForm";
import heroImage1 from "../assets/pic65.avif";
import heroImage2 from "../assets/pic64.jpg";
import heroImage3 from "../assets/pic8.jpg";
import heroImage4 from "../assets/pic60.jpg";
import heroImage5 from "../assets/pic36.jpg";
import heroImage6 from "../assets/pic63.jpg";
import heroImage7 from "../assets/pic7.jpg";
import missionImage from "../assets/pic14.jpg";
import surveillanceImage from "../assets/pic50.jpg";
import recordKeepingImage from "../assets/pic53.jpeg";
import vetRequestsImage from "../assets/pic56.avif";
import dairyfeeds from "../assets/pic55.jpg";
import auctions from "../assets/pic7.jpg";
import AIpowered from "../assets/pic16.webp";
import { AlertTriangle, CheckCircle, Cpu } from "lucide-react";
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";
import RequestMachineryModal from "../components/RequestMachinery";

const images = [
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage4,
  heroImage5,
  heroImage6,
  heroImage7,
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = React.useState("farm");
  const [machineryModalOpen, setMachineryModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    service: "",
    from: "",
    to: "",
    type: "",
    count: "",
    phone: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", form);
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-white">
              Welcome to Agrieldo
            </h1>
            <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-white">
              Transforming Farm Management with Cutting-Edge Technology
            </p>
          </motion.div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-600 transition"
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-600 transition"
        >
          <FaArrowRight size={20} />
        </button>
      </div>
      {/* Problem and Solution Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-gradient-to-br from-orange-50 via-white to-orange-100"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            The Problem We're Solving
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Many farmers face daily struggles due to outdated management
            practices, poor record-keeping, limited access to markets and
            inputs, and lack of real-time insights for better decision-making.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Problem Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                The Challenges
              </h3>
              <ul className="text-gray-700 text-left space-y-3 list-disc pl-5">
                <li>Manual and inconsistent farm records</li>
                <li>Lack of data-driven insights for farm decision-making</li>
                <li>Poor tracking of livestock performance and farm produce</li>
                <li>Limited access to quality veterinary services and feeds</li>
                <li>Poor tracking of produce and weak market insights</li>
                <li>Low visibility and poor access to markets</li>
              </ul>
            </motion.div>

            {/* Technology as the Game-Changer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-orange-500" />
                Technology at the Heart
              </h3>
              <ul className="text-gray-700 text-left space-y-3 list-disc pl-5">
                <li>Real-time farm dashboards powered by smart data</li>
                <li>
                  AI-based tools for health monitoring & production insights
                </li>
                <li>Integrated digital marketplaces for inputs and produce</li>
                <li>Seamless mobile access for remote farm control</li>
              </ul>
            </motion.div>

            {/* Solution Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-green-600 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                How Agrieldo Solves This
              </h3>
              <ul className="text-gray-700 text-left space-y-3 list-disc pl-5">
                <li>Digital record-keeping & smart reporting</li>
                <li>Integrated access to feeds, vet services & equipment</li>
                <li>Market linkages for produce & livestock sales</li>
                <li>AI-powered advisory and data-driven decisions</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* What We Do Section */}
      <div className="py-16 bg-[#333333] text-center">
        <h2 className="text-3xl font-bold text-[#FFA500]">What We Do</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-white">
          At Agrieldo, we empower farmers with smart, technology-driven
          solutions to manage farms efficiently. From AI-powered surveillance
          and record-keeping to vet services and feed distribution, we help
          farmers optimize productivity and profitability.
        </p>
      </div>
      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="py-16 flex flex-col md:flex-row items-center justify-center text-center md:text-left"
      >
        <div className="md:w-1/2 px-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            At Agrieldo, we are dedicated to revolutionizing the way farmers
            manage their farms. Our platform provides real-time surveillance,
            efficient record-keeping, and tools to make farm management easier
            and more effective.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src={missionImage}
            alt="Our Mission"
            className="w-60 h-60 rounded-full object-cover"
          />
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="container mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800">Features</h2>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="agrieldo tabs"
            centered
            TabIndicatorProps={{
              style: { backgroundColor: "#f97316", height: "2px" },
            }}
            sx={{
              "& .MuiTab-root": {
                color: "#9ca3af", // Default tab color (gray-400)
              },
              "& .Mui-selected": {
                color: "#f97316", // Tailwind's orange-500
              },
            }}
          >
            <Tab value="farm" label="Farm Management" />
            <Tab value="import" label="Importation & Exportation" />
            <Tab value="machinery" label="Machinery Leasing" />
            <Tab value="auction" label="Animal Auction" />
          </Tabs>

          {/* Farm Management Tab */}
          {value === "farm" && (
            <div>
              <p className="mt-4 text-lg text-gray-600">
                Here is how Agrieldo enhances farm management:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    image: surveillanceImage,
                    title: "AI-Powered Security & Monitoring",
                    desc: "Monitor your farm remotely, ensuring your animals and crops are safe.",
                  },
                  {
                    image: recordKeepingImage,
                    title: "Smart Farm Management",
                    desc: "Keep track of medical records and production logs in one place.",
                  },
                  {
                    image: vetRequestsImage,
                    title: "Vet Requests",
                    desc: "Easily request a veterinarian through the app for on-demand support.",
                  },
                  {
                    image: dairyfeeds,
                    title: "Agrieldo dairy feeds",
                    desc: "Get instant delivery of dairy feeds to improve milk production.",
                  },
                  {
                    image: auctions,
                    title: "Livestock Marketplace & Auctions",
                    desc: "Buy and sell livestock safely through a trusted platform.",
                  },
                  {
                    image: AIpowered,
                    title: "AI-Powered Insights",
                    desc: "Harness the power of artificial intelligence to analyze farm data and get smart recommendations for improving productivity.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-32 h-32 rounded-lg object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold text-amber-500">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-gray-600 text-center">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {value === "import" && (
            <div className="mt-8">
              {/* Header with image and text */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <img
                  src={require("../assets/export-animal.jpg")}
                  alt="Livestock Export"
                  className="w-full lg:w-1/2 rounded-lg shadow-md object-cover"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-amber-600 mb-4">
                    Global Livestock Trade Made Easy
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Facilitate the seamless import and export of livestock and
                    animal products, locally or internationally, adhering to
                    international standards and ensuring proper documentation
                    and health certifications.
                  </p>
                </div>
              </div>

              {/* Testimonials */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-center text-gray-700 mb-6">
                  What Our Clients Say
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Moses Kiptoo",
                      feedback:
                        "Agrieldo handled our livestock export to Uganda with professionalism and ease.",
                    },
                    {
                      name: "Sarah Wanjiru",
                      feedback:
                        "The documentation and vet checks were flawless. I trust Agrieldo with every shipment.",
                    },
                    {
                      name: "Juma Owino",
                      feedback:
                        "Their service is fast, secure, and reliable. Highly recommend for international trade.",
                    },
                  ].map((client, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md relative"
                    >
                      <p className="text-md mt-6 mb-4 italic text-gray-700">
                        <span className="text-amber-600 text-3xl">“</span>
                        {client.feedback}
                        <span className="text-amber-600 text-3xl">”</span>
                      </p>
                      <p className="font-semibold text-gray-800">
                        — {client.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-10 text-center">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
                >
                  Import/Export Now!
                </button>
              </div>

              <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    maxWidth: 400,
                    bgcolor: "background.paper",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#f97316",
                      mb: 2,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Importation / Exportation Form
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    label="Choose Service"
                    name="service"
                    value={form.service}
                    onChange={handleFormChange}
                    margin="dense"
                  >
                    <MenuItem value="Import">Import</MenuItem>
                    <MenuItem value="Export">Export</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    label="From"
                    name="from"
                    value={form.from}
                    onChange={handleFormChange}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="To"
                    name="to"
                    value={form.to}
                    onChange={handleFormChange}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Type of Animal(s)"
                    name="type"
                    value={form.type}
                    onChange={handleFormChange}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Number of Animal(s)"
                    name="count"
                    type="number"
                    value={form.count}
                    onChange={handleFormChange}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    margin="dense"
                  />

                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: "#f97316",
                      "&:hover": { backgroundColor: "#ea580c" },
                    }}
                  >
                    Submit Request
                  </Button>
                </Box>
              </Modal>
            </div>
          )}

          {value === "machinery" && (
            <div className="mt-8">
              <div className="mt-8 flex justify-center">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl w-full">
                  <h2 className="text-xl font-semibold text-amber-600 mb-4 text-center">
                    Machinery Leasing
                  </h2>

                  <div className="mt-6 text-center text-5xl">🚜</div>
                  <p className="text-gray-800 text-lg text-center">
                    Access modern agricultural machinery through affordable
                    leasing plans, reducing overhead costs and boosting farm
                    efficiency. From tractors to harvesters, we’ve got your
                    mechanization needs covered.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setMachineryModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
                >
                  Request Now!
                </button>
              </div>

              <RequestMachineryModal
                open={machineryModalOpen}
                handleClose={() => setMachineryModalOpen(false)}
              />
            </div>
          )}

          {value === "auction" && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-amber-600 text-center mb-6">
                🐄 Livestock Auction Market
              </h2>
              <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
                Explore our trusted animal auction platform where verified
                farmers and buyers come together to trade livestock safely and
                transparently. Browse animals listed for sale, view bidding
                activity, and place your offers with confidence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Friesian Cow",
                    image: require("../assets/friesian.jpg"),
                    currentBid: "KES 85,000",
                    location: "Nakuru",
                  },
                  {
                    name: "Boer Goat",
                    image: require("../assets/boer-goat.jpg"),
                    currentBid: "KES 15,500",
                    location: "Kisumu",
                  },
                  {
                    name: "Red Maasai Sheep",
                    image: require("../assets/eyshier-bull.jpg"),
                    currentBid: "KES 9,200",
                    location: "Kajiado",
                  },
                ].map((animal, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {animal.name}
                      </h3>
                      <p className="text-gray-500">
                        Location: {animal.location}
                      </p>
                      {/* <p className="text-amber-600 font-bold text-lg mt-2">
                        Current Bid: {animal.currentBid}
                      </p>
                      <button className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition">
                        Place a Bid
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-6 rounded-md shadow-sm transition">
                  View All Auctions
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Our Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="py-16 bg-white text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
        <Grid container spacing={4} justifyContent="center" px={2}>
          {[
            {
              name: "Gilbert Cheboi",
              role: "Chief Executive Officer (CEO)",
              image: "https://i.pravatar.cc/150?img=1",
              description:
                "With over 7 years of experience in tech leadership, Gilbert sets the vision and strategy for the company, guiding teams to deliver innovation and long-term success.",
              socials: {
                linkedin: "https://linkedin.com/in/gilbertcheboi",
                twitter: "https://twitter.com/gilbertcheboi",
              },
            },
            {
              name: "Jerry Melli",
              role: "Chief Operations Officer",
              image: "https://i.pravatar.cc/150?img=3",
              description:
                "With a keen eye for efficiency and strategy, Jerry drives our day-to-day operations, ensuring seamless execution across all departments and delivering exceptional value to our clients.",
              socials: {
                linkedin: "https://linkedin.com/in/jerrymelli",
                twitter: "https://twitter.com/jerrymelli",
              },
            },
            {
              name: "Nixon Kipkorir",
              role: "Chief Technology Officer (CTO)",
              image: "https://i.pravatar.cc/150?img=2",
              description:
                "With a deep passion for scalable systems and innovation, Nixon leads our engineering team in delivering robust, high-performance solutions that power our technology-driven growth.",
              socials: {
                linkedin: "https://linkedin.com/in/nixonkipkorir",
                twitter: "https://twitter.com/nixonkipkorir",
              },
            },
            {
              name: "Ian Johnson",
              role: "Chief Marketing Officer (CMO)",
              image: "https://i.pravatar.cc/150?img=4",
              description:
                "Ian blends creative vision with strategic insight to lead our brand forward. With a passion for storytelling and data-driven campaigns, he ensures our message resonates with the right audience at the right time.",
              socials: {
                linkedin: "https://linkedin.com/in/ianjohnson",
                twitter: "https://twitter.com/ianjohnson",
              },
            },
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: 345,
                  mx: "auto",
                  borderRadius: 4,
                  boxShadow: 3,
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                      border: "2px solid #1976d2",
                    }}
                  />
                  <Typography variant="h6" component="div" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontStyle: "italic", fontWeight: "bold" }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {member.description}
                  </Typography>

                  {/* Social Media Icons */}
                  <Box mt={2} display="flex" justifyContent="center" gap={1}>
                    {member.socials?.linkedin && (
                      <IconButton
                        component="a"
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedInIcon sx={{ color: "#0A66C2" }} />
                      </IconButton>
                    )}
                    {member.socials?.twitter && (
                      <IconButton
                        component="a"
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TwitterIcon sx={{ color: "#1DA1F2" }} />
                      </IconButton>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Testimonial Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="py-16 text-center bg-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "Agrieldo has completely transformed how we manage our farm. The
              real-time surveillance and record-keeping features are
              invaluable."
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              - Jerry Kemboi, Farmer
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "The platform has made our farm operations more organized and
              efficient."
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              - Agrine Changwony, Agricultural Manager
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "The app’s intuitive interface and real-time updates make farm
              operations a lot more manageable."
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              - Sarah Mitei, Livestock Farmer
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "Thanks to Agrieldo, my farm is now more productive than ever!"
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              - Murgor, Farmer
            </p>
          </div>
        </div>
      </motion.div>

      {/* Subscription Section */}
      <div className="bg-gradient-to-r from-[#FFA500] to-[#333333] py-16 px-6 rounded-lg shadow-lg text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold tracking-tight">
            Stay Connected with Agrieldo
          </h2>
          <p className="mt-4 text-lg font-light text-white">
            Subscribe to receive the latest updates, industry insights, and
            exclusive offers tailored just for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:w-80 p-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
            />
            <button className="mt-4 sm:mt-0 sm:ml-4 bg-white text-amber-600 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        className="text-center py-16 text-white"
        style={{
          backgroundImage: `url(${require("../assets/pic53.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mt-6 bg-[#333333]/40 text-white px-12 py-4 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-white">
              Download Agrieldo App Today!
            </h2>
          </div>

          <div className="mt-6 bg-[#333333]/40 text-white px-6 py-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-lg text-white">
              Transform your farm management experience with Agrieldo. Download
              now and take full control of your farm's future!
            </p>
          </div>

          <div className="mt-6 flex justify-center space-x-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.agrieldo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-yellow-500 py-2 px-6 rounded-lg hover:bg-gray-200/40 transition flex items-center"
            >
              <img
                src={require("../assets/Google_Play-Icon-Logo.wine.png")}
                alt="Download on Google Play"
                className="w-12 mr-2"
              />
              Google Play
            </a>
            <a
              href="https://apps.apple.com/us/app/agrieldo/id1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-yellow-500 py-2 px-6 rounded-lg hover:bg-gray-200/40 transition flex items-center"
            >
              <img
                src={require("../assets/App_Store_(iOS).svg.png")}
                alt="Download on the App Store"
                className="w-12 mr-2"
              />
              App Store
            </a>
          </div>
        </motion.div>
      </div>

      <div className="bg-[#333333] text-white">{/* Existing Sections */}</div>
    </div>
  );
};

export default Home;
