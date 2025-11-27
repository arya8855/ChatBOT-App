import axios from "axios";
import axiosInstance from "./axiosInstance";

export const apiService = {
  get: async (route) => {
    try {
      const response = await axiosInstance.get(route);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        );
      }
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  },

  post: async (route, data, isFormData = false) => {
    try {
      const headers = isFormData
        ? { "Content-Type": "multipart/form-data" }
        : {};

      const response = await axiosInstance.post(route, data, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        );
      }
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  },

  put: async ({ route, data, isFormData = false }) => {
    try {
      const headers = isFormData
        ? { "Content-Type": "multipart/form-data" }
        : {};

      const response = await axiosInstance.put(route, data, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        );
      }
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  },

  patch: async ({ route, data, isFormData = false }) => {
    try {
      const headers = isFormData
        ? { "Content-Type": "multipart/form-data" }
        : {};

      const response = await axiosInstance.patch(route, data, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        );
      }
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  },

  delete: async (route) => {
    try {
      const response = await axiosInstance.delete(route);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        );
      }
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  },
};