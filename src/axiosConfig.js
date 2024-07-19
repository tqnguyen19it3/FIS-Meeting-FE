// axiosConfig.js
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030/api/v1",
  // Thêm các cấu hình mặc định khác nếu cần
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    toast.error(`Error: ${error.response?.data?.message || error.message}`);
    return Promise.reject(error);
  }
);

export default axiosInstance;
