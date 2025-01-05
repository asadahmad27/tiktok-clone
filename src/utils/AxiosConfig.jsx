import axios from "axios";

const axiosInstance = axios.create({
  baseURL: " https://mycustomsubdomain.loca.lt/",
  // baseURL: "https://9cb5-39-46-219-134.ngrok-free.app/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
