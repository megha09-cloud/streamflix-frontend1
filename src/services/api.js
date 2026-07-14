import axios from "axios";
//import { useNavigate } from "react-router-dom";

/**
 * ================================================================
 * IMPORTANT — CONNECT THIS TO YOUR EXISTING BACKEND
 * ================================================================
 * Set VITE_API_BASE_URL in a .env file at your project root, e.g.:
 *   VITE_API_BASE_URL=http://localhost:5000/api
 *
 * This file assumes your existing Express routes look like:
 *   POST  /api/auth/register   { name, email, password } -> { token, user }
 *   POST  /api/auth/login      { email, password }        -> { token, user }
 *
 * If your real routes/field names differ, only this file needs to
 * change — every page below calls registerUser() / loginUser() and
 * doesn't care how the request is shaped underneath.
 * ================================================================
 */
//const navigate = useNavigate();
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (if we have one) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("streamflix_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error messages so the UI always has something readable to show.
function extractErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

export async function registerUser({ name, email, password }) {
  try {
    // Adjust the path/payload here if your Register API differs.
    const { data } = await api.post("/auth/register", { name, email, password });
    return { success: true, data };
  } catch (error) {
    return { success: false, message: extractErrorMessage(error) };
  }
}

export async function loginUser({ email, password }) {
  try {
    // Adjust the path/payload here if your Login API differs.
    const { data } = await api.post("/auth/login", { email, password });
    return { success: true, data };
  } catch (error) {
    return { success: false, message: extractErrorMessage(error) };
  }
}

export default api;
