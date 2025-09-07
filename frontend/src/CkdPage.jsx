import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, CircularProgress, Grid, Paper, Divider, LinearProgress, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ArticleIcon from '@mui/icons-material/Article';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WarningIcon from '@mui/icons-material/Warning';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const ckdFeatures = [
  'age', 'blood_pressure', 'specific_gravity', 'albumin', 'sugar', 'blood_glucose_random', 
  'blood_urea', 'serum_creatinine', 'sodium', 'potassium', 'hemoglobin', 'packed_cell_volume', 
  'white_blood_cell_count', 'red_blood_cell_count', 'red_blood_cells', 'pus_cell', 
  'pus_cell_clumps', 'bacteria', 'hypertension', 'diabetes_mellitus', 'coronary_artery_disease', 
  'appetite', 'pedal_edema', 'anemia'
];

function CkdPage() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const featureValues = ckdFeatures.map(feature => parseFloat(formData[feature]) || 0);
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict/ckd', { features: featureValues });
      setResult(res.data);
    } catch (error) {
      console.error("Error making prediction", error);
      alert("An error occurred. Please check the browser console and ensure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Chronic Kidney Disease (CKD)</Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Diagnostic Tool" />
          <Tab label="About CKD" />
        </Tabs>
      </Box>

      {/* Tab 1: Diagnostic Tool Content */}
      {activeTab === 0 && (
        <Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {ckdFeatures.map(feature => (
                <Grid item xs={12} sm={4} md={3} key={feature}>
                  <TextField fullWidth label={feature.replace(/_/g, ' ').toUpperCase()} name={feature} type="number" inputProps={{ step: "any" }} onChange={handleChange} variant="outlined" size="small"/>
                </Grid>
              ))}
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Predict'}
            </Button>
          </form>

          {result && (
            <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
              {/* --- Medical Report Structure --- */}
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><DescriptionIcon sx={{ mr: 1 }} /> AI Diagnostic Report</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}><FactCheckIcon sx={{ mr: 1, color: 'primary.main' }} /> Diagnostic Finding</Typography>
                <Typography variant="h5" color={result.prediction === 1 ? 'error.main' : 'success.main'} sx={{ fontWeight: 'bold' }}>
                  {result.prediction === 1 ? 'Positive for Chronic Kidney Disease' : 'Negative for Chronic Kidney Disease'}
                </Typography>
                <Typography variant="body2" color="text.secondary">Confidence Score</Typography>
                <LinearProgress variant="determinate" value={Math.max(result.probability_ckd, result.probability_no_ckd) * 100} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
              </Box>
              {/* Other report sections can be added here as well */}
            </Paper>
          )}
        </Box>
      )}

      {/* Tab 2: About CKD Content */}
      {activeTab === 1 && (
        <Box>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><ArticleIcon sx={{mr: 1, color: 'primary.main'}}/> What is Chronic Kidney Disease?</Typography></AccordionSummary>
            <AccordionDetails><Typography>Chronic Kidney Disease (CKD) is a condition characterized by a gradual loss of kidney function over time. The kidneys are responsible for filtering waste and excess fluids from the blood, which are then excreted in urine. When CKD reaches an advanced stage, dangerous levels of fluid, electrolytes, and wastes can build up in the body.</Typography></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><WarningIcon sx={{mr: 1, color: 'warning.main'}}/> Common Symptoms</Typography></AccordionSummary>
            <AccordionDetails><Typography>In the early stages, there may be few signs or symptoms. As the disease progresses, symptoms can include nausea, vomiting, loss of appetite, fatigue, swelling of feet and ankles, and changes in how much you urinate.</Typography></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><ReportProblemIcon sx={{mr: 1, color: 'error.main'}}/> Key Risk Factors</Typography></AccordionSummary>
            <AccordionDetails><Typography>The two main causes of chronic kidney disease are diabetes and high blood pressure. Other risk factors include heart disease, smoking, obesity, and a family history of kidney disease.</Typography></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><HealthAndSafetyIcon sx={{mr: 1, color: 'success.main'}}/> General Precautions</Typography></AccordionSummary>
            <AccordionDetails><Typography>Managing CKD involves steps to help control symptoms, reduce complications, and slow disease progression. This often includes a low-protein diet, managing blood pressure, controlling blood sugar, and avoiding substances that can harm the kidneys, like NSAID pain relievers.</Typography></AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Box>
  );
}

export default CkdPage;