import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate(); // Correctly call useNavigate hook

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: "linear-gradient(52deg, rgba(211,197,229,1) 19%, rgba(0,98,152,1) 50%, rgba(0,120,152,1) 80%)",
        display: "flex",
        flexDirection: "column", // Stack content vertically
        justifyContent: "center",
        alignItems: "center",
        height: '90vh', // Full height
        textAlign: 'center', // Center the text
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found - Terminal Solutions</title>
      </Helmet>
      <Typography variant="h2" sx={{fontWeight:"bold", fontFamily:"Pacifico, serif",}}>Oops..!</Typography>
      <Typography variant="h4" pt={2} sx={{fontFamily:"Kanit, sans-serif"}}>Page not found!</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          '&:hover': {
            backgroundColor: '#303f9f', // Darken on hover
          },
          padding: '12px',
          fontWeight: 'bold',
          minWidth: '60vh',
          marginTop: 2, // Add some space above the button
        }}
        onClick={handleGoBack} // Add click handler
      >
        Go Back
      </Button>
    </Box>
  );
}

export default NotFound;
