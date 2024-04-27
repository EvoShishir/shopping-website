import axios from "axios";

export const baseURL = "https://shopvibe-server.vercel.app";

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
