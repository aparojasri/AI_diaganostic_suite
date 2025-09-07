import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import CkdPage from './CkdPage.jsx';
import SepsisPage from './SepsisPage.jsx';
import BrainTumorPage from './BrainTumorPage.jsx';
import PneumoniaPage from './PneumoniaPage.jsx'; // Make sure this file exists
import LungCancerPage from './LungCancerPage.jsx'; // Make sure this file exists

// Define all application routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "ckd", element: <CkdPage /> },
      { path: "sepsis", element: <SepsisPage /> },
      { path: "brain-tumor", element: <BrainTumorPage /> },
      { path: "pneumonia", element: <PneumoniaPage /> },
      { path: "lung-cancer", element: <LungCancerPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);