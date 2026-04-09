import axios from "axios";
import API_CONFIG from "../config/api.js";


// const token="13|DiEGIBA7rJzH8pH3MV8ehJNXDWIb5DXouVjtdLJe37e439e7";
const axiosClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: API_CONFIG.HEADERS,
});

// axiosClient.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const status = error.response?.status;
//     const message =
//       error.response?.data?.message ??
//       error.message ??
//       "Đã xảy ra lỗi, vui lòng thử lại.";
//     if (status === 401 && typeof window !== "undefined") {
//       localStorage.removeItem("auth_token");
//       window.location.href = "/login";
//     }
//     if (status === 403) {
//       console.error("Không có quyền truy cập.");
//     }
//     if (status === 422) {
//       // Preserve full Laravel validation error shape
//       return Promise.reject(error.response.data);
//     }
//     if (status >= 500) {
//       console.error("Lỗi server:", message);
//     }
//     // Preserve original AxiosError so callers can read .response.data.message
//     return Promise.reject(error);
//   }
// );

export default axiosClient;