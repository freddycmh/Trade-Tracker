import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.PROD) return "/api";
  if (window.location.hostname.includes('replit')) {
    return `${window.location.protocol}//${window.location.hostname.replace(/\.replit\.dev.*/, '.replit.dev')}:5001/api`;
  }
  return "http://localhost:5001/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Add Authorization header to all requests if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401/403 errors (token expired or invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token is invalid or expired
      localStorage.removeItem("token");

      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;