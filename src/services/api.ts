import axios from "axios";

const enviroment = process.env.NODE_ENV;

const url: string =
  enviroment === "production"
    ? "https://contact-simplifier-api.onrender.com"
    : "http://localhost:3003";

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default api;
