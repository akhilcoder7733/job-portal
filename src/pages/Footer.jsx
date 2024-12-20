import { Box, Typography, Link } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        backgroundColor: '#f5f5f5',
        color: '#333',
        textAlign: 'center',
        padding: '16px 0',
        marginTop: 'auto',
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: '8px' }}>
        &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
      </Typography>
      <Box>
        <Link href="/home" underline="hover" sx={{ margin: '0 8px' }}>
          Home
        </Link>
        <Link href="/about" underline="hover" sx={{ margin: '0 8px' }}>
          About
        </Link>
        <Link href="/contact" underline="hover" sx={{ margin: '0 8px' }}>
          Contact
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
