import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material";
import { GiCow, GiBabyBottle, GiMedicalPack, GiFemale, GiHeartBeats, GiMilkCarton, GiGrass, GiBull } from "react-icons/gi";
import { fetchAnimals } from "../services/api";
import { useNavigate } from "react-router-dom";

const calculateAgeInMonths = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date("2025-03-04"); // Current date from your system prompt
  const diffMs = today - birthDate;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30)); // Approximate months
};

const LivestockOverview = () => {
  const [livestockData, setLivestockData] = useState({
    totalCows: 0,
    bulls: 0,
    heifers: 0,
    calves: 0,
    newborns: 0,
    pregnant: 0,
    dry: 0,
    milking: 0,
    sickCows: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const loadLivestockData = async () => {
      try {
        const animals = await fetchAnimals();
        const counts = {
          totalCows: animals.length,
          bulls: 0,
          heifers: 0,
          calves: 0,
          newborns: 0,
          pregnant: 0,
          dry: 0,
          milking: 0,
          sickCows: 0,
        };

        animals.forEach((animal) => {
          const ageInMonths = calculateAgeInMonths(animal.dob);

          if (animal.gender === "Male") {
            counts.bulls += 1;
          } else {
            if (ageInMonths < 1) counts.newborns += 1;
            else if (animal.category === "Calf") counts.calves += 1;
            else if (animal.category === "Heifer") counts.heifers += 1;
            else if (animal.category === "Milking") counts.milking += 1;
            else if (animal.category === "Dry") counts.dry += 1;
          }

          if (animal.is_pregnant) counts.pregnant += 1;
          if (animal.health_records && animal.health_records.some(record => record.is_sick)) {
            counts.sickCows += 1;
          }
        });

        setLivestockData(counts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load livestock data:", error);
        setLoading(false);
      }
    };

    loadLivestockData();
  }, []);

  const handleCategoryClick = (filter) => {
    navigate(`/animal_list?${filter}`);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2, maxWidth: 400 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px", color: "#333", mb: 2 }}
      >
        <GiCow color="#ffa500" size={28} /> Livestock Overview
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#ffa500" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#ffa500", textAlign: "center" }}>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiCow color="#ffa500" size={20} /> Total Cows
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{livestockData.totalCows}</TableCell>
              </TableRow>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("category=Bull")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiBull color="#ffa500" size={20} /> Bulls
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{livestockData.bulls}</TableCell>
              </TableRow>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("category=Heifer")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiFemale color="#ffa500" size={20} /> Heifers
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{livestockData.heifers}</TableCell>
              </TableRow>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("category=Calf")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiBabyBottle color="#ffa500" size={20} /> Calves
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{livestockData.calves}</TableCell>
              </TableRow>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("age=Newborn")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiBabyBottle color="#ffa500" size={20} /> Newborns
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{livestockData.newborns}</TableCell>
              </TableRow>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("is_pregnant=true")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiHeartBeats color="#ffa500" size={20} /> Pregnant
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{livestockData.pregnant}</TableCell>
              </TableRow>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("category=Dry")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiGrass color="#ffa500" size={20} /> Dry
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{livestockData.dry}</TableCell>
              </TableRow>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("category=Milking")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiMilkCarton color="#ffa500" size={20} /> Milking
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{livestockData.milking}</TableCell>
              </TableRow>
              <TableRow sx={{ cursor: "pointer" }} onClick={() => handleCategoryClick("is_sick=true")}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GiMedicalPack color="red" size={20} /> Sick Cows
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold", color: "red" }}>{livestockData.sickCows}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default LivestockOverview;