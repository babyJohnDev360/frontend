import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" py={2} textAlign="center">
      <Typography variant="body2">&copy; 2025 Admin Panel. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;