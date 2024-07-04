import axios from "axios";
import env from "react-dotenv";

export const baseURL = env.BACKEND_URL;

const client = axios.create({ baseURL: baseURL });

client.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
