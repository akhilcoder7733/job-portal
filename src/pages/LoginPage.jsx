import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  // Container,
  Typography,
  Box,
  IconButton,
  Link,
  CircularProgress,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons for show/hide password
import LoginImg from "../Images/login.png";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet";

// Custom theme for the login page
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5", // Blue color for the button
    },
    secondary: {
      main: "#f50057", // Pink color for accents
    },
    background: {
      default: "#f4f6f8", // Light gray background
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 600,
      color: "#333",
    },
  },
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  // flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
  backgroundImage:
    "linear-gradient(348deg, rgba(229,206,197,1) 15%, rgba(71,190,93,1) 100%)",
  padding: 4,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  // flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Show spinner during login
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          navigate(userData.role === "admin" ? "/dashboard" : "/home");
        }
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - Terminal Solutions</title>
      </Helmet>
      <StyledBox
      // maxWidth="xl"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            minWidth: "120vh",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <Typography variant="h4" sx={{ color: "#fff" }}>
              Login
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#fff" }}>
              Welcome Back! Remember Me.
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              spacing={2}
              direction="column"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Grid item>
                <TextField
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ borderRadius: 1, minWidth: "60vh" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ borderRadius: 1, minWidth: "60vh" }}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                        {/* Toggle icon */}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  disabled={loading}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#303f9f", // Darken on hover
                    },
                    padding: "12px",
                    fontWeight: "bold",
                    minWidth: "60vh",
                  }}
                  data-aos="fade-in"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Grid>
              {error && (
                <Grid item>
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Link
                  href="/forgot-password"
                  sx={{
                    color: "#fff",
                    fontSize: "0.9rem",
                    textDecoration: "underline",
                    "&:hover": {
                      color: "#f50057",
                    },
                  }}
                >
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <ImageBox>
          <img
          data-aos="fade-up-right"
            src={LoginImg}
            alt="Login Illustration"
            style={{ width: "70%", height: "auto" }} // Adjust styles as needed
          />
        </ImageBox>
      </StyledBox>
    </ThemeProvider>
  );
};

export default LoginPage;
