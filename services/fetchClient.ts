import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

function getCookie(name: any) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const instance = (contentType?: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": contentType ?? "application/json",
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use((config): AxiosRequestConfig => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${getCookie("token")}`;
    }

    return config;
  });
  return axiosInstance;
};

// export const instance = () =>
//   axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     withCredentials: true,
//   });
