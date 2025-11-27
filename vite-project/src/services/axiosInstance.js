import { sessionLogout, showToast } from "../lib/utils"
import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken
    }

    // Auto detect form-data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data"
    } else {
      config.headers["Content-Type"] = "application/json"
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      if (status === 440) {
        sessionLogout()
      } else {
        console.error(data?.message || "An error occurred")
        showToast(data?.message || "An error occurred", "error")
      }
    } else {
      console.error("Network error. Please try again.")
      showToast("Network error. Please try again.", "error")
    }
    return Promise.reject(error)
  }
)

export default axiosInstance