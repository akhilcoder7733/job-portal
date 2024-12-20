import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Header = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const checkUserRole = async (user) => {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role;
    }
    return null;
  };

  const navigateToProfile = async () => {
    const role = await checkUserRole(user);
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/profile");
    }
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor:"#36b175",
        padding: "8px 16px",
        boxShadow:0
      }}
    >
      <Toolbar>
        {/* Header Title */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: "1.5px",
              fontFamily:"Pacifico, serif",
            }}
          >
            Terminal Options
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {user ? (
            <>
              {/* Show these links ONLY when user is logged in */}
              <Button
                component={Link}
                to="/home"
                sx={{
                  color: "#fff",
                  fontFamily:"Kanit, sans-serif",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/courses"
                sx={{
                  color: "#fff",
                  fontFamily:"Kanit, sans-serif",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                Courses
              </Button>
              <Button
                component={Link}
                to="/links"
                sx={{
                  color: "#fff",
                  fontFamily:"Kanit, sans-serif",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                Links
              </Button>
              <Button
                component={Link}
                to="/notices"
                sx={{
                  color: "#fff",
                  fontFamily:"Kanit, sans-serif",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                Notices
              </Button>

              {/* Profile Menu */}
              <Button
                color="inherit"
                onClick={handleMenuClick}
                sx={{
                  textTransform: "none",
                  fontFamily:"Kanit, sans-serif",
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                Profile
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={navigateToProfile} sx={{fontFamily:"Kanit, sans-serif",}}>Go to Profile</MenuItem>
                <MenuItem onClick={handleLogout} sx={{fontFamily:"Kanit, sans-serif",}}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Show these links ONLY when user is NOT logged in */}
              <Button
                component={Link}
                to="/login"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
