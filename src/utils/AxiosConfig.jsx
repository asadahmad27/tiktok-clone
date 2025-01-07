import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.dev.strangled.net/",
  // baseURL: "https://4d45-39-46-200-96.ngrok-free.app/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
