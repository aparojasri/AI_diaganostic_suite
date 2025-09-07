import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem component={Link} to="/" disablePadding>
          <ListItemButton><ListItemIcon><DashboardIcon /></ListItemIcon><ListItemText primary="Dashboard" /></ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/about" disablePadding>
          <ListItemButton><ListItemIcon><InfoIcon /></ListItemIcon><ListItemText primary="About Project" /></ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Typography variant="overline" sx={{ pl: 2, pt: 2 }}>Tabular Models</Typography>
      <List>
        <ListItem component={Link} to="/ckd" disablePadding>
          <ListItemButton><ListItemIcon><ScienceIcon /></ListItemIcon><ListItemText primary="CKD Diagnosis" /></ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/sepsis" disablePadding>
          <ListItemButton><ListItemIcon><BiotechIcon /></ListItemIcon><ListItemText primary="Sepsis Prediction" /></ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Typography variant="overline" sx={{ pl: 2, pt: 2 }}>Image Models</Typography>
      <List>
        <ListItem component={Link} to="/brain-tumor" disablePadding>
          <ListItemButton><ListItemIcon><PsychologyIcon /></ListItemIcon><ListItemText primary="Brain Tumor MRI" /></ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/pneumonia" disablePadding>
          <ListItemButton><ListItemIcon><FilterFramesIcon /></ListItemIcon><ListItemText primary="Pneumonia X-Ray" /></ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/lung-cancer" disablePadding>
          <ListItemButton><ListItemIcon><AnalyticsIcon /></ListItemIcon><ListItemText primary="Lung Cancer CT" /></ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;