import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import AbIm from '../Images/Akhil.jpg'

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  backgroundColor: '#c5e5c5',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

const AboutText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kanit, sans-serif',
//   fontSize: '1.5rem',
  textAlign: 'center',
  margin: theme.spacing(2, 0),
  width:"80%"
}));

function About() {
  return (
    <MainBox>
      <Typography variant="h2" sx={{ fontWeight: 600, fontFamily: 'Kanit, sans-serif', marginBottom: 3 }}>
        About Us
      </Typography>
    
      <img data-aos="fade-up"
  src={AbIm}
  alt="about"
  style={{
    width: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover", // or "contain" depending on your preference
  }}
/>
<Typography variant="h6" sx={{  fontFamily: 'Kanit, sans-serif', marginBottom: 3 }}>
        Akhil John
      </Typography>
      <AboutText variant='body1'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla sit amet ante tincidunt vestibulum vel a mi. 
        Nulla sagittis, mi ac fermentum malesuada, enim libero sodales ligula, eu ultricies purus dui eget dui. 
        Proin maximus sem sed urna fringilla, nec auctor urna mollis. Duis posuere ligula nec finibus cursus. 
        In hac habitasse platea dictumst. Mauris vehicula varius elit, nec aliquet leo cursus vitae. 
        In hac habitasse platea dictumst. Mauris vehicula varius elit, nec aliquet leo cursus vitae.
      </AboutText>
    </MainBox>
  );
}

export default About;