import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  GiCow,
  GiBabyBottle,
  GiMedicalPack,
  GiFemale,
  GiHeartPlus,
  GiMilkCarton,
  GiGrass,
  GiBull,
} from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import DashboardCard from "./DashboardCard";
import { fetchAnimals, createAnimal, getFarms } from "../services/api";

const LivestockSummary = ({ farmId }) => {
  const navigate = useNavigate();
  const [livestockData, setLivestockData] = useState({
    totalCows: 0,
    bulls: 0,
    heifers: 0,
    calves: 0,
    weanerStage1: 0,
    weanerStage2: 0,
    yearlings: 0,
    bulling: 0,
    inCalf: 0,
    steaming: 0,
    earlyLactating: 0,
    midLactating: 0,
    lateLactating: 0,
    dry: 0,
    sickCows: 0,
  });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "Female",
    dob: "",
    category: "Calf (0-3 months)",
    tag: "",
    breed: "",
    farm: farmId,
    ownerId: "",
    ownerDisplay: "",
    images: [],
    farms: [],
  });
  const [formErrors, setFormErrors] = useState({});

  const loadLivestockData = useCallback(async () => {
    if (!farmId) {
      setLoading(false);
      return;
    }
    try {
      const animals = await fetchAnimals({ farmId });
      const counts = {
        totalCows: animals.length,
        bulls: 0,
        heifers: 0,
        calves: 0,
        weanerStage1: 0,
        weanerStage2: 0,
        yearlings: 0,
        bulling: 0,
        inCalf: 0,
        steaming: 0,
        earlyLactating: 0,
        midLactating: 0,
        lateLactating: 0,
        dry: 0,
        sickCows: 0,
      };

      animals.forEach((animal) => {
        if (animal.is_sick) counts.sickCows += 1;
        switch (animal.category) {
          case "Bull":
            counts.bulls += 1;
            break;
          case "Heifer":
            counts.heifers += 1;
            break;
          case "Calf (0-3 months)":
            counts.calves += 1;
            break;
          case "Weaner Stage 1 (3-6 months)":
            counts.weanerStage1 += 1;
            break;
          case "Weaner Stage 2 (6-9 months)":
            counts.weanerStage2 += 1;
            break;
          case "Yearling (9-12 months)":
            counts.yearlings += 1;
            break;
          case "Bulling (12-15 months)":
            counts.bulling += 1;
            break;
          case "In-Calf":
            counts.inCalf += 1;
            break;
          case "Steaming":
            counts.steaming += 1;
            break;
          case "Early Lactating":
            counts.earlyLactating += 1;
            break;
          case "Mid Lactating":
            counts.midLactating += 1;
            break;
          case "Late Lactating":
            counts.lateLactating += 1;
            break;
          case "Dry":
            counts.dry += 1;
            break;
          default:
            break;
        }
      });

      setLivestockData(counts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed to load livestock data. Please try again.");
    }
  }, [farmId]);

  useEffect(() => {
    loadLivestockData();
  }, [loadLivestockData]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const farmsData = await getFarms();
        setFormData((prevState) => ({
          ...prevState,
          farms: farmsData,
          farm: farmId && farmsData.some((f) => f.id === farmId) ? farmId : farmsData[0]?.id || "",
        }));
      } catch (error) {
        alert("Failed to load farms. Please try again.");
      }
    };

    fetchFarms();
  }, [farmId]);

  useEffect(() => {
    const getUserById = async (userId) => {
      try {
        return { username: "JohnDoe" }; // Replace with actual API call
      } catch (error) {
        throw new Error("Failed to fetch user data");
      }
    };

    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          alert("Session expired. Please log in again.");
          return;
        }
        const userId = decoded.user_id;
        getUserById(userId)
          .then((data) => {
            setFormData((prevState) => ({
              ...prevState,
              ownerId: userId,
              ownerDisplay: data.username,
            }));
          })
          .catch(() => {
            alert("Failed to fetch user data. Please try again.");
          });
      } catch (error) {
        alert("Invalid session. Please log in again.");
      }
    }
  }, []);

  const handleCategoryClick = (filter) => {
    if (!farmId) {
      alert("Cannot navigate: Farm ID is missing.");
      return;
    }
    const url = `/animal_list?${filter}&farmId=${farmId}`;
    navigate(url);
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    setFormErrors({});
    setFormData((prevState) => ({
      ...prevState,
      name: "",
      gender: "Female",
      dob: "",
      category: "Calf (0-3 months)",
      tag: "",
      breed: "",
      farm: farmId,
      images: [],
    }));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = files.filter((file) => {
      if (!validImageTypes.includes(file.type)) {
        alert(`${file.name} is not a valid image type (JPEG/PNG only).`);
        return false;
      }
      if (file.size > maxSize) {
        alert(`${file.name} exceeds the 5MB size limit.`);
        return false;
      }
      return true;
    });

    setFormData((prevData) => ({
      ...prevData,
      images: validFiles,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Animal name is required";
    if (!formData.tag) errors.tag = "Tag is required";
    if (!formData.breed) errors.breed = "Breed is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.farm || !farmId || !formData.farms.some((f) => f.id === formData.farm)) {
      errors.farm = "A valid farm is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAnimal = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload = new FormData();
      payload.append("tag", formData.tag);
      payload.append("name", formData.name);
      payload.append("breed", formData.breed);
      payload.append("dob", formData.dob);
      payload.append("gender", formData.gender);
      payload.append("category", formData.category);
      payload.append("farm", formData.farm);
      payload.append("owner", formData.ownerId);
      if (formData.images.length > 0) {
        formData.images.forEach((file) => {
          payload.append("images", file);
        });
      }

      await createAnimal(payload);
      handleModalClose();
      loadLivestockData(); // Refresh livestock data
    } catch (error) {
      alert("Failed to add animal. Please try again.");
    }
  };

  if (!farmId) {
    return <Typography color="error">Farm ID is required</Typography>;
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#1a3c34", mb: 2 }}
      >
        Livestock Summary
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiCow color="#ffa500" size={18} /> Total Animals
              </>
            }
            onClick={() => handleCategoryClick("")}
          >
            <Typography variant="h6">{livestockData.totalCows}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiBull color="#ffa500" size={18} /> Bulls
              </>
            }
            onClick={() => handleCategoryClick("category=Bull")}
          >
            <Typography variant="h6">{livestockData.bulls}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiFemale color="#ffa500" size={18} /> Heifers
              </>
            }
            onClick={() => handleCategoryClick("category=Heifer")}
          >
            <Typography variant="h6">{livestockData.heifers}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiBabyBottle color="#ffa500" size={18} /> Calves (0-3)
              </>
            }
            onClick={() => handleCategoryClick("category=Calf (0-3 months)")}
          >
            <Typography variant="h6">{livestockData.calves}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiBabyBottle color="#ffa500" size={18} /> Weaner 1 (3-6)
              </>
            }
            onClick={() =>
              handleCategoryClick("category=Weaner Stage 1 (3-6 months)")
            }
          >
            <Typography variant="h6">{livestockData.weanerStage1}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiBabyBottle color="#ffa500" size={18} /> Weaner 2 (6-9)
              </>
            }
            onClick={() =>
              handleCategoryClick("category=Weaner Stage 2 (6-9 months)")
            }
          >
            <Typography variant="h6">{livestockData.weanerStage2}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiFemale color="#ffa500" size={18} /> Yearlings (9-12)
              </>
            }
            onClick={() =>
              handleCategoryClick("category=Yearling (9-12 months)")
            }
          >
            <Typography variant="h6">{livestockData.yearlings}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiFemale color="#ffa500" size={18} /> Bulling (12-15)
              </>
            }
            onClick={() =>
              handleCategoryClick("category=Bulling (12-15 months)")
            }
          >
            <Typography variant="h6">{livestockData.bulling}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiHeartPlus color="#ffa500" size={18} /> In-Calf
              </>
            }
            onClick={() => handleCategoryClick("category=In-Calf")}
          >
            <Typography variant="h6">{livestockData.inCalf}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiHeartPlus color="#ffa500" size={18} /> Steaming
              </>
            }
            onClick={() => handleCategoryClick("category=Steaming")}
          >
            <Typography variant="h6">{livestockData.steaming}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiMilkCarton color="#ffa500" size={18} /> Early Lactating
              </>
            }
            onClick={() => handleCategoryClick("category=Early Lactating")}
          >
            <Typography variant="h6">{livestockData.earlyLactating}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiMilkCarton color="#ffa500" size={18} /> Mid Lactating
              </>
            }
            onClick={() => handleCategoryClick("category=Mid Lactating")}
          >
            <Typography variant="h6">{livestockData.midLactating}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiMilkCarton color="#ffa500" size={18} /> Late Lactating
              </>
            }
            onClick={() => handleCategoryClick("category=Late Lactating")}
          >
            <Typography variant="h6">{livestockData.lateLactating}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiGrass color="#ffa500" size={18} /> Dry
              </>
            }
            onClick={() => handleCategoryClick("category=Dry")}
          >
            <Typography variant="h6">{livestockData.dry}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <GiMedicalPack color="red" size={18} /> Sick Animals
              </>
            }
            onClick={() => handleCategoryClick("is_sick=true")}
          >
            <Typography variant="h6" sx={{ color: "red" }}>
              {livestockData.sickCows}
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={
              <>
                <AiOutlinePlus color="#ffa500" size={18} /> Add Animal
              </>
            }
            onClick={handleModalOpen}
          >
            <Typography variant="h6" sx={{ color: "#ffa500" }}>
              +
            </Typography>
          </DashboardCard>
        </Grid>
      </Grid>

      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Add New Animal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Animal Name"
            fullWidth
            value={formData.name}
            onChange={handleFormChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <TextField
            margin="dense"
            name="tag"
            label="Tag"
            fullWidth
            value={formData.tag}
            onChange={handleFormChange}
            error={!!formErrors.tag}
            helperText={formErrors.tag}
          />
          <TextField
            margin="dense"
            name="breed"
            label="Breed"
            fullWidth
            value={formData.breed}
            onChange={handleFormChange}
            error={!!formErrors.breed}
            helperText={formErrors.breed}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
              label="Gender"
            >
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            value={formData.dob}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
            error={!!formErrors.dob}
            helperText={formErrors.dob}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              label="Category"
            >
              <MenuItem value="Calf (0-3 months)">Calf (0-3 months)</MenuItem>
              <MenuItem value="Weaner Stage 1 (3-6 months)">
                Weaner Stage 1 (3-6 months)
              </MenuItem>
              <MenuItem value="Weaner Stage 2 (6-9 months)">
                Weaner Stage 2 (6-9 months)
              </MenuItem>
              <MenuItem value="Yearling (9-12 months)">
                Yearling (9-12 months)
              </MenuItem>
              <MenuItem value="Bulling (12-15 months)">
                Bulling (12-15 months)
              </MenuItem>
              <MenuItem value="Heifer">Heifer</MenuItem>
              <MenuItem value="In-Calf">In-Calf</MenuItem>
              <MenuItem value="Steaming">Steaming</MenuItem>
              <MenuItem value="Early Lactating">Early Lactating</MenuItem>
              <MenuItem value="Mid Lactating">Mid Lactating</MenuItem>
              <MenuItem value="Late Lactating">Late Lactating</MenuItem>
              <MenuItem value="Dry">Dry</MenuItem>
              <MenuItem value="Bull">Bull</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" error={!!formErrors.farm}>
            <InputLabel id="farm-label">Farm</InputLabel>
            <Select
              labelId="farm-label"
              name="farm"
              value={formData.farm}
              onChange={handleFormChange}
              label="Farm"
              disabled={formData.farms.length === 0}
            >
              {formData.farms.length === 0 ? (
                <MenuItem value="">No farms available</MenuItem>
              ) : (
                formData.farms.map((farm) => (
                  <MenuItem key={farm.id} value={farm.id}>
                    {farm.name}
                  </MenuItem>
                ))
              )}
            </Select>
            {formErrors.farm && (
              <Typography color="error" variant="caption">
                {formErrors.farm}
              </Typography>
            )}
          </FormControl>
          <TextField
            margin="dense"
            name="images"
            label="Upload Images"
            type="file"
            fullWidth
            inputProps={{ multiple: true }}
            onChange={handleImageChange}
            InputLabelProps={{ shrink: true }}
          />
          {formData.images.length > 0 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected images: {formData.images.map((file) => file.name).join(", ")}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button
            onClick={handleAddAnimal}
            variant="contained"
            color="primary"
            disabled={formData.farms.length === 0 || !formData.farm}
          >
            Add Animal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

LivestockSummary.propTypes = {
  farmId: PropTypes.string.isRequired,
};

export default LivestockSummary;