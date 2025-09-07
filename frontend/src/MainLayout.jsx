import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* These three components create the main app structure */}
      <Header />
      <Sidebar />

      {/* This is the main content area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#f5f7fa', p: 3, minHeight: '100vh' }}
      >
        {/* This spacer pushes your content below the fixed header */}
        <Toolbar /> 
        <Outlet /> 
      </Box>
    </Box>
  );
}

export default MainLayout;