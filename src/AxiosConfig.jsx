import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://1aa7-39-46-218-25.ngrok-free.app/',
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
