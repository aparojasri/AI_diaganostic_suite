import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import HubIcon from '@mui/icons-material/Hub';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// --- FINAL GITHUB URL ---
// This now points to your specific repository.
const GITHUB_BASE_URL = "https://github.com/aparojasri/AI_diaganostic_suite/blob/main/notebooks/";

const models = [
  { name: "CKD Diagnosis", notebook: "1_CKD_Diagnosis.ipynb" },
  { name: "Sepsis Prediction", notebook: "2_Sepsis_Prediction.ipynb" },
  { name: "Brain Tumor MRI", notebook: "3_Brain_Tumor_Classification.ipynb" },
  { name: "Pneumonia X-Ray", notebook: "4_Pneumonia_Detection.ipynb" },
  { name: "Lung Cancer CT", notebook: "5_Lung_Cancer_Detection.ipynb" }
];

function AboutPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <InfoIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} /> About the AI Diagnostic Suite
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>Project Overview</Typography>
        <Typography variant="body1" paragraph>
          This is a full-stack web application designed to demonstrate the end-to-end process of a data science project. It begins with data exploration and model training in cloud-based notebooks and culminates in a deployed, interactive user interface. The project integrates five distinct machine learning models to provide preliminary diagnostic insights for various medical conditions.
        </Typography>
      </Paper>

      <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 3 }}>Technology Stack</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h6"><HubIcon sx={{verticalAlign: 'middle', mr: 1}}/>Data Science</Typography><Typography>Python, Pandas, TensorFlow, Keras, Scikit-learn, Kaggle Notebooks</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h6"><StorageIcon sx={{verticalAlign: 'middle', mr: 1}}/>Backend</Typography><Typography>Flask, Python, Virtual Environments (venv)</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h6"><CodeIcon sx={{verticalAlign: 'middle', mr: 1}}/>Frontend</Typography><Typography>React, Vite, Material-UI (MUI), Axios</Typography></CardContent></Card></Grid>
      </Grid>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: 'warning.light' }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><WarningAmberIcon sx={{ mr: 1 }}/> Important Disclaimer</Typography>
        <Typography variant="body1">
          This application and its models are for **educational and demonstrative purposes only**. They are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </Typography>
      </Paper>

      <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 3 }}>The Models & Data Science Notebooks</Typography>
      <Grid container spacing={3}>
        {models.map((model) => (
          <Grid item xs={12} sm={6} key={model.name}>
            <Card>
              <CardContent>
                <Typography variant="h6">{model.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                  The complete data analysis and model training process for this module is documented in a Jupyter Notebook.
                </Typography>
                <Button 
                  variant="contained" 
                  href={`${GITHUB_BASE_URL}${model.notebook}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Notebook
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AboutPage;