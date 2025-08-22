import axios from "axios";
import { UseUiStore } from "../shared/store/uiStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    UseUiStore.getState().setLoading(true);
    UseUiStore.getState().setError(null);
    return config;
  },
  (error) => {
    UseUiStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    UseUiStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    UseUiStore.getState().setLoading(false);
    UseUiStore.getState().setError(error.message || "An error occurred");
    return Promise.reject(error);
  }
);
