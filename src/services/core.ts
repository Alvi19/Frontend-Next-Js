import axios from "axios";
import { apiUrl } from "./../config/api";
import { url } from "inspector";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export const api = {
  get<T>(url: string) {
    return axiosInstance.get<T>(url);
  },
  post<T>(url: string, body?: Record<string, any>) {
    return axiosInstance.post<T>(url, body);
  },
  put<T>(url: string, body?: Record<string, any>) {
    return axiosInstance.put<T>(url, body);
  },
  delete<T>(url: string) {
    return axiosInstance.delete<T>(url);
  },
};
