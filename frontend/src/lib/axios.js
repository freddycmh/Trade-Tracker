import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000/api",
});

// Add Authorization header to all requests if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;