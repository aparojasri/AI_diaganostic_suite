import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, CircularProgress, Grid, Paper, Divider, LinearProgress, Avatar, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ArticleIcon from '@mui/icons-material/Article';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WarningIcon from '@mui/icons-material/Warning';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

function LungCancerPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => { setActiveTab(newValue); };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => { setPreview(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) { alert("Please select an image file first."); return; }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict/lung_cancer', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (error) {
      console.error("Error making prediction", error);
      alert("Error making prediction. See console for details.");
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Lung Cancer Classification from CT Scan</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}><Tab label="Diagnostic Tool" /><Tab label="About Lung Cancer" /></Tabs>
      </Box>

      {activeTab === 0 && (
        <Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4}><Button variant="contained" component="label">Upload CT Scan<input type="file" hidden onChange={handleFileChange} accept="image/*" /></Button></Grid>
              <Grid item xs={12} sm={4}>{preview && <Avatar src={preview} alt="Preview" sx={{ width: 150, height: 150 }} variant="rounded" />}</Grid>
              <Grid item xs={12} sm={4}><Button type="submit" variant="contained" color="primary" disabled={loading || !selectedFile}>{loading ? <CircularProgress size={24} /> : 'Predict'}</Button></Grid>
            </Grid>
          </form>
          {result && (
            <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><DescriptionIcon sx={{ mr: 1 }} /> AI Diagnostic Report</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}><FactCheckIcon sx={{ mr: 1, color: 'primary.main' }} /> Diagnostic Finding</Typography>
                <Typography variant="h5" color={result.prediction === 'Normal cases' || result.prediction === 'Benign cases' ? 'success.main' : 'error.main'} sx={{ fontWeight: 'bold' }}>Prediction: {result.prediction.replace(' cases', '')}</Typography>
                <Typography variant="body2" color="text.secondary">Confidence Score</Typography>
                <LinearProgress variant="determinate" value={result.confidence * 100} sx={{ height: 10, borderRadius: 5, mt: 1 }} color={result.prediction === 'Normal cases' || result.prediction === 'Benign cases' ? 'success' : 'error'}/>
              </Box>
            </Paper>
          )}
        </Box>
      )}
      
      {activeTab === 1 && (
        <Box>
          <Accordion defaultExpanded><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><ArticleIcon sx={{mr: 1, color: 'primary.main'}}/> What is Lung Cancer?</Typography></AccordionSummary><AccordionDetails><Typography>Lung cancer is a type of cancer that begins in the lungs. It is the leading cause of cancer deaths worldwide. It often begins as a small mass or nodule, which can be benign (noncancerous) or malignant (cancerous). Early detection of malignant nodules via CT scans is critical for improving patient prognosis.</Typography></AccordionDetails></Accordion>
          <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><WarningIcon sx={{mr: 1, color: 'warning.main'}}/> Common Symptoms</Typography></AccordionSummary><AccordionDetails><Typography>In its earliest stages, lung cancer typically has no symptoms. As it advances, symptoms may include a new, persistent cough, coughing up blood, shortness of breath, chest pain, hoarseness, and unexplained weight loss.</Typography></AccordionDetails></Accordion>
          <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{display: 'flex', alignItems: 'center'}}><ReportProblemIcon sx={{mr: 1, color: 'error.main'}}/> Key Risk Factors</Typography></AccordionSummary><AccordionDetails><Typography>Smoking is the number one risk factor for lung cancer, accounting for the vast majority of cases. Other factors include exposure to secondhand smoke, radon gas, asbestos, and other carcinogens, as well as a family history of the disease.</Typography></AccordionDetails></Accordion>
        </Box>
      )}
    </Box>
  );
}
export default LungCancerPage;