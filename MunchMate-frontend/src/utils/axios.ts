import axios from "axios";

export const SERVER_URL = "http://localhost:5555";

axios.defaults.withCredentials = true;

export const baseAxios = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
