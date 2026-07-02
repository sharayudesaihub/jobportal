import axios from "axios";

const API = axios.create({
  baseURL: "https://jobportal-api-smzv.onrender.com/api",
});

export default API;

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;

});

export default API;