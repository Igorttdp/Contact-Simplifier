import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003",
  timeout: 3000,
  withCredentials: true,
});

export default api;
