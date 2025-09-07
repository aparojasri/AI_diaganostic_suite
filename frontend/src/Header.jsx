import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function Header() {
  return (
    <AppBar
      position="fixed"
      // --- THIS IS THE FIX ---
      // We use a specific number for zIndex to ensure it's above the sidebar.
      sx={{ zIndex: 1300, backgroundColor: '#ffffff', color: '#000000' }}
      elevation={1}
    >
      <Toolbar>
        <LocalHospitalIcon sx={{ color: 'primary.main', mr: 2, fontSize: '2rem' }} />
        <Typography variant="h6" noWrap component="div">
          Happy Health
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;