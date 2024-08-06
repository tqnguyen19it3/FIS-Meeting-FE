// axiosConfig.js
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: 'https://c422-118-69-133-197.ngrok-free.app',
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    toast.error(`Error: ${error.response?.data?.message || error.message}`);
    return Promise.reject(error);
  }
);

export default axiosInstance;
