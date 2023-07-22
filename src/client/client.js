import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

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
