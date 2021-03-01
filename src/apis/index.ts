import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? process.env.DEV_SERVER_URL : process.env.PROD_SERVER_URL,
});

export default instance;
