import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, Select, FormControl, InputLabel, Box, IconButton } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import SignUpImg from "../Images/signup.jpg";
import { Helmet } from 'react-helmet';


// Custom theme for the signup page
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5', // Blue color for the button
    },
    secondary: {
      main: '#f50057', // Pink color for accents
    },
    background: {
      default: '#f4f6f8', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
      color: '#333',
    },
  },
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
  backgroundImage:
    "linear-gradient(348deg, rgba(200,197,229,1) 0%, rgba(47,104,186,1) 100%)",
  // padding: 4,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    // maxWidth:"20vh"
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
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    minHeight:"50vh",
    // backgroundColor:"red",
    marginTop:"10vh"
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0F1B4C",
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "14px",
  cursor: "pointer",
  padding: "0.7rem 2rem",
  borderRadius: "7px",
  textTransform: "none",
  display: "block",
  marginTop: "10px",
  marginLeft:0,
  border: "2px solid transparent",
  transition: "background-color 0.3s, color 0.3s, borderColor 0.3s",
  width:"24rem",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
    borderColor: "#0F1B4C",
    animation: `${theme.transitions.create(["background-color", "color", "border-color"], {
      duration: theme.transitions.duration.short,
    })} custom-hover-animation`,
  },
}));

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role,
      });

      // Redirect to Dashboard or another page after successful sign-up
      console.log('User registered:', user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signup - Terminal Solutions</title>
      </Helmet>
      <StyledBox>
        <ImageBox>
        <img
            src={SignUpImg}
            alt="Signup Illustration"
            style={{ width: "60%", height: "auto", borderRadius:"20px" }} // Adjust styles as needed
            data-aos="fade-up"
          />
        </ImageBox>
        <Box sx={{ display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            minWidth: "120vh",textAlign: 'center', marginBottom: 3 }}>
          <Typography variant="h4" sx={{color:"#fff"}}>Sign Up</Typography>
          <Typography variant="subtitle2" sx={{color:"#fff"}}>Identify the format of your mark</Typography>
          <Grid container spacing={2} direction="column" sx={{display:"flex", alignItems:"center", mt:2}}>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                sx={{ borderRadius: 1, minWidth:"60vh", }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ borderRadius: 1, minWidth:"60vh" }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle icon */}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <FormControl sx={{minWidth:"60vh"}}>
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  sx={{
                    borderRadius: 1,
                  }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <CustomButton
                // variant="contained"
                // color="primary"
                onClick={handleSignUp}
                // sx={{
                //   '&:hover': {
                //     backgroundColor: '#303f9f', // Darken on hover
                //   },
                //   padding: '12px',
                //   fontWeight: 'bold',
                //   minWidth:"60vh"
                // }}
                data-aos="fade-in"
              >
                Sign Up
              </CustomButton>
            </Grid>
            {error && (
              <Grid item>
                <Typography color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </StyledBox>
    </ThemeProvider>
  );
};

export default SignUpPage;
