import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    user_type: 3, // Default to Staff
    phone_number: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "user_type" ? parseInt(value, 10) : value; // ensure user_type is integer
    setFormData({ ...formData, [name]: updatedValue });
  };

  // Toggle password visibility
  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare form data
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    console.log("Data being sent to the API:");
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(
        "https://api.agrieldo.comapi/accounts/users/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Signup successful:", response.data);
      navigate("/packages");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response && err.response.data) {
        const serverError = err.response.data;
        const errorMessage =
          serverError.email?.[0] ||
          serverError.phone_number?.[0] ||
          serverError.non_field_errors?.[0] ||
          "Failed to sign up. Please check your details and try again.";
        setError(errorMessage);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              onChange={handlePasswordToggle}
              checked={showPassword}
            />
            Show Password
          </label>
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>User Type:</label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            required
          >
            <option value={1}>Farmer</option>
            <option value={2}>Vet</option>
            <option value={3}>Staff</option>
          </select>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   IconButton,
//   InputAdornment,
//   Grid,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//     user_type: 3, // Default to Staff
//     phone_number: "",
//   });

//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedValue = name === "user_type" ? parseInt(value, 10) : value;
//     setFormData({ ...formData, [name]: updatedValue });
//   };

//   const handlePasswordToggle = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirm_password) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });

//     try {
//       const response = await axios.post(
//         "https://api.agrieldo.comapi/accounts/users/",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       navigate("/packages");
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Signup failed. Please check your inputs.");
//     }
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         mt: 4,
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Card sx={{ width: "80%", p: 4, borderRadius: 3, boxShadow: 3 }}>
//         <CardContent>
//           <Typography
//             sx={{
//               fontSize: {
//                 xs: "1rem",
//                 sm: "1.4rem",
//                 md: "2rem",
//               },
//             }}
//             gutterBottom
//             align="center"
//           >
//             Create an Account
//           </Typography>

//           {error && (
//             <Typography color="error" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//           )}

//           <Box component="form" onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="username"
//                   label="Username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="email"
//                   label="Email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="phone_number"
//                   label="Phone Number"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel>User Type</InputLabel>
//                   <Select
//                     name="user_type"
//                     value={formData.user_type}
//                     label="User Type"
//                     onChange={handleChange}
//                   >
//                     <MenuItem value={1}>Admin</MenuItem>
//                     <MenuItem value={2}>Manager</MenuItem>
//                     <MenuItem value={3}>Staff</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton onClick={handlePasswordToggle} edge="end">
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="confirm_password"
//                   label="Confirm Password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.confirm_password}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton onClick={handlePasswordToggle} edge="end">
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                   sx={{ mt: 2, py: 1.5 }}
//                 >
//                   Sign Up
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default Signup;
