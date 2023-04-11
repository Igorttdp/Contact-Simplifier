import axios from "axios";

const api = axios.create({
  baseURL: "https://contact-simplifier-api.onrender.com",
  withCredentials: true,
});

export default api;
