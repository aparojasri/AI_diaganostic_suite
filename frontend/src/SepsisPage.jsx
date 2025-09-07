import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, CircularProgress, Grid, Paper, Divider, LinearProgress, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ArticleIcon from '@mui/icons-material/Article';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WarningIcon from '@mui/icons-material/Warning';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const sepsisFeatures = ['age_years', 'sex_0male_1female', 'episode_number'];

function SepsisPage() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => { setActiveTab(newValue); };
  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const featureValues = sepsisFeatures.map(feature => parseFloat(formData[feature]) || 0);
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict/sepsis', { features: featureValues });
      setResult(res.data);
    } catch (error) {
      console.error("Error making prediction", error);
      alert("An error occurred. Please check the browser console and ensure the backend is running correctly.");
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Sepsis Survival Prediction</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}><Tab label="Diagnostic Tool" /><Tab label="About Sepsis" /></Tabs>
      </Box>

      {activeTab === 0 && (
        <Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {sepsisFeatures.map(feature => (
                <Grid item xs={12} sm={4} key={feature}><TextField fullWidth label={feature.replace(/_/g, ' ').toUpperCase()} name={feature} type="number" inputProps={{ step: "any" }} onChange={handleChange} variant="outlined" size="small"/></Grid>
              ))}
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Predict Survival'}</Button>
          </form>
          {result && (
            <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><DescriptionIcon sx={{ mr: 1 }} /> AI Diagnostic Report</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}><FactCheckIcon sx={{ mr: 1, color: 'primary.main' }} /> Diagnostic Finding</Typography>
                <Typography variant="h5" color={result.prediction === 0 ? 'success.main' : 'error.main'} sx={{ fontWeight: 'bold' }}>
                  Predicted Outcome: {result.prediction === 0 ? 'Survived' : 'Did Not Survive'}
                </Typography>
                <Typography variant="body2" color="text.secondary">Confidence Score</Typography>
                <LinearProgress variant="determinate" value={Math.max(result.probability_survived, result.probability_died) * 100} sx={{ height: 10, borderRadius: 5, mt: 1 }} color={result.prediction === 0 ? 'success' : 'error'}/>
              </Box>
            </Paper>
          )}
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Accordion defaultExpanded><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><ArticleIcon sx={{mr: 1, color: 'primary.main'}}/> What is Sepsis?</Typography></AccordionSummary><AccordionDetails><Typography>Sepsis is a life-threatening medical emergency caused by the body's extreme response to an infection. The body's own immune system releases chemicals into the bloodstream to fight an infection, but these can cause widespread inflammation, which can lead to organ damage.</Typography></AccordionDetails></Accordion>
          <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><WarningIcon sx={{mr: 1, color: 'warning.main'}}/> Common Symptoms</Typography></AccordionSummary><AccordionDetails><Typography>Symptoms include a combination of the following: fever or low temperature, high heart rate, rapid breathing, confusion or disorientation, extreme pain, and clammy skin. It is critical to seek medical attention immediately if sepsis is suspected.</Typography></AccordionDetails></Accordion>
          <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><ReportProblemIcon sx={{mr: 1, color: 'error.main'}}/> Key Risk Factors</Typography></AccordionSummary><AccordionDetails><Typography>Anyone can get sepsis, but the risk is highest in adults 65 or older, people with chronic medical conditions (like diabetes, lung disease, or cancer), people with weakened immune systems, and young children.</Typography></AccordionDetails></Accordion>
          <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><HealthAndSafetyIcon sx={{mr: 1, color: 'success.main'}}/> Prevention</Typography></AccordionSummary><AccordionDetails><Typography>Preventing infections is the best way to prevent sepsis. This includes practicing good hygiene, keeping cuts clean, and getting recommended vaccinations. Managing chronic conditions and seeking prompt medical care for infections are also crucial.</Typography></AccordionDetails></Accordion>
        </Box>
      )}
    </Box>
  );
}
export default SepsisPage;