import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const instance = (contentType?: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": contentType ?? "application/json",
    },
  });

  axiosInstance.interceptors.request.use((config): AxiosRequestConfig => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
  return axiosInstance;
};
