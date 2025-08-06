import axios from "axios";

const authService = import.meta.env.VITE_AUTH as string;

// Auth Services:
const authServiceUrl = `${authService}api/auth/`; // auth root for authentication apis.

export const registerUrl = `${authServiceUrl}signup`; // register api url
export const loginUrl = `${authServiceUrl}signin`; // login api url
export const logoutUrl = `${authServiceUrl}signout`; // login api url

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
