import axios from "axios";

const API = axios.create({
  baseURL: "https://jobportal-api-smzv.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
    // If your backend expects Bearer tokens, use:
    // config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;