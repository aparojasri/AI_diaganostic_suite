import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import AnalyticsIcon from '@mui/icons-material/Analytics';

// Import your local images
import ckdImage from './assets/ckd.jpeg';
import sepsisImage from './assets/sepsis.jpeg';
import brainTumorImage from './assets/brain_tumor.JPG';
import pneumoniaImage from './assets/pneumonia.JPG'; // <-- PATH CORRECTED
import lungCancerImage from './assets/lung_cancer.jpeg';

function HomePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <HealingIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} /> Happy Health
      </Typography>

      {/* Introduction Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to the AI-Powered Medical Diagnostic Assistant
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Harnessing the power of AI to provide clear, accessible, and insightful diagnostic assistance for a healthier tomorrow.
        </Typography>
      </Paper>

      {/* Overview of Diagnostic Modules */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Our Diagnostic Modules
      </Typography>
      <Grid container spacing={4}>
        {/* CKD Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia 
              component="img" 
              height="160" 
              image={ckdImage} 
              alt="CKD Symptoms"
              sx={{ objectFit: 'contain', padding: '10px' }}
            />
            <CardContent>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ScienceIcon sx={{ mr: 1, color: 'primary.main' }} /> Chronic Kidney Disease
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Analyzes clinical parameters to assess the risk of CKD.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Sepsis Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia 
              component="img" 
              height="160" 
              image={sepsisImage} 
              alt="Sepsis Symptoms"
              sx={{ objectFit: 'contain', padding: '10px' }}
            />
            <CardContent>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <BiotechIcon sx={{ mr: 1, color: 'primary.main' }} /> Sepsis Survival
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Predicts patient survival outcomes from sepsis.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Brain Tumor Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia 
              component="img" 
              height="160" 
              image={brainTumorImage} 
              alt="Brain Tumor Symptoms"
              sx={{ objectFit: 'contain', padding: '10px' }}
            />
            <CardContent>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PsychologyIcon sx={{ mr: 1, color: 'primary.main' }} /> Brain Tumor MRI
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Classifies brain tumors from MRI scans.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Pneumonia Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia 
              component="img" 
              height="160" 
              image={pneumoniaImage} 
              alt="Pneumonia Diagram"
              sx={{ objectFit: 'contain', padding: '10px' }}
            />
            <CardContent>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FilterFramesIcon sx={{ mr: 1, color: 'primary.main' }} /> Pneumonia X-Ray
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aids in the rapid detection of pneumonia from X-rays.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Lung Cancer Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia 
              component="img" 
              height="160" 
              image={lungCancerImage} 
              alt="Lung Cancer Symptoms"
              sx={{ objectFit: 'contain', padding: '10px' }}
            />
            <CardContent>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AnalyticsIcon sx={{ mr: 1, color: 'primary.main' }} /> Lung Cancer CT
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assists in classifying lung nodules from CT scans.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;