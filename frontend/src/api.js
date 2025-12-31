import axios from 'axios';

// This is the single, central file for our backend URL.
// We will update this line later when we deploy.
const API_URL = "http://127.0.0.1:5000";

// Create a new 'instance' of axios with this base URL
const apiClient = axios.create({
  baseURL: API_URL
});

export default apiClient;