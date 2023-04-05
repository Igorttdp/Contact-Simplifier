import axios from "axios";

const api = axios.create({
  baseURL: "https://contact-simplifier-api.onrender.com",
  timeout: 3000,
  withCredentials: true,
});

export default api;
