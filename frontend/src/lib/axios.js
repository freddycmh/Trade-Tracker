// src/lib/axios.js
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? "/api"  // Use relative path in production
  : "http://localhost:5005/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔐 Token attached:", config.headers.Authorization); // optional for debug
  } else {
    console.log("⚠️ No token found in localStorage");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;