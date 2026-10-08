import axios from "axios";
import { API_URL } from "../config/env";

const http = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default http;